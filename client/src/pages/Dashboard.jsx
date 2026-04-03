import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, MessageSquarePlus, Lightbulb, Wand2, 
  ArrowUpRight, TrendingUp, Users, Activity, 
  Sparkles, Zap, ChevronRight, Eye, RefreshCw, BarChart3,
  Globe, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useUser } from '../context/UserContext';
import { last30Days } from '../data/mockData';

const sparklineData = last30Days.slice(-7);

export default function Dashboard() {
  const { isProfileComplete, getProfile, user } = useUser();
  const profile = getProfile();

  // Mathematical logic for evaluating real metrics based on profile inputs
  const stats = useMemo(() => {
    if (!isProfileComplete || !profile) return null;

    const platforms = profile.platforms || [];
    const metrics = profile.metrics || {};

    let totalFollowers = 0;
    let avgEngagement = 0;
    let totalImpressionExpectancy = 0;

    platforms.forEach(p => {
      const m = metrics[p] || {};
      const f = parseInt(m.followers) || 0;
      const e = parseFloat(m.engagement) || 0;
      const freq = parseInt(m.frequency) || 1;

      totalFollowers += f;
      avgEngagement += e;
      // Heuristic: Monthly impressions ~ followers * frequency * engagement_factor
      totalImpressionExpectancy += (f * freq * (e / 100) * 12); 
    });

    avgEngagement = platforms.length > 0 ? (avgEngagement / platforms.length).toFixed(1) : 0;
    
    return [
      { 
        label: 'Potential Monthly Reach', 
        value: `${(totalImpressionExpectancy / 1000).toFixed(1)}K`, 
        trend: '+12.4%', 
        trendUp: true, 
        color: '#3b82f6',
        icon: Eye
      },
      { 
        label: 'Total Follower Base', 
        value: totalFollowers > 1000 ? `${(totalFollowers / 1000).toFixed(1)}K` : totalFollowers, 
        trend: '+5.2%', 
        trendUp: true, 
        color: '#06b6d4',
        icon: Users
      },
      { 
        label: 'Avg. Engagement Index', 
        value: `${avgEngagement}%`, 
        trend: '-0.8%', 
        trendUp: false, 
        color: '#a855f7',
        icon: TrendingUp
      },
    ];
  }, [isProfileComplete, profile]);

  if (!isProfileComplete) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-2xl border-dashed border-white/10 bg-white/[0.02] relative"
        >
          <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/10 animate-pulse">
            <RefreshCw className="text-primary" size={40} />
          </div>
          
          <h2 className="text-4xl font-black tracking-tight text-white mb-4">Analytics Out of Sync</h2>
          <p className="text-lg text-zinc-500 font-medium leading-relaxed mb-10">
            We haven't evaluated your social presence yet. Sync your profiles to unlock real-time metric calculations and AI-driven viral predictions.
          </p>

          <Link 
            to="/profile" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary hover:bg-primaryHover text-white rounded-2xl font-black transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 group active:scale-95"
          >
            START REAL-TIME SYNC <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-3 gap-8">
            <div className="text-center">
              <BarChart3 className="mx-auto text-zinc-700 mb-2" size={20} />
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-tight">Accurate Evaluation</p>
            </div>
            <div className="text-center">
              <Globe className="mx-auto text-zinc-700 mb-2" size={20} />
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-tight">Platform Insights</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="mx-auto text-zinc-700 mb-2" size={20} />
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-tight">Secure Growth</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-sans tracking-tight">
            Welcome Back, {user?.name || 'Creator'} <span className="wave">👋</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-lg">Your trajectory is set for <span className="text-white font-semibold">{stats?.[0]?.value || '0'} reach</span> this month.</p>
        </div>
        <Link to="/generate" className="px-8 py-4 bg-primary hover:bg-primaryHover text-white rounded-2xl font-black transition-all shadow-xl shadow-primary/25 flex items-center gap-2 group active:scale-95">
          <Zap size={20} className="group-hover:rotate-12 transition-transform" />
          QUICK CREATE
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" 
                 style={{ backgroundColor: stat.color }} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5" style={{ color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wide ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {stat.trendUp ? <ArrowUpRight size={14} /> : <Activity size={14} />}
                {stat.trend}
              </div>
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 leading-tight mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black mt-1 tracking-tighter">{stat.value}</h3>
              </div>
              <div className="h-12 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData}>
                    <Area 
                      type="monotone" 
                      dataKey={stat.label.includes('Engagement') ? 'engagement' : 'impressions'} 
                      stroke={stat.color} 
                      fill={stat.color} 
                      fillOpacity={0.1} 
                      strokeWidth={3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Sparkles className="text-accent" size={24} /> AI Creation Suite
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ToolCard to="/generate" icon={PenTool} title="Viral Content" desc="Generate platform-specific posts with high virality potential" delay={0.1} />
            <ToolCard to="/ask" icon={MessageSquarePlus} title="Ask AI Assistant" desc="Get strategy tips and answers to complex marketing questions" delay={0.2} />
            <ToolCard to="/ideas" icon={Lightbulb} title="Viral Idea Discovery" desc="Discover trending topics tailored for your specific niche" delay={0.3} />
            <ToolCard to="/improve" icon={Wand2} title="Masterpiece Improver" desc="Enhance your existing drafts with pattern-interrupting hooks" delay={0.4} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <TrendingUp className="text-emerald-400" size={24} /> Evaluation
            </h2>
            <Link to="/analytics" className="text-xs font-black text-zinc-500 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest">
              Live <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black text-white flex items-center gap-2 uppercase tracking-widest text-xs">
                <Sparkles size={16} className="text-primary" /> Predictive Insight
              </h4>
              <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
                Based on your <span className="text-white font-bold">{profile?.platforms?.length} active syncs</span>, your engagement is projected to grow <span className="text-emerald-400 font-bold">14.2%</span> if you maintain your current frequency.
              </p>
              <button className="mt-6 text-xs font-black text-primary hover:text-primaryHover transition-colors flex items-center gap-2 uppercase tracking-widest">
                Optimize Strategy <ArrowUpRight size={14} />
              </button>
            </div>
            <Zap size={80} className="absolute -bottom-6 -right-6 text-primary/5 group-hover:rotate-12 transition-transform duration-700" />
          </div>

          <div className="glass-card p-6 border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Active Distribution</h4>
            <div className="flex flex-wrap gap-2">
              {profile?.platforms?.map(p => (
                <div key={p} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ToolCard({ to, icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Link to={to} className="block glass-card p-8 hover:-translate-y-2 transition-all duration-300 group h-full border border-white/5 hover:border-primary/30 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all rounded-full" />
        <div className="p-4 bg-white/[0.03] rounded-2xl w-min group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 border border-white/5 relative z-10">
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-black mt-6 mb-3 group-hover:text-primary transition-colors tracking-tight">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed font-medium">{desc}</p>
      </Link>
    </motion.div>
  );
}
