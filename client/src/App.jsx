import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ContentGenerator from './pages/ContentGenerator';
import ContentImprover from './pages/ContentImprover';
import IdeaGenerator from './pages/IdeaGenerator';
import TrendEngine from './pages/TrendEngine';
import AiAssistant from './pages/AiAssistant';
import Analytics from './pages/Analytics';
import AttentionAnalysis from './pages/AttentionAnalysis';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlatformProvider } from './context/PlatformContext';
import ProtectedRoute from './components/ProtectedRoute';
import OrbBackground from './components/ui/OrbBackground';

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
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '14px',
                  fontWeight: '600',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                },
                success: { iconTheme: { primary: '#6366f1', secondary: '#0f172a' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#0f172a' } }
              }}
            />
            {/* Global background visual depth */}
            <OrbBackground />
            
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login"  element={<AuthPage initialMode="login" />} />
              <Route path="/signup" element={<AuthPage initialMode="signup" />} />

              {/* Protected Application Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="generate" element={<ContentGenerator />} />
                  <Route path="assistant" element={<AiAssistant />} />
                  <Route path="ask-ai" element={<AiAssistant />} />
                  <Route path="ask" element={<Navigate to="/ask-ai" replace />} />
                  <Route path="trends" element={<TrendEngine />} />
                  <Route path="improve" element={<ContentImprover />} />
                  <Route path="ideas" element={<IdeaGenerator />} />
                  <Route path="attention" element={<AttentionAnalysis />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
