import React from 'react';
import { BadgeCheck, AlertTriangle } from 'lucide-react';

export default function WorkersTable() {
  const workers = [
    { name: 'Sarah Chen', init: 'SC', cos: 'C4X-992-L81', status: 'Compliant', expiry: '12 Oct 2026', type: 'Skilled Worker' },
    { name: 'Marcus Rashford', init: 'MR', cos: 'A01-882-K92', status: 'Review Required', expiry: '02 May 2026', type: 'Senior Talent' },
    { name: 'Elena Rodriguez', init: 'ER', cos: 'X92-110-Q33', status: 'Compliant', expiry: '20 Jan 2027', type: 'Skilled Worker' },
    { name: 'David Lee', init: 'DL', cos: 'B44-210-M10', status: 'Compliant', expiry: '14 Nov 2025', type: 'Skilled Worker' },
    { name: 'Aisha Patel', init: 'AP', cos: 'P71-922-V88', status: 'Compliant', expiry: '30 Aug 2026', type: 'Skilled Worker' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
            <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Worker Identity</th>
            <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">CoS Reference</th>
            <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Compliance Status</th>
            <th className="text-left py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Visa Expiry</th>
            <th className="text-right py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#0F172A]">
          {workers.map((worker) => (
            <tr key={worker.cos} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded bg-[#F1F5F9] dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center text-xs font-black border border-slate-200 dark:border-slate-700">
                    {worker.init}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A] dark:text-white">{worker.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">{worker.type}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                  {worker.cos}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[10px] font-black uppercase tracking-widest ${
                  worker.status === 'Compliant' 
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-[#14B8A6] border border-teal-100 dark:border-teal-800' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-800'
                }`}>
                  {worker.status === 'Compliant' ? <BadgeCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {worker.status}
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 font-mono">
                  {worker.expiry}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
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
