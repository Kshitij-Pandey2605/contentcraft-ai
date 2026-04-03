import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, TrendingUp, Hash, Layout, Send, Zap, Clock } from 'lucide-react';
import { generateContent } from '../services/api';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [audience, setAudience] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic || !platform || !audience) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await generateContent({ topic, platform, audience });
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error || 'Failed to generate');
      }
    } catch (err) {
      setError('Server error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Content Generator</h1>
          <p className="text-zinc-500 mt-2 text-lg">AI-powered viral copywriting for any platform.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Input Side */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[400px] shrink-0 sticky top-8"
        >
          <div className="glass-card p-8 border border-white/5 space-y-6 bg-gradient-to-br from-surface to-surfaceAccent/20">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
              <Layout size={14} /> Configuration
            </h2>
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2.5 text-zinc-400">Content Topic</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="e.g. The future of Remote Work"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2.5 text-zinc-400">Target Channel</label>
                <div className="relative group">
                  <select 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer font-medium"
                  >
                    {['LinkedIn', 'Twitter / X', 'Instagram Caption', 'Facebook', 'TikTok Script'].map(p => (
                      <option key={p} className="bg-surfaceAccent">{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2.5 text-zinc-400">Target Audience</label>
                <input 
                  type="text" 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="e.g. Gen Z Freelancers"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm font-medium flex items-center gap-2"><Activity size={12} /> {error}</p>}

              <button 
                type="submit" 
                disabled={loading || !topic}
                className="w-full mt-4 bg-primary hover:bg-primaryHover text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 flex justify-center items-center gap-3 group"
              >
                {loading ? (
                  <Activity className="animate-spin" size={20} />
                ) : (
                  <>
                    <Sparkles size={20} className="group-hover:rotate-12 transition-transform" /> GENERATE
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Output Side */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 w-full min-h-[600px] h-full pb-10"
        >
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-[600px] flex flex-col items-center justify-center glass-card border-dashed border-white/10 text-zinc-600 bg-white/[0.01]"
              >
                <div className="p-6 rounded-full bg-white/[0.02] mb-6">
                  <Send size={48} className="opacity-20 translate-x-1 -translate-y-1" />
                </div>
                <h3 className="text-xl font-bold text-zinc-500">Ready to Create?</h3>
                <p className="mt-2">Enter your topic and audience to generate viral content.</p>
              </motion.div>
            ) : loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-28 bg-surfaceAccent/30 animate-pulse rounded-3xl"></div>
                  <div className="h-28 bg-surfaceAccent/30 animate-pulse rounded-3xl"></div>
                </div>
                <div className="h-96 bg-surfaceAccent/30 animate-pulse rounded-3xl"></div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="glass-card p-6 flex items-center justify-between border border-emerald-500/20 bg-emerald-500/5 group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Viral Potential</p>
                      <p className="text-3xl font-black text-emerald-400 tracking-tight">{result.viralScore}/100</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                      <TrendingUp className="text-emerald-400" />
                    </div>
                  </div>
                  <div className="glass-card p-6 flex items-center justify-between border border-white/5 bg-white/[0.01] group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Optimal Posting Window</p>
                      <p className="text-xl font-bold text-zinc-200 mt-1">{result.bestTimeToPost || 'Tuesday at 9AM'}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform text-zinc-400">
                      <Clock size={22} />
                    </div>
                  </div>
                </div>

                {/* Hooks Selection */}
                <div className="glass-card p-8 border-white/5 bg-gradient-to-r from-surface to-transparent">
                  <h3 className="text-xs font-black text-primary mb-5 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <Zap size={14} /> Attention-Grabbing Hooks
                  </h3>
                  <div className="grid gap-3">
                    {result.hooks?.map((hook, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-white/[0.04] transition-all cursor-default text-zinc-300 font-medium">
                        {hook}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Copy Area */}
                <div className="glass-card p-8 relative group border-white/5 bg-surfaceAccent/10">
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-8 right-8 p-3 rounded-2xl bg-surfaceAccent border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  </button>
                  <h3 className="text-xs font-black text-zinc-500 mb-6 uppercase tracking-[0.2em]">Primary Copy</h3>
                  <div className="whitespace-pre-wrap text-zinc-200 leading-[1.8] font-sans text-lg selection:bg-primary/30">
                    {result.content}
                  </div>
                  
                  <div className="mt-10 flex flex-wrap gap-2 pt-8 border-t border-white/5">
                    {result.hashtags?.map((tag, i) => (
                      <span key={i} className="text-xs font-bold px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center gap-2 hover:bg-primary/20 transition-colors cursor-default">
                        <Hash size={12} /> {tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
