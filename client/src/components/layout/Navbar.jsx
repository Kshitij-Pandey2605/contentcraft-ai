import React from 'react';
import { Search, Zap } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import PlatformSelector from '../ui/PlatformSelector';
import { useUser } from '../../context/UserContext';
import { usePlatform } from '../../context/PlatformContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user } = useUser();
  const { platformInfo } = usePlatform();
  const navigate = useNavigate();

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 border-b border-border-subtle bg-background/90 backdrop-blur-xl sticky top-0 z-40 transition-colors duration-300 gap-4">

      {/* Search */}
      <div className="flex-1 relative max-w-sm hidden md:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={15} />
        <input
          type="text"
          placeholder="Search campaigns, analytics..."
          className="w-full bg-surface-accent border border-border-subtle text-text-main placeholder:text-text-muted rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Platform badge — "Optimized for Instagram 🚀" */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-xs font-bold text-primary">
          <Zap size={11} className="text-primary" />
          Optimized for {platformInfo.label} {platformInfo.emoji}
        </div>

        {/* Platform Selector */}
        <PlatformSelector />

        <ThemeToggle />

        {user && (
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-text-main leading-none group-hover:text-primary transition-colors">{user.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Pro Plan</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20 ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
              {user.name?.[0]?.toUpperCase()}
            </div>
          </button>
        )}
      </div>
    </header>
  );
}
