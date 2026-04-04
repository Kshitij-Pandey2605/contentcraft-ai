import React from 'react';
import { motion } from 'framer-motion';
import { usePlatform } from '../context/PlatformContext';
import { useUser } from '../context/UserContext';
import PlatformSelector from '../components/ui/PlatformSelector';
import {
  Bell, Shield, Palette, Globe, Zap, CheckCircle,
  Monitor, Moon, Sun, Save
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const PLATFORM_INFO = {
  Instagram:  { tips: ['Post Reels 4–5×/week', 'Use 3–5 hashtags max', 'Stories drive profile visits'], bestTime: '6–9 AM & 7–9 PM' },
  TikTok:     { tips: ['Hook in first 0.5s', 'Use trending audio', '1–4 posts/day for algorithm'], bestTime: '7–9 AM & 7–11 PM' },
  LinkedIn:   { tips: ['Text posts outperform images', 'Tag 2–3 colleagues', 'Engage within 30 mins'], bestTime: '7–8:30 AM & 12–1 PM' },
  YouTube:    { tips: ['A/B test thumbnails', 'First 30s decide retention', 'Post on Thurs/Fri'], bestTime: '2–4 PM & 6–9 PM' },
  'Twitter/X':{ tips: ['Tweet during peak hours', 'Threads get 3× reach', '1–2 hashtags only'], bestTime: '8–10 AM & 5–6 PM' },
};

export default function Settings() {
  const { platform, setPlatform, platformInfo, PLATFORMS } = usePlatform();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const info = PLATFORM_INFO[platform] || PLATFORM_INFO['Instagram'];

  const handleSavePlatform = (p) => {
    setPlatform(p);
    toast.success(`Platform set to ${p} — all features now optimized!`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8 pb-12">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-text-main tracking-tight">Settings</h1>
        <p className="text-text-muted mt-1 font-medium">Manage your workspace preferences and platform focus.</p>
      </div>

      {/* ── Platform Preferences ── */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Globe size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-black text-text-main text-base">Platform Preferences</h2>
            <p className="text-text-muted text-xs font-medium">Your selection is saved automatically and applied everywhere.</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-xs font-bold text-primary">
              <Zap size={11} /> Active: {platformInfo.emoji} {platformInfo.label}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => handleSavePlatform(p.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all group ${
                platform === p.id
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-border-subtle bg-surface-accent hover:border-primary/30 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-xs font-bold text-text-main">{p.label}</span>
              {platform === p.id && <CheckCircle size={14} className="text-primary" />}
            </button>
          ))}
        </div>

        {/* Current platform tips */}
        <div className="p-4 rounded-2xl bg-surface-accent border border-border-subtle">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
            <Zap size={11} className="text-accent" /> {platformInfo.label} Strategy Tips
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Best Practices</p>
              {info.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-text-main font-medium">{tip}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Best Posting Time</p>
              <div className="px-4 py-3 rounded-xl bg-surface border border-border-subtle">
                <p className="text-sm font-black text-primary">{info.bestTime}</p>
                <p className="text-[11px] text-text-muted mt-0.5">Local time recommendation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Appearance ── */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Palette size={18} className="text-purple-500" />
          </div>
          <div>
            <h2 className="font-black text-text-main text-base">Appearance</h2>
            <p className="text-text-muted text-xs font-medium">Toggle between light and dark mode.</p>
          </div>
        </div>
        <div className="flex gap-3">
          {[
            { id: 'light', label: 'Light Mode', Icon: Sun },
            { id: 'dark',  label: 'Dark Mode',  Icon: Moon },
            { id: 'system',label: 'System',     Icon: Monitor },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => id !== 'system' && toggleTheme()}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-xs font-bold ${
                (id === 'dark' && theme === 'dark') || (id === 'light' && theme === 'light')
                  ? 'border-primary bg-primary/5 text-primary shadow-md shadow-primary/10'
                  : 'border-border-subtle bg-surface-accent text-text-muted hover:border-primary/30'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Account ── */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Shield size={18} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="font-black text-text-main text-base">Account</h2>
            <p className="text-text-muted text-xs font-medium">Your ContentCraft workspace identity.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-accent border border-border-subtle">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-lg shadow-lg">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-black text-text-main">{user?.name}</p>
            <p className="text-xs text-text-muted font-medium">{user?.email}</p>
          </div>
          <div className="ml-auto px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
            Pro Plan
          </div>
        </div>
      </div>

      {/* ── Notifications ── */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Bell size={18} className="text-amber-500" />
          </div>
          <div>
            <h2 className="font-black text-text-main text-base">Notifications</h2>
            <p className="text-text-muted text-xs font-medium">Control what ContentCraft alerts you about.</p>
          </div>
        </div>
        {[
          { label: 'Trending topic alerts', sub: 'Get notified when a trend spikes on your platform', defaultOn: true },
          { label: 'Virality score updates', sub: 'When your content crosses 80+ score threshold', defaultOn: true },
          { label: 'Weekly performance digest', sub: 'Summary of your analytics every Monday', defaultOn: false },
        ].map(({ label, sub, defaultOn }, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0">
            <div>
              <p className="text-sm font-bold text-text-main">{label}</p>
              <p className="text-xs text-text-muted">{sub}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" />
              <div className="w-10 h-5 bg-surface-accent border border-border-subtle rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
