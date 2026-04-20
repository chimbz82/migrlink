import React from 'react';
import { UploadCloud, CheckCircle, Smartphone, UserCheck, ShieldCheck } from 'lucide-react';

export default function WorkerPortalPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] p-4 font-sans">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        {/* Branding & Status */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0F172A] rounded-xl mb-4 shadow-lg">
            <ShieldCheck className="w-6 h-6 text-[#14B8A6]" />
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">Sponsorship Onboarding</h1>
          <p className="text-sm text-slate-500 px-8">MigraLink Secure Document Portal for Visa Compliance</p>
        </div>

        {/* Status Card */}
        <div className="bg-[#14B8A6] text-white p-6 rounded-2xl shadow-xl shadow-teal-900/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Application Status</span>
               <Smartphone className="w-4 h-4 opacity-50" />
            </div>
            <p className="text-3xl font-black mt-2">Active</p>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end">
              <span className="text-xs font-medium">Step: Identity Verification</span>
              <span className="text-xs font-bold">60% Complete</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-1 mt-2 rounded-full overflow-hidden">
               <div className="bg-white h-full" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Action List */}
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm border-l-4 border-l-[#14B8A6]">
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-2 rounded-lg">
                <UploadCloud className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A] dark:text-white">Upload BRP Front/Back</p>
                <p className="text-[11px] text-slate-500">Biometric Residence Permit</p>
              </div>
            </div>
            <button className="text-[10px] font-bold bg-[#0F172A] text-white px-3 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">START</button>
          </div>

          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm opacity-60">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Right to Work Consent</p>
                <p className="text-[11px]">Digital Signature Required</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-slate-200 dark:text-slate-700" />
          </div>
        </div>

        {/* Privacy Statement Footer */}
        <div className="bg-[#0F172A] text-slate-300 p-4 rounded-xl mt-6">
           <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white">Privacy Statement</p>
           <p className="text-[10px] leading-relaxed">
            Your data is strictly processed under UK GDPR and hosted on Sovereign Cloud infrastructure in the UK-South region. Biometric details are encrypted end-to-end and shared only with UKVI.
           </p>
        </div>
      </div>
    </div>
  );
}
