import { env } from '$env/dynamic/private';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
	region: env.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	}
});
