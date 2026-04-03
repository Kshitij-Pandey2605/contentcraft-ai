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

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#18181b', // Zinc 900
            color: '#fff',
            border: '1px solid #27272a', // Zinc 800
          },
          success: { iconTheme: { primary: '#4ade80', secondary: '#18181b' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#18181b' } }
        }} 
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trends" element={<TrendEngine />} />
          <Route path="generate" element={<ContentGenerator />} />
          <Route path="ask" element={<AskAI />} />
          <Route path="ideas" element={<IdeaGenerator />} />
          <Route path="improve" element={<ContentImprover />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
