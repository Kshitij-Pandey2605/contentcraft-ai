import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw, Layers } from 'lucide-react';
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
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error connecting to the API backend. Is your server running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-sans mb-4">Viral Idea Generator</h1>
        <p className="text-zinc-400">Discover 5 trending, high-potential concepts for your next viral hit. Just enter your niche or basic topic below.</p>
        
        <form onSubmit={fetchIdeas} className="mt-8 flex gap-4">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your niche (e.g. Sustainable Fashion)"
            className="flex-1 bg-surfaceAccent border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-lg shadow-inner"
            required
          />
          <button 
            type="submit"
            disabled={loading || !topic}
            className="bg-primary hover:bg-primaryHover text-white px-8 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center justify-center min-w-[160px]"
          >
            {loading ? <RefreshCw className="animate-spin" /> : 'Discover Ideas'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-48 glass-card animate-pulse bg-surfaceAccent/50" />
              ))}
            </motion.div>
          ) : ideas.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ideas.map((idea, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-4">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-all">{idea.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{idea.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-primary">
                    <Layers size={14} />
                    Format: {idea.format}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-20 text-center text-zinc-500 flex flex-col items-center"
            >
              <Lightbulb size={64} className="opacity-20 mb-4" />
              <p>Type a topic above to generate creative ideas</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {ideas.length > 0 && !loading && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => fetchIdeas()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw size={16} /> Regenerate Ideas
          </button>
        </div>
      )}
    </div>
  );
}
