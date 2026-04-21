'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Bell, ChevronDown, Lock } from 'lucide-react';

const NAV_ITEMS = ['Dashboard', 'Workers', 'Audit Logs', 'CoS Management', 'Settings'];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().replace('GMT', 'UTC').split(' ').slice(1).join(' ')
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="min-h-screen text-[#1E293B] font-sans"
      style={{ background: '#F1F5F9', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ── Utility Bar ── */}
      <div
        className="w-full flex items-center justify-between px-4 border-b"
        style={{
          background: '#1E293B',
          borderColor: '#334155',
          height: '26px',
          fontSize: '10px',
          letterSpacing: '0.06em',
          color: '#94A3B8',
        }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Lock size={9} className="text-[#0D9488]" />
            <span style={{ color: '#0D9488', fontWeight: 700 }}>ENCRYPTION: AES-256-GCM</span>
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span>OISC REG: F202400012</span>
          <span style={{ color: '#475569' }}>|</span>
          <span>DATA RESIDENCY: UK-SOUTH</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5" style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}>
            <span style={{ color: '#64748B' }}>SYS TIME (UTC)</span>
            <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{utcTime}</span>
          </span>
          <span
            className="flex items-center gap-1"
            style={{ color: '#0D9488', fontWeight: 700, fontSize: '9px', letterSpacing: '0.1em' }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#0D9488', animation: 'pulse 2s infinite' }}
            />
            LIVE
          </span>
        </div>
      </div>

      {/* ── Institutional Header ── */}
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{
          background: '#F8FAFC',
          borderColor: '#CBD5E1',
          boxShadow: 'inset 0 -1px 0 #CBD5E1',
        }}
      >
        <div className="max-w-[1800px] mx-auto flex items-stretch" style={{ height: '48px' }}>
          {/* Logo Block */}
          <div
            className="flex items-center gap-2 px-5 border-r"
            style={{ borderColor: '#CBD5E1', minWidth: '200px' }}
          >
            <ShieldCheck size={18} className="text-[#0D9488]" strokeWidth={2.5} />
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B', letterSpacing: '-0.02em' }}>
              MIGRA<span style={{ color: '#0369A1' }}>LINK</span>
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-stretch flex-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                className="relative flex items-center px-5 border-r transition-colors"
                style={{
                  borderColor: '#CBD5E1',
                  fontSize: '11px',
                  fontWeight: i === 0 ? 700 : 500,
                  color: i === 0 ? '#1E293B' : '#64748B',
                  letterSpacing: '0.05em',
                  background: i === 0 ? '#FFFFFF' : 'transparent',
                  boxShadow: i === 0 ? 'inset 0 -2px 0 #0369A1' : 'none',
                }}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-stretch border-l" style={{ borderColor: '#CBD5E1' }}>
            <button
              className="flex items-center justify-center px-4 border-r transition-colors hover:bg-slate-100"
              style={{ borderColor: '#CBD5E1', position: 'relative' }}
            >
              <Bell size={15} className="text-[#64748B]" />
              <span
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                style={{ background: '#DC2626' }}
              />
            </button>
            <button
              className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-colors"
              style={{ fontSize: '11px', color: '#1E293B' }}
            >
              <div
                className="flex items-center justify-center w-6 h-6 text-white font-bold"
                style={{ background: '#1E293B', fontSize: '10px', borderRadius: '2px' }}
              >
                IS
              </div>
              <div className="text-left hidden sm:block">
                <div style={{ fontWeight: 700, lineHeight: 1.2 }}>INSTITUTIONAL SPONSOR</div>
                <div style={{ fontVariantNumeric: 'tabular-nums', color: '#64748B', fontSize: '9px', fontFamily: 'monospace' }}>
                  ID: 8821-XQ
                </div>
              </div>
              <ChevronDown size={12} className="text-[#94A3B8]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="max-w-[1800px] mx-auto p-4 lg:p-5">
        {children}
      </main>
    </div>
  );
}

