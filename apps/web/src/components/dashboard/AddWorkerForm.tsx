'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Crosshair } from 'lucide-react';

const STEPS = ['IDENTITY', 'DOCUMENTS', 'CONFIRM'];

export default function AddWorkerForm() {
  const [scanning, setScanning] = useState(false);
  const [scanText, setScanText] = useState('STANDBY');

  useEffect(() => {
    if (!scanning) { setScanText('STANDBY'); return; }
    const frames = ['INITIALISING...', 'CALIBRATING...', 'OCR SCANNING...', 'READING FIELDS...', 'OCR SCANNING...'];
    let i = 0;
    setScanText(frames[0]);
    const id = setInterval(() => {
      i = (i + 1) % frames.length;
      setScanText(frames[i]);
    }, 700);
    return () => clearInterval(id);
  }, [scanning]);

  return (
    <div
      className="border"
      style={{
        background: '#FFFFFF',
        borderColor: '#CBD5E1',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-5 py-2.5 border-b"
        style={{ background: '#1E293B', borderColor: '#334155' }}
      >
        <div className="flex items-center gap-3">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  background: i === 0 ? '#0369A1' : '#334155',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  borderRadius: '2px',
                }}
              >
                {i + 1}
              </div>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: i === 0 ? '#E2E8F0' : '#475569',
                }}
              >
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{ width: '24px', height: '1px', background: '#475569', marginLeft: '4px' }} />
              )}
            </div>
          ))}
        </div>
        <span
          className="flex items-center gap-1.5"
          style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#0D9488' }}
        >
          <ShieldCheck size={11} />
          SECURE ENROLLMENT
        </span>
      </div>

      {/* Dual Pane Body */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

        {/* LEFT PANE: Data Entry */}
        <div className="p-5 border-r" style={{ borderColor: '#CBD5E1' }}>
          <div
            className="border-t-2 pt-3 mb-5"
            style={{ borderColor: '#1E293B' }}
          >
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>
              IDENTITY VERIFICATION
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
              Enter worker details as they appear on travel documents.
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'FULL LEGAL NAME (AS ON PASSPORT)', placeholder: 'e.g. Alexander Hamilton', mono: false },
              { label: 'CERTIFICATE OF SPONSORSHIP (CoS)', placeholder: 'C4X 8821 902 L', mono: true },
              { label: 'NATIONALITY', placeholder: 'e.g. Indian', mono: false },
              { label: 'PASSPORT NUMBER', placeholder: 'e.g. P12345678', mono: true },
            ].map((field) => (
              <div key={field.label}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#64748B',
                    marginBottom: '4px',
                  }}
                >
                  {field.label}
                </label>
                <input
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    fontSize: '12px',
                    fontFamily: field.mono ? 'monospace' : 'inherit',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    color: '#1E293B',
                    borderRadius: '2px',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.boxShadow = '0 0 0 2px #BFDBFE40'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div
            className="flex items-center justify-between pt-4 mt-4 border-t"
            style={{ borderColor: '#E2E8F0' }}
          >
            <span className="flex items-center gap-1.5" style={{ fontSize: '9px', color: '#94A3B8' }}>
              <Lock size={9} />
              AES-256 · OISC COMPLIANT STORAGE
            </span>
            <button
              style={{
                padding: '8px 20px',
                background: '#1E293B',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              CONTINUE TO STEP 2 →
            </button>
          </div>
        </div>

        {/* RIGHT PANE: Industrial Document Scanner */}
        <div className="p-5 flex flex-col" style={{ background: '#F8FAFC' }}>
          <div
            className="border-t-2 pt-3 mb-4"
            style={{ borderColor: '#1E293B' }}
          >
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>
              DOCUMENT CAPTURE UNIT
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
              Position BRP / Passport within the capture frame.
            </div>
          </div>

          {/* Camera Viewport */}
          <div
            className="relative flex-1 flex items-center justify-center cursor-pointer"
            style={{
              background: '#0A0F1A',
              border: `2px solid ${scanning ? '#0369A1' : '#1E293B'}`,
              minHeight: '280px',
              transition: 'border-color 0.3s',
            }}
            onClick={() => setScanning((s) => !s)}
          >
            {/* Scanline overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)',
                pointerEvents: 'none',
              }}
            />

            {/* Crosshair */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {/* Corner TL */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 20, height: 20, borderTop: '2px solid #0369A1', borderLeft: '2px solid #0369A1' }} />
              {/* Corner TR */}
              <div style={{ position: 'absolute', top: 16, right: 16, width: 20, height: 20, borderTop: '2px solid #0369A1', borderRight: '2px solid #0369A1' }} />
              {/* Corner BL */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, width: 20, height: 20, borderBottom: '2px solid #0369A1', borderLeft: '2px solid #0369A1' }} />
              {/* Corner BR */}
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 20, height: 20, borderBottom: '2px solid #0369A1', borderRight: '2px solid #0369A1' }} />
              {/* Centre crosshair */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <Crosshair size={28} style={{ color: scanning ? '#0D9488' : '#334155', transition: 'color 0.3s' }} />
              </div>
              {/* Horizontal rule */}
              <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: scanning ? '#0369A120' : 'transparent', transition: 'background 0.3s' }} />
            </div>

            {/* Status text */}
            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: scanning ? '#DC2626' : '#475569',
                    animation: scanning ? 'pulse 1s infinite' : 'none',
                  }}
                />
                <span style={{ fontSize: '9px', fontFamily: 'monospace', color: scanning ? '#0D9488' : '#475569', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {scanText}
                </span>
              </div>
              <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#334155' }}>
                {scanning ? 'CLICK TO STOP' : 'CLICK TO ACTIVATE'}
              </span>
            </div>

            {/* Scanning line animation */}
            {scanning && (
              <div
                style={{
                  position: 'absolute',
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #0369A1, transparent)',
                  animation: 'scanLine 1.5s ease-in-out infinite',
                }}
              />
            )}
          </div>

          <div className="mt-3 space-y-1">
            {[
              { label: 'RESOLUTION', val: '3840×2160 · 4K' },
              { label: 'OCR ENGINE', val: 'Tesseract v5.3 · EN/MULTI' },
              { label: 'ENCRYPTION', val: 'AES-256-GCM IN-TRANSIT' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between" style={{ fontSize: '9px', borderBottom: '1px solid #E2E8F0', paddingBottom: '3px' }}>
                <span style={{ color: '#94A3B8', letterSpacing: '0.06em' }}>{row.label}</span>
                <span style={{ fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>{row.val}</span>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes scanLine {
              0%   { top: 20%; opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { top: 80%; opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

      {/* Progress Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-4">
           {[1, 2, 3].map((step) => (
             <div key={step} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A]' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {step}
                </div>
                <div className={`h-1 w-8 rounded ${step === 1 ? 'bg-[#0F172A] dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'}`} />
             </div>
           ))}
        </div>
        <span className="text-[10px] font-bold text-[#14B8A6] flex items-center gap-1">
          <Shield className="w-3 h-3" /> SECURE ENROLLMENT
        </span>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">Identity Verification</h3>
          <p className="text-sm text-slate-500">Capture the worker's Right to Work documents via secure uplink.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name (as on Passport)</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#14B8A6] transition-all outline-none" placeholder="e.g. Alexander Hamilton" />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Certificate of Sponsorship (CoS)</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm font-mono" placeholder="C4X 8821 902 L" />
          </div>
        </div>

        {/* Camera Component Styling */}
        <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-[#14B8A6] transition-all group cursor-pointer relative overflow-hidden">
           <Camera className="w-12 h-12 text-slate-600 group-hover:text-[#14B8A6] transition-colors z-10" />
           <p className="mt-4 text-xs font-bold text-slate-400 group-hover:text-white z-10 relative">ACTIVATE SECURE CAMERA CAPTURE</p>
           {/* Scanlines pseudo-element */}
           <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }} />
           <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">REC STANDBY</span>
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Data encrypted with AES-256 for OISC compliance.
          </p>
          <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
            CONTINUE TO STEP 2
          </button>
        </div>
      </div>
    </div>
  );
}
