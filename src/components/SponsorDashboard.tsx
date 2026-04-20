import React from 'react';
import { Activity, Clock, FileCheck, AlertCircle, ShieldCheck, Download, History, Lock, FileKey } from 'lucide-react';
import WorkersTable from './WorkersTable';

interface SponsorDashboardProps {
  onAddWorker: () => void;
}

export default function SponsorDashboard({ onAddWorker }: SponsorDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Block */}
      <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A] dark:text-white">UKVI Compliance Overview</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Real-time status of sponsored identities and duties.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-white dark:bg-[#0F172A] px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800 shadow-sm">
          <Lock className="w-3 h-3 text-[#14B8A6]" />
          End-to-End Encrypted
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Hero Circular Gauge */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center relative shadow-sm">
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
             <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Health Score</span>
          </div>
          
          <div className="relative flex items-center justify-center w-40 h-40 mt-6 lg:mt-0">
             <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
              <circle cx="80" cy="80" r="70" stroke="#14B8A6" strokeWidth="8" fill="transparent" strokeDasharray={439.8} strokeDashoffset={26.3} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter">94</span>
              <span className="text-[9px] font-bold text-[#14B8A6] uppercase tracking-[0.2em] mt-1 shadow-sm px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30">Excellent</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards & Export Row */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Expiring Visas', val: '12', icon: Clock, color: 'text-slate-600 dark:text-slate-300' },
            { label: 'Unused CoS', val: '08', icon: FileCheck, color: 'text-[#14B8A6]' },
            { label: 'SA Identifiers', val: '142', icon: Activity, color: 'text-slate-600 dark:text-slate-300' },
            { label: 'Overdue Duties', val: '03', icon: AlertCircle, color: 'text-red-600' },
          ].map((item, idx) => (
            <div key={item.label} className={`bg-white dark:bg-[#0F172A] p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between ${idx === 3 ? 'border-l-2 border-l-red-500' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <p className="text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">{item.val}</p>
            </div>
          ))}

          {/* Action Bar */}
          <div className="col-span-2 lg:col-span-4 bg-[#0F172A] dark:bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between shadow-lg relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
             <div className="flex items-center gap-4 text-white z-10">
                <div className="bg-slate-800 p-2.5 rounded shadow-inner border border-slate-700">
                  <Download className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide">Generate Full Initial Audit Report</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Prepare cryptographic append-only ledger for Home Office (JSON format).</p>
                </div>
             </div>
             <button className="mt-4 sm:mt-0 bg-white text-[#0F172A] px-6 py-2.5 rounded font-black text-[10px] uppercase tracking-[0.15em] hover:bg-slate-100 transition-colors shadow-sm z-10 w-full sm:w-auto">
                Export Ledger
             </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 pt-4">
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] dark:text-white flex items-center gap-2">
              <FileKey className="w-4 h-4 text-[#14B8A6]" />
              Sponsored Identifiers
            </h2>
            <button onClick={onAddWorker} className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
              + Enroll Record
            </button>
          </div>
          <div className="bg-white dark:bg-[#0F172A] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <WorkersTable />
          </div>
        </div>

        {/* Sidebar: Immutable Audit Log */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
             <History className="w-4 h-4 text-slate-500" />
             <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Immutable Trail</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-[#0F172A] p-3.5 rounded border border-slate-200 dark:border-slate-800 relative group shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-black text-[#14B8A6] bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded tracking-wider border border-teal-100 dark:border-teal-800/50">VERIFIED</span>
                  <span className="text-[9px] font-mono text-slate-400">12:04:0{i} UTC</span>
                </div>
                <p className="text-[11px] font-bold text-[#0F172A] dark:text-white leading-tight mb-1">State Transition: Auth</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-1.5 rounded mt-2 border border-slate-100 dark:border-slate-800">
                  <p className="text-[8px] text-slate-500 font-mono break-all opacity-80 uppercase leading-relaxed">
                    SHA: 8f3c1a2b3c4d5e6f7g8h9<br/>i0j1k2l3m4n5o6p7q8r9s0{i}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
