
import React from 'react';
import { LayoutDashboard, PenTool, Mail, Users, LogOut, Layers, Mic, Layout, Target, Shield, HeartHandshake } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Sanctuary', icon: LayoutDashboard },
    { id: ViewState.COVENANT, label: 'The Covenant', icon: HeartHandshake },
    { id: ViewState.VISION, label: 'Vision Wall', icon: Layout },
    { id: ViewState.ALIGNMENT, label: 'Purpose Aligner', icon: Target },
    { id: ViewState.PIVOT, label: 'The Pivot', icon: Shield },
    { id: ViewState.PRAISE, label: 'Praise Deck', icon: Layers },
    { id: ViewState.REFLECT, label: 'Reflection', icon: Mic },
    { id: ViewState.ARCHITECT, label: 'Prayer Architect', icon: PenTool },
    { id: ViewState.LETTERS, label: 'Letters to God', icon: Mail },
    { id: ViewState.INTERCESSION, label: 'Intercession Circle', icon: Users },
  ];

  return (
    <div className="h-full w-20 md:w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 shadow-2xl z-20">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-stone-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-amber-300 flex items-center justify-center text-stone-900 font-serif font-bold text-lg">
          S
        </div>
        <span className="hidden md:block font-serif text-xl text-stone-100 tracking-wide">Sanctum</span>
      </div>

      <nav className="flex-1 py-8 px-2 space-y-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-stone-800 text-gold-500 shadow-inner' 
                  : 'hover:bg-stone-800/50 hover:text-stone-100'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-gold-500' : 'text-stone-400 group-hover:text-stone-200'}`} />
              <span className="hidden md:block font-medium">{item.label}</span>
              {isActive && <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800">
        <button className="flex items-center gap-3 text-stone-500 hover:text-stone-300 transition-colors w-full px-4 py-2">
          <LogOut size={18} />
          <span className="hidden md:block text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
