import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  if (loading) return null; // Or a full screen loader

  return (
    <div className="flex bg-[var(--bg)] min-h-screen text-[var(--text-main)] transition-colors duration-300">
      
      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:block relative z-50">
        <Sidebar className="w-64 fixed h-screen" />
      </div>

      {/* ── Mobile Menu Toggle ── */}
      <div className="lg:hidden fixed bottom-10 right-10 z-[100]">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-4 bg-gradient-premium text-white rounded-full shadow-2xl shadow-[var(--color-primary)]/40 border border-white/20 backdrop-blur-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden" 
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[var(--surface)] z-[90] lg:hidden border-r border-[var(--border-subtle)] overflow-y-auto"
            >
              <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Canvas ── */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar relative">
          {/* Subtle background glow */}
          <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-10%] left-[20%] w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
          
          <div className="max-w-7xl mx-auto w-full h-full relative z-10 pt-4 pb-20 lg:pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
