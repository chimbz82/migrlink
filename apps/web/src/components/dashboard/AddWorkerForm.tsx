import React from 'react';
import { Camera, Shield, Lock } from 'lucide-react';

export default function AddWorkerForm() {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mt-8">
      {/* Progress Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-4">
           {[1, 2, 3].map((step) => (
             <div key={step} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {step}
                </div>
                <div className={`h-1 w-8 rounded ${step === 1 ? 'bg-[#0F172A] dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'}`} />
             </div>
           ))}
        </div>
        <span className="text-[10px] font-bold text-[#14B8A6] flex items-center gap-1">
          <Shield className="w-3 h-3" /> SECURE ENROLLMENT
        </span>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">Identity Verification</h3>
          <p className="text-sm text-slate-500">Capture the worker's Right to Work documents via secure uplink.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name (as on Passport)</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#14B8A6] transition-all outline-none" placeholder="e.g. Alexander Hamilton" />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Certificate of Sponsorship (CoS)</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm font-mono" placeholder="C4X 8821 902 L" />
          </div>
        </div>

        {/* Camera Component Styling */}
        <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-[#14B8A6] transition-all group cursor-pointer relative overflow-hidden">
           <Camera className="w-12 h-12 text-slate-600 group-hover:text-[#14B8A6] transition-colors z-10" />
           <p className="mt-4 text-xs font-bold text-slate-400 group-hover:text-white z-10 relative">ACTIVATE SECURE CAMERA CAPTURE</p>
           {/* Scanlines pseudo-element */}
           <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }} />
           <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">REC STANDBY</span>
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Data encrypted with AES-256 for OISC compliance.
          </p>
          <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
            CONTINUE TO STEP 2
          </button>
        </div>
      </div>
    </div>
  );
}
