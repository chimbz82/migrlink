'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export default function WorkerMagicLinkLogin() {
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
    } catch (err) {}
  };

  if (isPending) return <div>Check your email for the magic link.</div>;

  return (
    <form onSubmit={startMagicLinkFlow}>
      <input type="email" required value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
      <button type="submit">Send Magic Link</button>
    </form>
  );
}
