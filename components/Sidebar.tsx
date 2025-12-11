
import React from 'react';
import { LayoutDashboard, PenTool, Mail, Users, LogOut, Layers, Mic, Layout, Target, Shield, HeartHandshake, Feather, Settings, BookOpen, Star, Utensils, Flame, Book } from 'lucide-react';
import { ViewState } from '@/types';
import { getPrayerStreak } from '@/services/storageService';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const streak = getPrayerStreak();
  
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Sanctuary', icon: LayoutDashboard },
    { id: ViewState.DEVOTIONAL, label: 'Devotionals', icon: BookOpen, isNew: true },
    { id: ViewState.BIBLE, label: 'Bible', icon: Book, isNew: true },
    { id: ViewState.COMMUNITY, label: 'Prayer Wall', icon: Users, isNew: true },
    { id: ViewState.COVENANT, label: 'The Covenant', icon: HeartHandshake },
    { id: ViewState.VISION, label: 'Vision Wall', icon: Layout },
    { id: ViewState.ALIGNMENT, label: 'Purpose Aligner', icon: Target },
    { id: ViewState.PIVOT, label: 'The Pivot', icon: Shield },
    { id: ViewState.PRAISE, label: 'Praise Deck', icon: Layers },
    { id: ViewState.REFLECT, label: 'Reflection', icon: Mic },
    { id: ViewState.ARCHITECT, label: 'Prayer Architect', icon: PenTool },
    { id: ViewState.JOURNAL, label: 'Scripture Journal', icon: Feather },
    { id: ViewState.LETTERS, label: 'Letters to God', icon: Mail },
    { id: ViewState.INTERCESSION, label: 'Intercession', icon: Users },
    { id: ViewState.TESTIMONY, label: 'Testimonies', icon: Star, isNew: true },
    { id: ViewState.FASTING, label: 'Fasting', icon: Utensils, isNew: true },
  ];

  return (
    <div className="h-full w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 shadow-2xl z-20">
      <div className="p-6 flex items-center gap-3 border-b border-stone-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-amber-300 flex items-center justify-center text-stone-900 font-serif font-bold text-lg">
          S
        </div>
        <span className="font-serif text-xl text-stone-100 tracking-wide">Theolyte</span>
      </div>

      {/* Prayer Streak Badge */}
      {streak.currentStreak > 0 && (
        <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl border border-amber-700/30">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-orange-400" />
            <div>
              <p className="text-xs text-amber-200/70">Prayer Streak</p>
              <p className="text-lg font-serif text-amber-300">{streak.currentStreak} days</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-stone-800 text-gold-500 shadow-inner' 
                  : 'hover:bg-stone-800/50 hover:text-stone-100'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-gold-500' : 'text-stone-400 group-hover:text-stone-200'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {item.isNew && (
                <span className="px-1.5 py-0.5 bg-amber-500 text-stone-900 text-[10px] font-bold rounded ml-auto">
                  NEW
                </span>
              )}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800 space-y-2">
        <button 
          onClick={() => onChangeView(ViewState.SETTINGS)}
          className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
            currentView === ViewState.SETTINGS 
              ? 'bg-stone-800 text-gold-500' 
              : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/50'
          }`}
        >
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-3 text-stone-500 hover:text-stone-300 transition-colors w-full px-4 py-2">
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
