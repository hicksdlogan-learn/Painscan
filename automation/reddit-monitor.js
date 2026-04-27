// Reddit Pain Point Monitor — Finds people complaining about customer research
// Run via cron: node reddit-monitor.js

const SUBREDDITS = [
  'startups',
  'entrepreneur',
  'smallbusiness',
  'sideproject',
  'marketing',
  'copywriting',
  'etsysellers',
  'indiehackers'
];

const KEYWORDS = [
  'customer research',
  'pain points',
  'voice of customer',
  'reddit research',
  'amazon reviews',
  'customer interviews',
  'validate idea',
  'product research',
  'understand customers',
  'what do customers want'
];

// Fetch recent posts from a subreddit
async function fetchSubreddit(subreddit, after = null) {
  const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=25${after ? `&after=${after}` : ''}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'PainScan-Monitor/1.0' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Error fetching r/${subreddit}:`, err.message);
    return null;
  }
}

// Check if post matches our keywords
function matchesKeywords(post) {
  const text = `${post.title} ${post.selftext || ''}`.toLowerCase();
  return KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

// Score post quality (engagement + recency)
function scorePost(post) {
  const hoursOld = (Date.now() / 1000 - post.created_utc) / 3600;
  const engagement = post.score + (post.num_comments * 3);
  // Higher score for recent + engaged posts
  return engagement / (hoursOld + 1);
}

// Main monitoring loop
async function monitor() {
  console.log(`[${new Date().toISOString()}] Starting Reddit scan...`);
  
  const leads = [];
  
  for (const sub of SUBREDDITS) {
    console.log(`  Scanning r/${sub}...`);
    const data = await fetchSubreddit(sub);
    if (!data?.data?.children) continue;
    
    for (const { data: post } of data.data.children) {
      if (matchesKeywords(post)) {
        leads.push({
          subreddit: sub,
          title: post.title,
          url: `https://reddit.com${post.permalink}`,
          author: post.author,
          score: post.score,
          comments: post.num_comments,
          age_hours: Math.round((Date.now()/1000 - post.created_utc)/3600),
          quality_score: scorePost(post),
          snippet: (post.selftext || '').slice(0, 200)
        });
      }
    }
    
    // Rate limit: 1 request per 2 seconds
    await new Promise(r => setTimeout(r, 2000));
  }
  
  // Sort by quality score
  leads.sort((a, b) => b.quality_score - a.quality_score);
  
  // Output results
  console.log(`\nFound ${leads.length} potential leads:\n`);
  
  for (const lead of leads.slice(0, 10)) {
    console.log(`[${lead.subreddit}] ${lead.title}`);
    console.log(`  URL: ${lead.url}`);
    console.log(`  Engagement: ${lead.score} upvotes, ${lead.comments} comments (${lead.age_hours}h old)`);
    console.log(`  Snippet: ${lead.snippet.replace(/\n/g, ' ')}...`);
    console.log('');
  }
  
  // Save to file for follow-up
  const fs = await import('fs');
  const outputPath = '/Users/artifex/.openclaw/workspace/painscan/automation/leads.json';
  
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  } catch {}
  
  // Merge, dedupe by URL
  const allLeads = [...existing, ...leads];
  const uniqueLeads = Array.from(new Map(allLeads.map(l => [l.url, l])).values());
  
  fs.writeFileSync(outputPath, JSON.stringify(uniqueLeads, null, 2));
  console.log(`Saved ${uniqueLeads.length} total leads to leads.json`);
  
  return leads;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  monitor().catch(console.error);
}

export { monitor };
