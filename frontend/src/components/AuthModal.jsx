import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldAlert, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`; // Matches App.jsx configuration

const AuthModal = ({ isOpen, view, onClose, onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState(view || 'login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync internal view state with incoming prop configurations
  React.useEffect(() => {
    if (view) setCurrentView(view);
    setError('');
    setIsSuccess(false);
  }, [view, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = currentView === 'login' ? '/auth/login' : '/auth/register';
    const payload = currentView === 'login' 
      ? { email, password } 
      : { username, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        
        // 1. Pass data records back to App.jsx global state hooks
        onAuthSuccess(data);

        // 2. 🛡️ THE FIX: Automatically dissolve the modal view frame after a 1.5s delay
        setTimeout(() => {
          // Reset form fields
          setUsername('');
          setEmail('');
          setPassword('');
          setIsSuccess(false);
          onClose();
        }, 1500);

      } else {
        setIsLoading(false);
        setError(data.message || "Authentication transmission mismatch.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Cannot link to server system modules.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 font-sans select-none">
      {/* Dark Blurred Backdrop Overlays */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
      />

      {/* Main Container Core Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0b0f19] border border-white/5 w-full max-w-md rounded-3xl p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.01] to-transparent pointer-events-none" />

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="auth-form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">
                  {currentView === 'login' ? 'Initialize' : 'Create'} <span className="text-cyan-400">Terminal Access</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {currentView === 'login' ? 'Input authorization keys to continue deployment' : 'Register identity across database servers'}
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-rose-500/5 border border-rose-500/10 text-rose-400 p-4 rounded-xl flex items-center gap-3 text-xs font-bold animate-shake">
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {currentView === 'register' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Operative Identity</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Agent Username"
                        className="w-full bg-white/[0.02] border border-white/5 text-slate-200 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Secure Comms Routing Link</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-white/[0.02] border border-white/5 text-slate-200 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Encrypted Access Key</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-white/[0.02] border border-white/5 text-slate-200 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50 mt-4 border-0"
                >
                  {isLoading ? 'Processing Vector Link...' : currentView === 'login' ? 'Unlock System' : 'Provision Access'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setCurrentView(currentView === 'login' ? 'register' : 'login')}
                  className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-medium bg-transparent border-0 cursor-pointer"
                >
                  {currentView === 'login' ? "Don't have permissions? Provision Identity Token" : 'Already established profile? Authenticate Link'}
                </button>
              </div>
            </motion.div>
          ) : (
            /* ================= SUCCESS SYNCHRONIZATION OVERLAY PANEL ================= */
            <motion.div
              key="auth-success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-cyan-500/10 border-2 border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] animate-pulse">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Account Ready!</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">Synchronizing your neural link...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthModal;
