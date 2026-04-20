import React from 'react';
import { BadgeCheck, AlertTriangle, FileText } from 'lucide-react';

export default function WorkersTable() {
  const workers = [
    { name: 'Sarah Chen', cos: 'C4X-992-L', status: 'Compliant', expiry: '12 Oct 2026', type: 'Skilled Worker' },
    { name: 'Marcus Rashford', cos: 'A01-882-K', status: 'Review Required', expiry: '02 May 2026', type: 'Senior Talent' },
    { name: 'Elena Rodriguez', cos: 'X92-110-Q', status: 'Compliant', expiry: '20 Jan 2027', type: 'Skilled Worker' },
    { name: 'David Lee', cos: 'B44-210-M', status: 'Compliant', expiry: '14 Nov 2025', type: 'Skilled Worker' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Legal Name</th>
            <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">CoS Reference</th>
            <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">System Status</th>
            <th className="text-left py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Right to Work Expiry</th>
            <th className="py-3 px-4 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {workers.map((worker) => (
            <tr key={worker.cos} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-sm bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center text-[10px] font-bold border border-slate-200 dark:border-slate-700">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white">{worker.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700">
                  <FileText className="w-3 h-3 text-slate-400" />
                  {worker.cos}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                  worker.status === 'Compliant' ? 'bg-teal-50 text-[#14B8A6] border border-teal-100 dark:bg-teal-900/20 dark:border-teal-800/50' : 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-800/50'
                }`}>
                  {worker.status === 'Compliant' ? <BadgeCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {worker.status}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 font-mono tracking-tight">{worker.expiry}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#14B8A6] hover:text-[#0F172A] dark:hover:text-white transition-colors">
                  View Record
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
