import React from 'react';
import { MoreHorizontal, BadgeCheck, AlertTriangle } from 'lucide-react';

export default function WorkersTable() {
  const workers = [
    { name: 'Sarah Chen', cos: 'C4X-992-L', status: 'Compliant', expiry: '12 Oct 2026', type: 'Skilled Worker' },
    { name: 'Marcus Rashford', cos: 'A01-882-K', status: 'Review Required', expiry: '02 May 2026', type: 'Senior Talent' },
    { name: 'Elena Rodriguez', cos: 'X92-110-Q', status: 'Compliant', expiry: '20 Jan 2027', type: 'Skilled Worker' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <th className="text-left p-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Worker Detail</th>
            <th className="text-left p-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">CoS Reference</th>
            <th className="text-left p-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Compliance Status</th>
            <th className="text-left p-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Visa Expiry</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {workers.map((worker) => (
            <tr key={worker.cos} className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A] dark:text-white">{worker.name}</p>
                    <p className="text-[10px] text-slate-500">{worker.type}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">{worker.cos}</td>
              <td className="p-4">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                  worker.status === 'Compliant' ? 'bg-teal-50 text-[#14B8A6] border border-teal-100 dark:bg-teal-900/40 dark:border-teal-800' : 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800'
                }`}>
                  {worker.status === 'Compliant' ? <BadgeCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {worker.status}
                </div>
              </td>
              <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-400">{worker.expiry}</td>
              <td className="p-4 text-right">
                <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
