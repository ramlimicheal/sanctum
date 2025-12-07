import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sun, Moon, ArrowRight, Quote, Users, Mail, Clock, Bell, BookOpen, PenTool, Mic } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const data = [
  { name: 'Mon', minutes: 15 },
  { name: 'Tue', minutes: 30 },
  { name: 'Wed', minutes: 45 },
  { name: 'Thu', minutes: 20 },
  { name: 'Fri', minutes: 60 },
  { name: 'Sat', minutes: 10 },
  { name: 'Sun', minutes: 25 },
];

const timeline = [
  { id: 1, type: 'Prayer', title: 'Morning Manna', time: '8:00 AM', icon: Sun, color: 'text-amber-500' },
  { id: 2, type: 'Letter', title: 'Sealed Letter: "Anxiety"', time: 'Yesterday', icon: Mail, color: 'text-gold-600' },
  { id: 3, type: 'Intercession', title: 'Prayed for Sarah', time: '2 days ago', icon: Users, color: 'text-indigo-500' },
];

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [nextPrayerTime, setNextPrayerTime] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
      setNextPrayerTime('12:00 PM (Midday)');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
      setNextPrayerTime('6:00 PM (Vespers)');
    } else {
      setTimeOfDay('evening');
      setNextPrayerTime('9:00 PM (Compline)');
    }
  }, []);

  const getGreeting = () => {
    if (timeOfDay === 'morning') return { text: "Good Morning, Pilgrim", icon: Sun, color: "text-amber-600" };
    if (timeOfDay === 'evening') return { text: "Peace be with you", icon: Moon, color: "text-indigo-400" };
    return { text: "Walk in the Light", icon: Sun, color: "text-gold-600" };
  };

  const greeting = getGreeting();

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-fade-in pb-24 relative z-10">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
            <div className={`flex items-center gap-2 ${greeting.color} mb-2 font-medium`}>
            <greeting.icon size={18} />
            <span>{greeting.text}</span>
            </div>
            <h1 className="text-4xl font-serif text-stone-800 mb-2">
            {timeOfDay === 'morning' ? "Begin your day with purpose." : "Rest in His promises."}
            </h1>
            <p className="text-stone-500 max-w-xl">
            "Draw near to God, and he will draw near to you." — James 4:8
            </p>
        </div>
        
        {/* Liturgy Clock */}
        <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-stone-100 rounded-full text-stone-600">
                <Bell size={20} />
            </div>
            <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Next Prayer</p>
                <p className="text-lg font-serif text-stone-800">{nextPrayerTime}</p>
            </div>
        </div>
      </header>

      {/* Hero Action - Dynamic based on time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onChangeView(ViewState.ARCHITECT)}
          className={`col-span-1 md:col-span-2 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl transform transition-all hover:scale-[1.01]
            ${timeOfDay === 'evening' ? 'bg-gradient-to-br from-indigo-900 to-stone-900' : 'bg-gradient-to-br from-stone-800 to-stone-900'}
          `}
        >
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:opacity-100 opacity-60
            ${timeOfDay === 'evening' ? 'bg-indigo-500/20' : 'bg-gold-500/10'}
          `} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-80">
               {timeOfDay === 'evening' ? <Moon size={20} /> : <Sun size={20} />}
               <span className="text-sm font-semibold tracking-wider uppercase">
                 {timeOfDay === 'evening' ? 'Evening Examen' : 'Morning Manna'}
               </span>
            </div>
            <h2 className="text-3xl font-serif mb-4 text-stone-100">
              {timeOfDay === 'evening' ? 'Reflect on the day.' : 'Architect your prayer.'}
            </h2>
            <p className="text-stone-300 mb-8 max-w-md">
              {timeOfDay === 'evening' 
                ? "Review the moments of grace today. Give thanks for the joys and surrender the worries."
                : "Enter a guided session using the A.C.T.S. model. Let wisdom guide your words."
              }
            </p>
            <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors
              ${timeOfDay === 'evening' ? 'bg-indigo-500 hover:bg-indigo-400 text-white' : 'bg-gold-600 hover:bg-gold-500 text-stone-900'}
            `}>
              Start Session <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Daily Verse Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col justify-center relative">
          <Quote className="absolute top-6 left-6 text-stone-100 w-16 h-16 transform -scale-x-100" />
          <div className="relative z-10 text-center">
            <p className="text-lg font-serif text-stone-800 leading-relaxed mb-4">
              "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."
            </p>
            <span className="text-sm font-medium text-gold-600 tracking-widest uppercase">Psalm 23:1-2</span>
          </div>
          <div className="mt-6 pt-6 border-t border-stone-100 flex justify-center">
            <button className="text-stone-400 text-xs flex items-center gap-1 hover:text-stone-600 transition-colors">
              <BookOpen size={12} /> Read Full Chapter
            </button>
          </div>
        </div>
      </div>

      {/* Analytics & Journey & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-200 shadow-sm md:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-lg font-medium text-stone-800">Spiritual Rhythms</h3>
              <p className="text-sm text-stone-400">Prayer consistency</p>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={16} className="text-gold-600" />
                <span className="text-2xl font-serif text-stone-800">3.4<span className="text-sm text-stone-400 font-sans ml-1">hrs</span></span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#a8a29e', fontSize: 12}} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{fill: '#f5f5f4'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#b4941f' : '#e7e5e4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spiritual Timeline / Journey */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-200 shadow-sm md:col-span-1 flex flex-col">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Your Journey</h3>
            <div className="flex-1 space-y-4">
               {timeline.map((item, i) => (
                  <div key={item.id} className="flex gap-3 items-start relative">
                     {i !== timeline.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-[-16px] w-0.5 bg-stone-100"></div>
                     )}
                     <div className={`w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon size={14} />
                     </div>
                     <div>
                        <p className="text-sm font-medium text-stone-800">{item.title}</p>
                        <p className="text-xs text-stone-400">{item.time}</p>
                     </div>
                  </div>
               ))}
               <button className="w-full text-center text-xs text-stone-400 mt-2 hover:text-stone-600">View Full History</button>
            </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-4 md:col-span-3">
           <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.INTERCESSION)}>
             <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
               <Users size={24} />
             </div>
             <h4 className="font-semibold text-stone-800">Intercessions</h4>
             <p className="text-stone-500 text-sm mt-1">3 Active Requests</p>
           </div>
           
           <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.LETTERS)}>
             <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
               <Mail size={24} />
             </div>
             <h4 className="font-semibold text-stone-800">Letters to God</h4>
             <p className="text-stone-500 text-sm mt-1">Write & Seal</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;