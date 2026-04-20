import React from 'react';
import { UploadCloud, CheckCircle, ShieldCheck, Lock, Database, ArrowRight } from 'lucide-react';

export default function WorkerPortal() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 p-4 sm:p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-sm space-y-6 pt-8">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-10">
          <div className="mx-auto w-14 h-14 bg-[#0F172A] dark:bg-white rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7 text-[#14B8A6] dark:text-[#0F172A]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">MigraLink Portal</h1>
            <p className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-[0.25em]">Session ID: 899-XQ-L</p>
          </div>
        </div>

        {/* Status Gauge */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0F172A] dark:text-white">Clearance Status</span>
              <span className="text-[10px] font-mono font-bold text-[#14B8A6] bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded">60%</span>
           </div>
           
           <div className="mt-8 flex justify-between items-end">
              <p className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Identity Verification</p>
           </div>
           
           <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#14B8A6] h-full" style={{ width: '60%' }} />
           </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 pt-4">
          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 shadow-lg cursor-pointer hover:bg-slate-900 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded border border-white/20">
                  <UploadCloud className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Upload Documents</p>
                  <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">BRP Front & Back Scan</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-xl border border-slate-200 dark:border-slate-800 opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                  <CheckCircle className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A] dark:text-white line-through decoration-slate-300">Right to Work Consent</p>
                  <p className="text-[10px] text-[#14B8A6] font-bold uppercase tracking-widest mt-1">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Center / DSAR */}
        <div className="pt-8">
          <button className="w-full py-4 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black tracking-[0.2em] text-[#0F172A] dark:text-white uppercase flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-colors">
            <Lock className="w-3 h-3 text-[#14B8A6]" /> Subject Access Request
          </button>
          
          <div className="mt-8 flex flex-col items-center gap-3">
             <Database className="w-4 h-4 text-slate-400" />
             <p className="text-[10px] text-center text-slate-500 leading-relaxed font-medium max-w-[250px]">
              Processed over secure uplink.<br/>By continuing, you agree to our UK GDPR Policy and Sovereign Cloud processing.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
