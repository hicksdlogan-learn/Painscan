// Daily Karma Builder — Finds 2-3 posts to comment on for Reddit karma building
// Run via cron job each morning

const SUBREDDITS = ['copywriting', 'marketing', 'entrepreneur', 'smallbusiness'];
const KEYWORDS = ['landing page', 'copy', 'customer research', 'reviews', 'messaging', 'conversion', 'pain points', 'voice of customer', 'VOC'];

// Generate search URLs for manual scanning
function generateSearchUrls() {
  const urls = [];
  
  for (const sub of SUBREDDITS) {
    for (const keyword of KEYWORDS.slice(0, 3)) {
      urls.push(`https://www.reddit.com/r/${sub}/search/?q=${encodeURIComponent(keyword)}&sort=new&t=day`);
    }
  }
  
  return urls;
}

// Daily output for Logan
function generateDailyKarmaPlan() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  
  console.log(`🎯 Daily Karma Builder — ${today}\n`);
  console.log('Goal: Leave 2-3 genuine comments to build karma before posting.\n');
  console.log('Search these URLs for fresh posts (last 24h):\n');
  
  const urls = generateSearchUrls();
  const uniqueSubs = [...new Set(urls.map(u => u.match(/r\/([^/]+)/)[1]))];
  
  uniqueSubs.forEach(sub => {
    console.log(`r/${sub}:`);
    urls.filter(u => u.includes(`/r/${sub}/`)).slice(0, 2).forEach(url => {
      console.log(`  • ${url}`);
    });
    console.log('');
  });
  
  console.log('💡 Comment Guidelines:');
  console.log('  • Add genuine value — share an insight, ask a follow-up, offer a tip');
  console.log('  • No links, no pitch, no mention of PainScan');
  console.log('  • 2-4 sentences max');
  console.log('  • Be helpful, not clever');
  console.log('');
  console.log('📊 Target: 50-100 karma before posting');
  console.log('   (Roughly 10-15 solid comments over 3-5 days)');
}

generateDailyKarmaPlan();
