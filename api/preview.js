// api/preview.js — Free preview: returns top 3 pain points (no payment required)
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

  const truncatedText = text.slice(0, 6000); // limit input to keep costs low on free preview

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Service configuration error.' });
  }

  const systemPrompt = `You are a world-class customer research analyst. Your job is to extract customer pain points from raw text (Reddit threads, reviews, forum posts, etc.).

Return ONLY a valid JSON object — no markdown, no explanation, no code fences.`;

  const userPrompt = `Analyze this customer text and extract the top 3 most significant pain points.

TEXT TO ANALYZE:
"""
${truncatedText}
"""

Return EXACTLY this JSON structure:
{
  "summary": "A 2-3 sentence overview of the core themes and frustrations in this text.",
  "painPoints": [
    {
      "title": "Short, punchy title (5-8 words max)",
      "description": "1-2 sentences explaining the specific pain, what causes it, and why it matters to the customer.",
      "severity": "Critical | High | Medium | Low"
    }
  ]
}

Rules:
- Return exactly 3 pain points in the array
- Be specific and actionable, not generic
- Use the exact words/phrases customers used when possible
- Severity should reflect how emotionally charged this pain is in the text
- JSON must be valid and parseable`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 800
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
    console.error('Preview handler error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
