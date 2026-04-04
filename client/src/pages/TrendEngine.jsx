import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { 
  TrendingUp, Search, Info, ExternalLink, 
  ArrowUpRight, BarChart2, Globe, Flame,
  Clock, ShieldCheck, Zap
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { CardSkeleton } from '../components/ui/Skeleton';

export default function TrendEngine() {
  const { platform, platformInfo } = usePlatform();
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      try {
        const res = await api.get('trends');
        // Simulate platform-specific filtering for the demo
        const allTrends = res.data.trends || [];
        const filtered = allTrends.filter(t => 
           !searchTerm || t.topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTrends(filtered);
      } catch (err) {
        console.error('Trend fetch failed', err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth transition
      }
    };

    fetchTrends();
  }, [platform, searchTerm]); // Refetch when platform changes to simulate sync

  return (
    <div className="space-y-10 pb-16">
      
      {/* ── Header Area ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-[0.3em]"
          >
            <Globe size={14} /> Global Market Intelligence
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-black text-text-main tracking-tight italic">
            Scanning <span className="text-gradient">{platform}</span> Trends.
          </h1>
          <p className="text-text-muted font-medium max-w-xl">
            Real-time algorithmic extraction of high-velocity topics currently exploding on {platform}'s Layer-3 discovery feeds.
          </p>
        </div>

        <div className="relative group min-w-[300px]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-border-subtle rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* ── Trends Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CardSkeleton />
              </motion.div>
            ))
          ) : trends.length > 0 ? (
            trends.map((trend, idx) => (
              <motion.div
                key={trend.topic}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-6 border-border-subtle hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Visual Flair */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surface-accent border border-border-subtle flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Flame size={22} fill={idx < 3 ? "currentColor" : "none"} />
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      <TrendingUp size={12} /> {trend.growth || '+42%'}
                    </div>
                    <p className="text-[10px] text-text-muted mt-2 font-bold uppercase tracking-tighter italic">Velocity Level 0{idx + 1}</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl font-black text-text-main group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                    {trend.topic}
                  </h3>
                  <p className="text-sm text-text-muted font-medium leading-relaxed line-clamp-2">
                    Predictive analysis suggests this topic will peak in **{trend.timeframe || '24-48 hours'}**. High conversion potential for **{platform}** {platformInfo.label} segments.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Algo-Score: {trend.viralityScore || '88'}</span>
                  </div>
                  <button className="text-primary hover:text-primaryHover transition-colors flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter">
                    Explore <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-surface-accent rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted border border-border-subtle">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black text-text-main mb-2 tracking-tight">No trends matching "{searchTerm}"</h3>
              <p className="text-text-muted font-medium">Try broadening your search or switching platforms.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
