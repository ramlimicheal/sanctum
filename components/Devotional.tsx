import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Check, Clock, ArrowLeft, Play, Bookmark, Share2 } from 'lucide-react';
import { DevotionalPlan, UserDevotionalProgress } from '@/types';
import { DEVOTIONAL_PLANS, getDevotionalPlanById } from '@/services/devotionalPlans';
import { getDevotionalProgress, startDevotionalPlan, completeDevotionalDay } from '@/services/storageService';

const Devotional: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<DevotionalPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [progress, setProgress] = useState<UserDevotionalProgress[]>([]);
  const [view, setView] = useState<'browse' | 'plan' | 'day'>('browse');

  useEffect(() => {
    setProgress(getDevotionalProgress());
  }, []);

  const getPlanProgress = (planId: string): UserDevotionalProgress | undefined => {
    return progress.find(p => p.planId === planId);
  };

  const handleStartPlan = (plan: DevotionalPlan) => {
    startDevotionalPlan(plan.id);
    setProgress(getDevotionalProgress());
    setSelectedPlan(plan);
    setSelectedDay(1);
    setView('day');
  };

  const handleContinuePlan = (plan: DevotionalPlan) => {
    const planProgress = getPlanProgress(plan.id);
    setSelectedPlan(plan);
    setSelectedDay(planProgress?.currentDay || 1);
    setView('day');
  };

  const handleCompleteDay = () => {
    if (selectedPlan && selectedDay) {
      completeDevotionalDay(selectedPlan.id, selectedDay, selectedPlan.duration);
      setProgress(getDevotionalProgress());
      
      if (selectedDay < selectedPlan.duration) {
        setSelectedDay(selectedDay + 1);
      } else {
        setView('plan');
      }
    }
  };

  const isDayCompleted = (planId: string, day: number): boolean => {
    const planProgress = getPlanProgress(planId);
    return planProgress?.completedDays.includes(day) || false;
  };

  const categoryColors: Record<string, string> = {
    faith: 'bg-amber-100 text-amber-700',
    prayer: 'bg-indigo-100 text-indigo-700',
    character: 'bg-emerald-100 text-emerald-700',
    relationships: 'bg-rose-100 text-rose-700',
    purpose: 'bg-purple-100 text-purple-700',
    healing: 'bg-sky-100 text-sky-700',
  };

  // Browse Plans View
  if (view === 'browse') {
    return (
      <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-fade-in pb-24 relative z-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-amber-600 mb-2 font-medium">
            <BookOpen size={18} />
            <span>Devotional Plans</span>
          </div>
          <h1 className="text-4xl font-serif text-stone-800 mb-2">Grow in Faith</h1>
          <p className="text-stone-500 max-w-xl">
            Curated reading plans to deepen your walk with God. Each plan includes Scripture, reflection, and practical application.
          </p>
        </header>

        {/* Active Plans */}
        {progress.filter(p => !p.isCompleted).length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.filter(p => !p.isCompleted).map(p => {
                const plan = getDevotionalPlanById(p.planId);
                if (!plan) return null;
                const progressPercent = (p.completedDays.length / plan.duration) * 100;
                
                return (
                  <div 
                    key={p.planId}
                    onClick={() => handleContinuePlan(plan)}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="flex">
                      <div className="w-24 h-24 bg-stone-100 overflow-hidden">
                        <img src={plan.coverImage} alt={plan.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-stone-800 group-hover:text-amber-600 transition-colors">{plan.title}</h3>
                        <p className="text-sm text-stone-500">Day {p.currentDay} of {plan.duration}</p>
                        <div className="mt-2 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center pr-4">
                        <Play size={20} className="text-amber-600" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Plans */}
        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">All Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEVOTIONAL_PLANS.map(plan => {
              const planProgress = getPlanProgress(plan.id);
              const isStarted = !!planProgress;
              const isCompleted = planProgress?.isCompleted;
              
              return (
                <div 
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setView('plan');
                  }}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                >
                  <div className="h-40 bg-stone-100 overflow-hidden relative">
                    <img src={plan.coverImage} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[plan.category]}`}>
                        {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                      </span>
                    </div>
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-800 mb-1 group-hover:text-amber-600 transition-colors">{plan.title}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2 mb-3">{plan.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Clock size={12} /> {plan.duration} days
                      </span>
                      <ChevronRight size={16} className="text-stone-400 group-hover:text-amber-600 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // Plan Overview View
  if (view === 'plan' && selectedPlan) {
    const planProgress = getPlanProgress(selectedPlan.id);
    const isStarted = !!planProgress;
    
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fade-in pb-24 relative z-10">
        <button 
          onClick={() => setView('browse')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-4"
        >
          <ArrowLeft size={18} /> Back to Plans
        </button>

        {/* Plan Header */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="h-48 md:h-64 bg-stone-100 overflow-hidden relative">
            <img src={selectedPlan.coverImage} alt={selectedPlan.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[selectedPlan.category]} mb-2 inline-block`}>
                {selectedPlan.category.charAt(0).toUpperCase() + selectedPlan.category.slice(1)}
              </span>
              <h1 className="text-3xl font-serif mb-2">{selectedPlan.title}</h1>
              <p className="text-white/80 text-sm">{selectedPlan.duration} days</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-stone-600 mb-6">{selectedPlan.description}</p>
            
            {!isStarted ? (
              <button 
                onClick={() => handleStartPlan(selectedPlan)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={18} /> Start Plan
              </button>
            ) : (
              <button 
                onClick={() => handleContinuePlan(selectedPlan)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={18} /> Continue Day {planProgress?.currentDay}
              </button>
            )}
          </div>
        </div>

        {/* Day List */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Plan Overview</h2>
          <div className="space-y-2">
            {selectedPlan.days.map((day, index) => {
              const isComplete = isDayCompleted(selectedPlan.id, day.day);
              const isCurrent = planProgress?.currentDay === day.day;
              
              return (
                <div 
                  key={day.day}
                  onClick={() => {
                    if (isStarted) {
                      setSelectedDay(day.day);
                      setView('day');
                    }
                  }}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    isStarted ? 'cursor-pointer hover:bg-stone-50' : 'opacity-60'
                  } ${isCurrent ? 'bg-amber-50 border border-amber-200' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isComplete ? 'bg-emerald-500 text-white' : 
                    isCurrent ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {isComplete ? <Check size={18} /> : day.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-800 truncate">{day.title}</h3>
                    <p className="text-sm text-stone-500 truncate">{day.scripture.reference}</p>
                  </div>
                  {isStarted && <ChevronRight size={18} className="text-stone-400" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Day View
  if (view === 'day' && selectedPlan && selectedDay) {
    const day = selectedPlan.days.find(d => d.day === selectedDay);
    if (!day) return null;
    
    const isComplete = isDayCompleted(selectedPlan.id, selectedDay);
    
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6 animate-fade-in pb-24 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setView('plan')}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Plan
          </button>
          <span className="text-sm text-stone-400">Day {selectedDay} of {selectedPlan.duration}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all"
            style={{ width: `${(selectedDay / selectedPlan.duration) * 100}%` }}
          />
        </div>

        {/* Day Content */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100">
            <h1 className="text-2xl font-serif text-stone-800 mb-2">{day.title}</h1>
            <p className="text-sm text-stone-500">{selectedPlan.title} • Day {selectedDay}</p>
          </div>

          {/* Scripture */}
          <div className="p-6 bg-amber-50 border-b border-amber-100">
            <div className="flex items-start gap-3">
              <BookOpen size={20} className="text-amber-600 mt-1 shrink-0" />
              <div>
                <p className="text-lg font-serif text-stone-800 leading-relaxed mb-2">"{day.scripture.text}"</p>
                <span className="text-sm font-medium text-amber-600">{day.scripture.reference}</span>
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div className="p-6 border-b border-stone-100">
            <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Reflection</h2>
            <p className="text-stone-700 leading-relaxed">{day.reflection}</p>
          </div>

          {/* Prayer */}
          <div className="p-6 border-b border-stone-100 bg-stone-50">
            <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Prayer</h2>
            <p className="text-stone-700 italic leading-relaxed">{day.prayer}</p>
          </div>

          {/* Action Step */}
          <div className="p-6">
            <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Today's Action</h2>
            <div className="flex items-start gap-3 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check size={14} />
              </div>
              <p className="text-stone-700">{day.actionStep}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-lg font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
            <Bookmark size={18} /> Save
          </button>
          <button className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-lg font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* Complete Button */}
        {!isComplete ? (
          <button 
            onClick={handleCompleteDay}
            className="w-full bg-amber-600 text-white py-4 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} /> Mark Day Complete
          </button>
        ) : (
          <div className="flex gap-3">
            {selectedDay > 1 && (
              <button 
                onClick={() => setSelectedDay(selectedDay - 1)}
                className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-xl font-semibold hover:bg-stone-200 transition-colors"
              >
                Previous Day
              </button>
            )}
            {selectedDay < selectedPlan.duration && (
              <button 
                onClick={() => setSelectedDay(selectedDay + 1)}
                className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                Next Day <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}

        {/* Day Navigation */}
        <div className="flex justify-center gap-1 pt-4">
          {selectedPlan.days.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                d.day === selectedDay 
                  ? 'bg-amber-500 text-white' 
                  : isDayCompleted(selectedPlan.id, d.day)
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Devotional;
