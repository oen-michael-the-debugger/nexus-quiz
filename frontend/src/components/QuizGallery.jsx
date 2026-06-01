import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllQuizzes } from '../api';
import { Play, Clock, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizGallery = ({ selectedCategory, limit = 100, onLaunchQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      setLoading(true);
      try {
        const response = await fetchAllQuizzes(selectedCategory);
        setQuizzes(response.data || []);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    getQuizzes();
  }, [selectedCategory]);

  const containerVars = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  const itemVars = {
    initial: { opacity: 0, scale: 0.95, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
        <p className="text-slate-400 text-sm">No operational modules found in this sector.</p>
      </div>
    );
  }

  const displayedQuizzes = quizzes.slice(0, limit);

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory || 'all'}
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedQuizzes.map((quiz) => {
            // Flexible question resolver path for counting metrics
            const targetQuestions = quiz?.questions || quiz?.quizId?.questions || quiz?.data?.questions || [];
            const questionLength = targetQuestions.length || 0;

            return (
              <motion.div
                key={quiz._id}
                variants={itemVars}
                whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="group relative bg-[#0b0f19] border border-white/5 rounded-2xl p-6 shadow-xl overflow-hidden transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-cyan-500/20">
                      {quiz.category || "General"}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold tracking-wider">
                      <Clock size={12} /> {questionLength * 2 || 10} MINS
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors tracking-tight">
                    {quiz.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2">
                    {quiz.description || "No transmission description available for this protocol."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-yellow-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {(questionLength || 5) * 10} XP
                      </span>
                    </div>
                    <button 
                      onClick={() => onLaunchQuiz(quiz)}
                      className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-2.5 transition-all cursor-pointer bg-transparent border-0"
                    >
                      Launch <Play size={12} className="fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {quizzes.length > limit && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate('/explore');
            }}
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl text-xs font-black text-white tracking-widest uppercase hover:border-cyan-500/30 transition-all cursor-pointer shadow-lg"
          >
            View All {quizzes.length} Protocols
            <ArrowRight size={14} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGallery;
