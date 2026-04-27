# 📅 10-Day PainScan Launch Timeline

**Goal: Live product + first paying customer within 10 days.**  
**Daily time commitment: 1-3 hours/day**

---

## Day 1 — Setup & Deploy (3 hours)

**Morning (1.5 hrs):**
- [ ] Register domain: `painscan.fyi` at Cloudflare (~$10) or Namecheap
  - Alternative: `painscan.co`, `getpainscan.com`, `painscanai.com`
- [ ] Create Vercel account (free) at vercel.com
- [ ] Create OpenAI account + add $10 credits → get API key
- [ ] Create Stripe account → get test secret key (`sk_test_...`)

**Afternoon (1.5 hrs):**
- [ ] `cd painscan && npm install`
- [ ] Copy `.env.example` to `.env.local`, fill in keys
- [ ] `npm run dev` — test locally with Stripe test card `4242 4242 4242 4242`
- [ ] `npm run deploy` → deploy to Vercel
- [ ] Add env vars in Vercel dashboard (Settings → Environment Variables)
- [ ] Connect your domain in Vercel (Domain → Add → follow DNS instructions)
- [ ] Set up `hello@painscan.fyi` email forwarding via forwardemail.net

**EOD check:** Can you complete a full $7 checkout and see the report? ✓

---

## Day 2 — Polish & Test (2 hours)

**Tasks:**
- [ ] Run 5 real test analyses (paste actual Reddit threads, Amazon reviews)
- [ ] Verify the report quality is good — if not, tweak the prompts in `api/analyze.js`
- [ ] Take 3-5 screenshots of good report outputs for social posts
- [ ] Switch Stripe to **live mode** (`sk_live_...`) in Vercel env vars
- [ ] Do one real $7 test purchase with your own card
- [ ] Write 2-3 tweet drafts for tomorrow's launch

**Optional:** Add Plausible analytics to index.html (30-day free trial)

---

## Day 3 — Launch Day 🚀 (3 hours)

**Morning (post while traffic is highest — 8-10am ET):**
- [ ] Post on **r/SideProject** (see LAUNCH_PLAYBOOK.md for template)
- [ ] Post on **Indie Hackers** (Community → share product)
- [ ] Post **Twitter/X thread** with screenshots

**Afternoon:**
- [ ] Reply to every comment, upvote, and DM — personally, thoughtfully
- [ ] Post in **r/entrepreneur** if r/SideProject goes well
- [ ] Offer 3 free reports to people willing to give feedback (post in IH)

**Evening:**
- [ ] Check Stripe dashboard for first sales 🎉
- [ ] Note any questions people ask → update FAQ on landing page

**Target:** 1-3 paying customers

---

## Day 4 — Etsy & Copywriter Outreach (2 hours)

**Tasks:**
- [ ] Post or comment in **r/EtsySellers** (see playbook for angle)
- [ ] Comment in **r/copywriting** thread about customer research
- [ ] Search Twitter for "voice of customer" "reading amazon reviews" and reply helpfully
- [ ] DM 5-10 indie hackers from IH who discuss customer research

**Target:** 2-5 paying customers total

---

## Day 5 — ProductHunt Prep (1.5 hours)

**Tasks:**
- [ ] Create ProductHunt account (if no account)
- [ ] Write PH tagline, description, and first comment
- [ ] Get 5 people to agree to upvote on launch day (ask in IH, Twitter)
- [ ] Collect any feedback/testimonials from Days 3-4 → add to landing page
- [ ] Take a clean GIF/screenshot for PH gallery

---

## Day 6 — Content Creation (2 hours)

**Write 2 posts:**

**Post A (Tutorial):** "How to do customer research in 60 seconds using Reddit"
- Step 1: Find a relevant subreddit
- Step 2: Copy the top posts/comments
- Step 3: Paste into PainScan
- Step 4: Use the copywriting hooks in your landing page
→ Post on your blog / Medium / IH blog

**Post B (Case Study):** Pick a well-known product (e.g., a popular Notion template seller)
- Go to their Etsy/Gumroad, copy their reviews
- Run through PainScan
- Share 3 interesting findings
→ Post on Twitter thread

