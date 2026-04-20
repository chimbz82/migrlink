'use client';

import { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, CheckCircle } from 'lucide-react';

export function CameraCapture({ onCapture }: { onCapture: (file: File) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [jpegDataUrl, setJpegDataUrl] = useState<string | null>(null);

  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 } }
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error(err);
    }
  };

  const captureFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setJpegDataUrl(canvas.toDataURL('image/jpeg', 0.8));
      stream?.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const confirmUpload = async () => {
    if (!jpegDataUrl) return;
    const res = await fetch(jpegDataUrl);
    const blob = await res.blob();
    const file = new File([blob], `scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
    onCapture(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!stream && !jpegDataUrl && <button onClick={startStream}>Start Scanner</button>}
      {stream && (
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline muted />
          <button onClick={captureFrame} className="absolute bottom-4 z-10 w-16 h-16 bg-white rounded-full" />
        </div>
      )}
      {jpegDataUrl && (
        <div>
          <img src={jpegDataUrl} alt="Captured preview" />
          <div className="flex gap-2">
            <button onClick={() => { setJpegDataUrl(null); startStream(); }}>Retake</button>
            <button onClick={confirmUpload}>Use Photo</button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
