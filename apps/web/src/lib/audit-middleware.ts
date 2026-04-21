import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { inngest } from '@/inngest/client'; // Use Inngest to decouple logging from edge latency

/**
 * Middleware utility to log access to PII routes (e.g. Viewing Worker Profiles, DSAR exports)
 * Call this from within your standard Next.js middleware.ts
 */
export async function logPIIAccess(req: NextRequest, userId: string, orgId: string) {
  const url = req.nextUrl.pathname;
  
  // Identify sensitive routes that require PII read audits
  if (url.includes('/worker/') || url.includes('/api/audit') || url.includes('/api/docs/view')) {
    const ipAddress = req.headers.get('x-forwarded-for') ?? 'Unknown';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Fire-and-forget to Inngest to avoid blocking the request
    await inngest.send({
      name: 'audit/pii.accessed',
      data: {
        userId,
        orgId,
        path: url,
        ipAddress,
        userAgent,
        timestamp: new Date().toISOString()
      }
    });
  }

  return NextResponse.next();
}
