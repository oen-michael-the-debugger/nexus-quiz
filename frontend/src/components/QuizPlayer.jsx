import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Zap, Percent, Clock, RotateCcw, Home, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle } from 'lucide-react';

const QuizPlayer = ({ quiz, onClose, onSaveResult, isLoggedIn }) => {
  // 🛡️ DATA PATH RESOLVER: Direct normalization for your Mongoose Quiz Schema array structure
  const resolveQuestionsArray = () => {
    if (quiz?.questions && Array.isArray(quiz.questions) && quiz.questions.length > 0) {
      return quiz.questions;
    }
    if (quiz?.quizId?.questions && Array.isArray(quiz.quizId.questions) && quiz.quizId.questions.length > 0) {
      return quiz.quizId.questions;
    }
    if (quiz?.data?.questions && Array.isArray(quiz.data.questions) && quiz.data.questions.length > 0) {
      return quiz.data.questions;
    }
    if (quiz?.quiz?.questions && Array.isArray(quiz.quiz.questions) && quiz.quiz.questions.length > 0) {
      return quiz.quiz.questions;
    }
    
    // Fallback static dataset strictly mimicking your Mongoose schema structure keys
    return [
      { questionText: "What is CPC?", options: ["Cost Per Click", "Core Price Center", "Click Per Code", "Cost Per Case"], correctAnswerIndex: 0 },
      { questionText: "Which protocol handles decentralized validation routing matrices?", options: ["Proof of Work", "Hypertext Transfer", "Simple Mail Transfer", "File Distribution System"], correctAnswerIndex: 0 },
      { questionText: "What is the primary optimization method for neural node layers?", options: ["Backpropagation", "Linear Shifting", "Static Compiling", "Manual Sorting"], correctAnswerIndex: 0 }
    ];
  };

  const questions = resolveQuestionsArray();

  // Core App State Management Hooks
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const QUESTION_DURATION = 30;
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [answerLogs, setAnswerLogs] = useState([]);
  
  const quizStartTime = useRef(Date.now());
  const questionStartTime = useRef(Date.now());
  const activeAudioTrackRef = useRef(null);

  // Unified Audio Pipeline Controller Engine
  const playManagedSound = (filename) => {
    try {
      if (activeAudioTrackRef.current) {
        activeAudioTrackRef.current.pause();
        activeAudioTrackRef.current.currentTime = 0; 
      }
      const trackElement = new Audio(`/sounds/${filename}`);
      trackElement.volume = 0.5;
      activeAudioTrackRef.current = trackElement;
      trackElement.play().catch(err => {
        console.warn("Audio deferred until viewport user interaction gesture context:", err);
      });
    } catch (err) {
      console.error("Audio Engine Exception:", err);
    }
  };

  // Safe teardown cleanup cycle hook
  useEffect(() => {
    return () => {
      if (activeAudioTrackRef.current) {
        activeAudioTrackRef.current.pause();
        activeAudioTrackRef.current.currentTime = 0;
      }
    };
  }, []);

  // Main Game Clock Sequence Interval Hook
  useEffect(() => {
    if (showResults) return;

    if (timeLeft === 0) {
      handleOptionClick(-1);
      return;
    }

    if (timeLeft <= 5 && timeLeft > 0) {
      playManagedSound('urgency.mp3');
    }

    const clockInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [timeLeft, showResults]);

  // Unified Evaluation Function
  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentIndex];
    
    // ⚡ TYPE-AGNOSTIC EVALUATION SYSTEM
    // Coerces both parameters to trimmed string wrappers to prevent number-vs-string runtime bugs
    const targetCorrectIndex = currentQuestion?.correctAnswerIndex;
    const isCorrect = optionIndex !== -1 && 
                      String(optionIndex).trim() === String(targetCorrectIndex).trim();
                      
    const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);

    if (activeAudioTrackRef.current) {
      activeAudioTrackRef.current.pause();
      activeAudioTrackRef.current.currentTime = 0;
    }

    if (optionIndex === -1) {
      playManagedSound('incorrect.mp3'); 
    } else if (isCorrect) {
      setScore(prev => prev + 1);
      playManagedSound('correct.mp3'); 
    } else {
      playManagedSound('incorrect.mp3'); 
    }

    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const correctTextFallback = currentQuestion?.options?.[parseInt(targetCorrectIndex, 10)] || "Unknown Option";

    setAnswerLogs(prev => [...prev, {
      questionText: currentQuestion.questionText, 
      selectedOptionText: optionIndex === -1 ? "TIMEOUT EXPIRED" : currentQuestion.options[optionIndex],
      correctOptionText: correctTextFallback,
      isCorrect,
      timeTaken: Math.min(timeSpent, QUESTION_DURATION)
    }]);
  };

  const handleNextStep = () => {
    playManagedSound('click.mp3'); 

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_DURATION);
      questionStartTime.current = Date.now();
    } else {
      const totalTime = Math.round((Date.now() - quizStartTime.current) / 1000);
      playManagedSound('victory.mp3'); 
      setShowResults(true);
      
      // ⚡ BACKEND PROP SYNC: Map state items to fit the UserSchema schema definition subdocuments exactly
      const backendCompatibleAnswers = answerLogs.map((log, index) => ({
        questionIndex: index,
        selectedOption: log.selectedOptionText === "TIMEOUT EXPIRED" ? -1 : questions[index]?.options?.indexOf(log.selectedOptionText),
        isCorrect: log.isCorrect,
        questionText: log.questionText,
        selectedOptionText: log.selectedOptionText,
        correctOptionText: log.correctOptionText
      }));
      
      onSaveResult({
        quizId: quiz?._id || 'mock_id',
        quizTitle: quiz?.title || 'System Protocol Run',
        score,
        totalQuestions: questions.length,
        accuracy: Math.round((score / questions.length) * 100),
        xpEarned: score * 10,
        totalCompletionTime: totalTime,
        // ⚡ Provided under keys 'answers' and 'breakdown' to satisfy both the express destructuring and dashboard layout variables
        answers: backendCompatibleAnswers,
        breakdown: backendCompatibleAnswers
      });
    }
  };

  const overallTime = answerLogs.reduce((acc, curr) => acc + curr.timeTaken, 0);
  const avgTime = answerLogs.length ? (overallTime / answerLogs.length).toFixed(1) : 0;

  return (
    <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col font-sans select-none overflow-y-auto">
      
      {/* HEADER PANEL BLOCK */}
      <header className="border-b border-white/5 bg-[#070a13]/60 backdrop-blur-md shrink-0">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black border transition-all ${
              timeLeft <= 5 && !showResults 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse scale-105' 
                : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400'
            }`}>
              {showResults ? <Award size={20} /> : timeLeft}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                {showResults ? 'Diagnostics Complete' : 'System Time Remaining'}
              </span>
              <h1 className="text-sm font-black text-white uppercase tracking-tight truncate max-w-[180px] sm:max-w-xs">
                {quiz?.title || "Operational Testing Module"}
              </h1>
            </div>
          </div>
          <button 
            onClick={() => { playManagedSound('click.mp3'); onClose(); }} 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        
        {!showResults && (
          <div className="w-full h-1 bg-white/5 relative overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }} 
              animate={{ width: `${(timeLeft / QUESTION_DURATION) * 100}%` }} 
              transition={{ duration: 1, ease: "linear" }} 
              className={`h-full absolute left-0 top-0 shadow-lg ${
                timeLeft <= 5 ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
              }`} />
          </div>
        )}
      </header>

      {/* RENDER VIEWPORT VIEW */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          
          {!showResults ? (
            <motion.div 
              key="active-play-node" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="space-y-8 w-full flex flex-col"
            >
              {/* Question Text Row */}
              <div className="w-full block text-left">
                <span className="text-xs font-black text-cyan-400 tracking-widest uppercase italic block mb-3">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug whitespace-normal break-words block">
                  {questions[currentIndex]?.questionText}
                </h2>
              </div>

              {/* Options Stack Grid Mapping Layout */}
              <div className="space-y-3.5 block w-full">
                {questions[currentIndex]?.options?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = String(idx).trim() === String(questions[currentIndex]?.correctAnswerIndex).trim();
                  
                  let optStyle = "border-white/5 bg-white/[0.02] text-slate-300 hover:bg-white/[0.04] hover:border-white/10";
                  if (isAnswered) {
                    if (isCorrectAnswer) optStyle = "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.05)]";
                    else if (isSelected) optStyle = "border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.05)]";
                    else optStyle = "border-white/5 bg-white/[0.01] text-slate-600 opacity-30 pointer-events-none";
                  }

                  return (
                    <button 
                      key={idx} 
                      disabled={isAnswered} 
                      onClick={() => handleOptionClick(idx)} 
                      className={`w-full text-left p-5 rounded-2xl border text-sm sm:text-base font-bold transition-all flex items-center justify-between gap-4 cursor-pointer text-slate-100 whitespace-normal break-words ${optStyle}`}
                    >
                      <span className="flex-1 pr-2 leading-relaxed block">{option}</span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isAnswered && isCorrectAnswer 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : 'isAnswered && isSelected' 
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                          : 'border-white/10'
                      }`}>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 size={12} />}
                        {isAnswered && isSelected && !isCorrectAnswer && <AlertTriangle size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Button Footer Drawer */}
              <div className="pt-2 h-16 flex items-center justify-end w-full">
                {isAnswered && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    onClick={handleNextStep} 
                    className="bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-cyan-300 shadow-lg shadow-cyan-500/10 flex items-center gap-2 border-0 cursor-pointer shrink-0"
                  >
                    {currentIndex + 1 === questions.length ? 'Finalize Module' : 'Next Protocol'} <ChevronRight size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            /* COMPREHENSIVE TERMINAL RESULTS BOARD VIEW OVERLAY */
            <motion.div 
              key="results-node-overlay" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="space-y-10 py-4 w-full block"
            >
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)] mb-2">
                  <Award size={36} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Mission Accomplished</h2>
                <p className="text-xs text-slate-400 font-medium">Neural feedback deployment analysis reporting complete</p>
              </div>

              {/* Metric Card Array Stack Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div className="bg-[#0b0f19] border border-white/5 p-5 rounded-2xl text-center space-y-1">
                  <Percent size={16} className="text-cyan-400 mx-auto mb-1" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Accuracy</span>
                  <span className="text-xl font-black text-white">{questions.length ? Math.round((score / questions.length) * 100) : 0}%</span>
                </div>
                <div className="bg-[#0b0f19] border border-white/5 p-5 rounded-2xl text-center space-y-1">
                  <Award size={16} className="text-indigo-400 mx-auto mb-1" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Score Matrix</span>
                  <span className="text-xl font-black text-white">{score} / {questions.length}</span>
                </div>
                <div className="bg-[#0b0f19] border border-white/5 p-5 rounded-2xl text-center space-y-1">
                  <Clock size={16} className="text-amber-400 mx-auto mb-1" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Total Time</span>
                  <span className="text-xl font-black text-white">{overallTime}s</span>
                </div>
                <div className="bg-[#0b0f19] border border-white/5 p-5 rounded-2xl text-center space-y-1">
                  <Zap size={16} className="text-emerald-400 mx-auto mb-1" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Avg Pace</span>
                  <span className="text-xl font-black text-white">{avgTime}s</span>
                </div>
              </div>

              {/* Diagnostic Logs Breakdown Stack */}
              <div className="text-left max-w-xl mx-auto bg-[#070a13]/30 border border-white/5 rounded-2xl p-5 space-y-4 max-h-64 overflow-y-auto">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <HelpCircle size={12} /> Core Question Breakdown
                </h3>
                <div className="space-y-3 split-rows">
                  {answerLogs.map((log, index) => (
                    <div key={index} className="text-xs space-y-1 border-b border-white/[0.02] pb-2.5 last:border-0 last:pb-0">
                      <p className="font-bold text-slate-300">{index + 1}. {log.questionText}</p>
                      <p className="font-medium">
                        <span className="text-slate-500">Your Action:</span>{' '}
                        <span className={log.isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {log.selectedOptionText}
                        </span>
                        <span className="text-slate-500 ml-2">({log.timeTaken}s)</span>
                      </p>
                      {!log.isCorrect && (
                        <p className="font-medium text-slate-400">
                          <span className="text-slate-500">Target Core Answer:</span>{' '}
                          <span className="text-emerald-400 font-bold">{log.correctOptionText}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Actions Row Layout */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full">
                <button 
                  onClick={() => {
                    playManagedSound('click.mp3');
                    setCurrentIndex(0); setSelectedOption(null); setIsAnswered(false); setScore(0);
                    setTimeLeft(QUESTION_DURATION); setShowResults(false); setAnswerLogs([]);
                    quizStartTime.current = Date.now(); questionStartTime.current = Date.now();
                  }} 
                  className="w-full sm:w-1/2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={14} /> Retry Protocol Run
                </button>
                <button 
                  onClick={() => { playManagedSound('click.mp3'); onClose(); }} 
                  className="w-full sm:w-1/2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 border-0 cursor-pointer"
                >
                  <Home size={14} /> Return to Base
                </button>
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuizPlayer;
