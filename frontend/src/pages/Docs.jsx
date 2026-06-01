import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Terminal, Code2, Database, Key, HelpCircle, ChevronRight, SquareTerminal } from 'lucide-react';

const Docs = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const docMenu = [
    { id: 'getting-started', label: 'Getting Started', icon: FileText },
    { id: 'quiz-schemas', label: 'Quiz Schemas', icon: Database },
    { id: 'evaluation-engine', label: 'Evaluation Engine', icon: Code2 },
    { id: 'audio-telemetry', label: 'Audio Pipeline', icon: Terminal },
    { id: 'save-protocols', label: 'Saving Progress', icon: Key }
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        <aside className="md:sticky md:top-28 space-y-4 md:col-span-1">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Architecture</span>
            <h2 className="text-xs font-black text-cyan-400 uppercase tracking-tight flex items-center gap-1.5">
              <SquareTerminal size={12} /> Systems Telemetry
            </h2>
          </div>
          
          <nav className="flex flex-col gap-1">
            {docMenu.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                      : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp size={14} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={12} />}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="md:col-span-3 bg-[#070a13]/40 border border-white/5 rounded-3xl p-6 sm:p-10 min-h-[500px] backdrop-blur-md">
          {activeTab === 'getting-started' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white border-b border-white/5 pb-4">Getting Started</h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Welcome to the core documentation node. This terminal is configured to walk developers and operators through custom quiz configurations, schema architectures, validation drivers, and state handlers.
              </p>
              <div className="bg-slate-950 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1.5 overflow-x-auto">
                <p className="text-slate-500">// Initialize application stack context via terminal</p>
                <p><span className="text-cyan-400">npm i</span> framework-telemetry-engine</p>
                <p><span className="text-purple-400">npm run dev</span> --host</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz-schemas' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white border-b border-white/5 pb-4">Quiz Schemas Configuration</h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Quizzes are explicitly built upon a subdocument tracking matrix utilizing the Mongoose ODM framework. Ensure correct array validation.
              </p>
              <div className="bg-slate-950 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
                <p><span className="text-indigo-400">const</span> <span className="text-cyan-400">QuestionSchema</span> = <span className="text-purple-400">new</span> Schema({'{'}</p>
                <p className="pl-4">questionText: {'{'} type: String, required: true {'}'},</p>
                <p className="pl-4">options: [String],</p>
                <p className="pl-4 text-emerald-400">correctAnswerIndex: {'{'} type: Number, required: true {'}'}</p>
                <p>{'})'};</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'evaluation-engine' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white border-b border-white/5 pb-4">Evaluation Engine</h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                To counter loose data transformations over API layers, the application strips out direct references and applies clean string normalization techniques to ensure perfect evaluation mapping match accuracy.
              </p>
            </motion.div>
          )}

          {activeTab === 'audio-telemetry' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white border-b border-white/5 pb-4">Audio Telemetry Pipeline</h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Audio tracking elements are handled inside single-thread active tracking hooks. Playback interruptions clean up lingering streams instantly to prevent concurrency errors.
              </p>
              <div className="bg-[#0b0f19] border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 flex items-start gap-3">
                <HelpCircle size={16} className="shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">
                  Mobile platform protocols (such as Chrome on Android) require explicit screen-interaction gestures prior to sound engine pipeline execution. The application safely logs exceptions until interaction happens.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'save-protocols' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white border-b border-white/5 pb-4">Saving Progress Matrices</h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Upon finalizing module cycles, data metrics (including accuracy percentages, individual logs, average question time, and earned experience logs) pass through callback hooks to update your backend state securely.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Docs;
