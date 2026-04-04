// ── 30-Day Engagement Timeline ──
export const last30Days = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const base = isWeekend ? 1800 : 3200;
  return {
    date: day,
    impressions: Math.floor(base + Math.random() * 4000 + (i * 80)),
    engagement: Math.floor((base * 0.12) + Math.random() * 500 + (i * 15)),
    clicks: Math.floor((base * 0.04) + Math.random() * 200 + (i * 8)),
    shares: Math.floor(50 + Math.random() * 150 + (i * 3)),
  };
});

// ── Platform Performance ──
export const platformData = [
  { name: 'Instagram', posts: 42, reach: 34200, engagement: 4860, followers: 12400, growth: '+8.2%', color: '#E1306C', viralScore: 91 },
  { name: 'TikTok', posts: 28, reach: 89400, engagement: 12300, followers: 8900, growth: '+24.1%', color: '#00f2ea', viralScore: 96 },
  { name: 'LinkedIn', posts: 35, reach: 18700, engagement: 2840, followers: 5600, growth: '+11.7%', color: '#0A66C2', viralScore: 78 },
  { name: 'Twitter/X', posts: 56, reach: 22100, engagement: 3120, followers: 9200, growth: '+5.4%', color: '#1DA1F2', viralScore: 82 },
  { name: 'YouTube', posts: 12, reach: 45600, engagement: 6200, followers: 3400, growth: '+15.8%', color: '#FF0000', viralScore: 88 },
];

// ── Content Performance List ──
export const contentPerformance = [
  { id: 1, title: '10 AI Tools That Will Replace Your Marketing Team', platform: 'LinkedIn', type: 'Carousel', impressions: 24500, engagement: 3420, shares: 890, saves: 1240, viralScore: 96, date: 'Mar 28', status: 'viral' },
  { id: 2, title: 'Day in the Life of a Solopreneur', platform: 'TikTok', type: 'Short Video', impressions: 89200, engagement: 12400, shares: 4500, saves: 2100, viralScore: 98, date: 'Mar 25', status: 'viral' },
  { id: 3, title: 'Why Your Content Strategy is Failing', platform: 'Twitter/X', type: 'Thread', impressions: 15800, engagement: 2100, shares: 620, saves: 340, viralScore: 84, date: 'Mar 30', status: 'trending' },
  { id: 4, title: 'Behind the Scenes: Product Launch', platform: 'Instagram', type: 'Reel', impressions: 32100, engagement: 4800, shares: 1200, saves: 1890, viralScore: 92, date: 'Mar 27', status: 'viral' },
  { id: 5, title: 'How to Build a $10K/mo SaaS in 2025', platform: 'YouTube', type: 'Long Video', impressions: 45600, engagement: 6200, shares: 2300, saves: 3100, viralScore: 94, date: 'Mar 22', status: 'viral' },
  { id: 6, title: 'The 3 Biggest Marketing Myths Debunked', platform: 'LinkedIn', type: 'Article', impressions: 8900, engagement: 1240, shares: 380, saves: 520, viralScore: 72, date: 'Apr 1', status: 'active' },
  { id: 7, title: 'Quick Win: Boost Your Bio Conversions', platform: 'Instagram', type: 'Story', impressions: 11200, engagement: 1800, shares: 240, saves: 660, viralScore: 76, date: 'Apr 2', status: 'active' },
  { id: 8, title: 'AI vs Human Content: The Real Results', platform: 'TikTok', type: 'Short Video', impressions: 56300, engagement: 8400, shares: 3200, saves: 1500, viralScore: 91, date: 'Mar 29', status: 'trending' },
];

export const viralScoreDistribution = [
  { range: '90-100', count: 18, label: 'Viral 🔥', fill: '#22c55e' },
  { range: '80-89', count: 32, label: 'High', fill: '#3b82f6' },
  { range: '70-79', count: 24, label: 'Good', fill: '#8b5cf6' },
  { range: '60-69', count: 14, label: 'Average', fill: '#f59e0b' },
  { range: 'Below 60', count: 6, label: 'Low', fill: '#ef4444' },
];

export const contentTypeData = [
  { name: 'Short Video', value: 38, engagement: 14.2, fill: '#3b82f6' },
  { name: 'Carousel', value: 22, engagement: 11.8, fill: '#8b5cf6' },
  { name: 'Thread', value: 18, engagement: 8.4, fill: '#06b6d4' },
  { name: 'Reel', value: 15, engagement: 12.6, fill: '#f59e0b' },
  { name: 'Article', value: 7, engagement: 6.2, fill: '#22c55e' },
];

