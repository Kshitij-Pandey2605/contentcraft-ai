import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, Sparkles, Copy, Check, BarChart, 
  Target, Clock, Hash, Search, Zap, MessageSquare,
  TrendingUp, AlertCircle, Info, Layers, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';
import { usePlatform } from '../context/PlatformContext';

const ViralGauge = ({ score }) => {
  const rotation = (score / 100) * 180 - 90;
  const getColor = (s) => {
    if (s > 80) return '#10b981';
    if (s > 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 border-[12px] border-zinc-800 rounded-full" />
        <motion.div 
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 w-32 h-32 border-[12px] rounded-full z-10"
          style={{ 
            borderColor: getColor(score),
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)'
          }}
        />
      </div>
      <div className="mt-[-8px] text-2xl font-black" style={{ color: getColor(score) }}>{score}</div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Viral Potential</p>
    </div>
  );
};

const TacticalCard = ({ title, content, icon: Icon, color, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-3 group"
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-surface-accent">
          <Icon size={16} style={{ color }} />
        </div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{title}</h4>
      </div>
      <div className="text-sm font-medium leading-relaxed text-text-main line-clamp-4">
        {content || 'N/A'}
      </div>
    </motion.div>
  );
};

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { platform } = usePlatform();
  const [strategy, setStrategy] = useState(null);
  const messagesEndRef = useRef(null);

  const handleArchitect = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const topic = input.trim();
    setStrategy(null);
    setLoading(true);

    try {
      const res = await api.post('strategy', { 
        topic, 
        platform: platform 
      });
      
      if (res.data.success) {
        setStrategy(res.data.strategy);
        toast.success('Strategy Architected!');
      }
    } catch (err) {
      toast.error('The strategist is offline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 pt-6 px-4">
      
      {/* ── Header ── */}
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-[0.3em]">
          <Bot size={14} /> Intelligence Bureau
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-text-main tracking-tight italic">
          Viral <span className="text-gradient">Strategy</span> Command.
        </h1>
        <p className="text-text-muted font-medium max-w-xl">
           Input your content idea and let the AI architect a multi-layer growth plan for <span className="text-primary font-bold">{platform}</span>.
        </p>
      </div>

      {/* ── Input Zone ── */}
      <div className="mb-12">
        <form onSubmit={handleArchitect} className="relative group max-w-3xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What are we building today for ${platform}? (e.g. 'Teaching Python to Kids')`}
            className="w-full bg-[var(--surface-accent)]/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 pr-40 text-text-main focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-2xl group-hover:border-white/20"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            {loading ? <RefreshCcw className="animate-spin" size={16} /> : <Zap size={16} />}
            Architect
          </button>
        </form>
      </div>

      {/* ── Output Grid ── */}
      <AnimatePresence>
        {strategy ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Metrics & Forecast */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-8 border border-white/5 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-b from-white/[0.02] to-transparent">
                <ViralGauge score={strategy.viral_score || 85} />
                <div className="w-full h-px bg-white/5" />
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Time Window</p>
                    <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold">
                       <Clock size={14} /> {strategy.posting_time}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Complexity</p>
                    <div className="flex items-center justify-center gap-1.5 text-primary font-bold">
                       <Layers size={14} /> {strategy.difficulty_level}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 border border-white/5 space-y-4 h-[320px] min-h-[320px]">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Growth Forecast (5 Days)</h4>
                  <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <div className="w-full h-full pb-8 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={strategy.predicted_growth}>
                      <defs>
                        <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900' }}
                      />
                      <Area type="monotone" dataKey="reach" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorReach)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column: Tactical Briefing */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TacticalCard 
                  title="Content Hook" 
                  content={strategy.hook} 
                  icon={Zap} 
                  color="#f59e0b" 
                  delay={0.1}
                />
                <TacticalCard 
                  title="Content Type" 
                  content={strategy.content_type} 
                  icon={Sparkles} 
                  color="#3b82f6" 
                  delay={0.2}
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 border border-white/10 bg-surface-accent shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Target size={120} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                   <Target size={14} /> The Master Brief
                </h4>
                <div className="text-base font-bold text-text-main leading-relaxed relative z-10">
                  {strategy.content_plan}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="glass-card p-5 border border-white/5 space-y-3">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Hash size={14} /> Hashtags
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {strategy.hashtags?.map(tag => (
                        <span key={tag} className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                   </div>
                 </div>
                 <div className="glass-card p-5 border border-white/5 space-y-3">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Search size={14} /> SEO Keywords
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {strategy.seo_keywords?.map(kw => (
                        <span key={kw} className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{kw}</span>
                      ))}
                   </div>
                 </div>
                 <div className="glass-card p-5 border border-white/5 space-y-3">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Bot size={14} /> Audience
                   </h4>
                   <p className="text-xs font-bold text-text-main tracking-tight">
                     {strategy.target_audience}
                   </p>
                 </div>
              </div>

              <div className="glass-card p-6 border border-primary/20 bg-primary/5">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                   <Info size={14} /> Viral Insights
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategy.viral_insights?.map((insight, idx) => (
                      <div key={idx} className="flex gap-3 text-sm font-medium text-text-main">
                        <span className="text-primary font-black">0{idx + 1}</span>
                        {insight}
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        ) : loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6">
             <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin" />
             <p className="text-text-muted font-black uppercase tracking-[0.3em] animate-pulse">Architecting Strategic Brief...</p>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 text-center opacity-40">
             <Bot size={80} className="text-text-muted" />
             <div className="space-y-2">
               <h3 className="text-2xl font-black text-text-main tracking-tight">Awaiting Deployment Orders</h3>
               <p className="text-text-muted font-medium">Your strategy will appear here once the architect completes the scan.</p>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
