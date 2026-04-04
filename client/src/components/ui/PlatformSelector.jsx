import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlatformSelector({ compact = false }) {
  const { platform, setPlatform, platformInfo, PLATFORMS } = usePlatform();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-accent hover:border-primary/40 transition-all font-semibold text-text-main ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        }`}
      >
        <span>{platformInfo.emoji}</span>
        {!compact && <span className="hidden sm:inline text-xs text-text-muted font-bold uppercase tracking-wider">Platform:</span>}
        <span>{platformInfo.label}</span>
        <ChevronDown
          size={compact ? 12 : 14}
          className={`text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-surface border border-border-subtle rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-1.5 space-y-0.5">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setPlatform(p.id); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    platform === p.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-main hover:bg-surface-accent'
                  }`}
                >
                  <span className="text-base">{p.emoji}</span>
                  <span className="flex-1 text-left">{p.label}</span>
                  {platform === p.id && <Check size={14} className="text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
