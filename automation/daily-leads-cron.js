// Daily Leads Cron — Posts Reddit + Indie Hackers leads to Discord
// Runs at 9am ET via OpenClaw cron

import { monitor as redditMonitor } from './reddit-monitor.js';

const DISCORD_CHANNEL_ID = '1480735984852406363'; // #painscan

// Indie Hackers API simulation (they don't have a public API, so we monitor via RSS/ scraping)
async function fetchIndieHackers() {
  // Indie Hackers has an RSS feed for "newest" posts
  try {
    const response = await fetch('https://www.indiehackers.com/newest.rss');
    const text = await response.text();
    
    // Parse RSS for relevant posts
    const posts = [];
    const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    for (const item of items.slice(0, 15)) {
      const title = item.match(/<title>([^<]+)<\/title>/)?.[1] || '';
      const link = item.match(/<link>([^<]+)<\/link>/)?.[1] || '';
      const description = item.match(/<description>([^<]+)<\/description>/)?.[1] || '';
      
      // Keywords that indicate a good PainScan lead
      const keywords = ['customer research', 'pain points', 'validate', 'reddit', 'reviews', 
                       'research', 'interviews', 'feedback', 'users', 'customers', 'problem'];
      
      const text_lower = (title + ' ' + description).toLowerCase();
      if (keywords.some(kw => text_lower.includes(kw))) {
        posts.push({
          platform: 'Indie Hackers',
          title: title.replace(/<!\[CDATA\[|\]\]>/g, ''),
          url: link,
          snippet: description.slice(0, 200).replace(/<!\[CDATA\[|\]\]>/g, '') + '...'
        });
      }
    }
    
    return posts.slice(0, 5);
  } catch (err) {
    console.error('Indie Hackers fetch error:', err.message);
    return [];
  }
}

// Generate suggested reply angle
function generateAngle(post) {
  const angles = [
    "They're doing manual research. Pitch the 60s alternative.",
    "Mention how you used to spend hours on this too.",
    "Share a quick tip, then soft-mention PainScan.",
    "Ask about their current process, then suggest the tool.",
    "Validate their struggle, offer the solution.",
    "Share a specific example of time saved."
  ];
  
  // Pick based on post content
  if (post.title?.toLowerCase().includes('hours') || post.snippet?.toLowerCase().includes('hours')) {
    return angles[0];
  }
  if (post.title?.toLowerCase().includes('struggle') || post.title?.toLowerCase().includes('hard')) {
    return angles[4];
  }
  return angles[Math.floor(Math.random() * angles.length)];
}

// Generate daily post suggestion
function generatePostIdea(leads) {
  const ideas = [
    "📊 'How I analyzed 500 reviews in 60 seconds' — show the before/after",
    "🎯 'The 3 biggest pain points from r/[subreddit] this week'",
    "💡 'Customer research hack: paste reviews, get insights'",
    "🔍 'What [niche] customers are actually complaining about'",
    "⚡ 'From 4 hours to 60 seconds: my research workflow'"
  ];
  
  // Pick based on top lead
  const topLead = leads[0];
  if (topLead?.subreddit) {
    return ideas[1].replace('[subreddit]', topLead.subreddit);
  }
  return ideas[Math.floor(Math.random() * ideas.length)];
}

// Format Discord message
function formatDiscordMessage(redditLeads, ihLeads) {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  let message = `🔍 **Daily Leads — ${date}**\n\n`;
  
  // Reddit leads
  if (redditLeads.length > 0) {
    message += `**Reddit**\n`;
    redditLeads.slice(0, 5).forEach((lead, i) => {
      message += `${i + 1}. **r/${lead.subreddit}** — ${lead.title.slice(0, 80)}${lead.title.length > 80 ? '...' : ''}\n`;
      message += `   💬 ${lead.comments} comments | ⬆️ ${lead.score} upvotes | ${lead.age_hours}h old\n`;
      message += `   💡 *${generateAngle(lead)}*\n`;
      message += `   🔗 <${lead.url}>\n\n`;
    });
  }
  
  // Indie Hackers leads
  if (ihLeads.length > 0) {
    message += `**Indie Hackers**\n`;
    ihLeads.forEach((lead, i) => {
      message += `${i + 1}. ${lead.title.slice(0, 80)}${lead.title.length > 80 ? '...' : ''}\n`;
      message += `   💡 *${generateAngle(lead)}*\n`;
      message += `   🔗 <${lead.url}>\n\n`;
    });
  }
  
  if (redditLeads.length === 0 && ihLeads.length === 0) {
    message += `*No hot leads today. Check back tomorrow!*\n\n`;
  }
  
  // Daily post suggestion
  const allLeads = [...redditLeads, ...ihLeads];
  message += `---\n**💡 Today's Post Idea:**\n${generatePostIdea(allLeads)}\n\n`;
  message += `_Remember: Add value first, mention PainScan only when genuinely relevant._`;
  
  return message;
}

// Main function
async function runDailyLeads() {
  console.log(`[${new Date().toISOString()}] Running daily leads...`);
  
  try {
    // Fetch both sources
    const redditLeads = await redditMonitor();
    const ihLeads = await fetchIndieHackers();
    
    // Format message
    const message = formatDiscordMessage(redditLeads, ihLeads);
    
    // Post to Discord (this will be handled by OpenClaw's message tool)
    console.log('Message to post:');
    console.log(message);
    console.log('\n---\n');
    console.log(`Channel: ${DISCORD_CHANNEL_ID}`);
    
    // Return for OpenClaw to handle posting
    return {
      channelId: DISCORD_CHANNEL_ID,
      message: message,
      redditCount: redditLeads.length,
      ihCount: ihLeads.length
    };
    
  } catch (err) {
    console.error('Daily leads error:', err);
    return {
      channelId: DISCORD_CHANNEL_ID,
      message: `⚠️ Error fetching leads today. Check logs.`,
      error: err.message
    };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDailyLeads().then(result => {
    console.log('Done:', result);
  }).catch(console.error);
}

export { runDailyLeads, fetchIndieHackers };
