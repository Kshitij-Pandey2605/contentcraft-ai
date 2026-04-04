import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PenTool, Bot, PlayCircle, LogOut, Disc, 
  TrendingUp, Sparkles, RefreshCcw, BarChart3 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

const baseNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Strategist', path: '/ask-ai', icon: Bot },
  { name: 'Trend Detection', path: '/trends', icon: TrendingUp },
  { name: 'Strategy Generator', path: '/generate', icon: PenTool },
  { name: 'Script Optimizer', path: '/improve', icon: RefreshCcw },
  { name: 'Idea Factory', path: '/ideas', icon: Sparkles },
  { name: 'Attention Scan', path: '/attention', icon: PlayCircle },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export default function Sidebar({ className = '', closeMenu }) {
  const { logout } = useAuth();
  const { platform, setPlatform, PLATFORMS, platformInfo } = usePlatform();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload(); 
  };

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={`w-64 h-full bg-[var(--surface)] border-r border-[var(--border-subtle)] flex flex-col fixed left-0 top-0 transition-colors duration-300 z-50 shadow-xl ${className}`}
    >
      <div className="p-6">
        <h1 
          className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3 tracking-tighter group cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center p-2 shadow-lg shadow-[var(--color-primary)]/20">
            <img src="/favicon.svg" alt="CC" className="w-full h-full invert brightness-0" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">ContentCraft</span>
        </h1>
      </div>

      {/* ── Platform Switcher ── */}
      <div className="px-6 mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 px-1">Strategic Context</p>
        <div className="bg-[var(--surface-accent)]/50 border border-[var(--border-subtle)] rounded-2xl p-1 grid grid-cols-5 gap-1 shadow-inner relative group">
          {PLATFORMS.map((p) => (
             <button
               key={p.id}
               onClick={() => setPlatform(p.id)}
               title={p.label}
               className={`h-9 flex items-center justify-center rounded-xl text-lg transition-all relative z-10 ${
                 platform === p.id 
                  ? 'bg-gradient-premium text-white shadow-md' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
               }`}
             >
               {p.emoji}
             </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 px-3">Growth Suite</p>
        
        {baseNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-premium text-white shadow-lg shadow-[var(--color-primary)]/20'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-accent)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-[var(--color-primary)]'} transition-colors`} />
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--surface-accent)]/30">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </motion.aside>
  );
}