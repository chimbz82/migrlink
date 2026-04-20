import React from 'react';
import { UploadCloud, CheckCircle, Smartphone, ShieldCheck, Lock, FileText, ChevronRight } from 'lucide-react';

export default function WorkerPortal() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] p-4 sm:p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-sm space-y-6 pt-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-12 h-12 bg-[#0F172A] dark:bg-white rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#14B8A6] dark:text-[#0F172A]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Onboarding Portal</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Ref: 994-XXL</p>
          </div>
        </div>

        {/* Primary Status Card */}
        <div className="bg-[#0F172A] text-white p-6 rounded-lg relative overflow-hidden shadow-lg border border-slate-800">
           <div className="absolute right-0 top-0 w-32 h-32 bg-[#14B8A6]/10 rounded-bl-full pointer-events-none" />
           <div className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">Active File</span>
              <Smartphone className="w-4 h-4 text-slate-400" />
           </div>
           
           <div className="mt-6 mb-2 relative z-10">
              <p className="text-sm font-bold text-slate-300">Identity Verification</p>
              <div className="flex justify-between items-end mt-1">
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest">Required Action</p>
                 <span className="text-xl font-black">60%</span>
              </div>
           </div>
           
           <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2 relative z-10">
              <div className="bg-[#14B8A6] h-full transition-all duration-1000" style={{ width: '60%' }} />
           </div>
        </div>

        {/* Action List */}
        <h3 className="text-[11px] font-black text-[#0F172A] dark:text-white uppercase tracking-widest pt-2 border-b border-slate-200 dark:border-slate-800 pb-2">Pending Requirements</h3>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm border-l-4 border-l-[#14B8A6] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-sm border border-slate-100 dark:border-slate-800">
                <UploadCloud className="w-4 h-4 text-[#14B8A6]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A] dark:text-white">ID Image Upload</p>
                <p className="text-[10px] text-slate-500">Biometric Permit (Front/Back)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-white dark:bg-[#0F172A] p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm opacity-60">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-sm border border-slate-100 dark:border-slate-800">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A] dark:text-white line-through decoration-slate-300">Right to Work Consent</p>
                <p className="text-[10px] text-[#14B8A6] font-bold uppercase tracking-wider">Signed & Verified</p>
              </div>
            </div>
            <CheckCircle className="w-4 h-4 text-[#14B8A6]" />
          </div>
        </div>

        {/* Data Access Button */}
        <button className="w-full mt-4 py-3 bg-transparent border border-slate-200 dark:border-slate-800 rounded text-[10px] font-black tracking-[0.15em] text-[#0F172A] dark:text-white uppercase flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
           <Lock className="w-3 h-3 text-slate-400" /> Subject Access Request (DSAR)
        </button>

        {/* Institutional Trust Footer */}
        <div className="pt-8 text-center px-4">
           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.25em] mb-3">Institutional Security</p>
           <p className="text-[10px] text-slate-500 leading-relaxed max-w-[280px] mx-auto border-t border-slate-200 dark:border-slate-800 pt-4">
            System processed under UK GDPR.<br/>Hosted on Sovereign Cloud infrastructure in the UK-South region. Records are immutable.
           </p>
        </div>
      </div>
    </div>
  );
}
