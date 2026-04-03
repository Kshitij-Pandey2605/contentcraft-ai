import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { 
  Check, ChevronRight, Globe, TrendingUp, BarChart2, 
  Share2, Video, Camera, Hash, Bookmark, Save, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: Globe, niche: ['Professional', 'B2B', 'Tech', 'Career'] },
  { id: 'twitter', name: 'X (Twitter)', color: '#000000', icon: Globe, niche: ['Tech', 'News', 'Web3', 'Lifestyle'] },
  { id: 'instagram', name: 'Instagram', color: '#E4405F', icon: Camera, niche: ['Fashion', 'Food', 'Travel', 'Art'] },
  { id: 'tiktok', name: 'TikTok', color: '#000000', icon: Video, niche: ['Entertainment', 'Edu', 'Comedy', 'Dance'] },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', icon: Globe, niche: ['Family', 'B2C', 'Local', 'Social'] },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: Video, niche: ['Longform', 'Edu', 'Vlog', 'Gaming'] },
  { id: 'threads', name: 'Threads', color: '#000000', icon: Share2, niche: ['Social', 'Lifestyle', 'Text'] },
];

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
      [platform]: {
        ...(prev[platform] || {}),
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const profileData = {
      platforms: selectedPlatforms,
      metrics: metrics,
      updatedAt: new Date().toISOString()
    };
    await updateProfile(profileData);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-6"
        >
          <BarChart2 className="text-primary" size={32} />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-white mb-3">Setup Your Content Workspace</h1>
        <p className="text-zinc-500 font-medium max-w-lg mx-auto">First, sync your active social media channels and current metrics for real-time analysis.</p>
      </div>

      <div className="glass-card p-10 bg-surface/50 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 blur-[100px] -z-10" />

        <div className="flex items-center gap-2 mb-10">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all ${
                  step === i ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : step > i ? 'bg-emerald-500 text-white' : 'bg-white/5 text-zinc-600'
                }`}
              >
                {step > i ? <Check size={18} /> : i}
              </div>
              {i === 1 && <div className={`w-12 h-0.5 rounded-full ${step > 1 ? 'bg-emerald-500' : 'bg-white/5'}`} />}
            </div>
          ))}
          <span className="ml-4 text-xs font-black uppercase tracking-widest text-zinc-500">
            {step === 1 ? 'Select Platforms' : 'Metric Evaluation'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {PLATFORMS.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePlatformToggle(p.id)}
                      className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all relative ${
                        isSelected 
                          ? 'bg-surfaceAccent/50 border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20' 
                          : 'bg-white/5 border-white/5 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <p.icon 
                        size={32} 
                        style={{ color: isSelected ? p.color : 'inherit' }}
                        className="mb-4"
                      />
                      <span className="text-sm font-bold">{p.name}</span>
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-primary">
                          <Check size={14} strokeWidth={4} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-6 border-t border-white/5">
                <button 
                  disabled={selectedPlatforms.length === 0}
                  onClick={() => setStep(2)}
                  className="bg-primary hover:bg-primaryHover disabled:opacity-50 text-white font-black px-10 py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all"
                >
                  NEXT STEP <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {selectedPlatforms.map((pid) => {
                  const platform = PLATFORMS.find(p => p.id === pid);
                  return (
                    <div key={pid} className="space-y-6 p-8 rounded-3xl bg-white/[0.03] border border-white/5 relative group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-white/5" style={{ color: platform.color }}>
                          <platform.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold">{platform.name} Metrics</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block transition-colors group-focus-within:text-primary">Follower Count</label>
                          <input 
                            type="number"
                            placeholder="e.g. 12500"
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold text-lg"
                            value={metrics[pid]?.followers || ''}
                            onChange={(e) => handleMetricChange(pid, 'followers', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Avg. Engagement Rate (%)</label>
                          <input 
                            type="number"
                            step="0.1"
                            placeholder="e.g. 2.4"
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold text-lg"
                            value={metrics[pid]?.engagement || ''}
                            onChange={(e) => handleMetricChange(pid, 'engagement', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block font-bold tracking-[0.2em] mb-1">Niche Category</label>
                          <select 
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold"
                            value={metrics[pid]?.niche || ''}
                            onChange={(e) => handleMetricChange(pid, 'niche', e.target.value)}
                          >
                            <option value="">Select Niche</option>
                            {platform.niche.map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Post Frequency (Weekly)</label>
                          <input 
                            type="number"
                            placeholder="e.g. 3"
                            className="w-full bg-background/50 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold text-lg"
                            value={metrics[pid]?.frequency || ''}
                            onChange={(e) => handleMetricChange(pid, 'frequency', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-8 border-t border-white/5">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-4 rounded-2xl font-bold text-zinc-500 hover:text-white transition-colors"
                >
                  Back to Platforms
                </button>
                <button 
                  disabled={loading}
                  onClick={handleSave}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-12 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/20"
                >
                  {loading ? 'SYNCING...' : 'FINALIZE SETUP'} <Save size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-widest">
         <AlertCircle size={14} className="text-primary" /> Every field is used to calculate your real viral trajectory.
      </div>
    </div>
  );
}
