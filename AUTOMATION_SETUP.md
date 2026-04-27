# PainScan Automation Setup — Complete

## ✅ What I Built

### 1. Fixed Refund Email
- Updated `api/checkout.js` to collect customer email during checkout
- Added metadata for support contact and refund policy
- Added footer to landing page with support email and refund policy

### 2. Reddit Lead Monitor (`automation/reddit-monitor.js`)
Scans 8 subreddits for people talking about:
- Customer research
- Pain points
- Voice of customer
- Product validation
- Reddit/Amazon review research

**Output:** Saves hot leads to `automation/leads.json` with engagement scores

### 3. Content Calendar Generator (`automation/scheduled-posts.js`)
Generates weekly post templates for:
- Twitter/X (value threads, before/after)
- Indie Hackers (share product)
- Reddit r/SideProject (showcase)

### 4. Master Runner (`automation/run-all.js`)
Runs everything in one command: `npm run monitor`

---

## 🚀 To Deploy

### Step 1: Redeploy to Vercel
```bash
cd /Users/artifex/.openclaw/workspace/painscan
vercel login  # if needed
vercel --prod
```

### Step 2: Set Up Email Forwarding
1. Go to [forwardemail.net](https://forwardemail.net)
2. Add domain: `painscan.fyi`
3. Create alias: `hello@painscan.fyi` → your Gmail
4. Verify (they'll give you DNS records to add at your registrar)

### Step 3: Run Your First Lead Scan
```bash
npm run monitor
```

Check `automation/leads.json` for hot posts to engage with.

### Step 4: Set Up Daily Automation

**Option A: Cron (Mac)**
```bash
crontab -e
# Add:
0 9 * * * cd /Users/artifex/.openclaw/workspace/painscan && /usr/local/bin/node automation/run-all.js >> /tmp/painscan-monitor.log 2>&1
```

**Option B: Run manually when you want leads**
Just run `npm run monitor` whenever you want fresh leads.

---

## 📋 Your Daily Workflow

1. **Morning**: Run `npm run monitor` (or check cron output)
2. **Review leads**: Open `leads.json`, sort by `quality_score`
3. **Engage**: Visit top 3-5 URLs, leave helpful comments
   - Don't spam — add value first
   - Mention PainScan only when genuinely relevant
4. **Post**: Use the generated content calendar for scheduled posts
5. **Track**: Check Stripe dashboard for sales

---

## 💰 What You Still Need to Do

- **Engage with leads** — I can't post comments for you (that would be spam)
- **Close sales** — Handle customer questions, deliver reports
- **Process refunds** — When someone emails hello@painscan.fyi
- **Drive traffic** — Post consistently, engage in communities

---

## 📊 Expected Timeline

| Day | Action | Expected Result |
|-----|--------|-----------------|
| 1 | Deploy, set up email, run first scan | Infrastructure ready |
| 2-3 | Engage with 10-15 leads, post on IH/Reddit | First traffic |
| 7 | Consistent daily engagement | 5-10 site visitors/day |
| 14 | Momentum builds | First sale likely |
| 30 | 100+ engaged leads | $100-300 revenue |

---

## 🛠️ Next Level Upgrades

- **Apify Twitter scraper** ($49/mo) — Real X monitoring
- **Buffer/Typefully** (free tier) — Schedule posts
- **Plausible analytics** — Track where traffic comes from

---

## Files Changed

- `api/checkout.js` — Added email collection + refund metadata
- `public/index.html` — Added footer with support info
- `package.json` — Added automation scripts
- `automation/` — New folder with all monitoring scripts

Run `vercel --prod` to deploy the changes.
