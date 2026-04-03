import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Hash, BarChart3, Radio, Zap, Globe, Target, Cpu } from 'lucide-react';
import { getTrends } from '../services/api';

export default function TrendEngine() {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTrends = async (e) => {
    e.preventDefault();
    if (!niche) return;

    setLoading(true);
    setError('');

    try {
      const res = await getTrends(niche, platform);
      if (res.success) {
        setTrends(res.data);
      } else {
        setError(res.error || 'Failed to analyze trends');
      }
    } catch (err) {
      setError('Error connecting to the live analytics engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-10 pb-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-sans flex items-center gap-3 tracking-tight">
            <Radio className="text-accent animate-pulse" size={32} /> 
            Live Trend Engine
          </h1>
          <p className="text-zinc-500 mt-2 text-lg">Real-time simulation of social algorithm data and viral triggers.</p>
        </div>
      </div>

      <div className="glass-card p-8 border border-white/5 bg-gradient-to-br from-surface to-surfaceAccent/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl -z-10 pointer-events-none" />
        <form onSubmit={fetchTrends} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end relative z-10">
          <div className="md:col-span-6 lg:col-span-7">
            <label className="block text-sm font-bold mb-3 text-zinc-400 uppercase tracking-widest">Identify Your Niche</label>
            <div className="relative group">
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. AI Startups, Micro-SaaS, Growth Design..."
                className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-zinc-600 focus:ring-4 focus:ring-accent/5"
                required
              />
              <Target size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors" />
            </div>
          </div>
          <div className="md:col-span-4 lg:col-span-3">
            <label className="block text-sm font-bold mb-3 text-zinc-400 uppercase tracking-widest">Social Channel</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent transition-all duration-300 appearance-none cursor-pointer"
            >
              {['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Twitter / X'].map(p => (
                <option key={p} className="bg-surfaceAccent">{p}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex items-end">
            <button 
              type="submit"
              disabled={loading || !niche}
              className="w-full h-[60px] bg-accent hover:bg-cyan-400 text-surfaceAccent rounded-2xl font-black uppercase tracking-tighter text-lg transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? <Activity className="animate-spin" /> : <><TrendingUp size={22} className="group-hover:rotate-12 transition-transform" /> GO</>}
            </button>
          </div>
        </form>
        {error && <p className="text-red-400 mt-4 text-sm font-medium flex items-center gap-2 animate-bounce-short"><Activity size={14} /> {error}</p>}
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 glass-card bg-surfaceAccent/20 animate-pulse border-white/5 border rounded-3xl" />
            ))}
          </motion.div>
        )}

        {trends && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="space-y-8"
          >
            {/* Algorithm Insights Banner */}
            <div className="glass-card p-8 border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-transparent relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
              </div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="text-accent" /> Algorithmic IQ: <span className="text-zinc-500 font-medium">{platform}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InsightItem label="Engagement Focus" value={trends.algorithmInsights.engagementFocus} icon={Activity} color="text-blue-400" />
                <InsightItem label="Predicted Reach" value={trends.algorithmInsights.predictedReach} icon={Globe} color="text-green-400" />
                <InsightItem label="Shareability" value={trends.algorithmInsights.shareabilityFactor} icon={Zap} color="text-purple-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trending Topics */}
              <div className="glass-card p-8 space-y-8 border-white/5 hover:border-primary/20 transition-all duration-500 group">
                <div>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                    <TrendingUp size={22} className="text-primary group-hover:rotate-6 transition-transform" /> Hot Topics & Hooks
                  </h3>
                  <div className="space-y-4">
                    {trends.trendingTopics?.map((topic, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">{i + 1}</span>
                        <p className="text-zinc-200 font-medium">{topic}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-3">Audio & Vibe recommendations</h3>
                  <p className="text-zinc-400 leading-relaxed italic">"{trends.trendingAudioFormats}"</p>
                </div>
              </div>

              {/* Hashtags & Strategy */}
              <div className="glass-card p-8 space-y-8 border-white/5 hover:border-accent/20 transition-all duration-500 group">
                <div>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                    <Hash size={22} className="text-accent group-hover:rotate-12 transition-transform" /> Velocity Hashtags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trends.trendingHashtags?.map((tag, i) => (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="px-4 py-2 rounded-xl bg-surfaceAccent border border-white/5 text-sm font-bold text-zinc-400 hover:border-accent hover:text-white cursor-pointer transition-all duration-300"
                      >
                        #{tag.replace('#', '')}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-5">Cross-Platform Distribution Strategy</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trends.crossPlatformStrategy?.map((strategy, i) => (
                      <div key={i} className="flex gap-3 text-sm text-zinc-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <p className="leading-relaxed">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InsightItem({ label, value, icon: Icon, color }) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center gap-2">
        <Icon size={16} className={color} />
        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{label}</p>
      </div>
      <p className="text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">{value}</p>
    </div>
  );
}
