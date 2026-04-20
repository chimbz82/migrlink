import React from 'react';

export default function WorkersTable() {
  const workers = [
    { name: 'Sarah Chen', init: 'SC', cos: 'C4X-992-L81', status: 'Compliant', expiry: '12 Oct 2026' },
    { name: 'Marcus Rashford', init: 'MR', cos: 'A01-882-K92', status: 'Review Required', expiry: '02 May 2026', alert: true },
    { name: 'Elena Rodriguez', init: 'ER', cos: 'X92-110-Q33', status: 'Compliant', expiry: '20 Jan 2027' },
    { name: 'David Lee', init: 'DL', cos: 'B44-210-M10', status: 'Compliant', expiry: '14 Nov 2025' },
    { name: 'Michael Smith', init: 'MS', cos: 'K14-884-X90', status: 'Compliant', expiry: '03 Feb 2026' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Worker Identity</th>
            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">CoS Reference</th>
            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Compliance Status</th>
            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Visa Expiry</th>
            <th className="py-4 px-6 text-right text-[10px] font-bold uppercase tracking-widest text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#0F172A]">
          {workers.map((w, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <td className="py-3 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white flex items-center justify-center text-[11px] font-bold tracking-wider">
                    {w.init}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A] dark:text-white">{w.name}</span>
                </div>
              </td>
              <td className="py-3 px-6">
                <span className="font-mono text-[11px] text-[#0F172A] dark:text-slate-300">
                  {w.cos}
                </span>
              </td>
              <td className="py-3 px-6">
                <div className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                  w.alert 
                    ? 'bg-red-50 dark:bg-[#EF4444]/10 text-[#EF4444]' 
                    : 'bg-teal-50 dark:bg-[#14B8A6]/10 text-[#14B8A6]'
                }`}>
                  {w.status}
                </div>
              </td>
              <td className="py-3 px-6">
                <span className="text-[11px] font-bold text-[#0F172A] dark:text-white">
                  {w.expiry}
                </span>
              </td>
              <td className="py-3 px-6 text-right">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white hover:text-[#14B8A6] dark:hover:text-[#14B8A6] transition-colors">
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
