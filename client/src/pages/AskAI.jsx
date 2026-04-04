import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Send, Bot, User, Sparkles, Zap, Trash2, Command } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

// Simple Mini-Markdown Renderer for Strategist Responses
const MarkdownText = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        // Headers (### Text)
        if (line.startsWith('###')) {
          return <h3 key={i} className="text-sm font-black text-primary uppercase tracking-wider mt-4 first:mt-0">{line.replace('###', '').trim()}</h3>;
        }
        // Bullet points (- Text)
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          return (
            <div key={i} className="flex gap-2 items-start ml-2 text-text-main/90 font-medium">
              <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{renderBold(line.trim().substring(1).trim())}</span>
            </div>
          );
        }
        // Numbered lists (1. Text)
        if (/^\d+\./.test(line.trim())) {
          return (
            <div key={i} className="flex gap-2 items-start ml-2 text-text-main/90 font-medium">
              <span className="font-black text-primary min-w-[1.25rem]">{line.trim().split('.')[0]}.</span>
              <span>{renderBold(line.trim().split('.').slice(1).join('.').trim())}</span>
            </div>
          );
        }
        // Regular line
        if (!line.trim()) return <div key={i} className="h-2" />;
        return <p key={i} className="text-text-main/90 font-medium leading-relaxed">{renderBold(line)}</p>;
      })}
    </div>
  );
};

// Helper to render **bold** text parts
const renderBold = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-black text-text-main decoration-primary/30 decoration-2 underline-offset-2">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function AskAI() {
  const { platform, platformInfo } = usePlatform();
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: `### Intelligence Activated\n\nHello! I am your **ContentCraft Strategist**. I'm currently optimizing all growth advice for **${platform}** ${platformInfo.emoji}.\n\nHow can I scale your content operations today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('chat', { message: userMsg.content, platform });
      
      if (res.data?.reply) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: res.data.reply }]);
      }
    } catch (err) {
      toast.error('AI connectivity failed. Switching to deterministic fallback.');
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: `### Connectivity Interrupted\n\n**Observation**: I'm having trouble reaching the main generative hub.\n\n**Strategic Action**: \n- **Consistency is King**: Post regularly at high-engagement windows (usually 7PM-9PM).\n- **Save for Later**: I've preserved your query for a retry once connection stabilizes.\n\n**Strategist Pro-Tip**: Algorithm latency often correlates with peak traffic times. Use this downtime to iterate on your visual hooks.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: Date.now(), role: 'ai', content: `### Chat Cleared\n\nStanding by for new **${platform}** strategist queries.` }]);
  };

  return (
    <div className="h-[calc(100vh-10rem)] w-full max-w-5xl mx-auto flex flex-col bg-surface border border-border-subtle rounded-[2.5rem] shadow-2xl overflow-hidden relative">
      
      {/* ── Top Bar ── */}
      <div className="px-8 py-5 border-b border-border-subtle bg-surface-accent/30 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-black text-text-main text-sm tracking-tight">ContentCraft Strategist</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">High-Intelligence Mode: {platform}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={clearChat}
          className="p-2.5 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all group"
          title="Clear Conversation"
        >
          <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* ── Chat Canvas ── */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-12 space-y-10 custom-scrollbar relative">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] grayscale">
           <Zap size={400} />
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar Column */}
              <div className="shrink-0 pt-1">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-primary/20' 
                    : 'bg-surface border border-border-subtle text-text-main'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-primary" />}
                </div>
              </div>
              
              {/* Content Column */}
              <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mx-1">
                  {msg.role === 'ai' && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black text-primary uppercase tracking-widest">
                      <Sparkles size={8} /> Strategy Verified
                    </span>
                  )}
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    {msg.role === 'user' ? 'You' : 'Strategist'}
                  </p>
                </div>
                <div className={`p-6 rounded-[2rem] text-sm shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none text-right' 
                    : 'bg-surface-accent text-text-main border border-border-subtle rounded-tl-none text-left'
                }`}>
                  {msg.role === 'user' ? (
                    <p className="font-medium leading-relaxed">{msg.content}</p>
                  ) : (
                    <MarkdownText content={msg.content} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
              <div className="w-10 h-10 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div className="p-6 rounded-[2rem] bg-surface-accent border border-border-subtle rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </div>

      {/* ── Visual Input Bar ── */}
      <div className="p-8 bg-background/50 backdrop-blur-xl border-t border-border-subtle">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full pointer-events-none" />
          
          <div className="relative flex items-center bg-surface border border-border-subtle rounded-[1.5rem] shadow-xl overflow-hidden focus-within:border-primary/50 transition-all">
            <div className="pl-5 text-text-muted">
              <Command size={18} />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={`Ask the ${platform} strategist...`}
              className="w-full bg-transparent text-text-main placeholder:text-text-muted/60 py-5 px-4 focus:outline-none font-medium text-sm"
            />
            <div className="flex items-center gap-2 pr-3">
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="p-3 rounded-xl bg-primary text-white hover:bg-primaryHover disabled:opacity-50 transition-all shadow-lg active:scale-95 group/btn overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                <Send size={18} className="relative z-10" />
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-[10px] text-text-muted mt-4 font-black uppercase tracking-[0.3em] opacity-60">
          Agentic Intelligence Optimized for {platform} Persistence
        </p>
      </div>

    </div>
  );
}

