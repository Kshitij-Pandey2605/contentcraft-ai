import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "bg-surface-accent/40 animate-pulse relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:animate-[shimmer_1.5s_infinite]";
  
  const variantClasses = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md h-4 w-full"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="w-1/3 mb-1" />
        <Skeleton variant="text" className="w-2/3 h-6" />
      </div>
      <Skeleton variant="rect" className="w-10 h-10" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
    </div>
    <div className="flex gap-2 pt-2">
      <Skeleton variant="rect" className="w-20 h-6" />
      <Skeleton variant="rect" className="w-20 h-6" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <Skeleton variant="text" className="w-48 h-8" />
      <Skeleton variant="text" className="w-64 h-4" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="glass-card h-96 p-6">
      <Skeleton variant="rect" className="w-full h-full" />
    </div>
  </div>
);
