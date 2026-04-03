import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wand2, Check, Copy } from 'lucide-react';
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
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sans">Content Improver</h1>
        <p className="text-zinc-400 mt-2">Turn your rough drafts into highly engaging, viral masterpieces.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        
        {/* BEFORE PANEl */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-surfaceAccent/50 border border-white/10 rounded-t-xl px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm text-zinc-300">Rough Draft (Before)</span>
          </div>
          <textarea 
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste your boring, unengaging text here..."
            className="flex-1 bg-background border border-white/10 border-t-0 rounded-b-xl p-6 resize-none focus:outline-none focus:border-primary transition-colors text-zinc-300"
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-red-400">{error}</p>
            <button 
              onClick={handleImprove}
              disabled={loading || !draft.trim()}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:opacity-50 flex items-center gap-2 group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Wand2 size={18} /> Make it Viral</>
              )}
            </button>
          </div>
        </div>

        {/* MIDDLE ARROW (Desktop only) */}
        <div className="hidden lg:flex items-center justify-center px-4">
          <div className="w-12 h-12 rounded-full bg-surfaceAccent flex items-center justify-center shadow-lg border border-white/5">
            <ArrowRight className="text-accent" />
          </div>
        </div>

        {/* AFTER PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 border-b-0 rounded-t-xl px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm text-white">Viral Masterpiece (After)</span>
            {result && (
              <button onClick={copyResult} className="text-zinc-300 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-surface border border-white/10 rounded-b-xl p-6 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600"
                >
                  <Wand2 size={48} className="mb-4 opacity-20" />
                  <p>Awaiting your draft...</p>
                </motion.div>
              ) : loading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="h-4 bg-surfaceAccent/50 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-surfaceAccent/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-surfaceAccent/50 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-surfaceAccent/50 rounded w-2/3 animate-pulse"></div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {/* Highlights section */}
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-400 mb-1">New Hook Added</p>
                      <p className="text-sm font-medium">"{result.addedHook}"</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-400 mb-1">Impact Increase</p>
                      <p className="text-sm font-bold text-accent">{result.viralScoreIncrease}</p>
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed">
                    {result.improvedContent}
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 space-y-2">
                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Enhancements Made:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.enhancementsMade?.map((enhancement, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-surfaceAccent rounded border border-white/5">
                          {enhancement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
