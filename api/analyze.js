// api/analyze.js — Verify payment and run full OpenAI analysis
import Stripe from 'stripe';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, sessionId } = req.body;
  if (!text || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!STRIPE_SECRET_KEY || !OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Service configuration error.' });
  }

  // Verify payment
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not confirmed.' });
    }
  } catch (err) {
    return res.status(402).json({ error: 'Could not verify payment.' });
  }

  // Run analysis
  const truncatedText = text.slice(0, 15000);
  const systemPrompt = `You are a world-class customer research analyst. Return ONLY valid JSON.`;
  const userPrompt = `Analyze this text and extract pain points, emotional triggers, jobs-to-be-done, copywriting hooks, product angles, and competitor gaps.

TEXT: """${truncatedText}"""

Return this JSON structure:
{
  "summary": "Executive summary",
  "painPoints": [{"title": "...", "description": "...", "severity": "Critical|High|Medium|Low"}],
  "emotionalTriggers": ["..."],
  "jobsToBeDone": ["..."],
  "copywritingHooks": ["..."],
  "productAngles": ["..."],
  "competitorGaps": ["..."]
}`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 3000
      })
    });

    if (!openaiRes.ok) throw new Error('OpenAI error');
    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Empty response');

    const cleaned = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const result = JSON.parse(cleaned);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Analysis failed.' });
  }
}
