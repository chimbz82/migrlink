import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans text-[#0F172A] dark:text-slate-100">
      {/* Top Bar */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-center text-[10px] font-bold uppercase tracking-widest">
        Registered with the OISC • Ref: F202400012 • Institutional Compliance Portal
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#0F172A] dark:text-white" />
              <span className="text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
                MigraLink
              </span>
            </div>
            
            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              {['Dashboard', 'Workers', 'Audit Logs', 'CoS Management', 'Settings'].map((item, i) => (
                <button 
                  key={item} 
                  className={`text-[11px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${
                    i === 0 
                      ? 'text-[#0F172A] dark:text-white border-[#0F172A] dark:border-white' 
                      : 'text-slate-500 hover:text-[#0F172A] dark:hover:text-white border-transparent'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {/* Data Residency Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-900/30 rounded-full border border-teal-200 dark:border-teal-800/50">
              <div className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#14B8A6]">
                Data Residency: UK-South
              </span>
            </div>

            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />
            
            {/* User Area */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white leading-none">Sponsor Admin</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: 8821-XQ</p>
              </div>
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <User className="w-4 h-4 text-[#0F172A] dark:text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 xl:p-8">
        {children}
      </main>
    </div>
  );
}
