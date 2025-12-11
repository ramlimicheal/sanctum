import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sun, Moon, ArrowRight, Quote, Users, Mail, Clock, Bell, BookOpen, RefreshCw, Flame, Star, Utensils, TrendingUp } from 'lucide-react';
import { ViewState } from '@/types';
import { getDailyVerse, getRandomVerse } from '@/services/dailyVerseService';
import { getWeeklyPrayerStats, getTotalWeeklyMinutes, getPrayerLetters, getIntercessionItems, getUserPreferences, getPrayerStreak, getTestimonies, getActiveFast, getDevotionalProgress } from '@/services/storageService';
import { DEVOTIONAL_PLANS } from '@/services/devotionalPlans';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [nextPrayerTime, setNextPrayerTime] = useState<string>('');
  const [dailyVerse, setDailyVerse] = useState(getDailyVerse());
  const [weeklyData, setWeeklyData] = useState(getWeeklyPrayerStats());
  const [totalMinutes, setTotalMinutes] = useState(getTotalWeeklyMinutes());
  const [letterCount, setLetterCount] = useState(0);
  const [intercessionCount, setIntercessionCount] = useState(0);
  const [userName, setUserName] = useState('Pilgrim');
  const [streak, setStreak] = useState(getPrayerStreak());
  const [testimoniesCount, setTestimoniesCount] = useState(0);
  const [activeFast, setActiveFast] = useState(getActiveFast());
  const [activeDevotional, setActiveDevotional] = useState<{ title: string; day: number; total: number } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const prefs = getUserPreferences();
    setUserName(prefs.name);
    
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

    // Load real data
    setWeeklyData(getWeeklyPrayerStats());
    setTotalMinutes(getTotalWeeklyMinutes());
    setLetterCount(getPrayerLetters().length);
    setIntercessionCount(getIntercessionItems().filter(i => !i.lastPrayed || 
      (new Date().getTime() - new Date(i.lastPrayed).getTime()) > 86400000 * 3
    ).length);
    setStreak(getPrayerStreak());
    setTestimoniesCount(getTestimonies().length);
    setActiveFast(getActiveFast());
    
    // Check for active devotional
    const devProgress = getDevotionalProgress();
    const activeProgress = devProgress.find(p => !p.isCompleted);
    if (activeProgress) {
      const plan = DEVOTIONAL_PLANS.find(p => p.id === activeProgress.planId);
      if (plan) {
        setActiveDevotional({ title: plan.title, day: activeProgress.currentDay, total: plan.duration });
      }
    }
  }, []);

  const refreshVerse = () => {
    setDailyVerse(getRandomVerse());
  };

  const getGreeting = () => {
    if (timeOfDay === 'morning') return { text: `Good Morning, ${userName}`, icon: Sun, color: "text-amber-600" };
    if (timeOfDay === 'evening') return { text: `Peace be with you, ${userName}`, icon: Moon, color: "text-indigo-400" };
    return { text: `Walk in the Light, ${userName}`, icon: Sun, color: "text-gold-600" };
  };

  const greeting = getGreeting();

  // Calculate hours from minutes
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Get recent activity for timeline
  const timeline = [
    { id: 1, type: 'Prayer', title: 'Morning Manna', time: 'Today', icon: Sun, color: 'text-amber-500' },
    { id: 2, type: 'Letter', title: `${letterCount} Letters Written`, time: 'All time', icon: Mail, color: 'text-gold-600' },
    { id: 3, type: 'Intercession', title: `${intercessionCount} Active Requests`, time: 'Needs prayer', icon: Users, color: 'text-indigo-500' },
  ];

  // Milestone messages
  const getStreakMessage = () => {
    if (streak.currentStreak >= 365) return "🏆 One year of faithfulness!";
    if (streak.currentStreak >= 90) return "🌟 90 days strong!";
    if (streak.currentStreak >= 30) return "🔥 One month milestone!";
    if (streak.currentStreak >= 7) return "✨ One week complete!";
    if (streak.currentStreak >= 3) return "Keep going!";
    return "Start your streak today!";
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto space-y-6 md:space-y-8 animate-fade-in pb-24 relative z-10">
      {/* Header */}
      <header className="mb-6 md:mb-8 flex flex-col gap-4 md:gap-6">
        <div>
            <div className={`flex items-center gap-2 ${greeting.color} mb-2 font-medium`}>
            <greeting.icon size={18} />
            <span className="text-sm md:text-base">{greeting.text}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif text-stone-800 mb-2">
            {timeOfDay === 'morning' ? "Begin your day with purpose." : "Rest in His promises."}
            </h1>
            <p className="text-stone-500 max-w-xl text-sm md:text-base">
            "Draw near to God, and he will draw near to you." — James 4:8
            </p>
        </div>
        
        {/* Streak & Liturgy Clock */}
        <div className="flex flex-wrap gap-3">
          {streak.currentStreak > 0 && (
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-4 md:px-5 py-3 md:py-4 rounded-xl shadow-lg text-white flex-1 min-w-[140px] sm:flex-none">
              <div className="flex items-center gap-2 md:gap-3">
                <Flame size={20} className="text-yellow-200" />
                <div>
                  <p className="text-[10px] md:text-xs font-medium text-orange-100 uppercase tracking-wider">Prayer Streak</p>
                  <p className="text-xl md:text-2xl font-serif">{streak.currentStreak} <span className="text-xs md:text-sm font-sans">days</span></p>
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-orange-100 mt-1 hidden sm:block">{getStreakMessage()}</p>
            </div>
          )}
          <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3 md:gap-4 flex-1 min-w-[140px] sm:flex-none">
              <div className="p-2 md:p-3 bg-stone-100 rounded-full text-stone-600">
                  <Bell size={18} />
              </div>
              <div>
                  <p className="text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-widest">Next Prayer</p>
                  <p className="text-sm md:text-lg font-serif text-stone-800">{nextPrayerTime}</p>
              </div>
          </div>
        </div>
      </header>

      {/* Active Devotional Banner */}
      {activeDevotional && (
        <div 
          onClick={() => onChangeView(ViewState.DEVOTIONAL)}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <BookOpen size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-600 font-medium">Continue Reading</p>
              <p className="font-semibold text-stone-800">{activeDevotional.title}</p>
              <p className="text-xs text-stone-500">Day {activeDevotional.day} of {activeDevotional.total}</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-amber-600" />
        </div>
      )}

      {/* Active Fast Banner */}
      {activeFast && !activeFast.isCompleted && (
        <div 
          onClick={() => onChangeView(ViewState.FASTING)}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Utensils size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Active Fast</p>
              <p className="font-semibold text-stone-800">{activeFast.purpose.slice(0, 50)}...</p>
              <p className="text-xs text-stone-500">
                {Math.ceil((new Date(activeFast.endDate).getTime() - new Date().getTime()) / 86400000)} days remaining
              </p>
            </div>
          </div>
          <ArrowRight size={20} className="text-purple-600" />
        </div>
      )}

      {/* Hero Action - Dynamic based on time */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div 
          onClick={() => onChangeView(ViewState.ARCHITECT)}
          className={`col-span-1 lg:col-span-2 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl transform transition-all hover:scale-[1.01]
            ${timeOfDay === 'evening' ? 'bg-gradient-to-br from-indigo-900 to-stone-900' : 'bg-gradient-to-br from-stone-800 to-stone-900'}
          `}
        >
          <div className={`absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:opacity-100 opacity-60
            ${timeOfDay === 'evening' ? 'bg-indigo-500/20' : 'bg-gold-500/10'}
          `} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 md:mb-4 opacity-80">
               {timeOfDay === 'evening' ? <Moon size={18} /> : <Sun size={18} />}
               <span className="text-xs md:text-sm font-semibold tracking-wider uppercase">
                 {timeOfDay === 'evening' ? 'Evening Examen' : 'Morning Manna'}
               </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif mb-3 md:mb-4 text-stone-100">
              {timeOfDay === 'evening' ? 'Reflect on the day.' : 'Architect your prayer.'}
            </h2>
            <p className="text-stone-300 mb-6 md:mb-8 max-w-md text-sm md:text-base">
              {timeOfDay === 'evening' 
                ? "Review the moments of grace today. Give thanks for the joys and surrender the worries."
                : "Enter a guided session using the A.C.T.S. model. Let wisdom guide your words."
              }
            </p>
            <button className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base
              ${timeOfDay === 'evening' ? 'bg-indigo-500 hover:bg-indigo-400 text-white' : 'bg-gold-600 hover:bg-gold-500 text-stone-900'}
            `}>
              Start Session <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Daily Verse Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm flex flex-col justify-center relative">
          <Quote className="absolute top-4 md:top-6 left-4 md:left-6 text-stone-100 w-12 md:w-16 h-12 md:h-16 transform -scale-x-100" />
          <div className="relative z-10 text-center">
            <p className="text-base md:text-lg font-serif text-stone-800 leading-relaxed mb-3 md:mb-4">
              "{dailyVerse.text}"
            </p>
            <span className="text-xs md:text-sm font-medium text-gold-600 tracking-widest uppercase">{dailyVerse.reference}</span>
          </div>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-stone-100 flex justify-center gap-4">
            <button 
              onClick={refreshVerse}
              className="text-stone-400 text-xs flex items-center gap-1 hover:text-stone-600 transition-colors"
            >
              <RefreshCw size={12} /> New Verse
            </button>
            <button className="text-stone-400 text-xs flex items-center gap-1 hover:text-stone-600 transition-colors">
              <BookOpen size={12} /> Read Full Chapter
            </button>
          </div>
        </div>
      </div>

      {/* Analytics & Journey & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-stone-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-end mb-4 md:mb-6">
            <div>
              <h3 className="text-base md:text-lg font-medium text-stone-800">Spiritual Rhythms</h3>
              <p className="text-xs md:text-sm text-stone-400">Prayer consistency</p>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={14} className="text-gold-600" />
                <span className="text-xl md:text-2xl font-serif text-stone-800">{totalHours}<span className="text-xs md:text-sm text-stone-400 font-sans ml-1">hrs</span></span>
            </div>
          </div>
          <div className="h-36 md:h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#a8a29e', fontSize: 10}} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{fill: '#f5f5f4'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.minutes > 30 ? '#b4941f' : '#e7e5e4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spiritual Timeline / Journey */}
        <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-stone-200 shadow-sm lg:col-span-1 flex flex-col">
            <h3 className="text-base md:text-lg font-medium text-stone-800 mb-3 md:mb-4">Your Journey</h3>
            <div className="flex-1 space-y-3 md:space-y-4">
               {timeline.map((item, i) => (
                  <div key={item.id} className="flex gap-3 items-start relative">
                     {i !== timeline.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-[-12px] md:bottom-[-16px] w-0.5 bg-stone-100"></div>
                     )}
                     <div className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon size={12} />
                     </div>
                     <div>
                        <p className="text-xs md:text-sm font-medium text-stone-800">{item.title}</p>
                        <p className="text-[10px] md:text-xs text-stone-400">{item.time}</p>
                     </div>
                  </div>
               ))}
               <button className="w-full text-center text-xs text-stone-400 mt-2 hover:text-stone-600">View Full History</button>
            </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 lg:col-span-3">
           <div className="bg-stone-100 p-4 md:p-5 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.DEVOTIONAL)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
               <BookOpen size={18} />
             </div>
             <h4 className="font-semibold text-stone-800 text-xs md:text-sm">Devotionals</h4>
             <p className="text-stone-500 text-[10px] md:text-xs mt-1">Reading Plans</p>
           </div>
           
           <div className="bg-stone-100 p-4 md:p-5 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.COMMUNITY)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
               <Users size={18} />
             </div>
             <h4 className="font-semibold text-stone-800 text-xs md:text-sm">Prayer Wall</h4>
             <p className="text-stone-500 text-[10px] md:text-xs mt-1">Community</p>
           </div>
           
           <div className="bg-stone-100 p-4 md:p-5 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.TESTIMONY)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-yellow-100 group-hover:text-yellow-600 transition-colors">
               <Star size={18} />
             </div>
             <h4 className="font-semibold text-stone-800 text-xs md:text-sm">Testimonies</h4>
             <p className="text-stone-500 text-[10px] md:text-xs mt-1">{testimoniesCount} Recorded</p>
           </div>
           
           <div className="bg-stone-100 p-4 md:p-5 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.FASTING)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
               <Utensils size={18} />
             </div>
             <h4 className="font-semibold text-stone-800 text-xs md:text-sm">Fasting</h4>
             <p className="text-stone-500 text-[10px] md:text-xs mt-1">{activeFast ? 'Active' : 'Start Fast'}</p>
           </div>
        </div>

        {/* Secondary Quick Actions */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-3">
           <div className="bg-stone-100 p-4 md:p-6 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.INTERCESSION)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
               <Users size={20} />
             </div>
             <h4 className="font-semibold text-stone-800 text-sm md:text-base">Intercessions</h4>
             <p className="text-stone-500 text-xs md:text-sm mt-1">{intercessionCount} Active Requests</p>
           </div>
           
           <div className="bg-stone-100 p-4 md:p-6 rounded-2xl border border-stone-200 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all group" onClick={() => onChangeView(ViewState.LETTERS)}>
             <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
               <Mail size={20} />
             </div>
             <h4 className="font-semibold text-stone-800 text-sm md:text-base">Letters to God</h4>
             <p className="text-stone-500 text-xs md:text-sm mt-1">{letterCount} Written</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;