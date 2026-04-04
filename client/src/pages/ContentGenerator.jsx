import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, Hash, PenTool, BarChart3, Copy, Check } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { usePlatform } from '../context/PlatformContext';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState('');
  const { platform } = usePlatform();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post('generate-content', { 
        topic, 
        platform: platform 
      });
      
      if (res.data?.success && res.data?.data?.generatedContent) {
        setResult(res.data.data.generatedContent);
        toast.success('Strategy Generated!');
      } else {
        toast.error('Failed to parse strategic output.');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] w-full flex flex-col space-y-8">
      <div>
         <h1 className="text-3xl font-bold tracking-tight">Full-Stack Content Generator</h1>
         <p className="text-color-text-muted mt-1">From raw idea to ready-to-post viral package.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4"
        >
          <div className="glass-card p-6 h-full sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h2 className="text-xl font-bold">Concept Brief</h2>
            </div>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-color-text-muted mb-2">
                  What do you want to create?
                </label>
                <textarea
                  className="w-full p-4 rounded-xl bg-[var(--surface-accent)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none h-32 custom-scrollbar text-[var(--text-main)]"
                  placeholder="E.g., How to use AI agents for customer support..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-accent)] border border-[var(--border-subtle)]">
                <h4 className="text-sm font-semibold mb-2">Current Platform</h4>
                <div className="text-lg font-bold text-gradient">{platform}</div>
                <p className="text-xs text-color-text-muted mt-1">Change this in the sidebar selector.</p>
              </div>

              <button 
                type="submit" 
                disabled={loading || !topic}
                className="w-full py-4 rounded-xl bg-gradient-premium text-white font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-75"
              >
                {loading ? 'Generating Strategy...' : 'Build Full Strategy'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Results */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {!result && !loading ? (
             <div className="h-full flex flex-col items-center justify-center text-color-text-muted opacity-50 py-20 border-2 border-dashed border-[var(--border-subtle)] rounded-3xl">
               <PenTool className="w-16 h-16 mb-4" />
               <p>Provide a topic to generate a full digital asset.</p>
             </div>
          ) : loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glass-card p-6 h-48 bg-white/5 rounded-2xl"></div>
                ))}
             </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Caption / Content Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 lg:col-span-2 relative group">
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2 text-xl font-bold">
                       <PenTool className="w-5 h-5 text-[var(--color-primary)]" />
                       Core Content
                     </div>
                     <button onClick={() => copyToClipboard(result.caption, 'caption')} className="p-2 bg-[var(--surface-accent)] rounded-lg hover:bg-[var(--surface-accent2)] transition">
                       {copied === 'caption' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                     </button>
                   </div>
                   {result.title && <h3 className="text-lg font-bold mb-2">{result.title}</h3>}
                   {result.hook && <h4 className="text-md font-semibold text-[var(--color-primary)] mb-4">HOOK: {result.hook}</h4>}
                   <p className="whitespace-pre-wrap text-color-text-muted leading-relaxed">{result.caption}</p>
                </motion.div>

                {/* Strategy Data Array mapping */}
                {[
                  { key: 'targetAudience', label: 'Target Audience', icon: Target, val: result.targetAudience },
                  { key: 'seoKeywords', label: 'SEO Keywords', icon: Hash, val: Array.isArray(result.seoKeywords) ? result.seoKeywords.join(', ') : result.seoKeywords },
                  { key: 'contentStrategy', label: 'Content Formats', icon: BarChart3, val: result.contentStrategy },
                  { key: 'platformStrategy', label: 'Distribution', icon: Target, val: result.platformStrategy },
                ].map((item, i) => (
                  item.val && (
                    <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 relative">
                       <div className="flex justify-between items-start mb-3">
                         <div className="flex items-center gap-2 font-bold text-color-text-muted uppercase text-sm tracking-wider">
                           <item.icon className="w-4 h-4" />
                           {item.label}
                         </div>
                       </div>
                       <p className="font-semibold text-lg">{item.val}</p>
                    </motion.div>
                  )
                ))}

                {/* Execution Plan array */}
                {Array.isArray(result.executionPlan) && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 lg:col-span-2">
                     <h3 className="font-bold uppercase text-sm tracking-wider text-color-text-muted mb-4 border-b border-[var(--border-subtle)] pb-2">Execution Plan</h3>
                     <ul className="space-y-3">
                       {result.executionPlan.map((step, idx) => (
                         <li key={idx} className="flex gap-3 text-[var(--text-main)] font-medium">
                           <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--surface-accent)] text-[var(--color-primary)] flex items-center justify-center text-xs">{idx + 1}</span>
                           {step}
                         </li>
                       ))}
                     </ul>
                  </motion.div>
                )}
                
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
