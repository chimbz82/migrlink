import React from 'react';
import { Activity, Clock, FileCheck, AlertCircle, Download, TrendingUp } from 'lucide-react';
import WorkersTable from '../../components/dashboard/WorkersTable';

const STATS = [
  { label: 'EXPIRING VISAS', val: '12', delta: '+2', icon: Clock, accent: '#B45309', bg: '#FEF3C7', border: '#FDE68A' },
  { label: 'UNUSED COS', val: '08', delta: '0', icon: FileCheck, accent: '#0D9488', bg: '#F0FDFA', border: '#99F6E4' },
  { label: 'SA VERIFICATIONS', val: '142', delta: '+5', icon: Activity, accent: '#0369A1', bg: '#EFF6FF', border: '#BFDBFE' },
  { label: 'OVERDUE DUTIES', val: '03', delta: '-1', icon: AlertCircle, accent: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

const AUDIT_LOG = [
  { code: 'OK', color: '#0D9488', time: '14:02:41', msg: 'Document hash verified', ref: 'WRK-0042 · SHA-256: 8f3c1a2b…e6f7g8h9' },
  { code: 'SYNC', color: '#0369A1', time: '14:01:18', msg: 'CoS registry synchronised', ref: 'C4X-992-L → UKVI API v3' },
  { code: 'WARN', color: '#B45309', time: '13:58:03', msg: 'Visa expiry T-30 threshold', ref: 'WRK-0017 · Marcus Rashford' },
  { code: 'OK', color: '#0D9488', time: '13:55:47', msg: 'Right to Work consent signed', ref: 'WRK-0039 · Elena Rodriguez' },
  { code: 'OK', color: '#0D9488', time: '13:50:22', msg: 'BRP front/back OCR passed', ref: 'WRK-0041 · Confidence: 99.3%' },
  { code: 'ERR', color: '#DC2626', time: '13:44:09', msg: 'Overdue SMS duty reminder', ref: 'WRK-0008 · 3rd attempt failed' },
  { code: 'SYNC', color: '#0369A1', time: '13:41:55', msg: 'Audit chain block appended', ref: 'BLOCK #1042 · prev: 7a3d9c1f…' },
];

export default function SponsorDashboardPage() {
  const scorePercent = 94.0;
  const barWidth = `${scorePercent}%`;

  return (
    <div className="space-y-4">

      {/* ── Command Grid Row 1: Score + Stats ── */}
      <div
        className="grid border"
        style={{
          gridTemplateColumns: '260px 1fr',
          borderColor: '#CBD5E1',
          background: '#FFFFFF',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        {/* Health Score Panel */}
        <div
          className="p-4 border-r flex flex-col justify-between"
          style={{ borderColor: '#CBD5E1' }}
        >
          <div>
            <div
              style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#64748B' }}
            >
              UKVI COMPLIANCE INDEX
            </div>
            <div
              className="mt-3 flex items-end gap-2"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              <span style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1, color: '#1E293B' }}>
                {scorePercent.toFixed(2)}
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>%</span>
            </div>
            <div
              style={{ fontSize: '10px', fontWeight: 700, color: '#0D9488', letterSpacing: '0.08em', marginTop: '2px' }}
            >
              ▲ EXCELLENT STANDING
            </div>
          </div>

          {/* Status Bar Gauge */}
          <div className="mt-4">
            <div className="flex justify-between mb-1" style={{ fontSize: '9px', color: '#94A3B8', fontVariantNumeric: 'tabular-nums' }}>
              <span>0</span><span>50</span><span>100</span>
            </div>
            <div
              className="w-full relative"
              style={{ height: '12px', background: '#E2E8F0', border: '1px solid #CBD5E1', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
            >
              <div
                style={{
                  width: barWidth,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0D9488 0%, #0369A1 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              />
              {/* Needle tick */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: barWidth,
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: '20px',
                  background: '#1E293B',
                }}
              />
            </div>
            <div className="mt-2" style={{ fontSize: '9px', color: '#94A3B8' }}>
              4 minor tasks outstanding
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((item, i) => (
            <div
              key={item.label}
              className="p-4 flex flex-col justify-between"
              style={{
                borderRight: i < STATS.length - 1 ? `1px solid #CBD5E1` : 'none',
                borderBottom: 'none',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#64748B' }}>
                  {item.label}
                </span>
                <item.icon size={13} style={{ color: item.accent }} />
              </div>
              <div style={{ fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1, color: '#1E293B' }}>
                  {item.val}
                </span>
              </div>
              <div
                className="mt-2 flex items-center gap-1"
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  color: item.delta.startsWith('+') ? '#0D9488' : item.delta.startsWith('-') ? '#DC2626' : '#94A3B8',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <TrendingUp size={9} />
                <span>{item.delta !== '0' ? item.delta : '—'} vs last period</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Export Action Bar ── */}
      <div
        className="flex items-center justify-between px-4 py-2 border"
        style={{ background: '#1E293B', borderColor: '#334155' }}
      >
        <div className="flex items-center gap-3">
          <Download size={13} className="text-[#94A3B8]" />
          <span style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '0.05em' }}>
            AUDIT EXPORT — PDF / JSON — Prepared for Home Office inspection
          </span>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-1.5 border border-[#0369A1] hover:bg-[#0369A1] transition-colors"
          style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7DD3FC', borderRadius: '2px' }}
        >
          <Download size={11} />
          EXPORT DATA
        </button>
      </div>

      {/* ── Main Content: Workers Table + Audit Log ── */}
      <div
        className="grid border"
        style={{ gridTemplateColumns: '1fr 340px', borderColor: '#CBD5E1' }}
      >
        {/* Workers Table Panel */}
        <div className="border-r" style={{ borderColor: '#CBD5E1' }}>
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ background: '#1E293B', borderColor: '#334155' }}
          >
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#E2E8F0' }}>
              ACTIVE WORKERS & CoS REGISTRY
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter by CAS / Name…"
                style={{
                  fontSize: '10px',
                  padding: '3px 8px',
                  background: '#334155',
                  border: '1px solid #475569',
                  color: '#CBD5E1',
                  outline: 'none',
                  borderRadius: '2px',
                  width: '180px',
                  fontFamily: 'monospace',
                }}
              />
              <button
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 12px',
                  background: '#0369A1',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                + ADD WORKER
              </button>
            </div>
          </div>
          <div style={{ background: '#FFFFFF' }}>
            <WorkersTable />
          </div>
        </div>

        {/* Audit Terminal */}
        <div>
          <div
            className="px-3 py-2 border-b"
            style={{ background: '#1E293B', borderColor: '#334155' }}
          >
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#E2E8F0' }}>
              IMMUTABLE AUDIT TRAIL
            </span>
          </div>
          <div
            className="p-3 space-y-0 overflow-y-auto"
            style={{ background: '#0A0F1A', minHeight: '420px', maxHeight: '520px' }}
          >
            {AUDIT_LOG.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-2 py-1.5 border-b"
                style={{ borderColor: '#1E293B', fontFamily: 'monospace' }}
              >
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: entry.color,
                    minWidth: '36px',
                    paddingTop: '1px',
                  }}
                >
                  [{entry.code}]
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: '9px', color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                      {entry.time}
                    </span>
                    <span style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 500 }}>
                      {entry.msg}
                    </span>
                  </div>
                  <div style={{ fontSize: '8px', color: '#475569', marginTop: '1px' }}>
                    {entry.ref}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SponsorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section: Compliance Health */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">UKVI Compliance Score</span>
          </div>
          
          <div className="relative flex items-center justify-center w-48 h-48">
             <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
              <circle cx="96" cy="96" r="88" stroke="#14B8A6" strokeWidth="12" fill="transparent" strokeDasharray={552.9} strokeDashoffset={55.3} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-[#0F172A] dark:text-white">94</span>
              <span className="text-sm font-bold text-[#14B8A6] uppercase tracking-tighter">Excellent</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500 text-center max-w-[200px]">
            Your sponsorship license is at low risk. <span className="text-[#0F172A] font-bold">4 minor tasks</span> outstanding.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Expiring Visas', val: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Unused CoS', val: '08', icon: FileCheck, color: 'text-[#14B8A6]', bg: 'bg-teal-50' },
            { label: 'SA Verifications', val: '142', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Overdue Duties', val: '03', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#0F172A] p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:border-[#14B8A6] transition-all cursor-default">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-[#0F172A] dark:text-white">{item.val}</p>
              </div>
              <div className={`p-3 rounded-lg ${item.bg} dark:bg-slate-800`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 bg-[#0F172A] dark:bg-slate-900 rounded-xl p-4 flex items-center justify-between text-white border border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-[#14B8A6] p-2 rounded">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">Generate Full Audit Report</p>
                <p className="text-[11px] opacity-60">Prepared for Home Office inspection (PDF/JSON)</p>
              </div>
            </div>
            <button className="bg-white text-[#0F172A] px-4 py-2 rounded font-bold text-xs hover:bg-[#14B8A6] hover:text-white transition-colors">
              EXPORT DATA
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#0F172A] dark:bg-white rounded-full" />
              Active Workers & CoS Registry
            </h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Filter by CAS/Name..." className="text-xs px-4 py-2 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20" />
              <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-4 py-2 rounded text-xs font-bold">+ ADD WORKER</button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
             <WorkersTable />
          </div>
        </div>

        {/* Sidebar: Audit Log */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-4">
             <History className="w-4 h-4" />
             <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Immutable Audit Trail</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-[#0F172A] p-4 rounded-lg border border-slate-200 dark:border-slate-800 relative group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-[#14B8A6] bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded">PASSED</span>
                  <span className="text-[10px] font-mono text-slate-400">12:04:0{i} UTC</span>
                </div>
                <p className="text-[11px] font-bold text-[#0F172A] dark:text-white leading-tight mb-1">Worker Document Uploaded</p>
                <p className="text-[10px] text-slate-500 font-mono break-all opacity-60 group-hover:opacity-100 transition-opacity">
                  SHA-256: 8f3c1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b2e{i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
