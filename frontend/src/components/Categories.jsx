import React from 'react';
import { Cpu, Globe, Shield, Code, Database, BarChart } from 'lucide-react';

const categories = [
  { id: 'blockchain', name: 'Blockchain', icon: Globe, color: 'text-blue-400', count: '12 Quizzes' },
  { id: 'ai', name: 'Artificial Intelligence', icon: Cpu, color: 'text-purple-400', count: '8 Quizzes' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, color: 'text-red-400', count: '15 Quizzes' },
  { id: 'development', name: 'Development', icon: Code, color: 'text-green-400', count: '24 Quizzes' },
  { id: 'data', name: 'Data Science', icon: Database, color: 'text-yellow-400', count: '10 Quizzes' },
  { id: 'marketing', name: 'Marketing', icon: BarChart, color: 'text-pink-400', count: '6 Quizzes' },
];

const Categories = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black tracking-[0.3em] text-cyan-500 uppercase mb-3">
          Specialized Sectors
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Domain</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              onSelectCategory(cat.id);
              // Smooth scroll to the quiz section after selecting
              document.getElementById('quizzes')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Animated Background Glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />
            
            <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500`}>
              <cat.icon size={28} className={cat.color} />
            </div>

            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {cat.name}
            </h4>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {cat.count}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <Code size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