export const weeklyHeatmap = [
  { day: 'Mon', '6AM': 12, '9AM': 45, '12PM': 78, '3PM': 92, '6PM': 88, '9PM': 65 },
  { day: 'Tue', '6AM': 18, '9AM': 52, '12PM': 85, '3PM': 96, '6PM': 91, '9PM': 70 },
  { day: 'Wed', '6AM': 15, '9AM': 48, '12PM': 82, '3PM': 89, '6PM': 84, '9PM': 58 },
  { day: 'Thu', '6AM': 20, '9AM': 55, '12PM': 90, '3PM': 98, '6PM': 95, '9PM': 72 },
  { day: 'Fri', '6AM': 14, '9AM': 42, '12PM': 76, '3PM': 86, '6PM': 80, '9PM': 62 },
  { day: 'Sat', '6AM': 8, '9AM': 28, '12PM': 54, '3PM': 68, '6PM': 74, '9PM': 82 },
  { day: 'Sun', '6AM': 6, '9AM': 22, '12PM': 48, '3PM': 62, '6PM': 70, '9PM': 78 },
];

export const audienceAge = [
  { range: '18-24', male: 28, female: 32 },
  { range: '25-34', male: 35, female: 38 },
  { range: '35-44', male: 22, female: 18 },
  { range: '45-54', male: 10, female: 8 },
  { range: '55+', male: 5, female: 4 },
];

export const topCountries = [
  { country: 'United States', percentage: 34, flag: '🇺🇸' },
  { country: 'India', percentage: 22, flag: '🇮🇳' },
  { country: 'United Kingdom', percentage: 12, flag: '🇬🇧' },
  { country: 'Canada', percentage: 8, flag: '🇨🇦' },
  { country: 'Germany', percentage: 6, flag: '🇩🇪' },
  { country: 'Australia', percentage: 5, flag: '🇦🇺' },
];

export const dashboardStats = [
  { label: 'Total Impressions', value: '284.5K', trend: '+18.2%', trendUp: true, color: '#3b82f6' },
  { label: 'Avg. Viral Score', value: '88.4', trend: '-1.2%', trendUp: false, color: '#f59e0b' },
  { label: 'Audience Reach', value: '89.4k', trend: '+12.5%', trendUp: true, color: '#8b5cf6' },
];

// ── Business / Monetization Programmatic Data ──
export const business30Days = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  // Gradual growth factor (30 days scalar)
  const growth = 1 + (i * 0.012); 
  
  // Weekend drop penalty (traffic drops drastically on weekends for SaaS)
  const multiplier = isWeekend ? 0.55 : 1.0;
  
  // Occasional spike (e.g., day 18 Marketing blast)
  const isSpike = i === 18 ? 2.8 : (i === 19 ? 1.5 : 1.0);
  
  const baseUsers = 400; // Foundational daily active users
  
  const users = Math.floor(baseUsers * growth * multiplier * isSpike + Math.random() * 80);
  const sessions = Math.floor(users * (1.15 + Math.random() * 0.3)); // Avg ~1.3 sessions per user
  const conversionRate = (1.8 + Math.random() * 1.2) * (isSpike > 1 ? 1.5 : 1.0) * (isWeekend ? 0.8 : 1.0);
  const revenue = Math.floor(users * (conversionRate / 100) * 85); // Assuming $85 AOV/LTV
  
  return {
    date: day,
    users,
    sessions,
    conversionRate: Number(conversionRate.toFixed(2)),
    revenue
  };
});

export const trafficSources = [
  { name: 'Organic Search', value: 45, fill: '#3b82f6' },
  { name: 'Direct Traffic', value: 25, fill: '#8b5cf6' },
  { name: 'Social Media', value: 20, fill: '#ec4899' },
  { name: 'Referral', value: 10, fill: '#06b6d4' },
];

export const businessWeeklyActivity = [
  { day: 'Mon', revenue: 2420, users: 480 },
  { day: 'Tue', revenue: 3100, users: 540 },
  { day: 'Wed', revenue: 2800, users: 510 },
  { day: 'Thu', revenue: 3500, users: 620 },
  { day: 'Fri', revenue: 2900, users: 560 },
  { day: 'Sat', revenue: 1100, users: 280 },
  { day: 'Sun', revenue: 1400, users: 310 },
];
