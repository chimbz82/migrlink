import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

export const r2Client = new S3Client({
  region: 'auto', 
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export async function getUploadSignedUrl(orgId: string, workerId: string, contentType: string) {
  const extension = contentType === 'application/pdf' ? 'pdf' : 'jpeg';
  const fileKey = `${orgId}/${workerId}/${randomUUID()}.${extension}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
  return { uploadUrl, fileKey };
}

export async function getViewSignedUrl(r2ObjectKey: string, expiresIn = 300) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: r2ObjectKey,
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}
