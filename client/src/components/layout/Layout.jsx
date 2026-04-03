import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthModal from '../auth/AuthModal';
import { useUser } from '../../context/UserContext';

export default function Layout() {
  const { isAuthenticated, isProfileComplete } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else if (!isProfileComplete && location.pathname !== '/profile') {
      navigate('/profile');
    }
  }, [isAuthenticated, isProfileComplete, location.pathname, navigate]);

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-72 p-10 overflow-y-auto h-screen custom-scrollbar relative">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>

        {/* Global Auth Overlay if not logged in */}
        <AuthModal 
          isOpen={isAuthModalOpen && !isAuthenticated} 
          onClose={() => {
            if (isAuthenticated) setIsAuthModalOpen(false);
          }} 
        />
      </main>
    </div>
  );
}
