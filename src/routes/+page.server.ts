import { db } from '$lib/server/db/index.js';
import { post } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { s3Client } from '$lib/server/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { fail } from '@sveltejs/kit';
import ExifReader from 'exifreader';
import { loadObjectFromCookies } from '$lib/utils';

export const load = async () => {
	return {
		post: (await db.select().from(post).limit(1).orderBy(desc(post.createdAt)))[0]
	};
};

export const actions = {
	uploadSingle: async ({ request, cookies }) => {
		let authenticatedState = loadObjectFromCookies<{ password: string; username: string }>(
			cookies,
			'secret_password'
		);
		let authenticated = authenticatedState?.password === env.SUPER_SECRET_PASSWORD;

		if (!authenticated) {
			return new Error('Not authenticated');
		}
		try {
			const formData = await request.formData();
			const file = formData.get('image');

			if (!file || !(file instanceof File)) {
				return fail(400, { error: 'No valid image file provided' });
			}

			if (!file.type.startsWith('image/')) {
				return fail(400, { error: 'File must be an image' });
			}

			if (file.size > 5 * 1024 * 1024) {
				return fail(400, { error: 'File exceeds 5MB limit' });
			}

			const buffer = Buffer.from(await file.arrayBuffer());
			const filename = `${Date.now()}-${file.name}`;

			let location = null;

			try {
				const tags = await ExifReader.load(buffer, { async: true });

				const lat = tags['GPSLatitude']?.value as [number, number][];
				const lon = tags['GPSLongitude']?.value as [number, number][];
				const latRef = tags['GPSLatitudeRef']?.description;
				const lonRef = tags['GPSLongitudeRef']?.description;

				if (lat && lon && latRef && lonRef) {
					const toDecimal = (coords: [number, number][], ref: string): number => {
						const [degRaw, minRaw, secRaw] = coords;

						const deg = degRaw[0] / degRaw[1];
						const min = minRaw[0] / minRaw[1];
						const sec = secRaw[0] / secRaw[1];

						let decimal = deg + min / 60 + sec / 3600;
						if (ref === 'S' || ref === 'W') decimal *= -1;
						return decimal;
					};

					location = {
						latitude: toDecimal(lat, latRef),
						longitude: toDecimal(lon, lonRef)
					};
				}
			} catch (err) {
				console.error('Failed to read EXIF data:', err);
			}

			const uploadParams = {
				Bucket: env.AWS_BUCKET_NAME,
				Key: filename,
				Body: buffer,
				ContentType: file.type
			};

			await s3Client.send(new PutObjectCommand(uploadParams));

			const fileUrl = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${filename}`;

			const result = (
				await db
					.insert(post)
					.values({
						image: fileUrl,
						postedBy: authenticatedState?.username as 'tina_monkey' | 'max_monkey',
						latitude: location?.latitude,
						longitude: location?.longitude
					})
					.returning()
			)[0];

			return {
				success: true,
				message: 'File uploaded successfully',
				file: {
					originalName: file.name,
					filename,
					fileUrl,
					fileType: file.type,
					fileSize: file.size
				},
				result
			};
		} catch (error) {
			console.error('Upload error:', error);
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error uploading file'
			});
		}
	}
};
