import React from 'react';
import { ShieldCheck, Bell, User, Lock, Database } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-slate-200 font-sans">
      {/* OISC Regulatory Disclaimer Bar */}
      <div className="bg-black text-white py-1.5 px-4 text-center text-[10px] font-bold tracking-[0.2em] uppercase">
        Registered with the OISC • Ref: F202400012 • Institutional Compliance Portal
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 border-r border-slate-200 dark:border-slate-800 pr-8 py-2">
              <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
              <span className="text-lg font-black tracking-tight text-[#0F172A] dark:text-white">
                MigraLink.
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['Dashboard', 'Personnel', 'Audit Ledger', 'Sponsorship Management'].map((item, i) => (
                <button key={item} className={`text-xs font-bold uppercase tracking-wider transition-colors pt-1 ${i === 0 ? 'text-[#0F172A] dark:text-white border-b-2 border-[#14B8A6] pb-[19px]' : 'text-slate-400 hover:text-[#0F172A] dark:hover:text-white pb-[21px]'}`}>
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2">
              <Database className="w-3 h-3 text-[#14B8A6]" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                Data Locality<br/><span className="text-slate-600 dark:text-slate-300">UK-South Region</span>
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <button className="text-slate-400 hover:text-[#0F172A] dark:hover:text-white relative transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-[#0F172A] dark:text-white">Institutional Auth</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: 8821-XQ</p>
              </div>
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-sm flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 xl:p-10">
        {children}
      </main>
    </div>
  );
}
