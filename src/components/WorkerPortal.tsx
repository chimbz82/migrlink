import React from 'react';
import { Lock, FileText, UploadCloud, CheckSquare } from 'lucide-react';

export default function WorkerPortal() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#020617] font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md shadow-2xl animate-in fade-in duration-300">
        
        {/* Certificate / Official Header */}
        <div className="bg-[#1E293B] text-white p-6 border-b-4 border-[#0369A1] rounded-t-sm shadow-inner text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 10px)' }} />
          <div className="relative z-10 space-y-2">
            <h1 className="text-[16px] font-black tracking-widest uppercase text-white">Migration Authority Link</h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-300 bg-black/30 inline-block px-2 py-0.5 rounded-sm border border-white/10">Official Registration Portal</p>
          </div>
        </div>

        {/* Main Body */}
        <div className="bg-white dark:bg-[#0B1120] border-x border-b border-[#CBD5E1] dark:border-slate-800 p-8 rounded-b-sm shadow-sm space-y-8">
          
          <div className="text-center space-y-1 pb-6 border-b border-[#CBD5E1] dark:border-slate-800 border-dashed">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status Inquiry</p>
            <h2 className="text-2xl font-black text-[#1E293B] dark:text-white uppercase tracking-tight">Pending Review</h2>
            <p className="text-[11px] text-[#0369A1] font-bold uppercase tracking-widest mt-2">60.00% Cleared</p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 p-4 rounded-sm shadow-inner flex items-center justify-between group cursor-pointer hover:border-[#0369A1] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-600 rounded-sm shadow-sm text-[#0369A1]">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-white">Submit Identity Scan</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5">Required for processing</p>
                </div>
              </div>
              <button className="bg-[#1E293B] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-sm group-hover:bg-[#0369A1] transition-colors">Action</button>
            </div>

            <div className="bg-[#F1F5F9] dark:bg-black/50 border border-[#CBD5E1] dark:border-slate-800 p-4 rounded-sm flex items-center justify-between opacity-70">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 rounded-sm text-slate-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 line-through">Consent Authorization</p>
                  <p className="text-[9px] text-[#0D9488] font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                    <CheckSquare className="w-3 h-3" /> Digitally Signed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Footer */}
          <div className="pt-6 flex flex-col gap-4">
            <button className="w-full bg-white dark:bg-[#0B1120] border-2 border-[#1E293B] dark:border-slate-600 text-[#1E293B] dark:text-white rounded-sm py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-sm flex items-center justify-center gap-2">
              <Lock className="w-3 h-3 text-[#1E293B] dark:text-slate-400" /> Secure Logout
            </button>
            
            <div className="text-center">
              <p className="text-[9px] font-mono text-slate-400 uppercase">Session ID: 994-XXL-881</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
