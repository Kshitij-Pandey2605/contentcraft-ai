import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Auth({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success("Account created successfully!");
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-premium relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/20 rounded-full blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md p-8 md:p-12 glass-card rounded-3xl"
      >
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Join ContentCraft'}
        </h2>
        <p className="text-center text-white/70 mb-8">
          {isLogin ? 'Log in to conquer the algorithm.' : 'Start your viral journey today.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/40"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/40"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/40"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 text-center text-white/60">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline decoration-white/50 underline-offset-4"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
