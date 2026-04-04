import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend,
  LineChart, Line, ComposedChart
} from 'recharts';
import {
  Activity, Users, Eye, TrendingUp, Flame, Zap, Target, Crown,
  ArrowUpRight, ArrowDownRight, Calendar, Clock, Hash, Heart,
  MessageCircle, Share2, Bookmark, BarChart3, PieChart as PieIcon,
  Filter, ChevronDown, Sparkles, Award, Globe, LineChart as LineChartIcon, DollarSign, Wallet, MousePointerClick
} from 'lucide-react';

import { 
  last30Days, 
  platformData, 
  contentPerformance, 
  viralScoreDistribution, 
  contentTypeData, 
  weeklyHeatmap, 
  audienceAge, 
  topCountries,
  business30Days,
  trafficSources,
  businessWeeklyActivity
} from '../data/mockData';
import { usePlatform } from '../context/PlatformContext';


// â”€â”€ Custom Tooltip Component â”€â”€
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-[var(--text-muted)] text-xs font-medium mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[var(--text-main)] capitalize font-bold">{entry.dataKey}:</span>
          <span className="text-[var(--text-main)] font-black">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// â”€â”€ Stat Card Component â”€â”€
function StatCard({ icon: Icon, label, value, trend, trendUp, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {/* Dynamic Glow */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 rounded-xl bg-[var(--surface-accent)]">
          <Icon size={20} style={{ color }} />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 ${
          trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
        }`}>
          {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trend}
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-[var(--text-muted)] text-xs font-black uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black text-[var(--text-main)] tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
}

// â”€â”€ Section Header â”€â”€
function SectionHeader({ icon: Icon, title, subtitle, color = '#3b82f6' }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-main">{title}</h3>
        {subtitle && <p className="text-text-muted text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function Analytics() {
  const { platform, platformInfo } = usePlatform();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');

  const strategistInsights = {
    'Instagram': 'Reels reach is currently 2.4x higher than static posts. Focus on 7-9 second hooks with high contrast visuals.',
    'TikTok': 'The "Green Screen" effect is trending in your niche. Leverage it for a 15% projected boost in discovery.',
    'YouTube': 'CTR is slightly lagging on your latest uploads. Try increasing thumbnail text contrast to improve click-through.',
    'LinkedIn': 'Text-heavy "thought leadership" carousels are gaining 22% more saves than image posts this week.',
    'Twitter/X': 'Threads with at least 5 posts are seeing significantly higher engagement duration. Optimize for 8PM EST.',
  };

  const periods = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'content', label: 'Content', icon: PieIcon },
    { key: 'audience', label: 'Audience', icon: Users },
    { key: 'business', label: 'Business & Traffic', icon: LineChartIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-8"
    >
      {/* â”€â”€ Header â”€â”€ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400 font-black tracking-tight">
              Performance Analytics
            </h1>
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              Live Network
            </span>
          </div>
          <p className="text-text-muted text-sm font-medium">Deep-dive into your content performance across all platforms.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setSelectedPeriod(p.key)}
              className={`px-5 py-2.5 text-xs rounded-xl font-black uppercase tracking-widest transition-all duration-200 ${
                selectedPeriod === p.key
                  ? 'bg-primary text-white shadow-xl shadow-primary/25'
                  : 'bg-surface-accent text-text-muted hover:bg-surface-accent/80 hover:text-text-main border border-border-subtle'
              }`}
            >
              {p.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Strategist Insight Card ── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-primary/20 bg-primary/5 flex items-center gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <Sparkles size={120} />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
          <Sparkles size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-1">AI Strategist Recommendation for {platform}</h4>
          <p className="text-text-muted text-sm font-medium leading-relaxed">
            {strategistInsights[platform] || "Focus on consistent high-quality posting for maximum algorithmic favor."}
          </p>
        </div>
      </motion.div>

      {/* â”€â”€ Tab Navigation â”€â”€ */}
      <div className="flex gap-1 p-1.5 bg-surface-accent/50 border border-border-subtle backdrop-blur-md rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-3 text-xs rounded-xl font-black uppercase tracking-widest transition-all duration-200 ${
              selectedTab === tab.key
                ? 'bg-surface text-primary shadow-lg border border-border-subtle'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* â”€â”€ KPI Cards â”€â”€ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Eye} label="Total Impressions" value="284.5K" trend="+18.2%" trendUp={true} color="#3b82f6" delay={0} />
              <StatCard icon={Activity} label="Engagement Rate" value="14.8%" trend="+5.2%" trendUp={true} color="#22c55e" delay={0.08} />
              <StatCard icon={Users} label="New Followers" value="+3,240" trend="+22.1%" trendUp={true} color="#8b5cf6" delay={0.16} />
              <StatCard icon={Flame} label="Viral Score Avg" value="88.4" trend="-1.2%" trendUp={false} color="#f59e0b" delay={0.24} />
            </div>

            {/* â”€â”€ Engagement Timeline â”€â”€ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card p-6 border border-border-subtle"
            >
              <SectionHeader icon={Activity} title="Engagement Timeline" subtitle="Impressions, engagement & clicks over the last 30 days" color="#3b82f6" />
              <div className="h-[340px] w-full min-h-[340px]">
                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                  <AreaChart data={last30Days} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradImpressions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="date" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} interval={4} />
                    <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#gradImpressions)" />
                    <Area type="monotone" dataKey="engagement" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#gradEngagement)" />
                    <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#gradClicks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-4 justify-center">
                {[
                  { label: 'Impressions', color: '#3b82f6' },
                  { label: 'Engagement', color: '#22c55e' },
                  { label: 'Clicks', color: '#8b5cf6' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* â”€â”€ Platform Performance + Viral Distribution â”€â”€ */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Platform Cards */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="lg:col-span-3 glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Globe} title="Platform Breakdown" subtitle="Performance metrics by platform" color="#06b6d4" />
                <div className="space-y-3">
                  {platformData.map((pData, i) => (
                    <motion.div key={pData.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                        pData.name === platform 
                          ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/5 ring-1 ring-primary/20' 
                          : 'bg-surface-accent border-transparent grayscale hover:grayscale-0 hover:border-border-subtle'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: `${pData.color}18`, color: pData.color }}>
                        {pData.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-text-main">{pData.name}</span>
                            {pData.name === platform && (
                              <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-primary text-white rounded-full">ACTIVE</span>
                            )}
                          </div>
                          <span className="text-xs font-black text-emerald-400">{pData.growth}</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-accent rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pData.viralScore}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: pData.color }}
                          />
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-text-main">{(pData.reach / 1000).toFixed(1)}K</p>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">reach</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-text-main">{platform.posts}</p>
                        <p className="text-[10px] text-text-muted">posts</p>
                      </div>
                      <div className="w-12 h-8 flex items-center justify-center rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: platform.viralScore >= 90 ? '#22c55e18' : platform.viralScore >= 80 ? '#3b82f618' : '#f59e0b18',
                          color: platform.viralScore >= 90 ? '#22c55e' : platform.viralScore >= 80 ? '#3b82f6' : '#f59e0b'
                        }}
                      >
                        {platform.viralScore}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Viral Score Distribution */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Flame} title="Viral Score Distribution" subtitle="Score breakdown across all content" color="#f59e0b" />
                <div className="h-[220px] w-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <BarChart data={viralScoreDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
                      <XAxis dataKey="range" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {viralScoreDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {viralScoreDistribution.map((item) => (
                    <div key={item.range} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-text-muted">{item.label}</span>
                      </div>
                      <span className="text-text-main font-semibold">{item.count} posts</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* â”€â”€ Best Times to Post (Heatmap) â”€â”€ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="glass-card p-6 border border-border-subtle"
            >
              <SectionHeader icon={Clock} title="Best Time to Post" subtitle="Engagement intensity by day and time (higher = better)" color="#8b5cf6" />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-text-muted pb-3 pr-4 w-12">Day</th>
                      {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time) => (
                        <th key={time} className="text-center text-xs font-medium text-text-muted pb-3 px-2">{time}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyHeatmap.map((row, ri) => (
                      <tr key={row.day}>
                        <td className="text-xs font-semibold text-text-muted py-1.5 pr-4">{row.day}</td>
                        {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time) => {
                          const val = row[time];
                          const intensity = val / 100;
                          return (
                            <td key={time} className="px-1.5 py-1.5">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + ri * 0.04 + 0.02 }}
                                className="w-full h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 cursor-default"
                                style={{
                                  backgroundColor: `rgba(59, 130, 246, ${0.08 + intensity * 0.5})`,
                                  color: intensity > 0.7 ? '#93c5fd' : intensity > 0.4 ? '#60a5fa80' : '#3b82f640',
                                  border: `1px solid rgba(59, 130, 246, ${intensity * 0.3})`,
                                }}
                                title={`${row.day} ${time}: ${val}% engagement`}
                              >
                                {val}
                              </motion.div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-text-muted mt-3 text-center">ðŸ’¡ Optimal posting windows: <span className="text-primary font-semibold">Thu 3PM</span> and <span className="text-primary font-semibold">Tue 3PM</span> show highest engagement</p>
            </motion.div>
          </motion.div>
        )}

        {selectedTab === 'content' && (
          <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* â”€â”€ Content Type Breakdown â”€â”€ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={PieIcon} title="Content Types" subtitle="Distribution by format" color="#8b5cf6" />
                <div className="h-[240px] w-full min-h-[240px]">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <PieChart>
                      <Pie
                        data={contentTypeData}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {contentTypeData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {contentTypeData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.fill }} />
                        <span className="text-text-muted">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted">{item.engagement}% eng.</span>
                        <span className="text-text-main font-semibold w-8 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* â”€â”€ Top Performing Content â”€â”€ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="lg:col-span-2 glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Crown} title="Top Performing Content" subtitle="Highest engagement posts this month" color="#f59e0b" />
                <div className="space-y-3">
                  {contentPerformance.slice(0, 5).map((content, i) => (
                    <motion.div key={content.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-surface-accent hover:bg-surface-accent transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-accent flex items-center justify-center text-sm font-bold text-text-muted">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-main truncate">{content.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-accent text-text-muted">{content.platform}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-accent text-text-muted">{content.type}</span>
                          <span className="text-[10px] text-text-muted">{content.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <div className="text-center hidden sm:block">
                          <p className="font-bold text-text-main text-sm">{(content.impressions / 1000).toFixed(1)}K</p>
                          <p className="text-[10px] text-text-muted">views</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="font-bold text-text-main text-sm">{(content.engagement / 1000).toFixed(1)}K</p>
                          <p className="text-[10px] text-text-muted">engmt</p>
                        </div>
                      </div>
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        content.status === 'viral' ? 'bg-emerald-500/15 text-emerald-400' :
                        content.status === 'trending' ? 'bg-amber-500/15 text-amber-400' :
                        'bg-blue-500/15 text-blue-400'
                      }`}>
                        {content.status === 'viral' && 'ðŸ”¥'} {content.viralScore}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* â”€â”€ Full Content Table â”€â”€ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card p-6 border border-border-subtle"
            >
              <SectionHeader icon={BarChart3} title="Content Performance Table" subtitle="Detailed metrics for all published content" color="#3b82f6" />
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Content</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Platform</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Impressions</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Engagement</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Shares</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Saves</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Score</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentPerformance.map((row, i) => (
                      <motion.tr key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 + i * 0.04 }}
                        className="border-b border-white/[0.03] hover:bg-surface-accent transition-colors"
                      >
                        <td className="py-3 px-3">
                          <p className="font-medium text-text-main truncate max-w-[240px]">{row.title}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">{row.type} Â· {row.date}</p>
                        </td>
                        <td className="py-3 px-3 text-text-muted">{row.platform}</td>
                        <td className="py-3 px-3 text-right text-text-main font-medium">{row.impressions.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-text-main font-medium">{row.engagement.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-text-muted">{row.shares.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-text-muted">{row.saves.toLocaleString()}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${
                            row.viralScore >= 90 ? 'bg-emerald-500/15 text-emerald-400' :
                            row.viralScore >= 80 ? 'bg-blue-500/15 text-blue-400' :
                            'bg-amber-500/15 text-amber-400'
                          }`}>{row.viralScore}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            row.status === 'viral' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            row.status === 'trending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>{row.status}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedTab === 'audience' && (
          <motion.div key="audience" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* â”€â”€ Audience Stats â”€â”€ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Followers" value="39.5K" trend="+12.4%" trendUp={true} color="#8b5cf6" delay={0} />
              <StatCard icon={Eye} label="Profile Views" value="8,420" trend="+28.3%" trendUp={true} color="#3b82f6" delay={0.08} />
              <StatCard icon={Target} label="Click-Through Rate" value="4.2%" trend="+0.8%" trendUp={true} color="#06b6d4" delay={0.16} />
              <StatCard icon={Heart} label="Avg. Saves/Post" value="842" trend="+15.6%" trendUp={true} color="#ec4899" delay={0.24} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* â”€â”€ Age Demographics â”€â”€ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Users} title="Age Demographics" subtitle="Audience age distribution by gender" color="#8b5cf6" />
                <div className="h-[260px] w-full min-h-[260px]">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <BarChart data={audienceAge} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="range" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="male" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Male" />
                      <Bar dataKey="female" fill="#ec4899" radius={[4, 4, 0, 0]} name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-3 justify-center">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Male
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Female
                  </div>
                </div>
              </motion.div>

              {/* â”€â”€ Top Countries â”€â”€ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Globe} title="Top Regions" subtitle="Audience distribution by country" color="#06b6d4" />
                <div className="space-y-3 mt-2">
                  {topCountries.map((country, i) => (
                    <motion.div key={country.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl w-8">{country.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-text-main">{country.country}</span>
                          <span className="text-xs font-semibold text-text-muted">{country.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-surface-accent rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${country.percentage}%` }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-border-subtle">
                  <div className="text-center p-3 rounded-xl bg-surface-accent">
                    <p className="text-lg font-bold text-text-main">62%</p>
                    <p className="text-[10px] text-text-muted mt-0.5">English Speaking</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-surface-accent">
                    <p className="text-lg font-bold text-text-main">78%</p>
                    <p className="text-[10px] text-text-muted mt-0.5">Mobile Users</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'business' && (
          <motion.div key="business" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            
            {/* â”€â”€ KPI Cards â”€â”€ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Users" value="18,482" trend="+14.2%" trendUp={true} color="#3b82f6" delay={0} />
              <StatCard icon={Activity} label="Active Sessions" value="23,912" trend="+16.8%" trendUp={true} color="#8b5cf6" delay={0.08} />
              <StatCard icon={MousePointerClick} label="Conversion Rate" value="2.8%" trend="+0.4%" trendUp={true} color="#06b6d4" delay={0.16} />
              <StatCard icon={DollarSign} label="Monthly Revenue" value="$42,390" trend="+24.2%" trendUp={true} color="#22c55e" delay={0.24} />
            </div>

            {/* â”€â”€ Business Growth Timeline â”€â”€ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card p-6 border border-border-subtle"
            >
              <SectionHeader icon={LineChartIcon} title="Traffic & Conversion Timeline" subtitle="Correlating visitor volume with realized revenue (Last 30 Days)" color="#22c55e" />
              <div className="h-[340px] w-full min-h-[340px]">
                <ResponsiveContainer width="100%" height="100%" debounce={50}>
                  <ComposedChart data={business30Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="date" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} interval={4} />
                    
                    {/* Primary Y-Axis for Volume */}
                    <YAxis yAxisId="left" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v} />
                    
                    {/* Secondary Y-Axis for Revenue */}
                    <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area yAxisId="left" type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#gradSessions)" name="Sessions" />
                    <Area yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#gradUsers)" name="Users" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#18181b', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff' }} name="Revenue USD" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-4 justify-center">
                {[
                  { label: 'Total Sessions', color: '#8b5cf6' },
                  { label: 'Unique Users', color: '#3b82f6' },
                  { label: 'USD Revenue', color: '#22c55e' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* â”€â”€ Traffic Sources Pie â”€â”€ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Globe} title="Traffic Acquisition" subtitle="Where your users are coming from" color="#3b82f6" />
                <div className="h-[260px] w-full min-h-[260px]">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%" cy="50%"
                        innerRadius={70} outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {trafficSources.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {trafficSources.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm p-2 rounded-lg bg-surface-accent">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-md" style={{ backgroundColor: item.fill }} />
                        <span className="text-text-main">{item.name}</span>
                      </div>
                      <span className="text-text-main font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* â”€â”€ Weekly Activity Bar Chart â”€â”€ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="glass-card p-6 border border-border-subtle"
              >
                <SectionHeader icon={Calendar} title="Weekly Averages" subtitle="Traffic and revenue normalized by day of week" color="#8b5cf6" />
                <div className="h-[260px] w-full min-h-[260px]">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <BarChart data={businessWeeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="day" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar yAxisId="left" dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Avg Users" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4 justify-center mt-auto">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Average Users
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

