import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { 
  ArrowRight, Sparkles, TrendingUp, MessageSquare, 
  Activity, Zap, Target, Users, BarChart3, Clock
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { usePlatform } from '../context/PlatformContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { platform, platformInfo } = usePlatform();

  const stats = [
    { label: 'Active Trends', value: '124', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Avg. Virality', value: '84/100', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Potential Reach', value: '2.4M', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Growth Velocity', value: '+12.5%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const quickActions = [
    { title: 'Generate Content', icon: Sparkles, desc: 'Create viral optimized posts instantly.', path: '/generate', color: 'text-primary' },
    { title: 'Market Trends', icon: TrendingUp, desc: 'Real-time algorithmic topic analysis.', path: '/trends', color: 'text-accent' },
    { title: 'Ask AI Expert', icon: MessageSquare, desc: 'Consult with the strategist algorithm.', path: '/ask', color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* ── Premium Hero Section ── */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-10 lg:p-16 rounded-[2.5rem] bg-surface border border-border-subtle overflow-hidden shadow-2xl"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-accent border border-border-subtle text-xs font-black uppercase tracking-[0.2em] text-primary mb-8"
            >
              <Zap size={14} fill="currentColor" /> Optimized for {platform} {platformInfo.emoji}
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-text-main leading-[0.95] tracking-tight mb-8">
              Your <span className="text-gradient">Viral Engine</span> is ready.
            </h1>
            
            <p className="text-lg text-text-muted font-medium mb-10 max-w-lg leading-relaxed">
              Welcome back, {user?.name || 'Creator'}. You're connected to the Layer-3 Failsafe pipeline. Every content piece is now mathematically optimized for **{platform}** algorithms.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/generate')} className="px-8 py-6 text-base shadow-xl shadow-primary/20">
                Launch Content Generator <ArrowRight size={20} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/analytics')} className="px-8 py-6 text-base">
                View Performance
              </Button>
            </div>
          </div>

          {/* Floating Platform Insight Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 border-primary/20 relative group"
          >
            <div className="absolute top-4 right-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
              <Sparkles size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Clock size={12} /> Live Strategy Pulse
            </p>
            <h3 className="text-2xl font-black text-text-main mb-6">Current {platform} Focus</h3>
            <div className="space-y-4">
              {[
                { label: 'Optimal Format', value: platform === 'YouTube' ? 'Long-form + Shorts' : platform === 'Instagram' ? 'Reels & Carousels' : 'Thread/Article', icon: Target },
                { label: 'Active Trend Level', value: 'High (84%)', icon: Activity },
                { label: 'Peak Engagement', value: '7:00 PM - 9:30 PM', icon: Zap },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-accent border border-border-subtle group-hover:border-primary/30 transition-colors">
                  <div className="p-2.5 rounded-xl bg-background border border-border-subtle text-primary">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-black text-text-main">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Stats Carousel ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="glass-card p-6 border-border-subtle hover:border-primary/30 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black text-text-main tracking-tighter">{stat.value}</h4>
          </motion.div>
        ))}
      </section>

      {/* ── Quick Actions Grid ── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-text-main tracking-tight">Intelligence Map</h2>
            <p className="text-text-muted font-medium text-sm">Direct access to the core processing modules.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              onClick={() => navigate(action.path)}
              className="glass-card p-8 cursor-pointer group hover:bg-surface-accent transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <action.icon size={80} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-surface-accent border border-border-subtle flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <action.icon size={26} className={action.color} />
              </div>
              <h3 className="text-2xl font-black text-text-main mb-3 tracking-tighter group-hover:text-primary transition-colors">{action.title}</h3>
              <p className="text-text-muted leading-relaxed font-medium text-sm group-hover:text-text-main transition-colors">{action.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Access Module <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

