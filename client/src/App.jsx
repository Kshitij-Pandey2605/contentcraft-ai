import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TrendEngine from './pages/TrendEngine';
import ContentGenerator from './pages/ContentGenerator';
import AskAI from './pages/AskAI';
import IdeaGenerator from './pages/IdeaGenerator';
import ContentImprover from './pages/ContentImprover';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlatformProvider } from './context/PlatformContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <PlatformProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '14px',
                  fontWeight: '600',
                },
                success: { iconTheme: { primary: '#4ade80', secondary: 'var(--surface)' } },
                error: { iconTheme: { primary: '#f87171', secondary: 'var(--surface)' } }
              }}
            />
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login"  element={<AuthPage initialMode="login" />} />
              <Route path="/signup" element={<AuthPage initialMode="signup" />} />

              {/* Protected Application Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index          element={<Dashboard />} />
                  <Route path="trends"  element={<TrendEngine />} />
                  <Route path="generate" element={<ContentGenerator />} />
                  <Route path="ask"     element={<AskAI />} />
                  <Route path="ideas"   element={<IdeaGenerator />} />
                  <Route path="improve" element={<ContentImprover />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </PlatformProvider>
    </ThemeProvider>
  );
}

export default App;
