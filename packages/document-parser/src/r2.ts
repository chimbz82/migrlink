import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// Cloudflare R2 requires region: 'auto' in the AWS SDK.
// Actual EU (eu-west-2) data residency is enforced by setting the R2 bucket
// location policy to "Europe" in the Cloudflare dashboard — not via SDK region.
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;

const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

function extFromContentType(ct: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
  };
  return map[ct] ?? 'bin';
}

export async function getUploadSignedUrl(
  orgId: string,
  workerId: string,
  contentType: string,
): Promise<{ uploadUrl: string; fileKey: string }> {
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    throw new Error(`Disallowed content type: ${contentType}`);
  }
  // Tenant-isolated key: orgId/workerId/<uuid>.<ext>
  const fileKey = `${orgId}/${workerId}/${randomUUID()}.${extFromContentType(contentType)}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileKey,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
  return { uploadUrl, fileKey };
}

export async function getViewSignedUrl(
  fileKey: string,
  expiresIn = 300,
): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: fileKey });
  return getSignedUrl(r2Client, command, { expiresIn });
}

/** Download an object from R2 and return its bytes (used inside Inngest steps). */
export async function getObjectBuffer(fileKey: string): Promise<Buffer> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: fileKey });
  const { Body } = await r2Client.send(command);
  if (!Body) throw new Error(`R2: empty body for key "${fileKey}"`);
  const chunks: Uint8Array[] = [];
  // Body is a ReadableStream (Node fetch) or a Readable (Node.js SDK stream)
  for await (const chunk of Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
