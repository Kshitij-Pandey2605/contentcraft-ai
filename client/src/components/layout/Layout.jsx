import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AuthModal from '../auth/AuthModal';
import PlatformOnboarding from '../ui/PlatformOnboarding';
import { useUser } from '../../context/UserContext';
import { usePlatform } from '../../context/PlatformContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { isAuthenticated, isProfileComplete } = useUser();
  const { platform } = usePlatform();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if platform is already set in localStorage
  const hasOnboarded = !!localStorage.getItem('cc_platform');

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else if (!hasOnboarded) {
      setIsOnboardingOpen(true);
    } else if (!isProfileComplete && location.pathname !== '/profile') {
      navigate('/profile');
    }
  }, [isAuthenticated, isProfileComplete, hasOnboarded, location.pathname, navigate]);

  return (
    <div className="flex bg-background min-h-screen text-text-main transition-colors duration-300">
      
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
          className="p-5 bg-primary text-white rounded-3xl shadow-2xl shadow-primary/40 border border-white/20 backdrop-blur-md"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[80] lg:hidden" 
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-surface z-[90] lg:hidden border-r border-border-subtle overflow-y-auto"
            >
              <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Canvas ── */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative">
        <Navbar />
        
        <div className="flex-1 p-6 lg:p-10 overflow-x-hidden overflow-y-auto custom-scrollbar relative">
          <div className="max-w-7xl mx-auto w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Modals & Overlays ── */}
        <AuthModal 
          isOpen={isAuthModalOpen && !isAuthenticated} 
          onClose={() => {
            if (isAuthenticated) setIsAuthModalOpen(false);
          }} 
        />
        
        <PlatformOnboarding 
          isOpen={isOnboardingOpen && isAuthenticated} 
          onClose={() => setIsOnboardingOpen(false)} 
        />
      </main>
    </div>
  );
}

