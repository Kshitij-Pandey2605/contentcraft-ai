import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function AttentionAnalysis() {
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalysis = async (e) => {
    e.preventDefault();
    if (!script.trim()) return toast.error('Enter a script to analyze');
    
    setLoading(true);
    try {
      const res = await api.post('attention-analysis', { script });
      setResult(res.data.data);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed. Make sure the script is long enough.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] w-full flex flex-col">
      <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tight">Attention Simulation Engine</h1>
         <p className="text-color-text-muted mt-1">Predict audience drop-offs before you shoot the video.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
              <PlayCircle className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <h2 className="text-xl font-bold">Video Script/Concept</h2>
          </div>
          
          <form onSubmit={handleAnalysis} className="flex-1 flex flex-col">
            <textarea
              className="flex-1 w-full p-4 rounded-xl bg-[var(--surface-accent)] border border-[var(--border-subtle)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none mb-6 custom-scrollbar text-[var(--text-main)]"
              placeholder="Paste your video script, hook, or rough concept here..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-premium text-white font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-75"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Simulating Playback...
                </>
              ) : (
                'Run Attention Analysis'
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-6">Retention Prediction</h2>
          
          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-color-text-muted opacity-50">
              <PlayCircle className="w-16 h-16 mb-4" />
              <p>Awaiting concept to process retention graph.</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col"
            >
              {/* Score Header */}
              <div className="flex items-center justify-between p-6 bg-[var(--surface-accent)] rounded-2xl border border-[var(--border-subtle)] mb-6">
                <div>
                  <p className="text-sm font-medium text-color-text-muted mb-1">Predicted Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-gradient">{result.retentionScore}</span>
                    <span className="text-lg font-medium text-color-text-muted mb-1">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-color-text-muted mb-1">Major Drop-off at</p>
                  <div className="flex items-center gap-2 text-xl font-bold justify-end">
                    <Clock className="w-5 h-5 text-red-400" />
                    {result.estimatedDropoff}
                  </div>
                </div>
              </div>

              {/* Insights Stream */}
              <h3 className="font-semibold text-lg mb-4">Frame-by-Frame Insights</h3>
              <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
                {result.insights.map((insight, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                    <div className="flex items-start gap-3">
                      {insight.issue.includes("Weak") || insight.issue.includes("Slow") || insight.issue.includes("Repetitive") ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-bold">{insight.type}: {insight.issue}</h4>
                        <p className="text-sm text-color-text-muted mt-1">{insight.message}</p>
                        <div className="mt-3 p-3 bg-[var(--surface-accent)] rounded-lg text-sm border-l-2 border-[var(--color-primary)]">
                          <span className="font-semibold text-[var(--color-primary)] mr-2">Fix:</span>
                          {insight.suggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
