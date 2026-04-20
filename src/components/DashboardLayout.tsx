import React from 'react';
import { ShieldCheck, Bell, User, Database } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 font-sans text-[#0F172A] dark:text-slate-100 pb-20">
      {/* OISC Regulatory Disclaimer Bar */}
      <div className="bg-[#0F172A] text-white py-2 px-6 text-center text-[10px] font-bold tracking-[0.25em] uppercase border-b border-white/10">
        Registered with the OISC • Ref: F202400012 • For Institutional Compliance Processing Only
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0F172A] dark:bg-white rounded flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#0F172A] dark:text-white">
                MigraLink <span className="text-[#14B8A6] relative -top-0.5 -left-1">.</span>
              </span>
            </div>
            
            {/* Tabs */}
            <nav className="hidden md:flex items-end h-16 pt-1">
              {['Dashboard', 'Workers', 'Audit Logs', 'CoS Management', 'Settings'].map((item, i) => (
                <button 
                  key={item} 
                  className={`px-4 h-full flex items-center text-[11px] font-bold uppercase tracking-widest ${
                    i === 0 
                      ? 'text-[#0F172A] dark:text-white border-b-2 border-[#14B8A6]' 
                      : 'text-slate-500 hover:text-[#0F172A] dark:hover:text-white border-b-2 border-transparent'
                  } transition-colors`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            {/* Trust Signal Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-left">
              <Database className="w-4 h-4 text-[#14B8A6]" />
              <div className="leading-none">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Data Residency</p>
                <p className="text-[10px] font-bold text-[#0F172A] dark:text-white uppercase tracking-wider mt-0.5">UK-South</p>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800" />
            
            <button className="text-slate-400 hover:text-[#0F172A] dark:hover:text-white relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border border-white dark:border-[#0F172A] rounded-full" />
            </button>
            
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-[#0F172A] dark:text-white">GovTech Sponsor</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: 8821-XQ</p>
              </div>
              <div className="w-9 h-9 bg-[#F1F5F9] dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <User className="w-5 h-5 text-[#0F172A] dark:text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto p-6 xl:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
