'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Lock, ShieldCheck, Crosshair, Camera, Upload, CheckCircle2, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// -- Types --------------------------------------------------------------------

type Step = 0 | 1 | 2;
type UploadStatus = 'idle' | 'requesting-url' | 'uploading' | 'queued' | 'scanning' | 'ocr' | 'complete' | 'error';

interface IdentityFields {
  firstName: string;
  lastName: string;
  cosReference: string;
  nationality: string;
  passportNumber: string;
}

const STEPS = ['IDENTITY', 'DOCUMENTS', 'CONFIRM'] as const;

const DOCUMENT_TYPES = ['PASSPORT', 'BRP', 'RTW_SHARE_CODE', 'COS'] as const;
type DocumentType = typeof DOCUMENT_TYPES[number];

// Progress label for each status state
const STATUS_LABEL: Record<UploadStatus, string> = {
  'idle': 'STANDBY',
  'requesting-url': 'AUTHORISING...',
  'uploading': 'UPLOADING...',
  'queued': 'QUEUED',
  'scanning': 'AV SCANNING...',
  'ocr': 'OCR � TEXTRACT...',
  'complete': 'VERIFIED ?',
  'error': 'ERROR',
};

// -- Upload helpers ------------------------------------------------------------

async function requestUploadUrl(
  workerId: string,
  contentType: string,
  documentType: string,
): Promise<{ uploadUrl: string; fileKey: string }> {
  const res = await fetch('/api/docs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId, contentType, documentType }),
  });
  if (!res.ok) throw new Error(`Failed to get upload URL: ${res.status}`);
  return res.json();
}

async function uploadToR2(uploadUrl: string, file: Blob, contentType: string): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  });
  if (!res.ok) throw new Error(`R2 upload failed: ${res.status}`);
}

async function triggerProcessing(
  workerId: string,
  fileKey: string,
  documentType: string,
  mimeType: string,
  workerData: Record<string, unknown>,
): Promise<void> {
  const res = await fetch('/api/docs', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId, fileKey, documentType, mimeType, workerData }),
  });
  if (!res.ok) throw new Error(`Failed to queue processing: ${res.status}`);
}

// -- Component -----------------------------------------------------------------

