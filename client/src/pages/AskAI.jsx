import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
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
        // Construct the assistant message from the JSON output
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
      const errorMessage = err.response && err.response.data && err.response.data.error 
        ? err.response.data.error 
        : "Error connecting to AI backend. Make sure your server is running and API key is valid.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-6rem)] flex flex-col glass-card border border-white/5 overflow-hidden"
    >
      <div className="p-4 border-b border-white/5 bg-surface/50 backdrop-blur-md flex items-center gap-3 z-10">
        <div className="p-2 bg-primary/20 text-primary rounded-xl">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-semibold">Marketing Assistant AI</h2>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-surfaceAccent' : 'bg-primary/20 text-primary'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
            </div>
            
            <div className={`p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-sm' 
                : 'bg-surfaceAccent border border-white/5 rounded-tl-sm shadow-lg text-zinc-200'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed text-sm">
                {/* Basic markdown bold parser hack for rendering **text** */}
                {msg.text.split('**').map((chunk, j) => j % 2 === 1 ? <strong key={j} className="text-white font-bold">{chunk}</strong> : chunk)}
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-4 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="p-4 rounded-2xl bg-surfaceAccent border border-white/5 rounded-tl-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-surface/50 border-t border-white/5 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about digital marketing strategies..."
            className="w-full bg-background border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primaryHover disabled:bg-surfaceAccent disabled:text-zinc-500 text-white rounded-xl transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
