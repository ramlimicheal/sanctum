import React, { useState, useEffect } from 'react';
import { Utensils, Plus, X, Calendar, BookOpen, Check, Clock, Target, Flame } from 'lucide-react';
import { FastingSession } from '@/types';
import { getFastingSessions, addFastingSession, updateFastingSession, getActiveFast } from '@/services/storageService';

const FastingTracker: React.FC = () => {
  const [sessions, setSessions] = useState<FastingSession[]>([]);
  const [activeFast, setActiveFast] = useState<FastingSession | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<'active' | 'history'>('active');
  const [newFast, setNewFast] = useState({
    type: 'daniel' as FastingSession['type'],
    customDescription: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    purpose: '',
    scripture: { text: '', reference: '' },
  });

  useEffect(() => {
    setSessions(getFastingSessions());
    setActiveFast(getActiveFast());
  }, []);

  const handleStartFast = () => {
    if (!newFast.purpose.trim()) return;
    
    const startDate = new Date(newFast.startDate);
    const endDate = new Date(newFast.endDate);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    
    const dailyReflections = Array.from({ length: daysDiff }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        reflection: '',
        completed: false,
      };
    });
    
    const session: FastingSession = {
      id: `fast-${Date.now()}`,
      type: newFast.type,
      customDescription: newFast.type === 'custom' ? newFast.customDescription : undefined,
      startDate: startDate,
      endDate: endDate,
      purpose: newFast.purpose,
      scripture: newFast.scripture.text ? newFast.scripture : { text: 'Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?', reference: 'Isaiah 58:6' },
      dailyReflections,
      isCompleted: false,
    };
    
    addFastingSession(session);
    setSessions([session, ...sessions]);
    setActiveFast(session);
    setNewFast({
      type: 'daniel',
      customDescription: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      purpose: '',
      scripture: { text: '', reference: '' },
    });
    setShowAddModal(false);
  };

  const handleCompleteDay = (sessionId: string, date: string, reflection: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    const updatedReflections = session.dailyReflections.map(r => 
      r.date === date ? { ...r, reflection, completed: true } : r
    );
    
    const allCompleted = updatedReflections.every(r => r.completed);
    
    updateFastingSession(sessionId, { 
      dailyReflections: updatedReflections,
      isCompleted: allCompleted,
    });
    
    setSessions(sessions.map(s => s.id === sessionId ? { 
      ...s, 
      dailyReflections: updatedReflections,
      isCompleted: allCompleted,
    } : s));
    
    if (activeFast?.id === sessionId) {
      setActiveFast({ ...activeFast, dailyReflections: updatedReflections, isCompleted: allCompleted });
    }
  };

  const fastTypeInfo: Record<string, { name: string; description: string; icon: string }> = {
    daniel: { 
      name: 'Daniel Fast', 
      description: 'Vegetables, fruits, whole grains, water only',
      icon: '🥗'
    },
    water: { 
      name: 'Water Fast', 
      description: 'Water only, no food',
      icon: '💧'
    },
    intermittent: { 
      name: 'Intermittent Fast', 
      description: 'Eating within specific time windows',
      icon: '⏰'
    },
    media: { 
      name: 'Media Fast', 
      description: 'No social media, TV, or entertainment',
      icon: '📵'
    },
    custom: { 
      name: 'Custom Fast', 
      description: 'Define your own fasting parameters',
      icon: '✨'
    },
  };

  const getProgress = (session: FastingSession) => {
    const completed = session.dailyReflections.filter(r => r.completed).length;
    return (completed / session.dailyReflections.length) * 100;
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - now.getTime()) / 86400000);
    return Math.max(0, diff);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-4xl mx-auto space-y-4 md:space-y-6 animate-fade-in pb-24 relative z-10">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-purple-600 mb-2 font-medium text-sm md:text-base">
          <Utensils size={16} />
          <span>Fasting Tracker</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-serif text-stone-800 mb-2">Spiritual Discipline</h1>
        <p className="text-stone-500 max-w-xl text-sm md:text-base">
          "When you fast, do not look somber as the hypocrites do... But when you fast, put oil on your head and wash your face." — Matthew 6:16-17
        </p>
      </header>

      {/* Active Fast Card */}
      {activeFast && !activeFast.isCompleted && (
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-4 md:p-6 text-white mb-4 md:mb-6">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div>
              <span className="text-purple-200 text-xs md:text-sm font-medium">Active Fast</span>
              <h2 className="text-xl md:text-2xl font-serif mt-1">{fastTypeInfo[activeFast.type].name}</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-serif">{getDaysRemaining(activeFast.endDate)}</div>
              <span className="text-purple-200 text-xs md:text-sm">days left</span>
            </div>
          </div>
          
          <p className="text-purple-100 mb-3 md:mb-4 text-sm md:text-base">{activeFast.purpose}</p>
          
          <div className="bg-white/10 rounded-lg p-2.5 md:p-3 mb-3 md:mb-4">
            <div className="flex items-start gap-2">
              <BookOpen size={14} className="text-purple-200 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs md:text-sm text-purple-100 italic">"{activeFast.scripture.text}"</p>
                <span className="text-[10px] md:text-xs text-purple-200">{activeFast.scripture.reference}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-2 flex justify-between text-xs md:text-sm">
            <span>{formatDate(activeFast.startDate)} - {formatDate(activeFast.endDate)}</span>
            <span>{Math.round(getProgress(activeFast))}% complete</span>
          </div>
          <div className="h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${getProgress(activeFast)}%` }}
            />
          </div>
        </div>
      )}

      {/* Daily Check-in */}
      {activeFast && !activeFast.isCompleted && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-6 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-stone-800 mb-3 md:mb-4 flex items-center gap-2">
            <Flame size={18} className="text-orange-500" /> Daily Check-in
          </h3>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {activeFast.dailyReflections.map((day, index) => {
              const isToday = day.date === new Date().toISOString().split('T')[0];
              const isPast = new Date(day.date) < new Date(new Date().toISOString().split('T')[0]);
              
              return (
                <DayCheckIn
                  key={day.date}
                  day={index + 1}
                  date={day.date}
                  isCompleted={day.completed}
                  isToday={isToday}
                  isPast={isPast}
                  reflection={day.reflection}
                  onComplete={(reflection) => handleCompleteDay(activeFast.id, day.date, reflection)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* No Active Fast */}
      {(!activeFast || activeFast.isCompleted) && (
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils size={28} className="text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-stone-800 mb-2">No Active Fast</h3>
          <p className="text-stone-500 mb-4">Start a new fast to deepen your spiritual discipline</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Start a Fast
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setView('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'active' ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Current
        </button>
        <button 
          onClick={() => setView('history')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'history' ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          History
        </button>
        <div className="flex-1" />
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> New Fast
        </button>
      </div>

      {/* Fast History */}
      {view === 'history' && (
        <div className="space-y-4">
          {sessions.filter(s => s.isCompleted).length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl border border-stone-200">
              <Clock size={32} className="mx-auto text-stone-300 mb-2" />
              <p className="text-stone-500">No completed fasts yet</p>
            </div>
          ) : (
            sessions.filter(s => s.isCompleted).map(session => (
              <div key={session.id} className="bg-white rounded-xl border border-stone-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl mr-2">{fastTypeInfo[session.type].icon}</span>
                    <span className="font-semibold text-stone-800">{fastTypeInfo[session.type].name}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Check size={12} /> Completed
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">{session.purpose}</p>
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {formatDate(session.startDate)} - {formatDate(session.endDate)}
                  </span>
                  <span>{session.dailyReflections.length} days</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Fast Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6 border-b border-stone-100 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-stone-800">Start a Fast</h2>
                <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Type of Fast</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(fastTypeInfo) as FastingSession['type'][]).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewFast({ ...newFast, type })}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        newFast.type === type 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xl">{fastTypeInfo[type].icon}</span>
                      <p className="font-medium text-stone-800 text-sm mt-1">{fastTypeInfo[type].name}</p>
                      <p className="text-xs text-stone-500">{fastTypeInfo[type].description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {newFast.type === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Describe Your Fast</label>
                  <input
                    type="text"
                    value={newFast.customDescription}
                    onChange={(e) => setNewFast({ ...newFast, customDescription: e.target.value })}
                    placeholder="What are you fasting from?"
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newFast.startDate}
                    onChange={(e) => setNewFast({ ...newFast, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newFast.endDate}
                    onChange={(e) => setNewFast({ ...newFast, endDate: e.target.value })}
                    min={newFast.startDate}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Purpose / Prayer Focus</label>
                <textarea
                  value={newFast.purpose}
                  onChange={(e) => setNewFast({ ...newFast, purpose: e.target.value })}
                  placeholder="What are you seeking God for during this fast?"
                  className="w-full h-24 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Anchor Scripture (optional)</label>
                <input
                  type="text"
                  value={newFast.scripture.reference}
                  onChange={(e) => setNewFast({ 
                    ...newFast, 
                    scripture: { ...newFast.scripture, reference: e.target.value }
                  })}
                  placeholder="e.g., Isaiah 58:6"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                />
                <textarea
                  value={newFast.scripture.text}
                  onChange={(e) => setNewFast({ 
                    ...newFast, 
                    scripture: { ...newFast.scripture, text: e.target.value }
                  })}
                  placeholder="The verse text..."
                  className="w-full h-20 px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
              
              <button
                onClick={handleStartFast}
                disabled={!newFast.purpose.trim()}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Target size={18} /> Begin Fast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Day Check-in Component
const DayCheckIn: React.FC<{
  day: number;
  date: string;
  isCompleted: boolean;
  isToday: boolean;
  isPast: boolean;
  reflection: string;
  onComplete: (reflection: string) => void;
}> = ({ day, date, isCompleted, isToday, isPast, reflection, onComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(reflection);

  const handleSubmit = () => {
    onComplete(text);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => (isToday || (isPast && !isCompleted)) && setShowModal(true)}
        disabled={!isToday && !isPast}
        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all ${
          isCompleted 
            ? 'bg-emerald-100 text-emerald-700' 
            : isToday 
              ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500 cursor-pointer hover:bg-purple-200' 
              : isPast 
                ? 'bg-red-50 text-red-400 cursor-pointer hover:bg-red-100'
                : 'bg-stone-50 text-stone-300'
        }`}
      >
        {isCompleted ? <Check size={16} /> : day}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Day {day} Reflection</h3>
            <p className="text-sm text-stone-500 mb-4">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How did God meet you today? What did you learn?"
              className="w-full h-32 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
            />
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-stone-100 text-stone-600 py-2 rounded-lg font-medium hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} /> Complete Day
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FastingTracker;
