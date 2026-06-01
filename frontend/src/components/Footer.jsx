import React from 'react';
import { Zap } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-[#020617]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Logo Section */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-cyan-500 p-1 rounded-lg">
              <Zap size={18} className="text-slate-950 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              NEXUS<span className="text-cyan-400">QUIZ</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            The world's first decentralized quiz platform for modern learners and competitors.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold mb-6 text-white text-xs uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Browse Categories</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Live Leaderboard</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Quiz API</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-bold mb-6 text-white text-xs uppercase tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Connect Section (Using Font Awesome) */}
        <div>
          <h4 className="font-bold mb-6 text-white text-xs uppercase tracking-widest">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-cyan-500 hover:text-slate-950 transition-all text-slate-400 flex items-center justify-center w-11 h-11">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-cyan-500 hover:text-slate-950 transition-all text-slate-400 flex items-center justify-center w-11 h-11">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-cyan-500 hover:text-slate-950 transition-all text-slate-400 flex items-center justify-center w-11 h-11">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-sm text-slate-600 font-medium">
        © 2026 Nexus Quiz Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
