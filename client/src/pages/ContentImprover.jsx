import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wand2, Check, Copy, Sparkles, Zap, Activity, MessageSquare } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

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
      const res = await api.post('improve', { content: draft });
      if (res.data?.success) {
        setResult(res.data.data);
        toast.success('Content improved successfully!');
      } else {
        setError(res.data?.error || 'Failed to improve text');
      }
    } catch (err) {
      setError('Server error while improving content.');
      toast.error('Server error while improving content.');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.improvedContent);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-10"
    >
      <div>
        <h1 className="text-3xl font-black text-text-main tracking-tight">Content Improver</h1>
        <p className="text-text-muted mt-2 font-medium">Rewrite dull drafts into high-engagement viral content.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[560px]">

        {/* INPUT PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-surface-accent border border-border-subtle rounded-t-2xl px-5 py-3 flex items-center gap-2">
            <MessageSquare size={14} className="text-text-muted" />
            <span className="text-xs font-black uppercase tracking-widest text-text-muted">Input Draft</span>
          </div>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Paste your rough text here… (e.g. I have a new product launch next week and I'm excited)"
            className="flex-1 min-h-[360px] bg-surface border border-border-subtle border-t-0 rounded-b-2xl p-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-text-main text-base leading-relaxed placeholder:text-text-muted"
          />
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <div className="flex justify-end">
            <button
              onClick={handleImprove}
              disabled={loading || !draft.trim()}
              className="bg-primary hover:bg-primaryHover text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-tight transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2 active:scale-95"
            >
              {loading
                ? <><Activity className="animate-spin" size={18} /> Improving…</>
                : <><Wand2 size={18} /> Improve</>
              }
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden lg:flex items-center justify-center px-2">
          <div className="w-12 h-12 rounded-xl bg-surface-accent border border-border-subtle flex items-center justify-center shadow-lg">
            <ArrowRight className="text-accent" size={20} />
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border border-border-subtle border-b-0 rounded-t-2xl px-5 py-3 flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-text-main flex items-center gap-2">
              <Sparkles size={13} className="text-accent" /> Optimized Masterpiece
            </span>
            {result && (
              <button
                onClick={copyResult}
                className="p-1.5 rounded-lg bg-surface-accent border border-border-subtle text-text-muted hover:text-text-main transition-all active:scale-90"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            )}
          </div>

          <div className="flex-1 bg-surface border border-border-subtle rounded-b-2xl p-6 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-text-muted"
                >
                  <div className="p-6 rounded-full bg-surface-accent border border-border-subtle mb-5">
                    <Wand2 size={36} className="opacity-30" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">Awaiting Input</h3>
                  <p className="mt-1.5 text-center max-w-xs text-sm">Your optimized content will appear here after processing.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-4 pt-2"
                >
                  <div className="h-5 bg-surface-accent rounded-lg w-3/4 animate-pulse" />
                  <div className="h-5 bg-surface-accent rounded-lg w-full animate-pulse" />
                  <div className="h-5 bg-surface-accent rounded-lg w-5/6 animate-pulse" />
                  <div className="h-32 bg-surface-accent rounded-xl w-full animate-pulse mt-8" />
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                        <Zap size={10} /> New Viral Hook
                      </p>
                      <p className="text-sm font-bold text-text-main leading-snug">"{result.addedHook}"</p>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5">Score Increase</p>
                      <p className="text-2xl font-black text-accent tracking-tighter">
                        +{result.viralScoreIncrease}%
                        <span className="text-xs font-medium text-text-muted ml-1">Reach</span>
                      </p>
                      {result.originalScore && (
                        <p className="text-[11px] text-text-muted mt-1">{result.originalScore} → {result.newScore} / 100</p>
                      )}
                    </div>
                  </div>

                  {/* Improved Content */}
                  <div className="text-text-main text-sm leading-relaxed whitespace-pre-wrap bg-surface-accent border border-border-subtle rounded-xl p-4">
                    {result.improvedContent}
                  </div>

                  {/* Enhancements */}
                  {result.enhancementsMade?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Enhancements Applied</p>
                      <div className="flex flex-wrap gap-2">
                        {result.enhancementsMade.map((e, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-accent border border-border-subtle text-xs font-bold text-text-main">
                            <Check size={11} className="text-emerald-500" /> {e}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining Improvements */}
                  {result.improvements?.length > 0 && (
                    <div className="border-t border-border-subtle pt-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Further Tips</p>
                      <div className="space-y-1.5">
                        {result.improvements.map((t, i) => (
                          <p key={i} className="text-xs text-text-muted">• {t}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
