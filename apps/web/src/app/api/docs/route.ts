import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUploadSignedUrl, getViewSignedUrl } from '@migralink/document-parser/r2';
import { createComplianceEvent } from '@migralink/compliance-engine';
import { inngest } from '@/inngest/client';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);
const ALLOWED_DOC_TYPES = new Set(['PASSPORT', 'BRP', 'RTW_SHARE_CODE', 'COS', 'OTHER']);

// ── POST /api/docs ────────────────────────────────────────────────────────────
// Returns a 5-minute signed PUT URL for direct-to-R2 upload + emits the
// DOCUMENT_UPLOAD_INITIATED compliance event.
export async function POST(req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const { workerId, contentType, documentType } = body as {
    workerId?: string;
    contentType?: string;
    documentType?: string;
  };

  if (!workerId || typeof workerId !== 'string' || workerId.trim() === '') {
    return new NextResponse('workerId required', { status: 400 });
  }
  if (!contentType || !ALLOWED_MIME_TYPES.has(contentType)) {
    return new NextResponse('Invalid or missing contentType', { status: 400 });
  }
  if (!documentType || !ALLOWED_DOC_TYPES.has(documentType)) {
    return new NextResponse('Invalid or missing documentType', { status: 400 });
  }

  const { uploadUrl, fileKey } = await getUploadSignedUrl(orgId, workerId, contentType);

  // Emit the initiation event BEFORE the client starts the upload so
  // the compliance chain is never missing an entry.
  await createComplianceEvent(orgId, workerId, 'DOCUMENT_UPLOAD_INITIATED', {
    fileKey,
    documentType,
    contentType,
    uploadedBy: userId,
  });

  return NextResponse.json({ uploadUrl, fileKey, documentType });
}

// ── PUT /api/docs ─────────────────────────────────────────────────────────────
// Called after the client has finished uploading directly to R2.
// Enqueues the durable document-processing Inngest workflow.
export async function PUT(req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const { workerId, fileKey, documentType, mimeType, workerData } = body as {
    workerId?: string;
    fileKey?: string;
    documentType?: string;
    mimeType?: string;
    workerData?: Record<string, unknown>;
  };

  if (!workerId || !fileKey || !documentType || !mimeType) {
    return new NextResponse('workerId, fileKey, documentType, mimeType required', { status: 400 });
  }

  // Validate tenant isolation: the fileKey MUST start with orgId/workerId
  if (!fileKey.startsWith(`${orgId}/`)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  await inngest.send({
    name: 'document/process.uploaded',
    data: {
      orgId,
      workerId,
      fileKey,
      documentType,
      mimeType,
      uploadedBy: userId,
      workerData: workerData ?? {},
    },
  });

  return NextResponse.json({ status: 'queued' });
}

// ── GET /api/docs?fileKey=<key> ───────────────────────────────────────────────
// Returns a short-lived signed GET URL for viewing a document.
// Every access is recorded as a PII access compliance event.
export async function GET(req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const fileKey = searchParams.get('fileKey');

  if (!fileKey) return new NextResponse('fileKey query param required', { status: 400 });

  // Enforce tenant isolation — key must belong to the caller's org
  if (!fileKey.startsWith(`${orgId}/`)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const [viewUrl] = await Promise.all([
    getViewSignedUrl(fileKey, 300),
    createComplianceEvent(orgId, null, 'DOCUMENT_VIEWED', {
      fileKey,
      viewedBy: userId,
      accessedAt: new Date().toISOString(),
    }),
  ]);

  return NextResponse.json({ viewUrl, expiresInSeconds: 300 });
}
