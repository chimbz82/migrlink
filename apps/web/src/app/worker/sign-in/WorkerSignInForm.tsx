'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export default function WorkerSignInForm() {
  const { isLoaded, signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [isPending, setIsPending] = useState(false);

  const startMagicLinkFlow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const { supportedFirstFactors } = await signIn.create({ identifier: emailAddress });
      const emailLinkFactor = supportedFirstFactors?.find(f => f.strategy === 'email_link');

      if (emailLinkFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'email_link',
          emailAddressId: emailLinkFactor.emailAddressId,
          redirectUrl: `${window.location.origin}/worker/auth-callback`,
        });
        setIsPending(true);
      }
    } catch {
      // sign-in errors handled silently
    }
  };

  if (isPending) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#1E293B' }}>
          ✓ Check your email for the secure magic link.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9' }}>
      <form
        onSubmit={startMagicLinkFlow}
        style={{ border: '1px solid #CBD5E1', background: '#FFFFFF', padding: '32px', width: '360px' }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#1E293B', marginBottom: '16px' }}>
          WORKER SECURE ACCESS
        </div>
        <input
          type="email"
          required
          placeholder="your.email@example.com"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '13px',
            border: '1px solid #CBD5E1',
            outline: 'none',
            borderRadius: '2px',
            boxSizing: 'border-box',
            marginBottom: '12px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#1E293B',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          SEND MAGIC LINK →
        </button>
      </form>
    </div>
  );
}
