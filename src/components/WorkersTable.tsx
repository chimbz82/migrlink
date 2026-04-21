import React from 'react';
import { Copy } from 'lucide-react';

export default function WorkersTable() {
  const workers = [
    { name: 'SARAH CHEN', init: 'SC', cos: 'C4X-992-L81', verif: 'V-89A2K', status: 'VERIFIED', expiry: '2026-10-12' },
    { name: 'MARCUS RASHFORD', init: 'MR', cos: 'A01-882-K92', verif: 'V-01M9P', status: 'REVIEW', expiry: '2026-05-02', alert: true },
    { name: 'ELENA RODRIGUEZ', init: 'ER', cos: 'X92-110-Q33', verif: 'V-77B4L', status: 'VERIFIED', expiry: '2027-01-20' },
    { name: 'DAVID LEE', init: 'DL', cos: 'B44-210-M10', verif: 'V-32X1N', status: 'VERIFIED', expiry: '2025-11-14' },
    { name: 'MICHAEL SMITH', init: 'MS', cos: 'K14-884-X90', verif: 'V-99Q8R', status: 'VERIFIED', expiry: '2026-02-03' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse tabular-nums">
        <thead>
          <tr className="bg-[#1E293B] text-white">
            <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] border-r border-[#0F172A]">Subject Identity</th>
            <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] border-r border-[#0F172A]">CoS Allocation</th>
            <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] border-r border-[#0F172A]">Verif ID</th>
            <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] border-r border-[#0F172A]">Compliance State</th>
            <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] border-r border-[#0F172A]">Expiry Date</th>
            <th className="py-3 px-4 text-right text-[9px] font-bold uppercase tracking-[0.2em]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#0B1120]">
          {workers.map((w, i) => (
            <tr key={i} className={`border-b border-[#CBD5E1] dark:border-slate-800 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#F8FAFC] dark:bg-slate-900/30'} hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}>
              <td className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-sm bg-[#1E293B] text-white flex items-center justify-center text-[9px] font-bold shadow-inner">
                    {w.init}
                  </div>
                  <span className="text-[11px] font-bold text-[#1E293B] dark:text-white uppercase tracking-wider">{w.name}</span>
                </div>
              </td>
              <td className="py-2.5 px-4 font-mono text-[10px] text-[#1E293B] dark:text-slate-300">
                {w.cos}
              </td>
              <td className="py-2.5 px-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#0369A1] bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-sm px-1.5 py-0.5 inline-flex shadow-inner">
                  {w.verif} <Copy className="w-3 h-3 cursor-pointer hover:text-[#1E293B] transition-colors" />
                </div>
              </td>
              <td className="py-2.5 px-4">
                <div className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border rounded-sm shadow-inner ${
                  w.alert 
                    ? 'border-[#EF4444] text-[#EF4444] bg-red-50 dark:bg-[#EF4444]/10' 
                    : 'border-[#0D9488] text-[#0D9488] bg-teal-50 dark:bg-[#0D9488]/10'
                }`}>
                  {w.status}
                </div>
              </td>
              <td className="py-2.5 px-4">
                <span className="text-[10px] font-mono text-[#1E293B] dark:text-slate-300">
                  {w.expiry}
                </span>
              </td>
              <td className="py-2.5 px-4 text-right">
                <button className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#0369A1] hover:text-[#1E293B] dark:hover:text-white transition-colors underline decoration-[#0369A1]/30 underline-offset-4">
                  Open Dossier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
