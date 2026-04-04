import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonLoaders({ count = 3, type = "card" }) {
  const renderLoaders = () => {
    const arr = [...Array(count)];
    
    if (type === "card") {
      return arr.map((_, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 h-32 animate-pulse bg-white/5 border border-[var(--border-subtle)]"
        />
      ));
    }

    if (type === "chart") {
       return arr.map((_, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 h-[400px] animate-pulse bg-white/5 border border-[var(--border-subtle)]"
        />
      ));
    }

    return arr.map((_, i) => (
        <div key={i} className="h-12 bg-[var(--surface-accent)] animate-pulse rounded-xl" />
    ));
  };

  return (
    <div className={`grid gap-6 w-full ${type === "card" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
       {renderLoaders()}
    </div>
  );
}
