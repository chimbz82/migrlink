import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUploadSignedUrl, getViewSignedUrl } from '@migralink/document-parser/r2';
// import { inngest } from '@/inngest/client';

export async function POST(req: Request) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });

  const { workerId, contentType, documentType } = await req.json();

  if (!['image/jpeg', 'image/png', 'application/pdf'].includes(contentType)) {
    return new NextResponse('Invalid mime type', { status: 400 });
  }

  const { uploadUrl, fileKey } = await getUploadSignedUrl(orgId, workerId, contentType);
  return NextResponse.json({ uploadUrl, fileKey, documentType });
}

export async function PUT(req: Request) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 });
  
  const { workerId, fileKey, documentType, mimeType } = await req.json();
  
  // await inngest.send({
  //  name: 'document/process.uploaded',
  //  data: { orgId, workerId, fileKey, documentType, mimeType, uploadedBy: userId }
  // });

  return NextResponse.json({ status: 'Processing Queued' });
}
