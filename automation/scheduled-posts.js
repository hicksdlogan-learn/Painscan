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
    type: 'experiment_share',
    template: `The $7 experiment: Can automated research replace 3 hours of manual digging?

I'm a designer who got curious about Voice of Customer research after seeing copywriters charge more for the research than the copy.

Built a simple scraper + analyzer. First test: health brand client, 3 hours of manual review reading vs. 10 minutes of automated extraction.

Manual found: 12 distinct pain points, rich language patterns
Automated found: 9 of the same 12, plus 3 the manual missed

Not perfect, but surprisingly close. Client paid $7 for the automated report. Said it surfaced confusion points they'd missed in 6 months of calls.

Question: For those doing customer research — is speed worth trading some depth? Or is the manual grind non-negotiable?`
  },
  {
    platform: 'reddit_saas',
    type: 'value_first_question',
    template: `I spent 3 hours manually digging through reviews for a client. Here's what I learned.

Context: I'm a designer, not a copywriter. Client wanted to understand why their health brand's landing page wasn't converting.

I did what the pros do — scraped Amazon reviews, Reddit threads, support tickets. 3 hours of copy-pasting into a spreadsheet, highlighting patterns, categorizing pain points.

The gold: Customers weren't complaining about the product. They were complaining about confusion — not knowing which version to buy, when results would show, how it compared to alternatives.

Completely different pain points than what the client assumed.

My takeaway: The manual process works, but it's brutal. Has anyone here found a faster way to extract Voice of Customer data without losing the nuance?`
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
    { day: 'Tuesday', platform: 'indiehackers', type: 'experiment_share' },
    { day: 'Wednesday', platform: 'twitter', type: 'before_after' },
    { day: 'Thursday', platform: 'reddit_saas', type: 'value_first_question' },
    { day: 'Friday', platform: 'twitter', type: 'value_first' },
    { day: 'Saturday', platform: 'reddit_sideproject', type: 'showcase' },
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
