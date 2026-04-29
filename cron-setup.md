# PainScan Daily Leads Cron Setup

## What It Does
Every morning at 9am ET, automatically:
1. Scans Reddit (r/startups, r/entrepreneur, r/sideproject, r/marketing, r/copywriting, r/etsysellers, r/indiehackers)
2. Fetches Indie Hackers newest posts
3. Finds posts about customer research, pain points, validation
4. Posts top leads to #painscan Discord with suggested reply angles
5. Includes a daily post idea for you to use

## Cron Entry

Add this to your OpenClaw cron config:

```json
{
  "name": "painscan-daily-leads",
  "schedule": "0 9 * * *",
  "timezone": "America/New_York",
  "command": "cd /Users/artifex/.openclaw/workspace/painscan && node automation/daily-leads-cron.js",
  "channel": "discord",
  "target": "1480735984852406363"
}
```

## Manual Run

To test anytime:
```bash
cd ~/.openclaw/workspace/painscan
node automation/daily-leads-cron.js
```

## Files
- `automation/daily-leads-cron.js` — Main script
- `automation/reddit-monitor.js` — Reddit scanning
- `automation/leads.json` — Saved leads history
