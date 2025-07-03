import { db } from '$lib/server/db/index.js';
import { post } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { s3Client } from '$lib/server/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { fail } from '@sveltejs/kit';
import ExifReader from 'exifreader';

export const load = async ({ params }) => {
	return {
		post: (await db.select().from(post).limit(1).orderBy(desc(post.createdAt)))[0]
	};
};

export const actions = {
	uploadSingle: async ({ request }) => {
		try {
			console.log('hello');
			const formData = await request.formData();
			const file = formData.get('image');

			if (!file || !(file instanceof File)) {
				return fail(400, { error: 'No valid image file provided' });
			}
			console.log(file);
			if (!file.type.startsWith('image/')) {
				return fail(400, { error: 'File must be an image' });
			}

			if (file.size > 5 * 1024 * 1024) {
				return fail(400, { error: 'File exceeds 5MB limit' });
			}

			const buffer = Buffer.from(await file.arrayBuffer());
			const filename = `${Date.now()}-${file.name}`;

			// let location = null;
			// try {
			// 	const exifData = ExifReader.load(buffer);
			// 	location = extractLocation(exifData);
			// } catch (exifError: any) {
			// 	console.warn(`Could not extract EXIF data from ${file.name}:`, exifError.message);
			// }

			console.log(ExifReader.load(buffer));
			const uploadParams = {
				Bucket: env.AWS_BUCKET_NAME,
				Key: filename,
				Body: buffer,
				ContentType: file.type
			};

			await s3Client.send(new PutObjectCommand(uploadParams));

			const fileUrl = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${filename}`;

			const result = (
				await db.insert(post).values({ image: fileUrl, postedBy: 'tina_monkey' }).returning()
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
