import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  appInfo: { name: 'MigraLink', version: '1.0.0' }
});

export const TIER_LIMITS = {
  free: { maxWorkers: 5 },
  growth: { maxWorkers: 25 },
  enterprise: { maxWorkers: 9999 }
};
