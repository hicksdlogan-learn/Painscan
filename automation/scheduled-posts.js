// Scheduled Social Posts for PainScan
// Generates post ideas and schedules them (manual approval recommended)

const POST_TEMPLATES = [
  {
    platform: 'twitter',
    type: 'value_first',
    template: `I spent 4 hours reading Reddit threads to understand customer pain points.

Then I built a tool that does it in 60 seconds.

Here's what I learned about automating customer research 👇

[thread with screenshots]

painscan.fyi`
  },
  {
    platform: 'twitter', 
    type: 'before_after',
    template: `Before: Reading 500 Amazon reviews manually (3 hours)

After: Paste → Get pain points + copy hooks (60 seconds)

The $7 tool: painscan.fyi`
  },
  {
    platform: 'indiehackers',
    type: 'share_product',
    template: `I built a $7 tool that turns Reddit threads into customer research reports in 60 seconds.

Paste any customer text → get ranked pain points, emotional triggers, jobs-to-be-done, and copywriting hooks.

Free preview (3 pain points, no card): painscan.fyi

What customer research tools do you use?`
  },
  {
    platform: 'reddit_sideproject',
    type: 'showcase',
    template: `I got tired of reading 500 reviews manually, so I built this — [painscan.fyi]

Paste Reddit threads, Amazon reviews, or forum posts → get structured pain point analysis with copywriting hooks.

Free preview. Full report is $7.

Would love your honest feedback.`
  }
];

// Generate weekly content calendar
function generateCalendar() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const calendar = [];
  
  // Mix of platforms throughout the week
  const schedule = [
    { day: 'Monday', platform: 'twitter', type: 'value_first' },
    { day: 'Tuesday', platform: 'indiehackers', type: 'share_product' },
    { day: 'Wednesday', platform: 'twitter', type: 'before_after' },
    { day: 'Thursday', platform: 'reddit_sideproject', type: 'showcase' },
    { day: 'Friday', platform: 'twitter', type: 'value_first' },
    { day: 'Saturday', platform: 'twitter', type: 'before_after' },
    { day: 'Sunday', platform: null, type: null } // rest day
  ];
  
  for (const { day, platform, type } of schedule) {
    if (!platform) {
      calendar.push({ day, action: 'Rest day - engage with replies' });
      continue;
    }
    
    const template = POST_TEMPLATES.find(p => p.platform === platform && p.type === type);
    calendar.push({
      day,
      platform,
      type,
      post: template?.template || 'Custom post',
      action: `Post to ${platform}`
    });
  }
  
  return calendar;
}

// Output weekly plan
function printWeeklyPlan() {
  console.log('📅 PainScan Weekly Content Plan\n');
  console.log('Copy these posts, customize, and schedule:\n');
  
  const calendar = generateCalendar();
  for (const item of calendar) {
    console.log(`${item.day}:`);
    if (item.post) {
      console.log(`  Platform: ${item.platform}`);
      console.log(`  Post:\n${item.post.split('\n').map(l => '    ' + l).join('\n')}`);
    } else {
      console.log(`  ${item.action}`);
    }
    console.log('');
  }
  
  console.log('💡 Pro tip: Use a tool like Buffer (free tier) or Typefully to schedule these in advance');
}

// Run
printWeeklyPlan();
