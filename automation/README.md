# PainScan Automation

Daily lead generation and content scheduling for PainScan.

## What This Does

1. **Reddit Monitor** — Scans r/startups, r/entrepreneur, r/sideproject, etc. for people talking about customer research, pain points, product validation. Saves hot leads to `leads.json`.

2. **Twitter/X Monitor** — Placeholder for X API integration (requires $100/mo API access or Apify scraper).

3. **Content Calendar** — Generates weekly post templates for Twitter, Indie Hackers, and Reddit.

## Quick Start

```bash
# Run all monitors
npm run monitor

# Or just Reddit leads
npm run leads
```

## Setting Up Daily Automation

### Option 1: Cron (Mac/Linux)

```bash
# Edit crontab
crontab -e

# Add this line to run daily at 9am
0 9 * * * cd /Users/artifex/.openclaw/workspace/painscan && /usr/local/bin/node automation/run-all.js >> /tmp/painscan-monitor.log 2>&1
```

### Option 2: GitHub Actions (Free)

Create `.github/workflows/monitor.yml`:

```yaml
name: Daily Lead Monitor
on:
  schedule:
    - cron: '0 9 * * *'  # 9am daily
  workflow_dispatch:  # Manual trigger

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run monitor
      - uses: actions/upload-artifact@v3
        with:
          name: leads
          path: automation/leads.json
```

## Workflow

1. **Morning**: Run `npm run monitor` → check `leads.json` for hot posts
2. **Engage**: Visit the URLs, leave helpful comments mentioning PainScan
3. **Post**: Use the generated content calendar for scheduled posts
4. **Track**: Monitor Stripe dashboard for new sales

## Output Files

- `leads.json` — All discovered leads with URLs, engagement scores, snippets
- `painscan-monitor.log` — Daily run logs (if using cron)

## Next Level

- **Apify** ($49/mo): Real Twitter scraping, automated alerts
- **Zapier** (free tier): Auto-post hot leads to Slack/Discord
- **Make.com**: Build full automation workflows
