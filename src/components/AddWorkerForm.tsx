import React from 'react';

interface AddWorkerFormProps {
  onBack: () => void;
}

export default function AddWorkerForm({ onBack }: AddWorkerFormProps) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <div className="mb-4">
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#1E293B] dark:hover:text-white transition-colors underline decoration-slate-300 underline-offset-4">
          &lt; Return to Command Grid
        </button>
      </div>

      <div className="bg-white dark:bg-[#0B1120] border border-[#CBD5E1] dark:border-slate-800 rounded-sm border-t-2 border-t-[#1E293B] shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        
        {/* Left Pane: Data Entry */}
        <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#CBD5E1] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/30 flex flex-col">
          <div className="mb-8">
            <h2 className="text-[14px] font-black uppercase tracking-widest text-[#1E293B] dark:text-white border-b border-[#CBD5E1] dark:border-slate-800 pb-2">Subject Intake Form</h2>
            <p className="text-[10px] uppercase font-mono text-slate-500 mt-2">Stage 1: Identity Matrix</p>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-slate-300">Legal Identifier (MRZ)</label>
              <input type="text" className="w-full bg-white dark:bg-[#0B1120] border border-[#CBD5E1] dark:border-slate-700 shadow-inner rounded-sm px-3 py-2 text-[11px] font-bold uppercase text-[#1E293B] dark:text-white outline-none focus:border-[#0369A1] transition-colors tabular-nums" placeholder="LAST NAME, FIRST NAME" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1E293B] dark:text-slate-300">CoS Registration code</label>
              <input type="text" className="w-full bg-white dark:bg-[#0B1120] border border-[#CBD5E1] dark:border-slate-700 shadow-inner rounded-sm px-3 py-2 text-[11px] font-mono text-[#1E293B] dark:text-white outline-none focus:border-[#0369A1] uppercase transition-colors" placeholder="XXX-000-XXX" />
            </div>
            
            <div className="p-3 bg-[#E0F2FE] dark:bg-[#0369A1]/10 border border-[#BAE6FD] dark:border-[#0369A1]/30 rounded-sm">
               <p className="text-[9px] font-bold uppercase tracking-widest text-[#0369A1]">Guidance Notice</p>
               <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">Please direct the subject to align primary identity document within the scanner perimeter. MRZ capture is automatic.</p>
            </div>
          </div>

          <div className="pt-6 mt-auto flex gap-3">
             <button className="flex-1 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#1E293B] dark:text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
               Cancel
             </button>
             <button className="flex-1 bg-[#1E293B] text-white border border-[#1E293B] text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-sm shadow-md hover:bg-[#0F172A] transition-colors">
               Commit Record
             </button>
          </div>
        </div>

        {/* Right Pane: Camera Scanner */}
        <div className="flex-1 p-6 md:p-8 bg-[#E2E8F0] dark:bg-black relative flex flex-col shadow-inner">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 drop-shadow-sm">Optical Feed</h3>
           
           <div className="flex-1 bg-[#0B1120] border-2 border-[#1E293B] rounded-sm relative overflow-hidden shadow-2xl flex items-center justify-center">
             
             {/* Central Crosshairs */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[60%] border border-[#0D9488]/40 border-dashed" />
                <div className="absolute w-[2px] h-[20px] bg-[#0D9488]/80" />
                <div className="absolute w-[20px] h-[2px] bg-[#0D9488]/80" />
             </div>

             {/* Scanning Animation Header */}
             <div className="absolute top-4 w-full text-center">
                <span className="text-[10px] font-mono tracking-widest text-[#0D9488] animate-pulse bg-black/50 px-2 py-0.5 uppercase border border-[#0D9488]/30">OCR Scanning Active...</span>
             </div>

             {/* Corner Framing */}
             <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#0D9488]/60" />
             <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#0D9488]/60" />
             <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#0D9488]/60" />
             <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#0D9488]/60" />
             
           </div>
        </div>

      </div>
    </div>
  );
}
