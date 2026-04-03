import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, MessageSquarePlus, Lightbulb, Wand2, ArrowUpRight, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Posts Generated', value: '124', icon: PenTool, color: 'text-blue-500' },
  { label: 'Avg. Viral Score', value: '92.4', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Audience Reach', value: '45.2k', icon: Users, color: 'text-purple-500' },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold font-sans">Welcome Back, Creator <span className="wave">👋</span></h1>
        <p className="text-zinc-400 mt-2 text-lg">Here's what your AI assistant has been analyzing today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-xl bg-surfaceAccent ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-400 gap-1">
              <ArrowUpRight size={14} />
              <span>12% from last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Tools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ToolCard to="/generate" icon={PenTool} title="Viral Content" desc="Generate platform-specific posts" delay={0.1} />
          <ToolCard to="/ask" icon={MessageSquarePlus} title="Ask Marketing AI" desc="Get strategy and answers" delay={0.2} />
          <ToolCard to="/ideas" icon={Lightbulb} title="Get Viral Ideas" desc="Discover trending topics" delay={0.3} />
          <ToolCard to="/improve" icon={Wand2} title="Improve Content" desc="Enhance existing drafts" delay={0.4} />
        </div>
      </div>
    </motion.div>
  );
}

function ToolCard({ to, icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Link to={to} className="block glass-card p-6 hover:-translate-y-1 transition-transform group h-full">
        <div className="p-3 bg-surfaceAccent rounded-lg w-min group-hover:bg-primary/20 group-hover:text-primary transition-colors">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-1">{title}</h3>
        <p className="text-sm text-zinc-400">{desc}</p>
      </Link>
    </motion.div>
  );
}
