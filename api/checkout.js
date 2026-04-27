// api/checkout.js — Simple $7 per report checkout
import Stripe from 'stripe';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Payment configuration error.' });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  const origin = req.body?.origin || 'https://painscan.fyi';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.body?.email || undefined,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'PainScan Full Report',
            description: '10+ ranked pain points, emotional triggers, jobs-to-be-done, copywriting hooks, product angles, and competitor gaps.',
          },
          unit_amount: 700, // $7.00
        },
        quantity: 1,
      }],
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#tool`,
      metadata: {
        support_email: 'hello@painscan.fyi',
        refund_policy: '30-day refund guarantee. Contact hello@painscan.fyi for refunds.',
      },
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ error: 'Could not create checkout session.' });
  }
}
