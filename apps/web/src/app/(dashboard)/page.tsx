import React from 'react';
import { Activity, Clock, FileCheck, AlertCircle, Download, TrendingUp } from 'lucide-react';
import WorkersTable from '../../components/dashboard/WorkersTable';

export const dynamic = 'force-dynamic';

const STATS = [
  { label: 'EXPIRING VISAS', val: '12', delta: '+2', icon: Clock, accent: '#B45309', bg: '#FEF3C7', border: '#FDE68A' },
  { label: 'UNUSED COS', val: '08', delta: '0', icon: FileCheck, accent: '#0D9488', bg: '#F0FDFA', border: '#99F6E4' },
  { label: 'SA VERIFICATIONS', val: '142', delta: '+5', icon: Activity, accent: '#0369A1', bg: '#EFF6FF', border: '#BFDBFE' },
  { label: 'OVERDUE DUTIES', val: '03', delta: '-1', icon: AlertCircle, accent: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

const AUDIT_LOG = [
  { code: 'OK', color: '#0D9488', time: '14:02:41', msg: 'Document hash verified', ref: 'WRK-0042 Â· SHA-256: 8f3c1a2bâ€¦e6f7g8h9' },
  { code: 'SYNC', color: '#0369A1', time: '14:01:18', msg: 'CoS registry synchronised', ref: 'C4X-992-L â†’ UKVI API v3' },
  { code: 'WARN', color: '#B45309', time: '13:58:03', msg: 'Visa expiry T-30 threshold', ref: 'WRK-0017 Â· Marcus Rashford' },
  { code: 'OK', color: '#0D9488', time: '13:55:47', msg: 'Right to Work consent signed', ref: 'WRK-0039 Â· Elena Rodriguez' },
  { code: 'OK', color: '#0D9488', time: '13:50:22', msg: 'BRP front/back OCR passed', ref: 'WRK-0041 Â· Confidence: 99.3%' },
  { code: 'ERR', color: '#DC2626', time: '13:44:09', msg: 'Overdue SMS duty reminder', ref: 'WRK-0008 Â· 3rd attempt failed' },
  { code: 'SYNC', color: '#0369A1', time: '13:41:55', msg: 'Audit chain block appended', ref: 'BLOCK #1042 Â· prev: 7a3d9c1fâ€¦' },
];

export default function SponsorDashboardPage() {
  const scorePercent = 94.0;
  const barWidth = `${scorePercent}%`;

  return (
    <div className="space-y-4">

      {/* â”€â”€ Command Grid Row 1: Score + Stats â”€â”€ */}
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
              â–² EXCELLENT STANDING
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
                <span>{item.delta !== '0' ? item.delta : 'â€”'} vs last period</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Export Action Bar â”€â”€ */}
      <div
        className="flex items-center justify-between px-4 py-2 border"
        style={{ background: '#1E293B', borderColor: '#334155' }}
      >
        <div className="flex items-center gap-3">
          <Download size={13} className="text-[#94A3B8]" />
          <span style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '0.05em' }}>
            AUDIT EXPORT â€” PDF / JSON â€” Prepared for Home Office inspection
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

      {/* â”€â”€ Main Content: Workers Table + Audit Log â”€â”€ */}
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
                placeholder="Filter by CAS / Nameâ€¦"
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
