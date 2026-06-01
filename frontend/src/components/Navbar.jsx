import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, User, LogOut, Layers, LayoutDashboard, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout, onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutAction = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const triggerAuthOpen = (view) => {
    onOpenAuth(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Brand Logo Identity */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer no-underline group">
            <div className="bg-cyan-500 p-1.5 rounded-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Zap size={20} className="text-slate-950 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              NEXUS<span className="text-cyan-400">QUIZ</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="/#categories" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <Layers size={14} /> Categories
            </a>
            
            {/* Conditional route: dashboard mounts only when authorized session state is live */}
            {user && (
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 animate-in fade-in duration-200">
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}

            <Link to="/docs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <BookOpen size={14} /> Documentation
            </Link>
          </div>

          {/* Action Profile Area */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
                    <Link to="/dashboard"><User size={16} className="text-cyan-400" /></Link>
                  </div>
                  <span className="text-sm font-black text-white tracking-wide">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogoutAction}
                  title="Sign Out Session"
                  className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer border-0 bg-transparent p-0"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => triggerAuthOpen('login')}
                  className="text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer border-0 bg-transparent"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => triggerAuthOpen('register')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer border-0"
                >
                  Join Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Action Hamburger Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                <Link to="/dashboard"><User size={16} className="text-cyan-400" /></Link>
              </div>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-400 hover:text-white transition-colors p-1 bg-transparent border-0"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Full Interactive Mobile Slide Down Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0b0f19] border-b border-white/5 px-6 py-6 space-y-6 flex flex-col shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4 font-bold text-slate-400 text-sm">
              <a href="/#categories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors py-2 border-b border-white/5">Categories</a>
              
              {user && (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors py-2 border-b border-white/5">Dashboard</Link>
              )}
              
              <Link to="/docs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors py-2">Documentation</Link>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              {user ? (
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-sm font-black text-white">{user.username}</span>
                  <button 
                    onClick={handleLogoutAction}
                    className="text-red-400 flex items-center gap-2 text-sm font-bold bg-transparent border-0 cursor-pointer"
                  >
                    Logout <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => triggerAuthOpen('login')}
                    className="w-full text-center font-bold text-white py-3 border border-white/10 rounded-xl bg-transparent cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => triggerAuthOpen('register')}
                    className="w-full text-center font-bold bg-cyan-500 text-slate-950 py-3 rounded-xl shadow-lg shadow-cyan-500/20 border-0 cursor-pointer"
                  >
                    Join Arena
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
