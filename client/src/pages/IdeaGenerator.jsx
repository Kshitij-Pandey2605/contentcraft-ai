import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw, Layers, Sparkles, Send, Target, ChevronRight } from 'lucide-react';
import { generateIdeas } from '../services/api';
import toast from 'react-hot-toast';

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
      if (res.success && res.data?.ideas) {
        setIdeas(res.data.ideas);
        toast.success(`${res.data.ideas.length} ideas generated!`);
      } else {
        setError(res.error || 'Failed to generate ideas');
      }
    } catch (err) {
      setError('Error connecting to backend.');
      toast.error('Backend connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-10 pb-16"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-black text-text-main tracking-tight">
          Viral <span className="text-gradient">Idea Engine</span>
        </h1>
        <p className="text-text-muted font-medium">
          Extract high-potential concepts from any niche with our predictive AI model.
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={fetchIdeas} className="flex gap-2">
          <div className="flex-1 flex items-center gap-3 bg-surface border border-border-subtle rounded-xl px-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition-all">
            <Target size={16} className="text-text-muted shrink-0" />
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Enter niche (e.g. Fintech, Clean Energy, Solopreneurs…)"
              className="w-full bg-transparent py-3.5 focus:outline-none text-text-main placeholder:text-text-muted text-sm font-medium"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !topic}
            className="bg-primary hover:bg-primaryHover text-white px-6 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2 active:scale-95 text-sm"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <><Send size={14} /> Explore</>}
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm font-medium">⚠️ {error}</p>}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="sk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[...Array(6)].map((_, i) => <div key={i} className="h-56 glass-card animate-pulse" />)}
          </motion.div>
        )}

        {!loading && ideas.length > 0 && (
          <motion.div key="ideas" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ideas.map((idea, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20 group-hover:scale-110 transition-transform">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{idea.description}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-muted">
                    <Layers size={12} className="text-primary" /> {idea.format}
                  </div>
                  <ChevronRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && ideas.length === 0 && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="py-24 text-center flex flex-col items-center glass-card"
          >
            <div className="p-6 rounded-full bg-surface-accent border border-border-subtle mb-5">
              <Lightbulb size={40} className="text-text-muted opacity-40" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-1.5">Awaiting Inspiration</h3>
            <p className="max-w-xs mx-auto text-sm text-text-muted leading-relaxed">
              Type a niche above to unlock viral potential and content strategies.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {ideas.length > 0 && !loading && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchIdeas()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-accent border border-border-subtle text-text-muted hover:text-text-main hover:border-primary/30 transition-all font-bold text-sm active:scale-95"
          >
            <RefreshCw size={15} className="text-primary" /> Regenerate Ideas
          </button>
        </div>
      )}
    </motion.div>
  );
}
