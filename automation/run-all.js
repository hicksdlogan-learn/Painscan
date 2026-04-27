// Master automation runner for PainScan
// Run this daily to get leads and content ideas

import { monitor as redditMonitor } from './reddit-monitor.js';
import { monitor as twitterMonitor } from './twitter-monitor.js';

async function runAll() {
  console.log('═══════════════════════════════════════');
  console.log('  PainScan Daily Automation');
  console.log(`  ${new Date().toLocaleString()}`);
  console.log('═══════════════════════════════════════\n');
  
  // 1. Reddit monitoring
  console.log('🔍 REDDIT MONITOR');
  console.log('─────────────────');
  try {
    await redditMonitor();
  } catch (err) {
    console.error('Reddit monitor failed:', err.message);
  }
  
  console.log('\n');
  
  // 2. Twitter/X monitoring (info only - needs API)
  console.log('🐦 TWITTER/X MONITOR');
  console.log('────────────────────');
  try {
    await twitterMonitor();
  } catch (err) {
    console.error('Twitter monitor failed:', err.message);
  }
  
  console.log('\n');
  
  // 3. Content calendar
  console.log('📝 CONTENT CALENDAR');
  console.log('──────────────────');
  // Import and run the scheduled posts module
  await import('./scheduled-posts.js');
  
  console.log('\n═══════════════════════════════════════');
  console.log('  Done! Check leads.json for hot leads.');
  console.log('═══════════════════════════════════════');
}

runAll().catch(console.error);