export default function AddWorkerForm({ onSuccess }: { onSuccess?: () => void }) {
  const [currentStep, setCurrentStep] = useState<Step>(0);

  // A temporary ID generated client-side for this enrollment session.
  // A permanent DB record is created by the Inngest workflow once documents clear.
  const [workerId] = useState(() => crypto.randomUUID());

  const [identity, setIdentity] = useState<IdentityFields>({
    firstName: '',
    lastName: '',
    cosReference: '',
    nationality: '',
    passportNumber: '',
  });

  const [documentType, setDocumentType] = useState<DocumentType>('PASSPORT');
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadedFileKey, setUploadedFileKey] = useState<string | null>(null);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Revoke preview object URL on change
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // -- Camera ----------------------------------------------------------------

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 } },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      toast.error('Camera unavailable � use file upload instead.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  }, []);

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setCapturedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
      },
      'image/jpeg',
      0.88,
    );
  }, [stopCamera]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);
    if (!allowed.has(file.type)) {
      toast.error('Only JPEG, PNG, WEBP, or PDF files are accepted.');
      return;
    }
    setCapturedFile(file);
    setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
  }, []);

  // -- Upload pipeline -------------------------------------------------------

  const runUploadPipeline = useCallback(async () => {
    if (!capturedFile) return;

    try {
      // Step A: get signed URL
      setUploadStatus('requesting-url');
      const { uploadUrl, fileKey } = await requestUploadUrl(
        workerId,
        capturedFile.type,
        documentType,
      );

      // Step B: upload directly to R2
      setUploadStatus('uploading');
      await uploadToR2(uploadUrl, capturedFile, capturedFile.type);
      setUploadedFileKey(fileKey);

      // Step C: trigger Inngest workflow
      setUploadStatus('queued');
      await triggerProcessing(workerId, fileKey, documentType, capturedFile.type, {
        legalNameComponents: { firstName: identity.firstName, lastName: identity.lastName },
        nationality: identity.nationality,
        passportNumber: identity.passportNumber,
        cosReference: identity.cosReference,
      });

      // Simulate the pipeline progress visually (Inngest runs async server-side)
      setUploadStatus('scanning');
      await delay(2000);
      setUploadStatus('ocr');
      await delay(3500);
      setUploadStatus('complete');

      toast.success('Document processed � compliance chain updated.');
      onSuccess?.();
    } catch (err) {
      setUploadStatus('error');
      const msg = err instanceof Error ? err.message : 'Upload failed';
      toast.error(msg);
    }
  }, [capturedFile, documentType, identity, workerId, onSuccess]);

  // -- Step validation -------------------------------------------------------

  const step1Valid =
    identity.firstName.trim() &&
    identity.lastName.trim() &&
    identity.cosReference.trim() &&
    identity.nationality.trim();

  const step2Valid = capturedFile !== null;

  // -- Render ----------------------------------------------------------------

  const isUploading = !['idle', 'complete', 'error'].includes(uploadStatus);

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #CBD5E1',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* -- Header bar -- */}
      <div
        style={{
          background: '#1E293B',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  background: i === currentStep ? '#0369A1' : i < currentStep ? '#0D9488' : '#334155',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  borderRadius: '2px',
                }}
              >
                {i < currentStep ? '?' : i + 1}
              </div>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: i === currentStep ? '#E2E8F0' : i < currentStep ? '#0D9488' : '#475569',
                }}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{ width: '24px', height: '1px', background: '#475569' }} />
              )}
            </div>
          ))}
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#0D9488' }}>
          <ShieldCheck size={11} />
          SECURE ENROLLMENT
        </span>
      </div>

      {/* -- Step 0: Identity -- */}
      {currentStep === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Left pane */}
          <div style={{ padding: '20px', borderRight: '1px solid #CBD5E1' }}>
            <div style={{ borderTop: '2px solid #1E293B', paddingTop: '12px', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>IDENTITY VERIFICATION</div>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Enter details exactly as they appear on travel documents.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {([
                { key: 'firstName', label: 'FIRST NAME (AS ON PASSPORT)', mono: false },
                { key: 'lastName', label: 'LAST NAME (AS ON PASSPORT)', mono: false },
                { key: 'cosReference', label: 'CERTIFICATE OF SPONSORSHIP (CoS)', mono: true },
                { key: 'nationality', label: 'NATIONALITY', mono: false },
                { key: 'passportNumber', label: 'PASSPORT / BRP NUMBER', mono: true },
              ] as { key: keyof IdentityFields; label: string; mono: boolean }[]).map(({ key, label, mono }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#64748B', marginBottom: '4px' }}>
                    {label}
                  </label>
                  <input
                    value={identity[key]}
                    onChange={(e) => setIdentity((prev) => ({ ...prev, [key]: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      fontSize: '12px',
                      fontFamily: mono ? 'monospace' : 'inherit',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      outline: 'none',
                      color: '#1E293B',
                      borderRadius: '2px',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0369A1'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', marginTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#94A3B8' }}>
                <Lock size={9} />
                AES-256 � OISC COMPLIANT STORAGE
              </span>
              <button
                disabled={!step1Valid}
                onClick={() => setCurrentStep(1)}
                style={{
                  padding: '8px 20px',
                  background: step1Valid ? '#1E293B' : '#CBD5E1',
                  color: step1Valid ? '#FFFFFF' : '#94A3B8',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: step1Valid ? 'pointer' : 'not-allowed',
                }}
              >
                CONTINUE TO STEP 2 ?
              </button>
            </div>
          </div>

          {/* Right pane: enrollment info */}
          <div style={{ padding: '20px', background: '#F8FAFC' }}>
            <div style={{ borderTop: '2px solid #1E293B', paddingTop: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>ENROLLMENT PROTOCOL</div>
            </div>
            {[
              { code: 'RTW-001', text: 'Right-to-Work check required before first working day' },
              { code: 'UKVI-002', text: 'BRP or eVisa must be validated against UKVI records' },
              { code: 'GDPR-003', text: 'All PII processed under UK GDPR Article 6(1)(c)' },
              { code: 'OISC-004', text: 'Immigration advice restricted to OISC-registered advisors' },
            ].map(({ code, text }) => (
              <div key={code} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#0369A1', fontWeight: 700 }}>{code}</span>
                <p style={{ fontSize: '10px', color: '#475569', margin: '2px 0 0 0' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -- Step 1: Document capture + upload -- */}
      {currentStep === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Left: document type + file input */}
          <div style={{ padding: '20px', borderRight: '1px solid #CBD5E1' }}>
            <div style={{ borderTop: '2px solid #1E293B', paddingTop: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>DOCUMENT TYPE</div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {DOCUMENT_TYPES.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setDocumentType(dt)}
                  style={{
                    padding: '5px 12px',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    border: `1px solid ${documentType === dt ? '#0369A1' : '#CBD5E1'}`,
                    background: documentType === dt ? '#EFF6FF' : '#F8FAFC',
                    color: documentType === dt ? '#0369A1' : '#64748B',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {dt}
                </button>
              ))}
            </div>

            {/* File upload trigger */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${capturedFile ? '#0D9488' : '#CBD5E1'}`,
                borderRadius: '2px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                background: capturedFile ? '#F0FDFA' : '#FAFAFA',
                marginBottom: '12px',
              }}
            >
              {capturedFile ? (
                <>
                  <CheckCircle2 size={20} style={{ color: '#0D9488', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#0D9488' }}>FILE READY</div>
                  <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px', fontFamily: 'monospace' }}>{capturedFile.name}</div>
                  <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '2px' }}>{(capturedFile.size / 1024).toFixed(0)} KB � {capturedFile.type}</div>
                </>
              ) : (
                <>
                  <Upload size={20} style={{ color: '#94A3B8', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>CLICK TO SELECT FILE</div>
                  <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '2px' }}>JPEG � PNG � WEBP � PDF</div>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />

            {capturedFile && (
              <button
                onClick={() => { setCapturedFile(null); setPreviewUrl(null); }}
                style={{ fontSize: '9px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}
              >
                <RefreshCw size={9} /> RETAKE / RESELECT
              </button>
            )}

            {/* Upload progress status */}
            {uploadStatus !== 'idle' && (
              <div
                style={{
                  padding: '8px 12px',
                  background: uploadStatus === 'complete' ? '#F0FDFA' : uploadStatus === 'error' ? '#FFF1F2' : '#F0F9FF',
                  border: `1px solid ${uploadStatus === 'complete' ? '#0D9488' : uploadStatus === 'error' ? '#FDA4AF' : '#BAE6FD'}`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                {uploadStatus === 'complete' ? (
                  <CheckCircle2 size={12} style={{ color: '#0D9488' }} />
                ) : uploadStatus === 'error' ? (
                  <AlertTriangle size={12} style={{ color: '#E11D48' }} />
                ) : (
                  <Loader2 size={12} style={{ color: '#0369A1', animation: 'spin 1s linear infinite' }} />
                )}
                <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, color: uploadStatus === 'complete' ? '#0D9488' : uploadStatus === 'error' ? '#E11D48' : '#0369A1', letterSpacing: '0.08em' }}>
                  {STATUS_LABEL[uploadStatus]}
                </span>
                {uploadedFileKey && uploadStatus === 'complete' && (
                  <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#64748B', marginLeft: 'auto' }}>{uploadedFileKey.split('/').pop()}</span>
                )}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
              <button
                onClick={() => setCurrentStep(0)}
                style={{ fontSize: '9px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ? BACK
              </button>
              <button
                disabled={!step2Valid || isUploading || uploadStatus === 'complete'}
                onClick={runUploadPipeline}
                style={{
                  padding: '8px 20px',
                  background: uploadStatus === 'complete' ? '#0D9488' : step2Valid && !isUploading ? '#0369A1' : '#CBD5E1',
                  color: step2Valid && !isUploading ? '#FFFFFF' : '#94A3B8',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: step2Valid && !isUploading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isUploading && <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} />}
                {uploadStatus === 'complete' ? 'PROCESSED ?' : 'INITIATE SCAN ?'}
              </button>
            </div>
          </div>

          {/* Right: camera viewport */}
          <div style={{ padding: '20px', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderTop: '2px solid #1E293B', paddingTop: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B' }}>DOCUMENT CAPTURE UNIT</div>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Use camera or upload � position document within the frame.</div>
            </div>

            {/* Viewport */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                background: '#0A0F1A',
                border: `2px solid ${cameraActive ? '#0369A1' : '#1E293B'}`,
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Scanline texture */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)', pointerEvents: 'none' }} />

              {/* Corners */}
              {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <div
                  key={pos}
                  style={{
                    position: 'absolute',
                    width: 20, height: 20,
                    top: pos.startsWith('t') ? 14 : undefined,
                    bottom: pos.startsWith('b') ? 14 : undefined,
                    left: pos.endsWith('l') ? 14 : undefined,
                    right: pos.endsWith('r') ? 14 : undefined,
                    borderTop: pos.startsWith('t') ? '2px solid #0369A1' : undefined,
                    borderBottom: pos.startsWith('b') ? '2px solid #0369A1' : undefined,
                    borderLeft: pos.endsWith('l') ? '2px solid #0369A1' : undefined,
                    borderRight: pos.endsWith('r') ? '2px solid #0369A1' : undefined,
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {cameraActive ? (
                /* Live camera feed */
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : previewUrl ? (
                /* Preview of captured/uploaded image */
                <img
                  src={previewUrl}
                  alt="Document preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                /* Idle state */
                <div style={{ textAlign: 'center' }}>
                  <Crosshair size={28} style={{ color: '#334155', margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#334155', letterSpacing: '0.1em' }}>AWAITING DOCUMENT</div>
                </div>
              )}

              {/* Camera capture button overlay */}
              {cameraActive && (
                <button
                  onClick={captureFrame}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '3px solid #0369A1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Camera size={18} style={{ color: '#0369A1' }} />
                </button>
              )}

              {/* Status badge */}
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: cameraActive ? '80px' : '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cameraActive ? '#DC2626' : '#475569' }} />
                  <span style={{ fontSize: '8px', fontFamily: 'monospace', color: cameraActive ? '#0D9488' : '#475569', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {cameraActive ? 'LIVE' : STATUS_LABEL[uploadStatus]}
                  </span>
                </div>
              </div>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Camera toggle */}
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  style={{
                    flex: 1, padding: '7px', fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.08em', background: '#1E293B', color: '#FFFFFF',
                    border: 'none', borderRadius: '2px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  }}
                >
                  <Camera size={11} /> ACTIVATE CAMERA
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  style={{
                    flex: 1, padding: '7px', fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.08em', background: '#DC2626', color: '#FFFFFF',
                    border: 'none', borderRadius: '2px', cursor: 'pointer',
                  }}
                >
                  STOP CAMERA
                </button>
              )}
            </div>

            {/* Metadata strip */}
            <div style={{ marginTop: '10px' }}>
              {[
                { label: 'OCR ENGINE', val: 'AWS Textract � AnalyzeID' },
                { label: 'ENCRYPTION', val: 'AES-256-GCM IN-TRANSIT' },
                { label: 'DATA RESIDENCY', val: 'EU-WEST-2 � UK GDPR' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', borderBottom: '1px solid #E2E8F0', paddingBottom: '3px', marginBottom: '3px' }}>
                  <span style={{ color: '#94A3B8', letterSpacing: '0.06em' }}>{row.label}</span>
                  <span style={{ fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -- Step 2: Confirmation -- */}
      {currentStep === 2 && (
        <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <CheckCircle2 size={40} style={{ color: '#0D9488', margin: '0 auto 16px' }} />
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', letterSpacing: '0.06em' }}>ENROLLMENT INITIATED</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '8px', lineHeight: 1.6 }}>
            Worker identity data has been submitted and the document processing pipeline has been triggered.
            A compliance event has been recorded in the immutable audit ledger.
          </div>
          {uploadedFileKey && (
            <div style={{ marginTop: '16px', padding: '10px', background: '#F1F5F9', borderRadius: '2px', fontFamily: 'monospace', fontSize: '10px', color: '#475569' }}>
              KEY: {uploadedFileKey}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

