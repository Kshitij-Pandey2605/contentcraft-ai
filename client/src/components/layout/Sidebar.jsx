import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PenTool, MessageSquarePlus, Lightbulb, Wand2, Activity, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Trend Engine', path: '/trends', icon: Activity },
  { name: 'Generate Content', path: '/generate', icon: PenTool },
  { name: 'Ask AI', path: '/ask', icon: MessageSquarePlus },
  { name: 'Get Ideas', path: '/ideas', icon: Lightbulb },
  { name: 'Improve Content', path: '/improve', icon: Wand2 },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
];

export default function Sidebar() {
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-2 tracking-tight">
          <Wand2 className="text-accent" />
          ContentCraft
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-surfaceAccent to-surface border border-white/5 text-sm text-zinc-400">
        <p>Premium Plan</p>
        <div className="w-full h-1.5 bg-background rounded-full mt-2 overflow-hidden">
          <div className="w-3/4 h-full bg-accent rounded-full"></div>
        </div>
        <p className="mt-2 text-xs">750 / 1000 AI Credits</p>
      </div>
    </motion.aside>
  );
}
