import React, { useState, useEffect } from 'react';
import { HeartHandshake, Heart, MessageCircle, AlertTriangle, Loader2, Feather, Check, Sparkles } from 'lucide-react';
import { reframeConflict } from '@/services/geminiService';
import { PeaceResponse } from '@/types';
import { getLoveNotes, saveLoveNotes } from '@/services/storageService';

const Covenant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'peacemaker'>('dashboard');
  
  // Peacemaker State
  const [rawThought, setRawThought] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [peacePlan, setPeacePlan] = useState<PeaceResponse | null>(null);

  // Love Jar state
  const [loveNote, setLoveNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  // Load notes from storage on mount
  useEffect(() => {
    const storedNotes = getLoveNotes();
    if (storedNotes.length > 0) {
      setNotes(storedNotes);
    } else {
      const defaultNotes = ['Thank you for making coffee this morning.', 'I love how patient you were with the kids.'];
      setNotes(defaultNotes);
      saveLoveNotes(defaultNotes);
    }
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      saveLoveNotes(notes);
    }
  }, [notes]);

  const handleReframing = async () => {
    if (!rawThought.trim()) return;
    setIsProcessing(true);
    const result = await reframeConflict(rawThought);
    setPeacePlan(result);
    setIsProcessing(false);
  };

  const addNote = () => {
    if (loveNote.trim()) {
      setNotes([loveNote, ...notes]);
      setLoveNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 pb-24 h-full animate-fade-in flex flex-col">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2 flex items-center gap-3">
            <HeartHandshake className="text-gold-600" size={24} /> The Covenant
          </h2>
          <p className="text-stone-500 max-w-xl text-sm md:text-base">
            "Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken." — Ecclesiastes 4:12
          </p>
        </div>
        
        <div className="flex bg-stone-200 rounded-lg p-1 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('peacemaker')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 md:gap-2 ${activeTab === 'peacemaker' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <AlertTriangle size={12} /> <span className="hidden sm:inline">The</span> Peacemaker
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
           {/* Weekly Check-in Card */}
           <div className="bg-stone-900 text-stone-300 p-5 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageCircle size={80} />
              </div>
              <h3 className="text-lg md:text-xl font-serif text-gold-500 mb-2">Weekly Altar</h3>
              <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">Structured time to connect, pray, and align.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 bg-stone-800 p-3 rounded-lg border border-stone-700">
                   <div className="w-5 h-5 rounded-full border border-gold-500 bg-gold-500/20 flex items-center justify-center text-gold-500 text-xs"><Check size={12}/></div>
                   <span className="text-stone-200">Share one joy from this week</span>
                </div>
                <div className="flex items-center gap-3 bg-stone-800 p-3 rounded-lg border border-stone-700">
                   <div className="w-5 h-5 rounded-full border border-stone-600 flex items-center justify-center"></div>
                   <span className="text-stone-400">Share one burden to carry together</span>
                </div>
              </div>

              <button className="w-full bg-gold-600 text-stone-900 py-3 rounded-lg font-bold hover:bg-gold-500 transition-colors">
                Start Session
              </button>
           </div>

           {/* The Love Jar */}
           <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col">
              <h3 className="text-xl font-serif text-stone-800 mb-2 flex items-center gap-2">
                <Heart size={20} className="text-red-500" fill="currentColor" /> The Love Jar
              </h3>
              <p className="text-sm text-stone-500 mb-6">Leave a note of gratitude for your spouse.</p>

              <div className="flex-1 space-y-3 mb-6 overflow-y-auto max-h-[300px] pr-2">
                 {notes.map((note, i) => (
                   <div key={i} className="bg-amber-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-sm border border-amber-100 text-stone-700 font-serif italic text-sm shadow-sm">
                     "{note}"
                   </div>
                 ))}
              </div>

              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 outline-none focus:border-gold-500 transition-colors"
                  placeholder="I appreciate when you..."
                  value={loveNote}
                  onChange={e => setLoveNote(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addNote()}
                />
                <button onClick={addNote} className="bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-700">
                  <Feather size={18} />
                </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'peacemaker' && (
        <div className="max-w-3xl mx-auto w-full">
           {!peacePlan ? (
             <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-xl text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-3xl font-serif text-stone-900 mb-4">Conflict De-escalator</h3>
                <p className="text-stone-500 max-w-md mx-auto mb-8">
                  Feeling angry? Don't speak yet. Type your raw feelings here. The AI will act as a Mediator, helping you reframe your thoughts into a constructive, loving request.
                </p>

                <textarea 
                  className="w-full h-40 bg-stone-50 border-2 border-stone-100 rounded-xl p-6 text-lg font-serif resize-none outline-none focus:border-gold-400 focus:bg-white transition-all placeholder:text-stone-300"
                  placeholder="I am so frustrated that he..."
                  value={rawThought}
                  onChange={e => setRawThought(e.target.value)}
                />

                <button 
                  onClick={handleReframing}
                  disabled={!rawThought.trim() || isProcessing}
                  className="mt-8 bg-stone-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gold-600 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  Redeem My Words
                </button>
             </div>
           ) : (
             <div className="animate-slide-up space-y-6">
                {/* Step 1: Validation */}
                <div className="bg-stone-50 border-l-4 border-gold-500 p-6 rounded-r-xl">
                   <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Diagnosis</h4>
                   <p className="text-stone-800 font-medium text-lg">
                     {peacePlan.validation}
                   </p>
                </div>

                {/* Step 2: The Script */}
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-300 to-amber-500"></div>
                   <h4 className="text-center text-sm font-bold text-stone-400 uppercase tracking-widest mb-8">Your Redeemed Script</h4>
                   
                   <p className="font-serif text-2xl md:text-3xl text-stone-900 leading-relaxed text-center mb-8">
                     "{peacePlan.reframedScript}"
                   </p>

                   <div className="flex justify-center">
                     <button 
                       onClick={() => { setPeacePlan(null); setRawThought(''); }}
                       className="text-stone-400 hover:text-stone-600 text-sm flex items-center gap-2"
                     >
                       Start Over
                     </button>
                   </div>
                </div>

                {/* Step 3: Wisdom */}
                <div className="text-center text-stone-500 text-sm italic font-serif bg-stone-100 p-4 rounded-xl">
                   "{peacePlan.biblicalPrinciple}"
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default Covenant;