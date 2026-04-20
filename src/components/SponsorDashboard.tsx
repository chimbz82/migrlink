import React from 'react';
import { Clock, FileCheck, Activity, AlertCircle, History } from 'lucide-react';
import WorkersTable from './WorkersTable';

interface SponsorDashboardProps {
  onAddWorker?: () => void;
}

export default function SponsorDashboard({ onAddWorker }: SponsorDashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Dashboard Area */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Element */}
          <div className="bg-white dark:bg-[#0F172A] p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Compliance Health Score</h2>
              <div className="inline-block bg-teal-50 dark:bg-teal-900/30 text-[#14B8A6] border border-teal-100 dark:border-teal-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                Excellent
              </div>
            </div>
            <div className="relative flex items-center justify-center w-28 h-28">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                <circle cx="56" cy="56" r="48" fill="none" stroke="#14B8A6" strokeWidth="8" strokeDasharray={301.6} strokeDashoffset={18} strokeLinecap="square" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">94</span>
              </div>
            </div>
          </div>

          {/* Grid Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Expiring Visas', val: '12', icon: Clock },
              { label: 'Unused CoS', val: '08', icon: FileCheck },
              { label: 'SA Identifiers', val: '142', icon: Activity },
              { label: 'Overdue Duties', val: '03', icon: AlertCircle, alert: true },
            ].map((metric) => (
              <div key={metric.label} className="bg-white dark:bg-[#0F172A] p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                   <span className={`text-[10px] font-bold uppercase tracking-widest leading-tight ${metric.alert ? 'text-[#EF4444]' : 'text-slate-500'}`}>
                     {metric.label}
                   </span>
                </div>
                <span className={`text-2xl font-bold tracking-tight ${metric.alert ? 'text-[#EF4444]' : 'text-[#0F172A] dark:text-white'}`}>
                  {metric.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workers Table */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#020617]">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Active Workers & CoS Registry</h3>
            <button 
              onClick={onAddWorker}
              className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-slate-800 dark:hover:bg-slate-200"
            >
              + Add Worker
            </button>
          </div>
          <WorkersTable />
        </div>
      </div>

      {/* Sidebar: Immutable Audit Trail */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <History className="w-4 h-4 text-[#0F172A] dark:text-white" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Immutable Audit Trail</h3>
          </div>
          
          <div className="flex-1 space-y-6">
            {[
              { tag: 'WORKER_ADDED', ts: '12:04:02 UTC', hash: 'e4d909c290d0fb1cae4d909' },
              { tag: 'DOC_VERIFIED', ts: '10:15:33 UTC', hash: 'f2a17b019ac8f7k2zf2a17b' },
              { tag: 'COS_ASSIGNED', ts: '09:00:12 UTC', hash: '8a9c0f7b6d5e4f3a28a9c0f' },
              { tag: 'AUDIT_EXPORT', ts: '08:45:00 UTC', hash: '1b2c3d4e5f6a7b8c91b2c3d' },
              { tag: 'SYSTEM_SYNC', ts: '00:00:01 UTC', hash: '9z8y7x6w5v4u3t2s19z8y7x' },
            ].map((log, i) => (
              <div key={i} className="relative pl-6 before:absolute before:left-[5px] before:top-2 before:bottom-[-24px] before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800 last:before:hidden">
                <div className="absolute left-[2px] top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-[#0F172A] dark:text-white">{log.tag}</span>
                    <span className="text-slate-500">{log.ts}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-slate-800 px-2 py-1.5 rounded mt-1 overflow-hidden">
                    <span className="text-[10px] text-slate-500 font-mono tracking-tighter block truncate">
                      SHA: {log.hash}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
