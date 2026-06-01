import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Clock, ChevronRight, BarChart3, RotateCcw, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const Dashboard = ({ user, history, quizzes, onLaunchQuiz }) => {
  const [selectedLog, setSelectedLog] = useState(null);

  // Calculate Global Stat Metrics
  const totalXP = history.reduce((sum, log) => sum + (log.xpEarned || 0), 0);
  const averageAccuracy = history.length 
    ? Math.round(history.reduce((sum, log) => sum + (log.accuracy || 0), 0) / history.length) 
    : 0;

  // Animation Variant Sets
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  // Find original quiz structure to support "Revisit" actions
  const handleRevisitQuiz = (quizId) => {
    const targetQuiz = quizzes.find(q => q._id === quizId);
    if (targetQuiz) onLaunchQuiz(targetQuiz);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans select-none text-slate-50">
      <AnimatePresence mode="wait">
        {!selectedLog ? (
          /* ================= MAIN METRICS & HISTORY VIEW ================= */
          <motion.div
            key="dashboard-main"
            variants={containerVars}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, x: -30 }}
            className="space-y-12"
          >
            {/* Header Identity Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase mb-2">OPERATIVE MONITOR</h2>
                <h1 className="text-4xl font-black uppercase italic tracking-tight">
                  Welcome back, <span className="text-cyan-400">{user?.username || 'Agent'}</span>
                </h1>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Sync Active</span>
              </div>
            </div>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={itemVars} className="bg-[#0b0f19] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Total Accumulated XP</span>
                  <Zap className="text-cyan-400 fill-cyan-400/20" size={18} />
                </div>
                <div className="text-4xl font-black tracking-tight">{totalXP || user?.xp || 0} <span className="text-xs text-slate-500 font-bold">XP</span></div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" initial={{ width: 0 }} animate={{ width: `${Math.min((totalXP || 1) % 1000 / 10, 100)}%` }} />
                </div>
              </motion.div>

              <motion.div variants={itemVars} className="bg-[#0b0f19] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Deployments Completed</span>
                  <Trophy className="text-purple-400" size={18} />
                </div>
                <div className="text-4xl font-black tracking-tight">{history.length} <span className="text-xs text-slate-500 font-bold">Modules</span></div>
              </motion.div>

              <motion.div variants={itemVars} className="bg-[#0b0f19] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Average System Accuracy</span>
                  <BarChart3 className="text-emerald-400" size={18} />
                </div>
                <div className="text-4xl font-black tracking-tight text-emerald-400">{averageAccuracy}%</div>
              </motion.div>
            </div>

            {/* Past Quizzes Grid Section */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                  Historical <span className="text-cyan-400">Logbook Cards</span>
                </h3>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-20 bg-[#0b0f19] border border-white/5 rounded-3xl">
                  <p className="text-slate-400 text-sm">No historical log entries compiled yet. Initialize your first quiz module!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((log) => (
                    <motion.div
                      key={log._id}
                      variants={itemVars}
                      whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                      className="bg-[#0b0f19] border border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all group"
                    >
                      <div>
                        {/* Upper Info Row */}
                        <div className="flex justify-between items-center mb-6">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                            log.accuracy >= 70 
                              ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                              : 'bg-rose-500/5 text-rose-400 border-rose-500/20'
                          }`}>
                            {log.accuracy >= 70 ? 'SUCCESS' : 'CRITICAL'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {new Date(log.createdAt || log.date || Date.now()).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Title & Stats */}
                        <h4 className="text-xl font-bold text-white tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                          {log.quizTitle || 'Operational Framework'}
                        </h4>

                        <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl mb-6">
                          <div>
                            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider mb-0.5">Accuracy</span>
                            <span className="text-lg font-black text-white">{log.accuracy}%</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider mb-0.5">Harvested</span>
                            <span className="text-lg font-black text-emerald-400">+{log.xpEarned} XP</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Interface Row */}
                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="flex-1 bg-white/5 border border-white/10 text-slate-300 hover:text-white font-black text-[10px] tracking-widest uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Review Answers <ChevronRight size={12} />
                        </button>
                        <button
                          onClick={() => handleRevisitQuiz(log.quizId)}
                          className="px-4 bg-cyan-500 text-slate-950 font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-md shadow-cyan-500/10"
                          title="Revisit Protocol"
                        >
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* ================= COMPREHENSIVE ANSWER DEEP REVIEW MODULE ================= */
          <motion.div
            key="dashboard-review"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            {/* Navigational Escape Header */}
            <button
              onClick={() => setSelectedLog(null)}
              className="group flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-2xl transition-all cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Operations
            </button>

            {/* Log Target Identity Panel */}
            <div className="bg-[#0b0f19] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded uppercase tracking-widest">
                    Diagnostic Analysis
                  </span>
                  <h2 className="text-3xl font-black text-white mt-4 tracking-tight uppercase italic">
                    {selectedLog.quizTitle}
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Evaluated performance diagnostics across all systemic terminal vectors.</p>
                </div>
                <div className="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl shrink-0">
                  <div className="text-center px-4">
                    <span className="block text-[9px] font-black text-slate-500 uppercase">Correct</span>
                    <span className="text-xl font-black text-cyan-400">{selectedLog.score} / {selectedLog.totalQuestions}</span>
                  </div>
                  <div className="w-px bg-white/10 my-1" />
                  <div className="text-center px-4">
                    <span className="block text-[9px] font-black text-slate-500 uppercase">Accuracy</span>
                    <span className="text-xl font-black text-emerald-400">{selectedLog.accuracy}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Stack Review Flow */}
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 italic">Core Question Breakdown</h3>
              
              {/* ⚡ ARRAY DATA RESOLVER CHAIN: Reads dynamically from whichever array name has data */}
              {(selectedLog.answers || selectedLog.breakdown || selectedLog.answerLogs || []).map((ans, idx) => {
                const currentQuestionText = ans.questionText || `Question Node index: #${idx + 1}`;
                const chosenResponseText = ans.selectedOptionText || ans.userResponse || "No selection compiled";
                const absoluteCorrectText = ans.correctOptionText || ans.correctAnswer || "System Correct Option";

                return (
                  <div 
                    key={idx}
                    className={`bg-[#0b0f19] border rounded-3xl p-6 space-y-4 transition-all ${
                      ans.isCorrect ? 'border-emerald-500/20 bg-emerald-500/[0.01]' : 'border-rose-500/20 bg-rose-500/[0.01]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                          ans.isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                          Protocol Validation Sequence
                        </span>
                      </div>
                      
                      {ans.isCorrect ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-black text-[10px] tracking-wider uppercase">
                          <CheckCircle2 size={14} /> Matrix Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-400 font-black text-[10px] tracking-wider uppercase">
                          <XCircle size={14} /> Deflection Detected
                        </div>
                      )}
                    </div>

                    <div className="text-slate-200 font-bold text-base pl-9 leading-relaxed">
                      {currentQuestionText}
                    </div>

                    <div className="pl-9 grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                        <span className="block text-[9px] font-black text-slate-500 uppercase mb-0.5">Your Response</span>
                        <span className={`text-sm font-bold ${ans.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {chosenResponseText}
                        </span>
                      </div>
                      {!ans.isCorrect && (
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-black text-emerald-500/60 uppercase mb-0.5">Target Decryption Pattern</span>
                          <span className="text-sm font-bold text-emerald-400">
                            {absoluteCorrectText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
