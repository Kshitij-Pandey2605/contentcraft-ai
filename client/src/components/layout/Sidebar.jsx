import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PenTool, MessageSquarePlus, 
  Lightbulb, Wand2, Activity, BarChart2, 
  Settings, LogOut, Globe, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import logoImage from '../../assets/logo.png';

const baseNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Trend Engine', path: '/trends', icon: Activity },
  { name: 'Generate Content', path: '/generate', icon: PenTool },
  { name: 'Ask AI', path: '/ask', icon: MessageSquarePlus },
  { name: 'Get Ideas', path: '/ideas', icon: Lightbulb },
  { name: 'Improve Content', path: '/improve', icon: Wand2 },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Profile Sync', path: '/profile', icon: Globe },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ className = '', closeMenu }) {
  const { user, logout, isProfileComplete } = useUser();
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
      className={`w-64 h-full bg-surface border-r border-border-subtle flex flex-col fixed left-0 top-0 transition-colors duration-300 z-50 ${className}`}
    >
      <div className="p-6">
        <h1 className="text-2xl font-black text-text-main flex items-center gap-3 tracking-tighter group cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src={logoImage} 
            alt="ContentCraft" 
            className="w-8 h-8 rounded-lg shadow-md group-hover:rotate-12 transition-transform"
          />
          ContentCraft
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-3 px-3">Workspace</p>
        
        {baseNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-surface-accent text-primary font-bold shadow-sm'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-accent/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={`${isActive ? 'text-primary' : 'group-hover:text-text-main'} transition-colors`} />
                <span className="text-sm tracking-tight">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-5 bg-primary rounded-r-md"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom User Actions Strip */}
      <div className="p-4 border-t border-border-subtle">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all font-semibold text-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </motion.aside>
  );
}