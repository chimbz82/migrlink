import React from 'react';
import { Camera, Lock, ChevronLeft, ShieldAlert } from 'lucide-react';

interface AddWorkerFormProps {
  onBack: () => void;
}

export default function AddWorkerForm({ onBack }: AddWorkerFormProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mt-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="bg-[#0F172A] p-4 text-white flex items-center justify-between border-b border-slate-800">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Institutional Enrollment Protocol</h2>
         </div>
         <div className="flex items-center gap-1.5 px-2 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded text-[9px] font-bold uppercase tracking-widest text-[#14B8A6]">
            <Lock className="w-3 h-3" /> AES-256 Secured
         </div>
      </div>

      <div className="p-8 md:p-10 space-y-10">
        {/* Step Indicator */}
        <div className="flex justify-between items-center relative">
           <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-100 dark:bg-slate-800 -z-10" />
           {['Identity Proofing', 'Biometric Capture', 'Consent Signoff'].map((step, i) => (
             <div key={step} className="flex flex-col items-center gap-3 bg-white dark:bg-[#0F172A] px-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${i === 0 ? 'border-[#14B8A6] bg-[#14B8A6] text-white' : 'border-slate-200 text-slate-400 dark:border-slate-700 bg-white dark:bg-[#0F172A]'}`}>
                  {i + 1}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${i === 0 ? 'text-[#0F172A] dark:text-white' : 'text-slate-400'}`}>
                  {step}
                </span>
             </div>
           ))}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal Full Name (MRZ Match)</label>
              <input className="w-full bg-[#F8FAFC] dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-md p-3.5 text-sm font-bold focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all outline-none" placeholder="First Last" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Certificate of Sponsorship</label>
              <input className="w-full bg-[#F8FAFC] dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-md p-3.5 text-sm font-mono focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all outline-none" placeholder="XXX-000-000-X" />
            </div>
          </div>

          <div className="space-y-2.5 pt-4">
             <label className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-[#14B8A6]" /> Biometric Verification Uplink
             </label>
             <div className="aspect-video bg-[#0F172A] rounded-lg border-2 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#14B8A6]/50 transition-colors">
               
               {/* Terminal Overlay */}
               <div className="absolute inset-0 bg-[#020617]/50" />
               <div className="absolute inset-0 opacity-30" style={{ background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)' }} />
               
               <Camera className="w-12 h-12 text-slate-500 group-hover:text-[#14B8A6] transition-colors z-10 mb-4" />
               <button className="z-10 bg-[#14B8A6] text-white px-5 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#0F172A] transition-colors">
                 Initialize Camera Array
               </button>
               
               <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse border border-red-800" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em]">Standby</span>
               </div>
               <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  End-to-End Encrypted
               </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
          <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-10 py-3.5 rounded text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-opacity">
            Proceed to Step 2
          </button>
        </div>
      </div>
    </div>
  );
}
