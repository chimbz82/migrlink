import React from 'react';
import { Activity, Clock, FileCheck, AlertCircle, Shield, Download, History, Database, CheckCircle2 } from 'lucide-react';
import WorkersTable from './WorkersTable';

interface SponsorDashboardProps {
  onAddWorker: () => void;
}

export default function SponsorDashboard({ onAddWorker }: SponsorDashboardProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      
      {/* LEFT COLUMN: Main Dashboard (Span 3) */}
      <div className="xl:col-span-3 space-y-6">
        
        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* HERO GAUGE */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="absolute top-5 left-5 text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#14B8A6]" />
              Compliance Score
            </h2>
            
            <div className="relative w-48 h-48 mt-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                <circle cx="96" cy="96" r="80" fill="none" stroke="#14B8A6" strokeWidth="12" strokeDasharray={502.6} strokeDashoffset={30.1} strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter">94</span>
                <span className="mt-1 text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.2em] bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-sm">Excellent</span>
              </div>
            </div>
          </div>

          {/* 4 METRIC CARDS */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: 'Expiring Visas', val: '12', icon: Clock, cBadge: 'bg-slate-100 text-[#0F172A]', cVal: 'text-[#0F172A]' },
              { label: 'Unused CoS', val: '08', icon: FileCheck, cBadge: 'bg-teal-50 text-[#14B8A6]', cVal: 'text-[#0F172A]' },
              { label: 'SA Verifications', val: '142', icon: Activity, cBadge: 'bg-slate-100 text-[#0F172A]', cVal: 'text-[#0F172A]' },
              { label: 'Overdue Duties', val: '03', icon: AlertCircle, cBadge: 'bg-red-50 text-red-600 border border-red-100', cVal: 'text-red-600' },
            ].map((metric, i) => (
              <div key={metric.label} className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between hover:border-[#14B8A6]/50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-[80px] leading-relaxed">{metric.label}</span>
                  <div className={`p-2 rounded ${metric.cBadge} dark:bg-slate-800 dark:border-slate-700`}>
                    <metric.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-3xl font-black tracking-tight dark:text-white ${metric.cVal}`}>{metric.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPORT BANNER */}
        <div className="bg-[#0F172A] rounded-xl shadow-lg border border-slate-800 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ background: 'repeating-linear-gradient(45deg, #14B8A6, #14B8A6 1px, transparent 1px, transparent 10px)' }} />
          <div className="p-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-white">
              <div className="bg-white/10 p-4 rounded border border-white/20">
                <Download className="w-6 h-6 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Generate Full Audit Report</h3>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 flex items-center gap-2">
                  <Database className="w-3 h-3" /> JSON Export • Verifiable Hash Ledger
                </p>
              </div>
            </div>
            <button className="bg-white text-[#0F172A] px-6 py-3 rounded text-[11px] font-black uppercase tracking-[0.15em] hover:bg-slate-200 transition-colors w-full sm:w-auto text-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Export Audit Trail
            </button>
          </div>
        </div>

        {/* WORKERS TABLE */}
        <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0F172A]">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Active Workers & CoS Registry</h3>
            <button 
              onClick={onAddWorker}
              className="bg-[#0F172A] dark:bg-[#14B8A6] text-white px-5 py-2.5 rounded text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              + Add Worker
            </button>
          </div>
          <WorkersTable />
        </div>
      </div>

      {/* RIGHT COLUMN: Immutable Audit Trail */}
      <div className="xl:col-span-1 bg-[#0F172A] rounded-xl shadow-lg border border-slate-800 text-white flex flex-col h-[800px] xl:h-auto overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-white">
            <History className="w-4 h-4 text-[#14B8A6]" />
            Audit Trail Ledger
          </h3>
          <p className="text-[10px] text-slate-500 font-mono mt-2">Append-only cryptographic chain</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {[
            { tag: 'WORKER_ADDED', desc: 'New worker enrolled', hash: 'e4d909c290d0fb1ca' },
            { tag: 'DOCUMENT_VERIFIED', desc: 'Right to work verified', hash: 'f2a17b019ac8f7k2z' },
            { tag: 'COS_ASSIGNED', desc: 'CoS assigned to worker', hash: '8a9c0f7b6d5e4f3a2' },
            { tag: 'AUDIT_EXPORT', desc: 'Audit report generated', hash: '1b2c3d4e5f6a7b8c9' },
            { tag: 'SYSTEM_SYNC', desc: 'OISC Registry polled', hash: '9z8y7x6w5v4u3t2s1' },
          ].map((log, i) => (
            <div key={i} className="relative pl-5 before:absolute before:left-[7px] before:top-2 before:bottom-[-28px] before:w-[2px] before:bg-slate-800 last:before:hidden">
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-800 border-2 border-[#0F172A] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full" />
              </div>
              <div className="space-y-1.5 border border-slate-800 bg-slate-900/40 p-3 rounded-lg hover:border-slate-700 transition-colors cursor-default">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-[#14B8A6] font-bold bg-[#14B8A6]/10 px-1.5 py-0.5 rounded">{log.tag}</span>
                  <span className="text-slate-500">12:04:0{i} UTC</span>
                </div>
                <p className="text-[11px] font-bold leading-snug">{log.desc}</p>
                <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono pt-1">
                  <CheckCircle2 className="w-3 h-3 text-slate-600" />
                  <span>SHA: {log.hash}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
