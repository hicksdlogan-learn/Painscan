// dev-server.mjs — Local development server for PainScan
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

// API: Preview endpoint
app.post('/api/preview', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 100) {
    return res.status(400).json({ error: 'Please provide at least 100 characters of text.' });
  }

  const truncatedText = text.slice(0, 6000);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  const systemPrompt = `You are a world-class customer research analyst. Extract customer pain points from raw text. Return ONLY valid JSON — no markdown, no explanation.`;

  const userPrompt = `Analyze this customer text and extract the top 3 most significant pain points.

TEXT:
"""
${truncatedText}
"""

Return EXACTLY this JSON:
{
  "summary": "2-3 sentence overview of core themes",
  "painPoints": [
    {
      "title": "Short punchy title (5-8 words)",
      "description": "1-2 sentences explaining the specific pain",
      "severity": "Critical | High | Medium | Low"
    }
  ]
}

Rules:
- Exactly 3 pain points
- Be specific and actionable
- Use customer's exact words when possible
- Valid JSON only`;

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
      return res.status(502).json({ error: 'Analysis service unavailable.' });
    }

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.status(502).json({ error: 'Empty response from analysis service.' });
    }

    const cleaned = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const result = JSON.parse(cleaned);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Preview error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PainScan dev server running at http://localhost:${PORT}`);
});
