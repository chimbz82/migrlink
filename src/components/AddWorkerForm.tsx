import React from 'react';
import { Camera, Shield, Lock, ChevronLeft, ScanLine } from 'lucide-react';

interface AddWorkerFormProps {
  onBack: () => void;
}

export default function AddWorkerForm({ onBack }: AddWorkerFormProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F172A] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mt-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-[#0F172A] p-4 text-white rounded-t-lg flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold uppercase tracking-widest">Enroll New Record</h2>
         </div>
         <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded text-[9px] font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3 text-[#14B8A6]" /> Auth Verified
         </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Step Indicator */}
        <div className="flex justify-between items-center px-4">
           {[1, 2, 3].map((step) => (
             <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-2">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === 1 ? 'border-[#14B8A6] text-[#14B8A6]' : 'border-slate-200 text-slate-400 dark:border-slate-700'}`}>
                     {step}
                   </div>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${step === 1 ? 'text-[#0F172A] dark:text-white' : 'text-slate-400'}`}>
                      {step === 1 ? 'Identity' : step === 2 ? 'Documents' : 'Consent'}
                   </span>
                </div>
                {step !== 3 && <div className="flex-1 h-[2px] bg-slate-100 dark:bg-slate-800 mx-4 -mt-5" />}
             </React.Fragment>
           ))}
        </div>

        <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white">Legal Full Name</label>
              <input className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-sm p-3 text-sm focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all outline-none" placeholder="Per Official ID" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white">System Ref (CoS)</label>
              <input className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm p-3 text-sm font-mono focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all outline-none" placeholder="XXX 0000 000 X" />
            </div>
          </div>

          {/* Institutional Camera Block */}
          <div className="space-y-2 pt-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white flex items-center gap-2">
                <ScanLine className="w-3 h-3 text-[#14B8A6]" /> Secure Feed Uplink
             </label>
             <div className="aspect-video bg-[#020617] rounded-sm flex flex-col items-center justify-center border-2 border-slate-800 hover:border-[#14B8A6]/50 transition-all cursor-pointer relative overflow-hidden group">
               <Camera className="w-10 h-10 text-slate-600 group-hover:text-white transition-colors z-10 mb-3" />
               <p className="text-[10px] font-mono text-slate-400 group-hover:text-white z-10 transition-colors uppercase tracking-[0.2em] bg-black/50 px-3 py-1 rounded">Initialize Frame Capture</p>
               
               {/* Technical Scanlines */}
               <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />
               <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.2), transparent, rgba(20, 184, 166, 0.2))' }} />
               
               <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">OFFLINE</span>
               </div>
               <div className="absolute top-3 right-3 text-[8px] font-mono text-slate-500">1080P/Encrypted</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-300" /> AES-256 Transport
          </p>
          <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-6 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-[0.15em] hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
