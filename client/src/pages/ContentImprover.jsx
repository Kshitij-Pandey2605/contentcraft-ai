import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wand2, Check, Copy, Sparkles, Zap, Layout, Activity, MessageSquare } from 'lucide-react';
import { improveContent } from '../services/api';

export default function ContentImprover() {
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleImprove = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await improveContent(draft);
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error || 'Failed to improve text');
      }
    } catch (err) {
      setError('Server Error while improving content.');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.improvedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Content Improver</h1>
          <p className="text-zinc-500 mt-2 text-lg">Rewrite dull drafts into high-engagement viral content.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[600px]">
        {/* BEFORE PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col group">
          <div className="bg-surfaceAccent/30 border border-white/10 rounded-t-3xl px-6 py-4 flex justify-between items-center backdrop-blur-md">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <MessageSquare size={14} /> Input Draft
            </span>
          </div>
          <div className="flex-1 relative">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Paste your rough text here... (e.g. I have a new product launch next week and I'm excited)"
              className="w-full h-full min-h-[400px] bg-background/50 border border-white/10 border-t-0 rounded-b-3xl p-8 resize-none focus:outline-none focus:border-primary/50 transition-all text-zinc-300 text-lg leading-relaxed placeholder:text-zinc-700"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-red-400 font-medium">{error}</p>
            <button 
              onClick={handleImprove}
              disabled={loading || !draft.trim()}
              className="bg-primary hover:bg-primaryHover text-white px-10 py-4 rounded-2xl font-black uppercase tracking-tight transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 flex items-center gap-3 group active:scale-95"
            >
              {loading ? (
                <Activity className="animate-spin" size={20} />
              ) : (
                <><Wand2 size={20} className="group-hover:rotate-12 transition-transform" /> IMPROVE</>
              )}
            </button>
          </div>
        </div>

        {/* MIDDLE ARROW */}
        <div className="hidden lg:flex items-center justify-center px-2">
          <div className="w-14 h-14 rounded-2xl bg-surfaceAccent/50 flex items-center justify-center shadow-2xl border border-white/5 relative">
            <ArrowRight className="text-accent" size={24} />
            <div className="absolute inset-0 bg-accent/20 blur-xl -z-10 rounded-full" />
          </div>
        </div>

        {/* AFTER PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-transparent border border-white/10 border-b-0 rounded-t-3xl px-6 py-4 flex justify-between items-center backdrop-blur-md">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <Sparkles size={14} className="text-accent" /> Optimized Masterpiece
            </span>
            {result && (
              <button 
                onClick={copyResult} 
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-zinc-300" />}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-white/[0.01] border border-white/10 rounded-b-3xl p-8 flex flex-col relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />
            
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-zinc-600"
                >
                  <div className="p-6 rounded-full bg-white/[0.01] mb-6 ring-1 ring-white/5 shadow-2xl">
                    <Wand2 size={48} className="opacity-10" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-500">Awaiting Input</h3>
                  <p className="mt-2 text-center max-w-xs">Your optimized content will appear here after processing.</p>
                </motion.div>
              ) : loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="space-y-6 pt-4"
                >
                  <div className="h-6 bg-surfaceAccent/50 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-surfaceAccent/50 rounded-lg w-full animate-pulse"></div>
                  <div className="h-6 bg-surfaceAccent/50 rounded-lg w-5/6 animate-pulse"></div>
                  <div className="h-40 bg-surfaceAccent/50 rounded-3xl w-full animate-pulse mt-12"></div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Highlights section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1">
                        <Zap size={10} className="text-emerald-400" /> New Viral Hook
                      </p>
                      <p className="text-sm font-bold text-zinc-200 leading-tight">"{result.addedHook}"</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10 group">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Impact Analytics</p>
                      <p className="text-2xl font-black text-accent tracking-tighter">+{result.viralScoreIncrease}% <span className="text-xs font-medium text-zinc-500 ml-1">Reach</span></p>
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap text-zinc-200 text-lg leading-relaxed font-sans selection:bg-primary/30">
                    {result.improvedContent}
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">System Enhancements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.enhancementsMade?.map((enhancement, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-zinc-300 hover:border-primary/20 transition-colors">
                          <Check size={12} className="text-emerald-400" />
                          {enhancement}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
