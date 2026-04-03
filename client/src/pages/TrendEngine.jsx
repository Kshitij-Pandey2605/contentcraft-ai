import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Hash, BarChart2, Radio, Zap } from 'lucide-react';
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
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error connecting to the live analytics engine.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sans flex items-center gap-3">
            <Radio className="text-accent animate-pulse" /> 
            Live Trend Engine
          </h1>
          <p className="text-zinc-400 mt-2">Simulating real-time API integrations with social algorithms to detect virality.</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={fetchTrends} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-zinc-400">Target Niche</label>
            <input 
              type="text" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. AI Startups, Fitness, Finance..."
              className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium mb-2 text-zinc-400">Target Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option>Instagram</option>
              <option>YouTube</option>
              <option>Twitter / X</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
            </select>
          </div>
          <div className="w-full md:w-auto flex items-end">
            <button 
              type="submit"
              disabled={loading || !niche}
              className="w-full md:w-auto bg-accent hover:bg-cyan-400 text-surfaceAccent px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Activity className="animate-spin" /> : <><TrendingUp size={18} /> Analyze</>}
            </button>
          </div>
        </form>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="h-64 glass-card bg-surfaceAccent/50 animate-pulse border-accent/20 border" />
            <div className="h-64 glass-card bg-surfaceAccent/50 animate-pulse border-accent/20 border" />
            <div className="h-48 glass-card bg-surfaceAccent/50 animate-pulse col-span-1 md:col-span-2 border-accent/20 border" />
          </motion.div>
        )}

        {trends && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            {/* Algorithm Insights Banner */}
            <div className="glass-card p-6 border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart2 className="text-accent" /> Algorithmic Insights ({platform})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Engagement Focus</p>
                  <p className="font-medium text-blue-300">{trends.algorithmInsights.engagementFocus}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Predicted Reach</p>
                  <p className="font-medium text-green-400">{trends.algorithmInsights.predictedReach}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Shareability Factor</p>
                  <p className="font-medium text-purple-400 flex items-center gap-1">
                    <Zap size={14} /> {trends.algorithmInsights.shareabilityFactor}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trending Topics & Audio */}
              <div className="glass-card p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-primary" /> Active Trending Topics
                  </h3>
                  <ul className="space-y-3">
                    {trends.trendingTopics?.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="text-primary font-bold">{i + 1}.</span> {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-semibold mb-2">Recommended Format/Audio</h3>
                  <p className="text-zinc-400">{trends.trendingAudioFormats}</p>
                </div>
              </div>

              {/* Hashtags & Strategy */}
              <div className="glass-card p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Hash size={18} className="text-accent" /> High-Velocity Hashtags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trends.trendingHashtags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-surfaceAccent border border-white/10 text-sm font-medium hover:border-accent/50 cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-semibold mb-3">Cross-Platform Distribution</h3>
                  <ul className="space-y-3">
                    {trends.crossPlatformStrategy?.map((strategy, i) => (
                      <li key={i} className="text-zinc-300 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
