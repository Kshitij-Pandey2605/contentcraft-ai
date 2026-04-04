import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logo.png';

export default function AuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  
  // URL state synchronization override logic could go here if dealing with query params, 
  // but true component state handling is cleaner for zero-reload tracking.
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/');
      } else {
        setErrorMsg(res.error || 'Failed to login');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      const res = await signup(formData.name, formData.email, formData.password);
      if (res.success) {
        navigate('/');
      } else {
        setErrorMsg(res.error || 'Failed to create account');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex text-text-main bg-background overflow-hidden relative">
      
      {/* -------------------- LEFT PANEL (Branding) -------------------- */}
      <motion.div 
        layout
        className="hidden lg:flex relative border-r border-white/5 items-center justify-center p-12 overflow-hidden w-1/2"
      >
        {/* Animated Background Gradients tracking mode state */}
        <motion.div 
          animate={{
            background: isLogin 
              ? 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(0,0,0,1), rgba(59, 130, 246, 0.2))'
              : 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(0,0,0,1), rgba(139, 92, 246, 0.2))'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

        {/* Morphing Typography Section using AnimatePresence */}
        <div className="relative z-10 max-w-lg w-full flex flex-col justify-center min-h-[60vh]">
          <div className="flex items-center gap-4 mb-10">
            <motion.img 
              layoutId="auth-logo"
              src={logoImage} 
              alt="ContentCraft" 
              className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.5)]" 
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              ContentCraft
            </h1>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'signup-text'}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isLogin ? (
                <>
                  <h2 className="text-6xl font-extrabold leading-tight mb-6">
                    Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Back.</span>
                  </h2>
                  <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-md">
                    Access your personalized analytics dashboard and pick up your viral scaling workflow right where you left it.
                  </p>
                  
                  <div className="glass p-6 rounded-2xl border border-border-subtle flex items-center gap-4 group hover:bg-surface-accent transition-all cursor-default">
                    <div className="flex -space-x-4">
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-r from-primary to-accent flex items-center justify-center text-xs font-bold text-text-main shadow-lg">CC</div>
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-bold">U2</div>
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-zinc-700 flex items-center justify-center text-xs font-bold text-text-main">+</div>
                    </div>
                    <p className="text-sm text-text-muted font-medium group-hover:text-text-main transition-colors">Over 50K+ pieces of viral content generated this month.</p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-6xl font-extrabold leading-tight mb-6">
                    Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Scaling.</span>
                  </h2>
                  <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-md">
                    Instantly dominate any niche algorithm with intelligent predictive frameworks and unified AI marketing tools.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-5 rounded-xl border border-border-subtle group hover:border-primary/50 transition-all cursor-default">
                      <h3 className="text-accent font-bold text-lg mb-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div> Live Data
                      </h3>
                      <p className="text-sm text-text-muted group-hover:text-text-main">Predictive API routing instantly detects trending algorithms.</p>
                    </div>
                    <div className="glass p-5 rounded-xl border border-border-subtle group hover:border-primary/50 transition-all cursor-default">
                      <h3 className="text-primary font-bold text-lg mb-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> 10x Velocity
                      </h3>
                      <p className="text-sm text-text-muted group-hover:text-text-main">Produce weeks of high-converting content effortlessly.</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* -------------------- RIGHT PANEL (Form Area) -------------------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10 bg-background/50 backdrop-blur-xl">
        <motion.div 
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-head' : 'signup-head'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold tracking-tight text-text-main mb-3">
                {isLogin ? 'Login to Account' : 'Create an Account'}
              </h2>
              <p className="text-text-muted">
                {isLogin ? 'Enter your credentials to access your workspace.' : 'Launch your unified strategy ecosystem.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, height: 0 }} 
                  animate={{ opacity: 1, scale: 1, height: 'auto' }} 
                  exit={{ opacity: 0, scale: 0.9, height: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center origin-top"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <label className="block text-sm font-medium text-text-main mb-1.5 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <User className="h-5 w-5 text-text-muted group-focus-within:text-primary" />
                    </div>
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="block w-full pl-11 pr-4 py-3.5 bg-surface-accent border border-border-subtle rounded-2xl text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-surface-accent outline-none transition-all shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout>
              <label className="block text-sm font-medium text-text-main mb-1.5 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-text-muted group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-accent border border-border-subtle rounded-2xl text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-surface-accent outline-none transition-all shadow-inner"
                  placeholder="you@startup.com"
                />
              </div>
            </motion.div>

            <motion.div layout>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-sm font-medium text-text-main">Password</label>
                <AnimatePresence>
                  {isLogin && (
                    <motion.a 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      href="#" className="text-xs font-bold text-primary hover:text-primary/70 transition-colors"
                    >
                      Forgot password?
                    </motion.a>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-text-muted group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-11 pr-12 py-3.5 bg-surface-accent border border-border-subtle rounded-2xl text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-surface-accent outline-none transition-all shadow-inner tracking-widest font-mono"
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-main transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <label className="block text-sm font-medium text-text-main mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <Lock className="h-5 w-5 text-text-muted group-focus-within:text-primary" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="block w-full pl-11 pr-4 py-3.5 bg-surface-accent border border-border-subtle rounded-2xl text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:bg-surface-accent outline-none transition-all shadow-inner tracking-widest font-mono"
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)] text-base font-bold text-text-main bg-gradient-to-r from-primary to-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>{isLogin ? 'Sign In Securely' : 'Launch Account'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div layout className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-muted font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-border-subtle rounded-2xl bg-surface-accent hover:bg-surface-accent transition-all text-text-main font-medium shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-border-subtle rounded-2xl bg-surface-accent hover:bg-surface-accent transition-all text-text-main font-medium shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </button>
            </div>
          </motion.div>

          <motion.p layout className="mt-10 text-center text-sm text-text-muted">
            {isLogin ? "New to ContentCraft? " : "Already have an account? "}
            <button 
              onClick={toggleMode}
              type="button" 
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:opacity-80 transition-opacity ml-1"
            >
              {isLogin ? "Sign up for free" : "Log in securely"}
            </button>
          </motion.p>
        </motion.div>
      </div>

    </div>
  );
}

