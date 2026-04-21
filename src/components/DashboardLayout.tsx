import React from 'react';
import { ShieldCheck, User, Database, Lock } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Static time for display, or could be dynamic in a real app
  const utcTime = new Date().toISOString().substring(11, 19);

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 font-sans text-[#1E293B] dark:text-slate-100">
      {/* Utility Bar */}
      <div className="bg-[#1E293B] text-slate-300 py-1.5 px-6 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase border-b border-black">
        <div className="flex items-center gap-4">
           <span>SYSTEM TIME (UTC): {utcTime}</span>
           <span className="hidden sm:inline">|</span>
           <span className="hidden sm:inline">NODE: LDN-01</span>
        </div>
        <div className="flex items-center gap-2 text-[#0D9488]">
           <Lock className="w-3 h-3" />
           <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-[#0B1120] border-b border-[#CBD5E1] dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto px-6 flex items-end justify-between pt-4">
          <div className="flex items-end gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#1E293B] dark:text-white" />
              <span className="text-xl font-black tracking-tighter text-[#1E293B] dark:text-white uppercase">
                MigraLink<span className="text-[#0369A1]">_</span>
              </span>
            </div>
            
            {/* Banking Terminal Tabs */}
            <nav className="hidden md:flex items-end gap-1">
              {['Dashboard', 'Registry', 'Audit Ledger', 'Sponsor Controls'].map((item, i) => (
                <button 
                  key={item} 
                  className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest border border-b-0 rounded-t-sm transition-colors ${
                    i === 0 
                      ? 'bg-[#F1F5F9] dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-800 text-[#1E293B] dark:text-white relative top-[1px]' 
                      : 'bg-white dark:bg-[#0B1120] border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5 pb-2">
            {/* EU/UK Identity Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-sm shadow-inner">
              <Database className="w-3 h-3 text-[#1E293B] dark:text-slate-400" />
              <span className="text-[9px] font-bold text-[#1E293B] dark:text-slate-300 uppercase tracking-widest tabular-nums">
                Region: UK-SOUTH 
              </span>
            </div>

            <div className="w-[1px] h-6 bg-[#CBD5E1] dark:bg-slate-700" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-white leading-none">Terminal User</p>
                <p className="text-[9px] text-[#0369A1] font-mono mt-1">ID: 8821-XQ</p>
              </div>
              <div className="w-7 h-7 bg-[#1E293B] text-white rounded-sm flex items-center justify-center border border-[#1E293B] shadow-sm">
                <User className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
