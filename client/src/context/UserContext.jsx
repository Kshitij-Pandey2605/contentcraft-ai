import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Load from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('cc_user');
    const savedProfile = localStorage.getItem('cc_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    if (savedProfile) {
      setIsProfileComplete(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cc_user', JSON.stringify(userData));
    // Check if profile exists for this mock user
    const savedProfile = localStorage.getItem(`cc_profile_${userData.email}`);
    setIsProfileComplete(!!savedProfile);
  };

  const register = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsProfileComplete(false);
    localStorage.setItem('cc_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    localStorage.removeItem('cc_user');
  };

  const updateProfile = (profileData) => {
    localStorage.setItem(`cc_profile_${user.email}`, JSON.stringify(profileData));
    setIsProfileComplete(true);
  };

  const getProfile = () => {
    return JSON.parse(localStorage.getItem(`cc_profile_${user?.email}`)) || null;
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isProfileComplete, 
      login, 
      register, 
      logout,
      updateProfile,
      getProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};
