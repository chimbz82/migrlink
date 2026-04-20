import React from 'react';

interface AddWorkerFormProps {
  onBack: () => void;
}

export default function AddWorkerForm({ onBack }: AddWorkerFormProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#0F172A] dark:hover:text-white transition-colors">
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-slate-50 dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Step 1: Data Entry & Capture</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">1 of 3</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#14B8A6] h-full w-1/3" />
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Form Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white animate-none">Full Legal Name</label>
              <input type="text" className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded px-3 py-2.5 text-sm font-bold text-[#0F172A] dark:text-white outline-none focus:border-[#14B8A6] transition-colors" placeholder="e.g. Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">CoS Reference #</label>
              <input type="text" className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded px-3 py-2.5 text-sm font-mono text-[#0F172A] dark:text-white outline-none focus:border-[#14B8A6] transition-colors" placeholder="XXX-000-XXX" />
            </div>
          </div>

          {/* Camera Capture Component */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Document Capture</label>
            <div className="relative w-full aspect-video bg-[#0F172A] dark:bg-black rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              
              {/* Framing Lines (Corners) */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-[3px] border-l-[3px] border-[#14B8A6]/60" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-[3px] border-r-[3px] border-[#14B8A6]/60" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-[3px] border-l-[3px] border-[#14B8A6]/60" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-[3px] border-r-[3px] border-[#14B8A6]/60" />

              <div className="flex flex-col items-center gap-4 z-10">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Awaiting Feed Initialization</span>
                <button className="bg-white text-[#0F172A] text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:bg-slate-200 transition-colors">
                  Start Capture
                </button>
              </div>

              {/* REC Standby Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="text-[10px] font-bold tracking-widest text-[#EF4444] uppercase">Rec Standby</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded transition-opacity hover:opacity-90">
              Save & Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
