import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw, Layers, Sparkles, Send, Target, ChevronRight } from 'lucide-react';
import { generateIdeas } from '../services/api';

export default function IdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIdeas = async (e) => {
    if (e) e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError('');

    try {
      const res = await generateIdeas(topic);
      if (res.success && res.data.ideas) {
        setIdeas(res.data.ideas);
      } else {
        setError(res.error || 'Failed to generate ideas');
      }
    } catch (err) {
      setError('Error connecting to the API backend. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-12 pb-20"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-black font-sans tracking-tight">
          Viral <span className="text-gradient">Idea Engine</span>
        </h1>
        <p className="text-zinc-500 text-lg font-medium">Extract high-potential concepts from any niche with our predictive AI model.</p>
        
        <div className="pt-8">
          <form onSubmit={fetchIdeas} className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-50" />
            <div className="relative flex gap-2 bg-surface/80 backdrop-blur-2xl p-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Target size={20} className="text-zinc-600" />
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter niche (e.g. Fintech, Solopreneurs, Clean Energy...)"
                  className="w-full bg-transparent border-none py-3 focus:outline-none text-zinc-100 text-lg placeholder:text-zinc-600 font-medium"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !topic}
                className="bg-primary hover:bg-primaryHover text-white px-8 rounded-xl font-black tracking-tight transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center min-w-[160px] group/btn"
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <span className="flex items-center gap-2 uppercase tracking-widest text-xs">Explore <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></span>}
              </button>
            </div>
          </form>
          {error && <p className="text-red-400 mt-4 text-sm font-medium animate-bounce-short">⚠️ {error}</p>}
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 glass-card animate-pulse bg-white/[0.02] border-white/5 rounded-3xl" />
              ))}
            </motion.div>
          ) : ideas.length > 0 ? (
            <motion.div 
              key="ideas"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ideas.map((idea, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, type: 'spring', damping: 20 }}
                  className="glass-card p-8 flex flex-col justify-between group hover:border-primary/30 bg-gradient-to-br from-surface to-transparent relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Lightbulb size={80} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-white transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      {idea.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      <Layers size={14} className="text-primary" />
                      {idea.format}
                    </div>
                    <div className="text-primary opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-32 text-center text-zinc-600 flex flex-col items-center glass-card border-dashed border-white/10"
            >
              <div className="p-8 rounded-full bg-white/[0.01] mb-8 ring-1 ring-white/5 shadow-2xl">
                <Lightbulb size={64} className="opacity-10" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-500 mb-2">Awaiting Inspiration</h3>
              <p className="max-w-xs mx-auto text-sm leading-relaxed">Type a niche above to unlock hidden viral potential and content strategies.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {ideas.length > 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex justify-center mt-12"
        >
          <button 
            onClick={() => fetchIdeas()}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all font-bold tracking-tight active:scale-95"
          >
            <RefreshCw size={18} className="text-primary" /> REGENERATE SYSTEM IDEAS
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
