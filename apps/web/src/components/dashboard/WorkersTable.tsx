'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, BadgeCheck, MoreHorizontal } from 'lucide-react';

const WORKERS = [
  { name: 'Sarah Chen', role: 'Skilled Worker', cos: 'C4X-992-L', verificationId: 'UKVI-2024-0042', status: 'Compliant', expiry: '12 Oct 2026' },
  { name: 'Marcus Rashford', role: 'Senior Talent', cos: 'A01-882-K', verificationId: 'UKVI-2024-0017', status: 'Review Required', expiry: '02 May 2026' },
  { name: 'Elena Rodriguez', role: 'Skilled Worker', cos: 'X92-110-Q', verificationId: 'UKVI-2024-0039', status: 'Compliant', expiry: '20 Jan 2027' },
  { name: 'James Okonkwo', role: 'Skilled Worker', cos: 'B77-341-M', verificationId: 'UKVI-2024-0051', status: 'Compliant', expiry: '05 Sep 2026' },
  { name: 'Priya Sharma', role: 'Senior Talent', cos: 'D93-115-A', verificationId: 'UKVI-2024-0008', status: 'Expired', expiry: '01 Mar 2026' },
];

function CopyCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="flex items-center gap-1.5" style={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
      <span style={{ fontSize: '10px', color: '#334155' }}>{value}</span>
      <button
        onClick={handleCopy}
        title="Copy Verification ID"
        style={{
          padding: '1px 4px',
          border: '1px solid #CBD5E1',
          background: copied ? '#F0FDFA' : '#F8FAFC',
          cursor: 'pointer',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {copied
          ? <Check size={9} style={{ color: '#0D9488' }} />
          : <Copy size={9} style={{ color: '#94A3B8' }} />
        }
      </button>
    </div>
  );
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }> = {
  'Compliant': { label: 'COMPLIANT', color: '#065F46', bg: '#ECFDF5', border: '#6EE7B7', icon: BadgeCheck },
  'Review Required': { label: 'REVIEW', color: '#92400E', bg: '#FFFBEB', border: '#FCD34D', icon: AlertTriangle },
  'Expired': { label: 'EXPIRED', color: '#991B1B', bg: '#FFF1F2', border: '#FCA5A5', icon: AlertTriangle },
};

export default function WorkersTable() {
  return (
    <div className="w-full overflow-x-auto" style={{ fontVariantNumeric: 'tabular-nums' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: '#1E293B' }}>
            {['#', 'WORKER', 'CoS REFERENCE', 'VERIFICATION ID', 'STATUS', 'VISA EXPIRY', ''].map((h, i) => (
              <th
                key={i}
                style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#94A3B8',
                  borderRight: i < 6 ? '1px solid #334155' : 'none',
                  borderBottom: '2px solid #0369A1',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WORKERS.map((worker, i) => {
            const cfg = STATUS_CONFIG[worker.status] ?? STATUS_CONFIG['Review Required'];
            const StatusIcon = cfg.icon;
            const isEven = i % 2 === 0;
            return (
              <tr
                key={worker.cos}
                style={{
                  background: isEven ? '#FFFFFF' : '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                }}
              >
                {/* Row Number */}
                <td style={{ padding: '8px 12px', fontSize: '9px', color: '#94A3B8', fontFamily: 'monospace', borderRight: '1px solid #E2E8F0', width: '36px' }}>
                  {String(i + 1).padStart(2, '0')}
                </td>
                {/* Worker */}
                <td style={{ padding: '8px 12px', borderRight: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        background: '#1E293B',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    >
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>{worker.name}</div>
                      <div style={{ fontSize: '9px', color: '#94A3B8', letterSpacing: '0.04em' }}>{worker.role.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                {/* CoS */}
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#334155', borderRight: '1px solid #E2E8F0', letterSpacing: '0.05em' }}>
                  {worker.cos}
                </td>
                {/* Verification ID */}
                <td style={{ padding: '8px 12px', borderRight: '1px solid #E2E8F0' }}>
                  <CopyCell value={worker.verificationId} />
                </td>
                {/* Status Pill */}
                <td style={{ padding: '8px 12px', borderRight: '1px solid #E2E8F0' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      fontSize: '9px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: cfg.color,
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      borderRadius: '2px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <StatusIcon size={9} style={{ color: cfg.color }} />
                    {cfg.label}
                  </span>
                </td>
                {/* Expiry */}
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#334155', fontFamily: 'monospace', borderRight: '1px solid #E2E8F0', fontVariantNumeric: 'tabular-nums' }}>
                  {worker.expiry}
                </td>
                {/* Actions */}
                <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                  <button
                    style={{
                      padding: '3px 6px',
                      border: '1px solid #E2E8F0',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderRadius: '2px',
                    }}
                  >
                    <MoreHorizontal size={13} style={{ color: '#94A3B8' }} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


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
