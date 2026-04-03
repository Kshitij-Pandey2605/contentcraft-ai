import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { X, Mail, Lock, User, ArrowRight, Share2, Globe } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useUser();
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ email: formData.email, name: formData.email.split('@')[0] });
    } else {
      register({ email: formData.email, name: formData.name });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden glass-card p-8 bg-surface/90 border border-white/10 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="relative h-[550px]">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-white mb-2">Welcome Back</h2>
                  <p className="text-zinc-500 font-medium">Elevate your content strategy today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-600 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        className="w-full bg-background/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-zinc-700 font-medium"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-600 ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="password" 
                        required
                        className="w-full bg-background/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-zinc-700 font-medium"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-primary hover:bg-primaryHover text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-6">
                    SIGN IN <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Or continue with</span>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-bold text-sm">
                    <Globe size={18} className="text-zinc-400" /> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-bold text-sm">
                    <Share2 size={18} className="text-zinc-400" /> GitHub
                  </button>
                </div>

                <p className="mt-10 text-center text-sm text-zinc-600 font-medium">
                  Don't have an account? <button onClick={() => setIsLogin(false)} className="text-primary hover:underline font-bold">Sign up free</button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-white mb-2">Create Account</h2>
                  <p className="text-zinc-500 font-medium">Start your journey to virality.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-600 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        className="w-full bg-background/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-zinc-700 font-medium"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-600 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        className="w-full bg-background/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-zinc-700 font-medium"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-600 ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="password" 
                        required
                        className="w-full bg-background/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-zinc-700 font-medium"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-primary hover:bg-primaryHover text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-6">
                    GET STARTED <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <p className="mt-10 text-center text-sm text-zinc-600 font-medium">
                  Already have an account? <button onClick={() => setIsLogin(true)} className="text-primary hover:underline font-bold">Sign in</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
