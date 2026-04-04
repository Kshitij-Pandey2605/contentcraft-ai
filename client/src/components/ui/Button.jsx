import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyles = "px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover shadow-lg shadow-primary/25",
    secondary: "bg-surface-accent text-text-main border border-border-subtle hover:border-primary/50",
    gradient: "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-xl shadow-primary/20",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
  };

  return (
    <motion.button 
      whileHover={{ y: -1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
