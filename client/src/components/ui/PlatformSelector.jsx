import React, { useState, useRef, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Video, Image, Play, Share2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const platforms = [
  { id: 'Instagram', label: 'Instagram', icon: Image },
  { id: 'TikTok', label: 'TikTok', icon: Video },
  { id: 'YouTube', label: 'YouTube Shorts', icon: Play },
  { id: 'LinkedIn', label: 'LinkedIn', icon: Share2 },
  { id: 'X', label: 'X (Twitter)', icon: MessageSquare },
];

export default function PlatformSelector() {
  const { platform, setPlatform } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (p) => {
    setPlatform(p.id);
    setIsOpen(false);
    toast.success(`Platform set to ${p.label}`, {
      icon: '🔄',
      style: {
        borderRadius: '10px',
        background: 'var(--surface)',
        color: 'var(--text-main)',
      },
    });
  };

  const activePlatform = platforms.find(p => p.id === platform) || platforms[0];
  const ActiveIcon = activePlatform.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-accent)] hover:bg-[var(--surface-accent2)] transition-colors"
      >
        <ActiveIcon className="w-4 h-4 text-[var(--color-primary)]" />
        <span className="text-sm font-semibold max-w-[100px] truncate">{activePlatform.label}</span>
        <ChevronDown className="w-4 h-4 text-color-text-muted" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             transition={{ duration: 0.15 }}
             className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl shadow-2xl overflow-hidden z-50 glass"
          >
             <div className="p-1">
               {platforms.map(p => {
                 const Icon = p.icon;
                 return (
                   <button
                     key={p.id}
                     onClick={() => handleSelect(p)}
                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${platform === p.id ? 'bg-[var(--surface-accent2)] text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-accent)] hover:text-[var(--text-main)]'}`}
                   >
                     <Icon className={`w-4 h-4 ${platform === p.id ? 'text-[var(--color-primary)]' : ''}`} />
                     {p.label}
                   </button>
                 );
               })}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
