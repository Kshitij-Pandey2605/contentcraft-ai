import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlatform } from '../../context/PlatformContext';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import Button from './Button';

export default function PlatformOnboarding({ isOpen, onClose }) {
  const { PLATFORMS, setPlatform } = usePlatform();
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleConfirm = () => {
    if (selected) {
      setPlatform(selected);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {}} // Disable closing by backdrop to force selection
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-surface border border-border-subtle rounded-[3rem] shadow-2xl overflow-hidden p-10 lg:p-16"
          >
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 text-center space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-4xl font-black text-text-main tracking-tight">Personalize your Engine</h2>
                <p className="text-text-muted font-medium max-w-md mx-auto">
                  Which platform should ContentCraft prioritize for your viral strategy and algorithmic optimization?
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className={`relative p-6 rounded-3xl border-2 transition-all group ${
                      selected === p.id 
                        ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' 
                        : 'border-border-subtle bg-surface-accent hover:border-text-muted'
                    }`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">{p.emoji}</div>
                    <p className={`text-xs font-black uppercase tracking-widest ${selected === p.id ? 'text-primary' : 'text-text-muted'}`}>
                      {p.label}
                    </p>
                    {selected === p.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-6">
                <Button 
                  variant="primary" 
                  size="lg" 
                  disabled={!selected}
                  onClick={handleConfirm}
                  className="w-full py-6 text-base rounded-2xl shadow-xl shadow-primary/20"
                >
                  Confirm Strategy Selection <ArrowRight size={20} />
                </Button>
                <p className="text-[10px] text-text-muted mt-6 font-black uppercase tracking-[0.2em] opacity-60">
                   Selection can be modified via settings or navbar at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
