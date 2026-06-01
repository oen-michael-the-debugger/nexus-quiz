import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Users } from 'lucide-react';
import AuthModal from './AuthModal';

const Hero = () => {
  const [authOpen, setAuthOpen] = useState(false);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVars} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Live Challenges Active</span>
            </motion.div>

            <motion.h1 variants={itemVars} className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Master Every Topic. <br />
              <span className="text-gradient">Conquer the Quiz.</span>
            </motion.h1>

            <motion.p variants={itemVars} className="text-lg text-slate-400 mb-10 max-w-xl">
              Join over 50,000+ learners competing in real-time. Boost your knowledge, 
              earn badges, and climb the global leaderboard.
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-wrap gap-4">
              <button 
                onClick={() => setAuthOpen(true)}
                className="group relative bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-cyan-500/20"
              >
                Get Started Now
                <Play size={18} className="group-hover:translate-x-1 transition-transform fill-current" />
              </button>
              <button className="glass hover:bg-white/10 font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-3">
                View Categories
              </button>
            </motion.div>

            <motion.div variants={itemVars} className="mt-12 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">12K+</span>
                <span className="text-sm text-slate-500 font-medium">Active Quizzes</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">4.9/5</span>
                <span className="text-sm text-slate-500 font-medium">User Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Card Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative glass aspect-square rounded-[40px] p-8 border-white/20 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <Trophy className="text-yellow-400" size={32} />
                     </div>
                     <div className="text-right">
                        <p className="text-slate-500 text-xs font-bold uppercase">Current Rank</p>
                        <p className="text-2xl font-black italic">#01 GLOBAL</p>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-3xl font-bold mb-2">Quantum Physics Quiz</h3>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 1.5, duration: 1 }}
                          className="h-full bg-cyan-500" 
                        />
                     </div>
                     <p className="text-sm mt-3 text-slate-400 font-medium">75% Complete • 12/16 Questions</p>
                  </div>
               </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-2xl border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-full">
                  <Users className="text-emerald-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Online Now</p>
                  <p className="font-bold">1,482 Players</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Fallback Auth Modal trigger */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        initialView="register" 
      />
    </>
  );
};

export default Hero;
