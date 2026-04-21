'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, UploadCloud, UserCheck, LogOut, Fingerprint, Lock, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS: 'granted' | 'pending' = 'pending'; // swap to 'granted' when cleared

const SESSION_ID = 'SES-' + Math.random().toString(36).slice(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();

const ACTIONS = [
  { id: 'brp', label: 'Upload BRP Front / Back', sub: 'Biometric Residence Permit Â· Both sides required', done: false, icon: UploadCloud },
  { id: 'rtw', label: 'Right to Work Consent', sub: 'Digital Signature Required Â· GDPR Article 9', done: true, icon: UserCheck },
  { id: 'bio', label: 'Biometric Verification', sub: 'Liveness check Â· ISO/IEC 30107-3 compliant', done: false, icon: Fingerprint },
];

export default function WorkerPortalPage() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setUtcTime(new Date().toUTCString().replace('GMT', 'UTC'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isGranted = STATUS === 'granted';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#F1F5F9', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Top Authority Bar */}
      <div
        className="w-full border-b flex items-center justify-between px-4"
        style={{
          background: '#1E293B',
          borderColor: '#334155',
          height: '26px',
          fontSize: '9px',
          letterSpacing: '0.08em',
          color: '#94A3B8',
        }}
      >
        <div className="flex items-center gap-3">
          <Lock size={9} className="text-[#0D9488]" />
          <span style={{ color: '#0D9488', fontWeight: 700 }}>AES-256-GCM</span>
          <span style={{ color: '#334155' }}>|</span>
          <span>OISC REG: F202400012</span>
        </div>
        <span style={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', color: '#475569' }}>
          {utcTime}
        </span>
      </div>

      {/* Logo Header */}
      <div className="border-b flex items-center gap-2 px-6 py-3" style={{ background: '#F8FAFC', borderColor: '#CBD5E1' }}>
        <ShieldCheck size={18} className="text-[#0D9488]" strokeWidth={2.5} />
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B', letterSpacing: '-0.02em' }}>
          MIGRA<span style={{ color: '#0369A1' }}>LINK</span>
        </span>
        <span style={{ marginLeft: '8px', fontSize: '9px', color: '#94A3B8', letterSpacing: '0.08em', fontWeight: 600 }}>
          WORKER IDENTITY PORTAL
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <div className="w-full" style={{ maxWidth: '520px' }}>

          {/* EU Certificate Clearance Banner */}
          <div
            className="border-t-4 border-b mb-5"
            style={{
              borderTopColor: isGranted ? '#0D9488' : '#B45309',
              borderBottomColor: '#CBD5E1',
              background: isGranted ? '#ECFDF5' : '#FFFBEB',
              padding: '14px 18px',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                style={{
                  padding: '6px',
                  background: isGranted ? '#0D9488' : '#B45309',
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              >
                {isGranted
                  ? <ShieldCheck size={18} style={{ color: '#FFFFFF' }} />
                  : <AlertTriangle size={18} style={{ color: '#FFFFFF' }} />
                }
              </div>
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    color: isGranted ? '#065F46' : '#92400E',
                    textTransform: 'uppercase',
                  }}
                >
                  {isGranted ? 'âœ“  CLEARANCE GRANTED' : 'â³  PENDING REVIEW'}
                </div>
                <div style={{ fontSize: '10px', color: isGranted ? '#047857' : '#B45309', marginTop: '3px' }}>
                  {isGranted
                    ? 'Your Right to Work verification is confirmed. Proceed to upload documents.'
                    : 'Your application is under review by your sponsoring employer. Complete all steps below.'
                  }
                </div>
                <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '6px', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                  REF: UKVI-2024-0039 Â· STEP 2 OF 3 Â· 60% COMPLETE
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="mb-5 border"
            style={{ background: '#E2E8F0', borderColor: '#CBD5E1', height: '8px', borderRadius: '2px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
          >
            <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #0D9488, #0369A1)', borderRadius: '2px' }} />
          </div>

          {/* Action Items */}
          <div className="space-y-2 mb-5">
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="flex items-center justify-between border"
                  style={{
                    padding: '12px 14px',
                    background: action.done ? '#F0FDF4' : '#FFFFFF',
                    borderColor: action.done ? '#86EFAC' : '#CBD5E1',
                    borderLeft: `3px solid ${action.done ? '#0D9488' : '#CBD5E1'}`,
                    opacity: action.done ? 0.7 : 1,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        padding: '6px',
                        background: action.done ? '#DCFCE7' : '#F1F5F9',
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} style={{ color: action.done ? '#16A34A' : '#64748B' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>{action.label}</div>
                      <div style={{ fontSize: '9px', color: '#94A3B8', letterSpacing: '0.04em', marginTop: '1px' }}>{action.sub}</div>
                    </div>
                  </div>
                  {action.done
                    ? (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          background: '#DCFCE7',
                          color: '#15803D',
                          border: '1px solid #86EFAC',
                          borderRadius: '2px',
                          letterSpacing: '0.08em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        âœ“ DONE
                      </span>
                    )
                    : (
                      <button
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '5px 14px',
                          background: '#0369A1',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '2px',
                          letterSpacing: '0.08em',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        START â†’
                      </button>
                    )
                  }
                </div>
              );
            })}
          </div>

          {/* UK GDPR Notice */}
          <div
            className="border border-t-2 p-4 mb-5"
            style={{ borderColor: '#CBD5E1', borderTopColor: '#1E293B', background: '#FFFFFF' }}
          >
            <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em', color: '#1E293B', marginBottom: '4px' }}>
              DATA PROTECTION NOTICE
            </div>
            <p style={{ fontSize: '9px', color: '#64748B', lineHeight: '1.6' }}>
              Your data is processed exclusively under <strong>UK GDPR</strong> and stored on Sovereign Cloud infrastructure (UK-South).
              Biometric details are encrypted end-to-end and disclosed only to UKVI where required under the Immigration Act 2014.
            </p>
          </div>

          {/* Secure Logout + Session ID */}
          <div
            className="flex items-center justify-between border p-3"
            style={{ borderColor: '#CBD5E1', background: '#F8FAFC' }}
          >
            <div>
              <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8' }}>UNIQUE SESSION ID</div>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#475569', fontVariantNumeric: 'tabular-nums', marginTop: '2px' }}>
                {SESSION_ID}
              </div>
            </div>
            <button
              className="flex items-center gap-2"
              style={{
                padding: '8px 16px',
                background: '#1E293B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
            >
              <LogOut size={12} />
              SECURE LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
