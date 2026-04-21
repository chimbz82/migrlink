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
              AES-256 Â· OISC COMPLIANT STORAGE
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
              CONTINUE TO STEP 2 â†’
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
              { label: 'RESOLUTION', val: '3840Ã—2160 Â· 4K' },
              { label: 'OCR ENGINE', val: 'Tesseract v5.3 Â· EN/MULTI' },
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
