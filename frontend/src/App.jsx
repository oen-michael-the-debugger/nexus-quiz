import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import QuizGallery from './components/QuizGallery';
import Testimonials from './components/Testimonials'; 
import QuizPlayer from './components/QuizPlayer';
import Dashboard from './components/Dashboard';
import Docs from './pages/Docs'; // 🧠 IMPORTING THE BRAND NEW DOCS VIEW
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

const API_BASE_URL = 'http://localhost:5000/api'; 

const CORE_QUIZZES = [
  { _id: 'q1', title: 'Blockchain Smart Contracts', category: 'blockchain', questions: [] },
  { _id: 'q2', title: 'Neural Networks Basics', category: 'ai', questions: [] }
];

const HomePage = ({ selectedCategory, setSelectedCategory, setActiveQuiz }) => (
  <>
    <Hero />
    <Categories onSelectCategory={setSelectedCategory} activeCategory={selectedCategory} />
    
    <section id="quizzes" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">
            Elite <span className="text-cyan-400">Selections</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {selectedCategory ? `Active sector: ${selectedCategory.toUpperCase()}` : 'Featured network deployments'}
          </p>
        </div>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory('')}
            className="text-xs font-black text-cyan-400 hover:underline cursor-pointer uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-all"
          >
            Clear Filter [X]
          </button>
        )}
      </div>
      <QuizGallery selectedCategory={selectedCategory} limit={3} onLaunchQuiz={setActiveQuiz} />
    </section>
    
    {/* Testimonials now encapsulates Stats and FAQs sequentially within it */}
    <Testimonials /> 
  </>
);

const ExplorePage = ({ selectedCategory, setSelectedCategory, setActiveQuiz }) => (
  <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-white/5 pb-6">
      <div>
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">
          The Full <span className="text-cyan-400">Network</span>
        </h2>
        <p className="text-slate-400 mt-2">
          {selectedCategory ? `Showing all modules filtered by: ${selectedCategory.toUpperCase()}` : 'Accessing all operational deployments'}
        </p>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {selectedCategory && (
          <button onClick={() => setSelectedCategory('')} className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer uppercase border border-white/10 px-4 py-2.5 rounded-xl bg-white/5 transition-all">
            Show All Modules
          </button>
        )}
        <Link to="/" className="text-xs font-black text-[#020617] bg-cyan-400 hover:bg-cyan-300 px-5 py-2.5 rounded-xl uppercase tracking-widest transition-colors shadow-lg shadow-cyan-500/10">
          ← Return to Base
        </Link>
      </div>
    </div>
    <QuizGallery selectedCategory={selectedCategory} limit={100} onLaunchQuiz={setActiveQuiz} /> 
  </div>
);

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [authModalConfig, setAuthModalConfig] = useState({ isOpen: false, view: 'login' });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [history, setHistory] = useState(() => {
    const localHistory = localStorage.getItem('operative_history');
    return localHistory ? JSON.parse(localHistory) : [];
  });

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserHistoryFromDatabase(token);
    } else {
      setIsInitializing(false);
    }
  }, []);

  const fetchUserHistoryFromDatabase = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const dbHistoryArray = await response.json();
        setHistory(dbHistoryArray);
        localStorage.setItem('operative_history', JSON.stringify(dbHistoryArray));
      }
    } catch (err) {
      console.warn("Database connection offline. Reverting directly to cached local records.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleAuthSuccess = (authPayload) => {
    const profileData = authPayload.user || authPayload;
    const tokenString = authPayload.token;
    
    setUser(profileData);
    localStorage.setItem('user', JSON.stringify(profileData));
    if (tokenString) localStorage.setItem('token', tokenString);

    if (authPayload.history && authPayload.history.length > 0) {
      setHistory(authPayload.history);
      localStorage.setItem('operative_history', JSON.stringify(authPayload.history));
    } else {
      if (tokenString) fetchUserHistoryFromDatabase(tokenString);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHistory([]);
    localStorage.clear(); 
  };

  const handleSaveQuizResult = async (finalResult) => {
    if (!user) {
      console.log("Guest session completed. Displaying temporary results window; no data retained.");
      return; 
    }

    const token = localStorage.getItem('token');
    
    const localRunItem = { ...finalResult, _id: `res_${Date.now()}`, createdAt: new Date().toISOString() };
    const updatedHistory = [localRunItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('operative_history', JSON.stringify(updatedHistory));

    const updatedUser = { ...user, xp: (user?.xp || 0) + finalResult.xpEarned };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/history/save`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalResult)
        });

        if (response.ok) {
          const serverAcknowledgedData = await response.json();
          if (serverAcknowledgedData.history) {
            setHistory(serverAcknowledgedData.history);
            localStorage.setItem('operative_history', JSON.stringify(serverAcknowledgedData.history));
          }
        }
      } catch (error) {
        console.error("Critical transmission failure: result cached locally but failed to store to database.", error);
      }
    }
  };

  if (isInitializing && localStorage.getItem('token')) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Re-establishing secure session link...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#020617] text-slate-50 antialiased selection:bg-cyan-500/30">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={(view) => setAuthModalConfig({ isOpen: true, view: view })}
        />

        {activeQuiz && (
          <QuizPlayer 
            quiz={activeQuiz} 
            onClose={() => setActiveQuiz(null)} 
            onSaveResult={handleSaveQuizResult}
            isLoggedIn={!!user}
          />
        )}

        <AuthModal 
          isOpen={authModalConfig.isOpen}
          view={authModalConfig.view}
          onClose={() => setAuthModalConfig({ ...authModalConfig, isOpen: false })}
          onAuthSuccess={handleAuthSuccess}
        />

        <Routes>
          <Route path="/" element={<HomePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setActiveQuiz={setActiveQuiz} />} />
          <Route path="/explore" element={<ExplorePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setActiveQuiz={setActiveQuiz} />} />
          <Route path="/docs" element={<Docs />} /> {/* ⚡ EXPLICIT LINK BINDING FOR THE DOCS NODE */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <Dashboard user={user} history={history} quizzes={CORE_QUIZZES} onLaunchQuiz={setActiveQuiz} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
