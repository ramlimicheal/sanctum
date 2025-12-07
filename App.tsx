
import React, { useState } from 'react';
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
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
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
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden font-sans text-stone-800">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 overflow-auto relative">
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
