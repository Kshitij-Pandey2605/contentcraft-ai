import React from 'react';
import { motion } from 'framer-motion';

export default function OrbBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Primary color */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px]"
      />
      
      {/* Orb 2: Accent color */}
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[150px]"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
    </div>
  );
}
