import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Zap, MessageSquare, Info } from 'lucide-react';
import { askQuestion } from '../services/api';

export default function AskAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm your marketing AI assistant. What strategies or concepts can I help you with today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await askQuestion(userQuery);
      if (res.success) {
        const data = res.data;
        let responseStr = `${data.explanation}\n\n`;
        
        if (data.actionableSteps?.length > 0) {
          responseStr += `**Actionable Steps:**\n`;
          data.actionableSteps.forEach(step => responseStr += `• ${step}\n`);
          responseStr += '\n';
        }

        if (data.proTips?.length > 0) {
          responseStr += `**Pro Tips:**\n`;
          data.proTips.forEach(tip => responseStr += `• ${tip}\n`);
        }

        setMessages(prev => [...prev, { role: 'assistant', text: responseStr }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I couldn't process that right now. Please try again." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error connecting to AI backend. Please verify your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col glass-card border border-white/5 overflow-hidden bg-gradient-to-b from-surface/50 to-background/50 shadow-2xl relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />
      
      <div className="p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20 shadow-lg shadow-primary/10">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-xl tracking-tight">Marketing AI</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest">Active Engine</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <span>GPT-4o OPTIMIZED</span>
          <div className="w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5"><Zap size={12} className="text-accent" /> REAL-TIME ANALYSIS</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative z-10">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            key={i} 
            className={`flex gap-5 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
              msg.role === 'user' 
                ? 'bg-surfaceAccent border-white/10' 
                : 'bg-primary/20 text-primary border-primary/20'
            }`}>
              {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
            </div>
            
            <div className={`p-6 rounded-3xl shadow-xl leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-sm font-medium' 
                : 'bg-white/[0.03] border border-white/10 rounded-tl-sm text-zinc-200'
            }`}>
              <div className="whitespace-pre-wrap text-sm md:text-base">
                {msg.text.split('**').map((chunk, j) => j % 2 === 1 
                  ? <strong key={j} className={`${msg.role === 'user' ? 'text-white' : 'text-primary'} font-black`}>{chunk}</strong> 
                  : chunk
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-5 max-w-[80%]">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 border border-primary/20">
              <Sparkles size={20} />
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 rounded-tl-sm flex items-center gap-3">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-8 bg-surface/30 border-t border-white/5 backdrop-blur-2xl shrink-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-40 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about retention metrics, content hooks, or platform strategies..."
            className="relative w-full bg-background border border-white/10 rounded-2xl py-6 pl-8 pr-16 focus:outline-none focus:border-primary/50 text-base md:text-lg transition-all shadow-2xl placeholder:text-zinc-600 font-medium"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3.5 bg-primary hover:bg-primaryHover disabled:bg-white/5 disabled:text-zinc-600 text-white rounded-xl transition-all shadow-lg active:scale-95 group/btn"
          >
            <Send size={22} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </form>
        <p className="max-w-4xl mx-auto text-center text-[10px] text-zinc-600 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Info size={12} /> AI can make mistakes. Verify important marketing data.
        </p>
      </div>
    </motion.div>
  );
}
