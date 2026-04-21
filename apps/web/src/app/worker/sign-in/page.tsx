'use client';

import dynamic from 'next/dynamic';

const WorkerSignInForm = dynamic(
  () => import('./WorkerSignInForm'),
  { ssr: false, loading: () => null }
);

export default function WorkerSignInPage() {
  return <WorkerSignInForm />;
}
