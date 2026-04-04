import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Copy, CheckCircle2, Type, Hash, Loader2,
  TrendingUp, Clock, Target, Search,
  Globe, Zap, AlertTriangle, CheckCircle
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { usePlatform } from '../context/PlatformContext';

const PLATFORMS = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Twitter/X'];

// Animated circular virality gauge
function ViralityGauge({ score, status }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const fill = (score / 100) * circ;

  const colorMap = {
    Viral: { stroke: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
    Good:  { stroke: '#3b82f6', text: 'text-blue-400',    bg: 'bg-blue-400/10 border-blue-400/20' },
    'Needs Optimization': { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  };
  const col = colorMap[status] || colorMap['Good'];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-surface-accent" />
          <motion.circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={col.stroke} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - fill }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${col.text}`}>{score}</span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">/ 100</span>
        </div>
      </div>
      <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${col.bg} ${col.text}`}>
        {status}
      </span>
    </div>
  );
}

export default function ContentGenerator() {
  const { platform, platformInfo } = usePlatform();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return toast.error('Please enter a topic first.');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await api.post('pipeline/run', { topic, platform });
      if (res.data?.success) {
        setResult(res.data.data);
        toast.success('Viral content generated!');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(Array.isArray(text) ? text.join(' ') : text);
    setCopiedKey(key);
    toast.success('Copied!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const CopyBtn = ({ val, id }) => (
    <button onClick={() => copy(val, id)} className="p-1.5 rounded-lg bg-surface-accent border border-border-subtle text-text-muted hover:text-text-main transition-colors active:scale-95">
      {copiedKey === id ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-12">

      {/* Input Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        <h2 className="text-2xl font-black text-text-main mb-1">AI Content Pipeline</h2>
        <p className="text-text-muted text-sm font-medium mb-5">
          Enter your idea — the 3-layer AI engine generates viral content, scores it, and builds a posting strategy.
        </p>
        {/* Platform badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold text-primary">
            <Zap size={11} /> Optimized for {platformInfo?.emoji} {platform}
          </span>
          <span className="text-xs text-text-muted">Change platform in the top bar or Settings</span>
        </div>
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text" value={topic} onChange={e => setTopic(e.target.value)} disabled={isLoading}
            placeholder="e.g. How to grow a SaaS from zero to $10k MRR..."
            className="flex-1 bg-surface-accent border border-border-subtle text-text-main placeholder:text-text-muted rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
          />
          <Button type="submit" variant="primary" disabled={isLoading} className="sm:w-44 text-sm">
            {isLoading ? <><Loader2 size={15} className="animate-spin" /> Orchestrating…</> : <><Sparkles size={15} /> Generate</>}
          </Button>
        </form>
      </motion.div>

      {/* Skeletons */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="sk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-36 animate-pulse" />
            ))}
          </motion.div>
        )}

        {result && !isLoading && (
          <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* ── Row 1: Virality Score + Generated Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Virality Score Card */}
              <div className="glass-card p-6 flex flex-col items-center gap-4 lg:col-span-1">
                <div className="flex items-center gap-2 self-start">
                  <TrendingUp size={16} className="text-primary" />
                  <h3 className="font-black text-text-main text-sm uppercase tracking-wider">Virality Score</h3>
                </div>
                <ViralityGauge score={result.virality.score} status={result.virality.status} />
                <p className="text-[11px] text-text-muted text-center font-medium leading-relaxed">{result.insights}</p>
              </div>

              {/* Generated Content: Title + Hook */}
              <div className="lg:col-span-2 grid grid-cols-1 gap-5">
                {[
                  { key: 'title', icon: Type, label: 'Viral Title', color: 'text-primary' },
                  { key: 'hook', icon: Sparkles, label: 'Attention Hook', color: 'text-accent' },
                ].map(({ key, icon: Icon, label, color }) => (
                  <div key={key} className="glass-card p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className={color} />
                        <span className="text-xs font-black uppercase tracking-widest text-text-muted">{label}</span>
                      </div>
                      <CopyBtn val={result.generatedContent[key]} id={key} />
                    </div>
                    <p className="text-text-main font-semibold text-sm leading-relaxed">{result.generatedContent[key]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Row 2: Caption + Breakdowns/Improvements ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Caption */}
              <div className="glass-card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type size={14} className="text-purple-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-text-muted">Post Caption</span>
                  </div>
                  <CopyBtn val={result.generatedContent.caption} id="caption" />
                </div>
                <p className="text-text-main text-sm leading-relaxed whitespace-pre-wrap font-medium">{result.generatedContent.caption}</p>
              </div>

              {/* AI Breakdowns & Improvements */}
              <div className="glass-card p-5 flex flex-col gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Zap size={13} className="text-amber-400" /> AI Analysis
                </span>
                {result.virality.breakdowns?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">✓ Strengths</p>
                    {result.virality.breakdowns.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-main font-medium">
                        <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
                {result.virality.improvements?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border-subtle">
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">⚡ Improvements</p>
                    {result.virality.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-main font-medium">
                        <AlertTriangle size={12} className="text-amber-400 mt-0.5 shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Row 3: Hashtags + SEO Keywords ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-pink-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-text-muted">Hashtags</span>
                  </div>
                  <CopyBtn val={result.generatedContent.hashtags} id="hashtags" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.generatedContent.hashtags?.map(tag => (
                    <span key={tag} className="text-xs font-bold text-pink-400 bg-pink-400/10 border border-pink-400/20 px-2.5 py-1 rounded-lg">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-text-muted">SEO Keywords</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.generatedContent.seoKeywords?.map(kw => (
                    <span key={kw} className="text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-lg">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Row 4: Posting Strategy ── */}
            {result.postingStrategy && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={16} className="text-primary" />
                  <h3 className="font-black text-text-main text-sm uppercase tracking-wider">
                    {result.postingStrategy.platform} Posting Strategy
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface-accent rounded-xl p-4 border border-border-subtle">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Best Times</p>
                    {result.postingStrategy.bestTimes?.map(t => (
                      <p key={t} className="text-xs font-bold text-text-main">{t}</p>
                    ))}
                  </div>
                  <div className="bg-surface-accent rounded-xl p-4 border border-border-subtle">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Best Days</p>
                    <p className="text-xs font-bold text-text-main">{result.postingStrategy.bestDays?.join(', ')}</p>
                  </div>
                  <div className="bg-surface-accent rounded-xl p-4 border border-border-subtle">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Format Priority</p>
                    <p className="text-xs font-bold text-text-main">{result.postingStrategy.format}</p>
                  </div>
                  <div className="bg-surface-accent rounded-xl p-4 border border-border-subtle">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Pro Tips</p>
                    {result.postingStrategy.tips?.map(t => (
                      <p key={t} className="text-[11px] text-text-muted leading-relaxed">• {t}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Row 5: Cross-Platform Distribution ── */}
            {result.generatedContent.crossPlatformTips?.length > 0 && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-accent" />
                  <h3 className="font-black text-text-main text-sm uppercase tracking-wider">Cross-Platform Distribution Strategy</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.generatedContent.crossPlatformTips.map((tip, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-surface-accent border border-border-subtle">
                      <Target size={14} className="text-accent mt-0.5 shrink-0" />
                      <p className="text-xs font-medium text-text-main leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
