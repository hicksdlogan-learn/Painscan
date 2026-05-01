// api/free-report.js — One free full report per user (tracked via fingerprint)
// Vercel Serverless Function (Node.js)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 100) {
    return res.status(400).json({ error: 'Please provide at least 100 characters of text.' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Service configuration error.' });
  }

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

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error('OpenAI error:', err);
      return res.status(502).json({ error: 'Analysis service unavailable. Please try again.' });
    }

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.status(502).json({ error: 'Empty response from analysis service.' });
    }

    // Clean and parse JSON
    const cleaned = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Content:', content);
      return res.status(502).json({ error: 'Could not parse analysis. Please try again.' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Free report handler error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
