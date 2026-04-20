import React from 'react';
import { ShieldCheck, Lock, Building2, Bell, User } from 'lucide-react';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-slate-200 font-sans">
      <Toaster />
      {/* OISC Regulatory Disclaimer Bar */}
      <div className="bg-[#0F172A] text-white py-1.5 px-4 text-center text-[11px] font-medium tracking-wider uppercase border-b border-white/10">
        Registered with the OISC • Ref: F202400012 • This platform is for UKVI Compliance Management only.
      </div>

      {/* Institutional Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#0F172A] p-1.5 rounded">
                <ShieldCheck className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Migra<span className="text-[#14B8A6]">Link</span>
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              {['Dashboard', 'Workers', 'Audit Logs', 'CoS Management', 'Settings'].map((item) => (
                <button key={item} className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Data Residency: UK-South</span>
            </div>
            <button className="p-2 text-slate-500 hover:text-[#0F172A] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">Institutional Sponsor</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">ID: 8821-XQ</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 lg:p-8 animate-in fade-in duration-700">
        {children}
      </main>
    </div>
  );
}
