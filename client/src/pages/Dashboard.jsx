import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, Zap, Users, Bot } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import SkeletonLoaders from '../components/ui/SkeletonLoaders';
import { usePlatform } from '../context/PlatformContext';

export default function Dashboard() {
  const [trends, setTrends] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { platform } = usePlatform();

  const chartData = [
    { name: '00:00', reach: 400, engagement: 240 },
    { name: '04:00', reach: 300, engagement: 139 },
    { name: '08:00', reach: 900, engagement: 980 },
    { name: '12:00', reach: 1480, engagement: 1108 },
    { name: '16:00', reach: 1890, engagement: 1400 },
    { name: '20:00', reach: 2390, engagement: 1700 },
    { name: '23:59', reach: 2100, engagement: 1500 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [trendsRes, analyticsRes] = await Promise.all([
          api.get(`trends?platform=${platform}`),
          api.get('analytics')
        ]);
        setTrends((trendsRes.data.trends || []).slice(0, 5));
        setAnalytics(analyticsRes.data.data);
      } catch (err) {
        toast.error('Failed to sync with marketing nodes');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [platform]);

  if (loading) return <SkeletonLoaders count={4} />;

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-8 animate-fade-in relative z-10 w-full h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Strategic Command</h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
              <Activity size={10} /> Live Data Link Active
            </div>
          </div>
          <p className="text-text-muted font-medium text-sm">Synchronized with global API nodes for real-time market extraction.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-3 flex flex-col items-end justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Global Node Status</p>
            <p className="text-sm font-bold text-white">UPTIME: 99.9%</p>
          </div>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Network Impressions", value: analytics?.views?.total?.toLocaleString() || "284k", icon: Users, trend: analytics?.views?.growthPercent || "+12.4%", color: "#3b82f6" },
          { title: "Conversion Velocity", value: analytics?.engagementRate?.total || "14.8%", icon: Zap, trend: analytics?.engagementRate?.growthPercent || "+5.2%", color: "#8b5cf6" },
          { title: "Asset Virality", value: analytics?.shares?.total?.toLocaleString() || "88.4", icon: TrendingUp, trend: analytics?.shares?.growthPercent || "Elite", color: "#f59e0b" },
          { title: "Market Retention", value: analytics?.watchTimeAvg?.total || "22s", icon: Activity, trend: analytics?.watchTimeAvg?.growthPercent || "Stable", color: "#22c55e" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border border-white/5 group hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-surface-accent border border-white/5 group-hover:scale-110 transition-transform">
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">{stat.title}</p>
              <h3 className="text-4xl font-black text-white tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Performance Graph */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-3 glass-card p-8 min-h-[500px] flex flex-col border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Global Attention Map</h3>
              <p className="text-xs text-text-muted font-medium">Predictive engagement distribution across active time zones.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]" />
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Network Reach</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Growth Factor</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[400px] min-h-[400px]">
             <ResponsiveContainer width="100%" height="100%" debounce={50}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '800' }}
                  />
                  <Area type="monotone" dataKey="reach" stroke="var(--color-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorReach)" />
                  <Area type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorEng)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Real-time Trend Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-0 flex flex-col h-full border border-white/5 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Live Trends</h3>
              <p className="text-[10px] text-text-muted font-bold">Algorithmic Extraction</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-[10px] font-black text-red-500 uppercase">Real-time</span>
            </div>
          </div>
          
          <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            {trends.length > 0 ? (
              trends.map((trend, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{trend.topic}</h4>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md uppercase">Hot</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black uppercase tracking-widest text-text-muted opacity-60">Algo Score</p>
                       <p className="text-lg font-black text-white">{trend.score}</p>
                    </div>
                    <div className="text-right">
                       <TrendingUp size={14} className="text-primary ml-auto mb-1" />
                       <p className="text-[9px] font-black text-text-muted uppercase whitespace-nowrap">{trend.status}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-30 py-20">
                 <Bot size={40} className="mb-4 animate-bounce" />
                 <p className="text-xs font-black uppercase tracking-widest">Scanning Network...</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-white/5 bg-white/[0.02]">
            <button className="w-full py-3 rounded-xl bg-surface-accent border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-white transition-all">
              View Detailed Analytics
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