**Target:** 8-12 paying customers total

---

## Day 7 — ProductHunt Launch 🐱 (3 hours)

**Timeline:**
- 12:01am PT: PH post goes live
- Morning: DM everyone who said they'd upvote
- All day: Reply to every comment on PH within 30 minutes
- Post on Twitter: "We're live on ProductHunt today! [link]"
- Re-share on IH

**If PH goes well (top 10):** You may get 20-50 customers from this alone.  
**If PH is slow:** That's okay. The long-tail posts from Days 3-6 will keep trickling in.

**Target:** 15-25 paying customers total

---

## Day 8 — B2B Outreach (1.5 hours)

**Target: Small marketing agencies and freelance copywriters**

Find 10 copywriters/marketers on LinkedIn/Twitter who:
- Post about customer research
- Work with e-commerce brands
- Use terms like "VoC", "jobs to be done", "customer avatar"

**LinkedIn DM template:**
> Hey [Name], saw your post about [customer research topic]. I built a tool that automates the pain of reading hundreds of reviews — it extracts pain points, emotional triggers, and copywriting hooks from any text in 60 seconds. Would love to give you a free report if you have a client project you're working on. It's $7/report normally. Happy to chat! — Logan

**Target:** 2-3 agency conversations started

---

## Day 9 — Iterate on Feedback (1.5 hours)

By now you should have 10-30 customers. **Talk to them.**

- [ ] Email everyone who bought: "Quick question — what brought you to PainScan and what would make it 10x more useful?"
- [ ] Read all feedback, identify top 2 requests
- [ ] If many ask for email delivery: add Resend to email the report
- [ ] If many ask for history: consider adding simple auth (Clerk.dev free tier)
- [ ] Update landing page with real testimonial quotes

---

## Day 10 — Momentum & Next Steps (2 hours)

**Review your numbers:**
- Total reports sold: ___
- Total revenue: ___
- Conversion rate (visitors → free preview → paid): ___
- Top traffic source: ___

**Do these:**
- [ ] Post a "Day 10 Update" on Indie Hackers (be transparent with numbers — this drives massive traffic)
- [ ] Post on Twitter: "10 days ago I launched PainScan. Here's what happened: [real numbers]"
  - Transparency builds trust and goes viral on IH/Twitter
- [ ] Respond to all pending DMs/emails
- [ ] Plan Month 1: team pack pricing ($29 for 5 reports)?

---

## 10-Day Summary Targets

| Day | Cumulative Revenue | Key Action |
|-----|-------------------|------------|
| Day 1 | $0 (deployed!) | Get live |
| Day 2 | $0 (tested) | Polish |
| Day 3 | $7-21 | Reddit/IH/Twitter launch |
| Day 4 | $28-49 | Etsy + copywriter outreach |
| Day 5 | $42-70 | PH prep + testimonials |
| Day 6 | $56-105 | Content marketing |
| Day 7 | $105-175 | ProductHunt launch |
| Day 8 | $140-210 | B2B outreach |
| Day 9 | $175-245 | Iterate + talk to customers |
| Day 10 | **$210-350** | Recap post → more traffic |

**Conservative case:** $210 in 10 days (~30 reports)  
**Good case:** $500+ if ProductHunt hits top 10 or one post goes viral  
**Best case:** $1,000+ if you get picked up by a newsletter or influencer

---

## After Day 10 — What to do next

1. **Build in public**: Tweet weekly revenue updates → grows audience → drives sales
2. **Add $29 team tier**: 5 reports — most businesses buy 2-3 times/month anyway
3. **Partner with a newsletter**: Pay for a sponsored slot in IH Daily, Indie Bites, or MorningBrew Creator
4. **Affiliate program**: Give 30% to anyone who refers — people love sending $7 links when they get $2.10 back
5. **Niche landing pages**: `/for-etsy-sellers`, `/for-copywriters`, `/for-product-managers` — better SEO + conversions

---

*Don't overthink. Ship, sell, iterate. The first $7 is the hardest — everything gets easier after.*
