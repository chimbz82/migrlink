import { ReactNode } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { orgId } = auth();
  if (!orgId) redirect('/select-org');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-800 px-4 py-2 flex justify-center items-center gap-2 text-xs font-semibold z-50">
        <ShieldAlert size={14} />
        OISC Disclaimer: This is compliance tooling only — not immigration advice.
      </div>

      <header className="px-6 py-4 bg-white border-b flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">MigraLink Sponsor Dashboard</h1>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
