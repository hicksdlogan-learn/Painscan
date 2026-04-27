# PainScan Session Context

**What this is:** Dedicated context file for all PainScan work. Read this at the start of every PainScan session.

---

## Project Overview

**PainScan** — AI-powered customer pain point extractor  
**Price:** $7/report (free 3-point preview)  
**Margin:** ~92%  
**Location:** `/Users/artifex/.openclaw/workspace/painscan/`

**What it does:** Paste Reddit threads, Amazon reviews, or forum posts → get structured pain point report in 60 seconds.

---

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS + Tailwind CDN
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** OpenAI GPT-4o (full) + GPT-4o-mini (preview)
- **Payments:** Stripe Checkout
- **Deploy:** Vercel

---

## Files

```
painscan/
├── public/index.html       # Landing page + tool UI
├── api/preview.js          # Free 3-point preview (GPT-4o-mini)
├── api/checkout.js         # Stripe $7 checkout
├── api/analyze.js          # Full report (verifies payment + GPT-4o)
├── LAUNCH_PLAYBOOK.md      # Where + what to post
├── 10_DAY_TIMELINE.md      # Day-by-day execution
└── README.md               # Setup + deploy guide
```

---

## Current Status

- [x] Project built
- [x] Domain registered (`painscan.fyi`)
- [x] Deployed to Vercel
- [x] Stripe connected
- [x] Soft launch (Indie Hackers, Reddit) — Day 1 of profit push
- [ ] ProductHunt launch

---

## Launch Priorities (from LAUNCH_PLAYBOOK.md)

1. **Indie Hackers** — "Share your product" thread
2. **Reddit r/SideProject** — Project showcase
3. **Twitter/X** — Before/after thread with screenshots
4. **ProductHunt** — Day 3-4 (need 5+ testimonials first)

**Target customers:** Indie hackers, Etsy sellers, copywriters

---

## Revenue Targets

| Milestone | Reports | Revenue |
|-----------|---------|---------|
| Day 1 | 1 | $7 |
| Day 7 | 15 | $105 |
| Month 1 | 100 | $700 |
| Month 3 | 300/mo | $2,100/mo |

---

## What to Say When Starting a New PainScan Session

> "PainScan session — read `~/painscan/SESSION_CONTEXT.md` and the thread history. Current focus: [what you want to work on]"

Examples:
- "PainScan session — read context. Current focus: deploying to Vercel"
- "PainScan session — read context. Current focus: writing Indie Hackers launch post"
- "PainScan session — read context. Current focus: adding email delivery feature"

---

## Notes

- Logan gets paid 15th & 30th (affects cash flow for domain/tools)
- Domain ~$10/year (Namecheap/Cloudflare)
- Email: Use forwardemail.net (free) for `hello@painscan.fyi`
- Stripe pays out rolling 2-day once connected

---

*Last updated: 2026-03-09*
