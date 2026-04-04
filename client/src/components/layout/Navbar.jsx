import React from 'react';
import { Search, Zap } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import PlatformSelector from '../ui/PlatformSelector';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export default function Navbar() {
  const { user } = useAuth();
  const { platform } = usePlatform();

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 border-b border-[var(--border-subtle)] bg-[var(--surface)]/80 backdrop-blur-xl sticky top-0 z-40 transition-colors duration-300 gap-4">

      {/* Search */}
      <div className="flex-1 relative max-w-sm hidden md:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={15} />
        <input
          type="text"
          placeholder="Search campaigns, analytics..."
          className="w-full bg-[var(--surface-accent)] border border-[var(--border-subtle)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-all font-medium"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Platform badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full text-xs font-bold text-[var(--color-primary)]">
          <Zap size={11} className="text-[var(--color-primary)]" />
          Optimized for {platform}
        </div>

        {/* Platform Selector */}
        <PlatformSelector />

        <ThemeToggle />

        {user && (
          <div className="flex items-center gap-2.5 cursor-pointer group ml-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[var(--text-main)] leading-none group-hover:text-[var(--color-primary)] transition-colors">{user.name || "Creator"}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Pro Plan</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-premium flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--color-primary)]/20 ring-2 ring-[var(--surface-accent)] group-hover:ring-[var(--color-primary)]/50 transition-all">
              {(user.name || 'C')[0]?.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
