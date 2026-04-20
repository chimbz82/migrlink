import React, { useState } from 'react';
import { Activity, Clock, FileCheck, AlertCircle, ShieldCheck, Download, History, Plus, FileSpreadsheet } from 'lucide-react';
import AddWorkerForm from './AddWorkerForm';
import WorkersTable from './WorkersTable';

export default function SponsorDashboard() {
  const [activeTab, setActiveTab] = useState<'form' | 'table'>('table');
  return (
    <div className="space-y-8">
      {/* Hero Section: Compliance Health */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">UKVI Compliance Score</span>
          </div>
          
          <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
              <circle cx="96" cy="96" r="88" stroke="#14B8A6" strokeWidth="12" fill="transparent" strokeDasharray={552.9} strokeDashoffset={55.3} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-[#0F172A] dark:text-white">94</span>
              <span className="text-sm font-bold text-[#14B8A6] uppercase tracking-tighter">Excellent</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500 text-center max-w-[200px]">
            Your sponsorship license is at low risk. <span className="text-[#0F172A] font-bold">4 minor tasks</span> outstanding.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Expiring Visas', val: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Unused CoS', val: '08', icon: FileCheck, color: 'text-[#14B8A6]', bg: 'bg-teal-50' },
            { label: 'SA Verifications', val: '142', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Overdue Duties', val: '03', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#0F172A] p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:border-[#14B8A6] transition-all cursor-default">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-[#0F172A] dark:text-white">{item.val}</p>
              </div>
              <div className={`p-3 rounded-lg ${item.bg} dark:bg-slate-800`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 bg-[#0F172A] dark:bg-slate-900 rounded-xl p-4 flex items-center justify-between text-white border border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-[#14B8A6] p-2 rounded">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">Generate Full Audit Report</p>
                <p className="text-[11px] opacity-60">Prepared for Home Office inspection (PDF/JSON)</p>
              </div>
            </div>
            <button className="bg-white text-[#0F172A] px-4 py-2 rounded font-bold text-xs hover:bg-[#14B8A6] hover:text-white transition-colors">
              EXPORT DATA
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#0F172A] rounded-full" />
              Active Workers & CoS Registry
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('table')}
                className={`p-2 rounded transition-colors ${activeTab === 'table' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
              >
                 <FileSpreadsheet className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('form')}
                className="bg-[#0F172A] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1 hover:opacity-90"
              >
                 <Plus className="w-3 h-3" /> ADD WORKER
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
             {activeTab === 'form' ? (
                <div className="p-4"><AddWorkerForm /></div>
             ) : (
                <WorkersTable />
             )}
          </div>
        </div>

        {/* Sidebar: Audit Log */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-4">
             <History className="w-4 h-4" />
             <h2 className="text-sm font-bold uppercase tracking-widest">Audit Trail</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-[#0F172A] p-4 rounded-lg border border-slate-200 dark:border-slate-800 relative group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-[#14B8A6] bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded">PASSED</span>
                  <span className="text-[10px] font-mono text-slate-400">12:04:0{i} UTC</span>
                </div>
                <p className="text-[11px] font-bold text-[#0F172A] dark:text-white leading-tight mb-1">Worker Document Uploaded</p>
                <p className="text-[10px] text-slate-500 font-mono break-all opacity-60 group-hover:opacity-100 transition-opacity">
                  SHA-256: 8f3c...b2e{i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
