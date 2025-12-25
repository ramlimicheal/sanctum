
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PrayerArchitect from './components/PrayerArchitect';
import PrayerLetters from './components/PrayerLetters';
import Intercession from './components/Intercession';
import PraiseDeck from './components/PraiseDeck';
import ReflectionSanctuary from './components/ReflectionSanctuary';
import VisionWall from './components/VisionWall';
import PurposeAligner from './components/PurposeAligner';
import Pivot from './components/Pivot';
import Covenant from './components/Covenant';
import JournalWeaver from './components/JournalWeaver';
import Settings from './components/Settings';
import ParticleBackground from './components/ParticleBackground';
import Devotional from './components/Devotional';
import CommunityPrayer from './components/CommunityPrayer';
import TestimonyJournal from './components/TestimonyJournal';
import FastingTracker from './components/FastingTracker';
import BibleReader from './components/BibleReader';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { ViewState } from './types';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user && currentView === ViewState.LANDING) {
        setCurrentView(ViewState.DASHBOARD);
      } else if (!user && ![ViewState.LANDING, ViewState.SIGNIN, ViewState.SIGNUP].includes(currentView)) {
        setCurrentView(ViewState.LANDING);
      }
    }
  }, [user, loading]);

  // Check if we're on an auth/landing page (no sidebar needed)
  const isAuthPage = [ViewState.LANDING, ViewState.SIGNIN, ViewState.SIGNUP].includes(currentView);

  // Handle view change and close mobile sidebar
  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-serif text-white">S</span>
          </div>
          <p className="text-stone-600 font-serif">Loading your sanctuary...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case ViewState.LANDING:
        return <LandingPage onChangeView={handleViewChange} />;
      case ViewState.SIGNIN:
        return <SignIn onChangeView={handleViewChange} />;
      case ViewState.SIGNUP:
        return <SignUp onChangeView={handleViewChange} />;
      case ViewState.DASHBOARD:
        return <Dashboard onChangeView={handleViewChange} />;
      case ViewState.ARCHITECT:
        return <PrayerArchitect />;
      case ViewState.LETTERS:
        return <PrayerLetters />;
      case ViewState.INTERCESSION:
        return <Intercession />;
      case ViewState.PRAISE:
        return <PraiseDeck />;
      case ViewState.REFLECT:
        return <ReflectionSanctuary />;
      case ViewState.VISION:
        return <VisionWall />;
      case ViewState.ALIGNMENT:
        return <PurposeAligner />;
      case ViewState.PIVOT:
        return <Pivot />;
      case ViewState.COVENANT:
        return <Covenant />;
      case ViewState.JOURNAL:
        return <JournalWeaver />;
      case ViewState.SETTINGS:
        return <Settings />;
      case ViewState.DEVOTIONAL:
        return <Devotional />;
      case ViewState.COMMUNITY:
        return <CommunityPrayer />;
      case ViewState.TESTIMONY:
        return <TestimonyJournal />;
      case ViewState.FASTING:
        return <FastingTracker />;
      case ViewState.BIBLE:
        return <BibleReader />;
      default:
        return <LandingPage onChangeView={handleViewChange} />;
    }
  };

  // For auth pages, render without sidebar
  if (isAuthPage) {
    return (
      <div className="h-screen w-full overflow-auto">
        {renderView()}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden font-sans text-stone-800">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-stone-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-amber-300 flex items-center justify-center text-stone-900 font-serif font-bold text-lg">
            S
          </div>
          <span className="font-serif text-lg text-stone-100">Theolyte</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-stone-300 hover:text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile unless open */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar currentView={currentView} onChangeView={handleViewChange} />
      </div>
      
      <main className="flex-1 overflow-auto relative pt-14 md:pt-0">
        {/* Background Particles */}
        <ParticleBackground />
        
        {/* Background Texture/Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />
        
        <div className="relative z-10 h-full">
           {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
