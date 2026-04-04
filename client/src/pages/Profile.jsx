import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import {
  Check, ChevronRight, Globe, TrendingUp, BarChart2,
  Share2, Video, Camera, Hash, Save, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PLATFORMS = [
  { id: 'linkedin',  name: 'LinkedIn',    color: '#0A66C2', icon: Globe,   niche: ['Professional', 'B2B', 'Tech', 'Career'] },
  { id: 'twitter',  name: 'X (Twitter)', color: '#1d9bf0', icon: Globe,   niche: ['Tech', 'News', 'Web3', 'Lifestyle'] },
  { id: 'instagram',name: 'Instagram',   color: '#E4405F', icon: Camera,  niche: ['Fashion', 'Food', 'Travel', 'Art'] },
  { id: 'tiktok',   name: 'TikTok',      color: '#06b6d4', icon: Video,   niche: ['Entertainment', 'Edu', 'Comedy', 'Dance'] },
  { id: 'facebook', name: 'Facebook',    color: '#1877F2', icon: Globe,   niche: ['Family', 'B2C', 'Local', 'Social'] },
  { id: 'youtube',  name: 'YouTube',     color: '#FF0000', icon: Video,   niche: ['Longform', 'Edu', 'Vlog', 'Gaming'] },
  { id: 'threads',  name: 'Threads',     color: '#8b5cf6', icon: Share2,  niche: ['Social', 'Lifestyle', 'Text'] },
];

const inputCls = `w-full bg-surface-accent border border-border-subtle rounded-xl px-4 py-3.5
  focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all
  font-semibold text-text-main placeholder:text-text-muted text-sm`;

const labelCls = `block text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5`;

export default function Profile() {
  const { user, updateProfile, getProfile } = useUser();
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existing = getProfile();
    if (existing) {
      setSelectedPlatforms(existing.platforms || []);
      setMetrics(existing.metrics || {});
    }
  }, []);

  const handlePlatformToggle = (id) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleMetricChange = (platform, field, value) => {
    setMetrics(prev => ({
      ...prev,
      [platform]: { ...(prev[platform] || {}), [field]: value }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    await updateProfile({ platforms: selectedPlatforms, metrics, updatedAt: new Date().toISOString() });
    setLoading(false);
    toast.success('Workspace synced!');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">

      {/* Page Header */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-6"
        >
          <BarChart2 className="text-primary" size={32} />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-text-main mb-3">
          Setup Your Content Workspace
        </h1>
        <p className="text-text-muted font-medium max-w-lg mx-auto">
          Sync your active social channels and current metrics for real-time AI analysis.
        </p>
      </div>

      {/* Card */}
      <div className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none" />

        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                step === i ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : step > i ? 'bg-emerald-500 text-white'
                : 'bg-surface-accent text-text-muted border border-border-subtle'
              }`}>
                {step > i ? <Check size={16} /> : i}
              </div>
              {i === 1 && (
                <div className={`w-12 h-0.5 rounded-full ${step > 1 ? 'bg-emerald-500' : 'bg-border-subtle'}`} />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs font-black uppercase tracking-widest text-text-muted">
            {step === 1 ? 'Select Platforms' : 'Metric Sync'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 1: Platform Selection ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {PLATFORMS.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePlatformToggle(p.id)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all relative ${
                        isSelected
                          ? 'bg-primary/5 border-primary shadow-md shadow-primary/10 ring-1 ring-primary/20'
                          : 'bg-surface-accent border-border-subtle hover:border-primary/30 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <p.icon size={26} style={{ color: p.color }} className="mb-3" />
                      <span className="text-xs font-bold text-text-main">{p.name}</span>
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 text-primary">
                          <Check size={13} strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-border-subtle">
                <button
                  disabled={selectedPlatforms.length === 0}
                  onClick={() => setStep(2)}
                  className="bg-primary hover:bg-primaryHover disabled:opacity-50 text-white font-black px-8 py-3.5 rounded-xl flex items-center gap-2 group transition-all text-sm shadow-lg shadow-primary/20 active:scale-95"
                >
                  Next Step <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Metrics ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedPlatforms.map((pid) => {
                  const platform = PLATFORMS.find(p => p.id === pid);
                  return (
                    <div key={pid} className="p-6 rounded-2xl bg-surface-accent border border-border-subtle">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 rounded-xl bg-surface border border-border-subtle" style={{ color: platform.color }}>
                          <platform.icon size={20} />
                        </div>
                        <h3 className="text-base font-bold text-text-main">{platform.name} Metrics</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Follower Count</label>
                          <input type="number" placeholder="e.g. 12500" className={inputCls}
                            value={metrics[pid]?.followers || ''} onChange={e => handleMetricChange(pid, 'followers', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelCls}>Avg. Engagement Rate (%)</label>
                          <input type="number" step="0.1" placeholder="e.g. 2.4" className={inputCls}
                            value={metrics[pid]?.engagement || ''} onChange={e => handleMetricChange(pid, 'engagement', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelCls}>Niche Category</label>
                          <select className={inputCls} value={metrics[pid]?.niche || ''}
                            onChange={e => handleMetricChange(pid, 'niche', e.target.value)}>
                            <option value="">Select Niche</option>
                            {platform.niche.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Post Frequency (Weekly)</label>
                          <input type="number" placeholder="e.g. 3" className={inputCls}
                            value={metrics[pid]?.frequency || ''} onChange={e => handleMetricChange(pid, 'frequency', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-5 border-t border-border-subtle">
                <button onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl font-bold text-text-muted hover:text-text-main hover:bg-surface-accent transition-all text-sm">
                  ← Back
                </button>
                <button
                  disabled={loading}
                  onClick={handleSave}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 text-sm active:scale-95"
                >
                  {loading ? 'Syncing…' : <><Save size={16} /> Finalize Setup</>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
        <AlertCircle size={13} className="text-primary" />
        Every field is used to calculate your real viral trajectory.
      </p>
    </div>
  );
}
