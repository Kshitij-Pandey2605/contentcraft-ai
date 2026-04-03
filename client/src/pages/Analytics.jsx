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
  Filter, ChevronDown, Sparkles, Award, Globe
} from 'lucide-react';

import { 
  last30Days, 
  platformData, 
  contentPerformance, 
  viralScoreDistribution, 
  contentTypeData, 
  weeklyHeatmap, 
  audienceAge, 
  topCountries 
} from '../data/mockData';

// ── Custom Tooltip Component ──
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-zinc-400 text-xs font-medium mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-zinc-300 capitalize">{entry.dataKey}:</span>
          <span className="text-white font-semibold">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// ── Stat Card Component ──
function StatCard({ icon: Icon, label, value, trend, trendUp, color, bgColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card p-5 border border-white/5 group hover:border-white/15 relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        style={{ backgroundColor: color }}
      />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
          trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
        }`}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-zinc-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
}

// ── Section Header ──
function SectionHeader({ icon: Icon, title, subtitle, color = '#3b82f6' }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');

  const periods = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'content', label: 'Content', icon: PieIcon },
    { key: 'audience', label: 'Audience', icon: Users },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-8"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400">
              Performance Analytics
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/20">
              Live
            </span>
          </div>
          <p className="text-zinc-500 text-sm">Deep-dive into your content performance across all platforms.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setSelectedPeriod(p.key)}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 ${
                selectedPeriod === p.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl font-medium transition-all duration-200 ${
              selectedTab === tab.key
                ? 'bg-surface text-white shadow-lg border border-white/10'
                : 'text-zinc-500 hover:text-zinc-300'
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
            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Eye} label="Total Impressions" value="284.5K" trend="+18.2%" trendUp={true} color="#3b82f6" delay={0} />
              <StatCard icon={Activity} label="Engagement Rate" value="14.8%" trend="+5.2%" trendUp={true} color="#22c55e" delay={0.08} />
              <StatCard icon={Users} label="New Followers" value="+3,240" trend="+22.1%" trendUp={true} color="#8b5cf6" delay={0.16} />
              <StatCard icon={Flame} label="Viral Score Avg" value="88.4" trend="-1.2%" trendUp={false} color="#f59e0b" delay={0.24} />
            </div>

            {/* ── Engagement Timeline ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card p-6 border border-white/5"
            >
              <SectionHeader icon={Activity} title="Engagement Timeline" subtitle="Impressions, engagement & clicks over the last 30 days" color="#3b82f6" />
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
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
                  <div key={item.label} className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Platform Performance + Viral Distribution ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Platform Cards */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="lg:col-span-3 glass-card p-6 border border-white/5"
              >
                <SectionHeader icon={Globe} title="Platform Breakdown" subtitle="Performance metrics by platform" color="#06b6d4" />
                <div className="space-y-3">
                  {platformData.map((platform, i) => (
                    <motion.div key={platform.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: `${platform.color}18`, color: platform.color }}>
                        {platform.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-white">{platform.name}</span>
                          <span className="text-xs font-medium text-emerald-400">{platform.growth}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${platform.viralScore}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: platform.color }}
                          />
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">{(platform.reach / 1000).toFixed(1)}K</p>
                        <p className="text-[10px] text-zinc-500">reach</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">{platform.posts}</p>
                        <p className="text-[10px] text-zinc-500">posts</p>
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
                className="lg:col-span-2 glass-card p-6 border border-white/5"
              >
                <SectionHeader icon={Flame} title="Viral Score Distribution" subtitle="Score breakdown across all content" color="#f59e0b" />
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
                        <span className="text-zinc-400">{item.label}</span>
                      </div>
                      <span className="text-zinc-300 font-semibold">{item.count} posts</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Best Times to Post (Heatmap) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="glass-card p-6 border border-white/5"
            >
              <SectionHeader icon={Clock} title="Best Time to Post" subtitle="Engagement intensity by day and time (higher = better)" color="#8b5cf6" />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-zinc-500 pb-3 pr-4 w-12">Day</th>
                      {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((time) => (
                        <th key={time} className="text-center text-xs font-medium text-zinc-500 pb-3 px-2">{time}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyHeatmap.map((row, ri) => (
                      <tr key={row.day}>
                        <td className="text-xs font-semibold text-zinc-400 py-1.5 pr-4">{row.day}</td>
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
              <p className="text-[10px] text-zinc-600 mt-3 text-center">💡 Optimal posting windows: <span className="text-primary font-semibold">Thu 3PM</span> and <span className="text-primary font-semibold">Tue 3PM</span> show highest engagement</p>
            </motion.div>
          </motion.div>
        )}

        {selectedTab === 'content' && (
          <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* ── Content Type Breakdown ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 border border-white/5"
              >
                <SectionHeader icon={PieIcon} title="Content Types" subtitle="Distribution by format" color="#8b5cf6" />
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
                        <span className="text-zinc-400">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500">{item.engagement}% eng.</span>
                        <span className="text-zinc-200 font-semibold w-8 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Top Performing Content ── */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="lg:col-span-2 glass-card p-6 border border-white/5"
              >
                <SectionHeader icon={Crown} title="Top Performing Content" subtitle="Highest engagement posts this month" color="#f59e0b" />
                <div className="space-y-3">
                  {contentPerformance.slice(0, 5).map((content, i) => (
                    <motion.div key={content.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-zinc-500">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{content.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">{content.platform}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500">{content.type}</span>
                          <span className="text-[10px] text-zinc-600">{content.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <div className="text-center hidden sm:block">
                          <p className="font-bold text-white text-sm">{(content.impressions / 1000).toFixed(1)}K</p>
                          <p className="text-[10px] text-zinc-500">views</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="font-bold text-white text-sm">{(content.engagement / 1000).toFixed(1)}K</p>
                          <p className="text-[10px] text-zinc-500">engmt</p>
                        </div>
                      </div>
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        content.status === 'viral' ? 'bg-emerald-500/15 text-emerald-400' :
                        content.status === 'trending' ? 'bg-amber-500/15 text-amber-400' :
                        'bg-blue-500/15 text-blue-400'
                      }`}>
                        {content.status === 'viral' && '🔥'} {content.viralScore}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Full Content Table ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card p-6 border border-white/5"
            >
              <SectionHeader icon={BarChart3} title="Content Performance Table" subtitle="Detailed metrics for all published content" color="#3b82f6" />
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Content</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Platform</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Impressions</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Engagement</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Shares</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Saves</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Score</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentPerformance.map((row, i) => (
                      <motion.tr key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 + i * 0.04 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 px-3">
                          <p className="font-medium text-white truncate max-w-[240px]">{row.title}</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{row.type} · {row.date}</p>
                        </td>
                        <td className="py-3 px-3 text-zinc-400">{row.platform}</td>
                        <td className="py-3 px-3 text-right text-zinc-300 font-medium">{row.impressions.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-zinc-300 font-medium">{row.engagement.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-zinc-400">{row.shares.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-zinc-400">{row.saves.toLocaleString()}</td>
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
            {/* ── Audience Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Followers" value="39.5K" trend="+12.4%" trendUp={true} color="#8b5cf6" delay={0} />
              <StatCard icon={Eye} label="Profile Views" value="8,420" trend="+28.3%" trendUp={true} color="#3b82f6" delay={0.08} />
              <StatCard icon={Target} label="Click-Through Rate" value="4.2%" trend="+0.8%" trendUp={true} color="#06b6d4" delay={0.16} />
              <StatCard icon={Heart} label="Avg. Saves/Post" value="842" trend="+15.6%" trendUp={true} color="#ec4899" delay={0.24} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ── Age Demographics ── */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card p-6 border border-white/5"
              >
                <SectionHeader icon={Users} title="Age Demographics" subtitle="Audience age distribution by gender" color="#8b5cf6" />
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Male
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Female
                  </div>
                </div>
              </motion.div>

              {/* ── Top Countries ── */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="glass-card p-6 border border-white/5"
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
                          <span className="text-sm font-medium text-zinc-300">{country.country}</span>
                          <span className="text-xs font-semibold text-zinc-400">{country.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
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
                <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/5">
                  <div className="text-center p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-lg font-bold text-white">62%</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">English Speaking</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-lg font-bold text-white">78%</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Mobile Users</p>
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
