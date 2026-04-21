import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MigraLink — UKVI Compliance Management',
  description: 'Institutional-grade sponsorship licence and right-to-work management platform. OISC Registered: F202400012.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const content = (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
  if (!clerkKey) return content;
  return <ClerkProvider>{content}</ClerkProvider>;
}
