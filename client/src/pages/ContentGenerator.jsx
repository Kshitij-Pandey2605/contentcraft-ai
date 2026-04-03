import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, TrendingUp, Hash } from 'lucide-react';
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
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Left Input Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/3 space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold font-sans">Content Generator</h1>
          <p className="text-zinc-400 mt-2">Craft viral posts instantly.</p>
        </div>

        <form onSubmit={handleGenerate} className="glass-card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Topic or Idea</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-surfaceAccent border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. Benefits of AI in Marketing"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-surfaceAccent border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            >
              <option>LinkedIn</option>
              <option>Twitter / X</option>
              <option>Instagram Caption</option>
              <option>Facebook</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <input 
              type="text" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-surfaceAccent border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. Tech Founders"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <button 
            type="submit" 
            disabled={loading || !topic}
            className="w-full mt-4 bg-primary hover:bg-primaryHover text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              <>
                <Sparkles size={18} /> Generate Viral Content
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Right Output Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-2/3 h-full pb-10"
      >
        <AnimatePresence mode="wait">
          {!result && !loading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full min-h-[500px] flex flex-col items-center justify-center glass-card border-dashed border-white/20 text-zinc-500"
            >
              <Sparkles size={48} className="mb-4 opacity-20" />
              <p>Your viral content will appear here</p>
            </motion.div>
          ) : loading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full space-y-4"
            >
              {/* Skeleton Loaders */}
              <div className="flex gap-4">
                <div className="w-1/3 h-24 bg-surfaceAccent/50 animate-pulse rounded-2xl"></div>
                <div className="w-2/3 h-24 bg-surfaceAccent/50 animate-pulse rounded-2xl"></div>
              </div>
              <div className="w-full h-64 bg-surfaceAccent/50 animate-pulse rounded-2xl"></div>
              <div className="w-full h-12 bg-surfaceAccent/50 animate-pulse rounded-2xl"></div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Top Banner (Viral Score & Time) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 flex items-center justify-between border border-green-500/30 bg-green-500/5">
                  <div>
                    <p className="text-xs text-zinc-400">Viral Score Prediction</p>
                    <p className="text-2xl font-bold text-green-400">{result.viralScore}/100</p>
                  </div>
                  <TrendingUp className="text-green-400" />
                </div>
                <div className="glass-card p-4">
                  <p className="text-xs text-zinc-400">Best Time to Post</p>
                  <p className="text-lg font-semibold mt-1">{result.bestTimeToPost || 'Tuesday at 9AM'}</p>
                </div>
              </div>

              {/* Hooks */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Sparkles size={16} /> Choose a opening Hook
                </h3>
                <div className="space-y-2">
                  {result.hooks?.map((hook, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surfaceAccent/50 border border-white/5 hover:border-accent/40 transition-colors text-sm">
                      {hook}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="glass-card p-6 relative group">
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-surfaceAccent border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
                <h3 className="text-sm font-semibold text-zinc-400 mb-4">Generated Content</h3>
                <div className="whitespace-pre-wrap text-zinc-200 leading-relaxed font-sans">
                  {result.content}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {result.hashtags?.map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center gap-1">
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
  );
}
