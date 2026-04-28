# 🔍 PainScan

**AI-powered customer pain point extractor. $7/report.**

Paste any Reddit thread, Amazon reviews, or forum posts → get a structured pain point report in 60 seconds.

---

## What it does

- **Free preview**: First 3 pain points, no payment needed (viral hook)
- **Full report ($7)**: 10+ ranked pain points, emotional triggers, jobs-to-be-done, copywriting hooks, product angles, competitor gaps

---

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS + Tailwind CDN (zero build step)
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: OpenAI GPT-4o (full) + GPT-4o-mini (free preview)
- **Payments**: Stripe Checkout
- **Deploy**: Vercel (free tier works fine)

---

## Deploy in 15 Minutes

### Prerequisites
- Node.js 18+
- [Vercel account](https://vercel.com) (free)
- [OpenAI API key](https://platform.openai.com/api-keys)
- [Stripe account](https://stripe.com) + secret key

### Steps

1. **Clone/copy this folder** to your machine

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual keys
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Opens at http://localhost:3000
   ```

5. **Deploy to Vercel**
   ```bash
   npm run deploy
   # Follow prompts: new project, default settings
   ```

6. **Add environment variables in Vercel**
   - Go to your Vercel project → Settings → Environment Variables
   - Add `OPENAI_API_KEY` and `STRIPE_SECRET_KEY`
   - Redeploy

7. **Test with Stripe test card** `4242 4242 4242 4242` (any expiry/CVC)

8. **Switch to live Stripe key** when ready to accept real payments

---

## Cost per Report

| Component | Cost |
|-----------|------|
| GPT-4o-mini (free preview) | ~$0.001 |
| GPT-4o (full report) | ~$0.04 |
| Stripe fee on $7 | ~$0.52 |
| **Total cost** | **~$0.56** |
| **Revenue per report** | **$7.00** |
| **Margin** | **~92%** |

---

## Files

```
painscan/
├── public/
│   └── index.html          ← The entire frontend (landing page + tool)
├── api/
│   ├── preview.js          ← Free 3-point preview (calls GPT-4o-mini)
│   ├── checkout.js         ← Creates Stripe $7 checkout session
│   └── analyze.js          ← Verifies payment + runs full GPT-4o analysis
├── package.json
├── vercel.json
├── .env.example
├── README.md
├── LAUNCH_PLAYBOOK.md      ← Exactly where + what to post
└── 10_DAY_TIMELINE.md      ← Day-by-day execution plan
```

---

## Customization

- **Change price**: Edit `unit_amount` in `api/checkout.js` (in cents)
- **Change model**: Edit `model` in `api/preview.js` and `api/analyze.js`
- **Add your domain**: Update success/cancel URLs in `api/checkout.js`
- **Email delivery**: Optionally add Resend or Postmark to email the report

---

## Support Email

Set up a free [Forwardemail.net](https://forwardemail.net) alias:
`hello@yourdomain.com` → your personal Gmail

---

## License

MIT. Go make money.
# Trigger deploy
