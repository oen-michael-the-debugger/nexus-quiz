import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, Zap, Users, BarChart3, Award, Plus, Minus } from 'lucide-react';

const Testimonials = () => {
  // Testimonial Engine Matrix Data
  const testimonials = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Lead Fullstack Dev",
      company: "ByteSync Tech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
      quote: "This platform transformed how we run interactive engineering training. The accuracy matrices and responsive fluid UI make learning feel like an elite deployment mission.",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Senior Security Specialist",
      company: "NetShield Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
      quote: "The sound engineering feedback, live timing gauges, and zero-latency terminal layouts keep our juniors locked in completely. Absolute game-changing application framework.",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      role: "Director of Product Engineering",
      company: "CloudVibe Core",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
      quote: "The ability to rapidly cycle through complex data payloads and catch validation schema mismatches seamlessly on mobile is phenomenal. The UI is breathtaking.",
    }
  ];

  const [testiIndex, setTestiIndex] = useState(0);
  const [isHoveringTesti, setIsHoveringTesti] = useState(false);

  // Auto Slider Control Sequence Loop
  useEffect(() => {
    if (isHoveringTesti) return; 
    const automaticInterval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(automaticInterval);
  }, [isHoveringTesti, testimonials.length]);

  const handlePrevTesti = () => {
    setTestiIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Technical Accordion FAQ Array Data
  const faqs = [
    {
      question: "How does the platform evaluate custom payload structures?",
      answer: "The evaluation driver cleanses incoming properties and converts data types into strict string values. This ensures that whether your database serves indices as pure Numbers or String formats, runtime evaluation remains precise."
    },
    {
      question: "Can I synchronize my custom quiz schema directly?",
      answer: "Absolutely. The subdocument resolver matrix accommodates direct arrays, population schemas, wrapper keys, and encapsulated payload streams seamlessly."
    },
    {
      question: "Is there built-in offline protection during standard protocol runs?",
      answer: "Yes. Core states are held inside persistent references while keeping timer tick intervals aligned on isolated secondary threads, protecting execution from viewport freezes."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full space-y-24">
      
      {/* 📊 STATS PANEL SECTION */}
      <section className="w-full border-t border-b border-white/5 bg-[#070a13]/30 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mx-auto mb-2">
              <Users size={18} />
            </div>
            <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">240K+</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Operators</p>
          </div>
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mx-auto mb-2">
              <Zap size={18} />
            </div>
            <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">12.5M</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Modules Evaluated</p>
          </div>
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mx-auto mb-2">
              <BarChart3 size={18} />
            </div>
            <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">99.8%</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pipeline Uptime</p>
          </div>
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mx-auto mb-2">
              <Award size={18} />
            </div>
            <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">4.9/5</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Terminal Rating</p>
          </div>
        </div>
      </section>

      {/* 🔄 TESTIMONIAL AUTOMATED AUTOMATIC SLIDER VIEW SECTION */}
      <section className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center space-y-2 mb-12">
          <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mx-auto">
            <MessageSquare size={16} />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight">Operator Feedback Logs</h2>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Real transmission data pulled directly from active nodes</p>
        </div>

        <div 
          className="relative w-full bg-[#070a13]/50 border border-white/5 rounded-3xl p-6 sm:p-10 min-h-[250px] flex flex-col justify-between backdrop-blur-md overflow-hidden"
          onMouseEnter={() => setIsHoveringTesti(true)}
          onMouseLeave={() => setIsHoveringTesti(false)}
        >
          <div className="absolute right-8 top-8 text-slate-800 font-black text-8xl tracking-tighter select-none pointer-events-none font-serif">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={testiIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-6 flex-1 flex flex-col justify-center"
            >
              <p className="text-slate-200 text-sm sm:text-base md:text-lg font-bold leading-relaxed pr-6 italic">
                "{testimonials[testiIndex].quote}"
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                <img 
                  src={testimonials[testiIndex].avatar} 
                  alt={testimonials[testiIndex].name} 
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" 
                />
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">{testimonials[testiIndex].name}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">
                    {testimonials[testiIndex].role} • <span className="text-cyan-400">{testimonials[testiIndex].company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-8 mt-4 border-t border-white/5 shrink-0">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestiIndex(i)}
                  className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${i === testiIndex ? 'bg-cyan-400 w-6' : 'bg-white/10 w-1.5 hover:bg-white/30'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevTesti}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNextTesti}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 📝 ACCORDION FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl font-black uppercase italic tracking-tight">Core System FAQs</h2>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Technical protocols and runtime mechanics breakdown</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#070a13]/30 border border-white/5 rounded-2xl overflow-hidden transition-all"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left font-black text-sm uppercase tracking-tight flex items-center justify-between gap-4 cursor-pointer text-slate-200 hover:text-white border-0 bg-transparent"
                >
                  <span className="leading-relaxed">{faq.question}</span>
                  <div className={`w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-400 font-medium leading-relaxed border-t border-white/[0.02]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
