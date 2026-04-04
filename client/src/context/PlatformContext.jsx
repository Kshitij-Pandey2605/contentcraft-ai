import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { useUser } from './UserContext';
import api from '../services/api';

const PLATFORMS = [
  { id: 'Instagram',  label: 'Instagram',  emoji: '📸', color: '#E4405F' },
  { id: 'TikTok',     label: 'TikTok',     emoji: '🎵', color: '#06b6d4' },
  { id: 'LinkedIn',   label: 'LinkedIn',   emoji: '💼', color: '#0A66C2' },
  { id: 'YouTube',    label: 'YouTube',    emoji: '▶️',  color: '#FF0000' },
  { id: 'Twitter/X',  label: 'Twitter/X',  emoji: '🐦', color: '#1d9bf0' },
];

const PlatformContext = createContext(null);

export function PlatformProvider({ children }) {
  const { user, login } = useUser();
  const [platform, setPlatformState] = useState(() => {
    return localStorage.getItem('cc_platform') || 'Instagram';
  });

  // Sync with user preference on login
  useEffect(() => {
    if (user?.preferredPlatform && user.preferredPlatform !== platform) {
      setPlatformState(user.preferredPlatform);
      localStorage.setItem('cc_platform', user.preferredPlatform);
    }
  }, [user]);

  const setPlatform = useCallback(async (newPlatform) => {
    setPlatformState(newPlatform);
    localStorage.setItem('cc_platform', newPlatform);

    // Sync to backend if authenticated
    if (user?._id && user._id !== 'offline_mock_id_9999') {
      try {
        const res = await api.put('/auth/profile', { preferredPlatform: newPlatform });
        if (res.data.success) {
          // Update local user state via login/setUser if needed
          // For now, PlatformContext handles the visual state
        }
      } catch (err) {
        console.error('Failed to sync platform to backend', err);
      }
    }
  }, [user]);

  const platformInfo = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];

  return (
    <PlatformContext.Provider value={{ platform, setPlatform, platformInfo, PLATFORMS }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used inside PlatformProvider');
  return ctx;
}

export { PLATFORMS };
