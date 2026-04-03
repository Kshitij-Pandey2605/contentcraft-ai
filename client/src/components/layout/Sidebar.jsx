import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PenTool, MessageSquarePlus, 
  Lightbulb, Wand2, Activity, BarChart2, 
  Zap, Crown, ShieldCheck, UserCircle, LogOut,
  Settings, ChevronRight, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const baseNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Trend Engine', path: '/trends', icon: Activity },
  { name: 'Generate Content', path: '/generate', icon: PenTool },
  { name: 'Ask AI', path: '/ask', icon: MessageSquarePlus },
  { name: 'Get Ideas', path: '/ideas', icon: Lightbulb },
  { name: 'Improve Content', path: '/improve', icon: Wand2 },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Profile Sync', path: '/profile', icon: Settings },
];

export default function Sidebar() {
  const { user, logout, isProfileComplete, getProfile } = useUser();
  const navigate = useNavigate();
  const profile = getProfile();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload(); // Reset state
  };

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-72 h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 bg-background/80 backdrop-blur-3xl shadow-2xl shadow-primary/5"
    >
      <div className="p-8 pt-10">
        <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter group cursor-pointer">
          <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <Zap size={24} className="fill-white" />
          </div>
          ContentCraft
        </h1>
      </div>

      <nav className="flex-1 px-6 space-y-1 mt-8 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4 px-2">Workspace Menu</p>
        {baseNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary font-bold shadow-inner'
                  : 'text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.03]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={`${isActive ? 'scale-110 text-primary' : 'group-hover:scale-110'} transition-transform`} />
                <span className="text-sm tracking-tight">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {isProfileComplete && profile?.platforms?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4 px-2">Active Channels</p>
            <div className="grid grid-cols-4 gap-2 px-2">
              {profile.platforms.map(p => (
                <div key={p} className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-primary transition-colors cursor-help tooltip" title={p}>
                   <Globe size={16} />
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-6 space-y-4">
        {/* User Status Card */}
        {user && (
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group transition-all hover:bg-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                {user.name?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-zinc-500 font-medium truncate">{user.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                <Crown size={12} className="text-accent" /> Premium
              </span>
              <ShieldCheck size={14} className="text-accent" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-lg font-black text-white tracking-tighter">750 <span className="text-[10px] font-bold text-zinc-600 uppercase">Credits</span></p>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Limit 1000</p>
              </div>
              <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
              <p className="text-[10px] text-zinc-600 font-bold leading-relaxed">
                Tokens reset in <span className="text-zinc-400">12 days</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
