import React from 'react';
import { Download, Terminal } from 'lucide-react';
import WorkersTable from './WorkersTable';

interface SponsorDashboardProps {
  onAddWorker: () => void;
}

export default function SponsorDashboard({ onAddWorker }: SponsorDashboardProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* COMMAND GRID (Span 8) */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Main Status Panel */}
        <div className="bg-white dark:bg-[#0B1120] border border-[#CBD5E1] dark:border-slate-800 rounded-sm border-t-2 border-t-[#1E293B] shadow-sm">
          <div className="p-4 border-b border-[#CBD5E1] dark:border-slate-800 bg-[#F1F5F9] dark:bg-slate-900/50 flex justify-between items-center">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-white">System Compliance Overview</h2>
            <span className="text-[9px] font-mono text-slate-500 bg-white dark:bg-black px-2 py-0.5 border border-[#CBD5E1] dark:border-slate-800 rounded-sm shadow-inner uppercase">Live Sync</span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Status Bar Gauge */}
            <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#0369A1] mb-2 drop-shadow-sm">System Health Score</p>
               <div className="flex items-end gap-3 mb-3">
                  <span className="text-5xl font-black text-[#1E293B] dark:text-white tabular-nums tracking-tighter">94.00</span>
                  <span className="text-xl font-bold text-[#0D9488] mb-1">%</span>
               </div>
               {/* Industrial Progress Bar */}
               <div className="w-full h-4 bg-[#F1F5F9] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-sm overflow-hidden shadow-inner flex">
                 <div className="h-full bg-[#0D9488] border-r border-[#1E293B]/20" style={{ width: '94%' }} />
               </div>
               <div className="flex justify-between mt-1 text-[9px] font-mono text-slate-500 uppercase">
                  <span>0.00</span>
                  <span>Target: 99.99</span>
               </div>
            </div>

            {/* Rigid Metrics Grid */}
            <div className="grid grid-cols-2 gap-[1px] bg-[#CBD5E1] dark:bg-slate-700 border border-[#CBD5E1] dark:border-slate-700 rounded-sm shadow-inner overflow-hidden">
              {[
                { label: 'Expiring Visas', val: '12', alert: false },
                { label: 'Unused CoS', val: '08', alert: false },
                { label: 'SA Requests', val: '142', alert: false },
                { label: 'Overdue Duties', val: '03', alert: true },
              ].map((m) => (
                <div key={m.label} className="bg-white dark:bg-[#0B1120] p-4 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{m.label}</span>
                  <span className={`text-2xl font-black tabular-nums mt-2 ${m.alert ? 'text-[#EF4444]' : 'text-[#1E293B] dark:text-white'}`}>
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table Panel */}
        <div className="bg-white dark:bg-[#0B1120] border border-[#CBD5E1] dark:border-slate-800 rounded-sm border-t-2 border-t-[#1E293B] shadow-sm">
          <div className="p-4 border-b border-[#CBD5E1] dark:border-slate-800 bg-[#F1F5F9] dark:bg-slate-900/50 flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-white">Active Registry Ledger</h3>
            <div className="flex gap-2">
              <button className="bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                <Download className="w-3 h-3 text-[#0369A1]" /> Export CSV
              </button>
              <button 
                onClick={onAddWorker}
                className="bg-[#1E293B] text-white px-4 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-widest shadow-sm hover:bg-[#0F172A] transition-colors"
              >
                + New Record
              </button>
            </div>
          </div>
          <WorkersTable />
        </div>
      </div>

      {/* Terminal Audit Log (Span 4) */}
      <div className="xl:col-span-4 bg-black border border-[#1E293B] rounded-sm flex flex-col h-[700px] shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#1E293B] text-slate-300 p-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-black">
          <Terminal className="w-3 h-3" /> System Event Log
        </div>
        
        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[10px]">
          <div className="text-slate-500 mb-4 pb-2 border-b border-slate-800 uppercase">
            &gt; Connecting to Secure Ledger... [ESTABLISHED]<br/>
            &gt; Pulling event hashes...
          </div>
          
          {[
            { status: '[OK]', c: 'text-[#0D9488]', ev: 'WORKER_AUTH_GRANTED', h: 'e4d909c290d0fb1ca', ts: '12:04:02' },
            { status: '[OK]', c: 'text-[#0D9488]', ev: 'DOC_OCR_COMPLETED', h: 'f2a17b019ac8f7k2z', ts: '10:15:33' },
            { status: '[WARN]', c: 'text-amber-500', ev: 'COS_RENEWAL_NEAR', h: '8a9c0f7b6d5e4f3aa', ts: '09:00:12' },
            { status: '[OK]', c: 'text-[#0D9488]', ev: 'DSAR_EXPORT_DONE', h: '1b2c3d4e5f6a7b8c9', ts: '08:45:00' },
            { status: '[SYNC]', c: 'text-[#0369A1]', ev: 'OISC_DB_POLL_OK', h: '9z8y7x6w5v4u3t2s1', ts: '00:00:01' },
            { status: '[OK]', c: 'text-[#0D9488]', ev: 'INIT_BOOT_SEQ', h: '0a0b0c0d0e0f0g0h0', ts: '00:00:00' },
          ].map((log, i) => (
            <div key={i} className="flex gap-3 leading-relaxed hover:bg-slate-900/50 p-1 -mx-1 rounded-sm cursor-default">
              <span className="text-slate-500 uppercase">{log.ts}</span>
              <span className={`${log.c} w-12 shrink-0 font-bold uppercase`}>{log.status}</span>
              <div className="flex-1 text-slate-300 break-all uppercase tracking-tighter">
                <span className="text-white block mb-0.5">{log.ev}</span>
                <span className="text-slate-600">SHA:{log.h}</span>
              </div>
            </div>
          ))}
          
          <div className="text-slate-500 pt-4 animate-pulse uppercase">
            &gt; Awaiting stream...
          </div>
        </div>
      </div>
      
    </div>
  );
}
