import React from 'react';

export default function WorkerPortal() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans text-[#0F172A] dark:text-slate-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-sm space-y-8 mt-4 sm:mt-12 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">MigraLink Portal</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Session ID: 994-XXL</p>
        </div>

        {/* Clearance Status Card */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-[14px] font-bold tracking-tight text-[#0F172A] dark:text-white">Identity Verification</h2>
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#14B8A6]">
              60% Complete
            </div>
          </div>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-[#14B8A6] h-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl p-4 flex items-center justify-between transition-opacity hover:opacity-90">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest">Upload Documents</span>
            </div>
          </button>

          <button className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 rounded-xl p-4 flex items-center justify-between cursor-not-allowed">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Right to Work Consent</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <button className="w-full bg-transparent border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-300 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-widest">Subject Access Request</span>
          </button>
        </div>

      </div>
    </div>
  );
}
