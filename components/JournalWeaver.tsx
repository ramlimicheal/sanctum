import React, { useState, useEffect } from 'react';
import { Feather, Wand2, Loader2, Bookmark, Save, Trash2, Clock } from 'lucide-react';
import { weaveScripture } from '@/services/megallmService';
import { ScriptureWeaveResult } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface JournalEntry {
  id: string;
  entry: string;
  result: ScriptureWeaveResult;
  createdAt: string;
}

const JournalWeaver: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isWeaving, setIsWeaving] = useState(false);
  const [result, setResult] = useState<ScriptureWeaveResult | null>(null);
  const [savedEntries, setSavedEntries] = useLocalStorage<JournalEntry[]>('theolyte_journal_entries', []);
  const [showSaved, setShowSaved] = useState(false);

  const handleWeave = async () => {
    if (!entry.trim()) return;
    setIsWeaving(true);
    setResult(null);
    
    const data = await weaveScripture(entry);
    setResult(data);
    setIsWeaving(false);
  };

  const handleSave = () => {
    if (!result) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      entry,
      result,
      createdAt: new Date().toISOString(),
    };
    setSavedEntries([newEntry, ...savedEntries]);
    setEntry('');
    setResult(null);
  };

  const handleDelete = (id: string) => {
    setSavedEntries(savedEntries.filter(e => e.id !== id));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-10 h-full flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 pb-24">
      {/* Input Side */}
      <div className="flex-1 flex flex-col">
        <div className="mb-3 md:mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-stone-900 flex items-center gap-2">
              <Feather className="text-gold-600" size={20} />
              Scripture Journal
            </h2>
            <p className="text-stone-500 text-xs md:text-sm mt-1">Pour out your heart. Let the Spirit weave the Word into your words.</p>
          </div>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              showSaved ? 'bg-gold-100 text-gold-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Clock size={14} className="inline mr-1" />
            {savedEntries.length} Saved
          </button>
        </div>

        {showSaved ? (
          <div className="flex-1 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 overflow-y-auto">
            <h3 className="font-semibold text-stone-800 mb-4">Saved Entries</h3>
            {savedEntries.length === 0 ? (
              <p className="text-stone-400 text-center py-8">No saved entries yet.</p>
            ) : (
              <div className="space-y-4">
                {savedEntries.map((saved) => (
                  <div key={saved.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-stone-400">{formatDate(saved.createdAt)}</span>
                      <button
                        onClick={() => handleDelete(saved.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-stone-600 text-sm mb-3 line-clamp-2">{saved.entry}</p>
                    <div className="bg-gold-50 p-3 rounded-lg border border-gold-100">
                      <p className="font-serif text-sm text-stone-800 italic">"{saved.result.verseText}"</p>
                      <p className="text-xs text-gold-600 mt-1">— {saved.result.reference}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 relative group focus-within:ring-2 focus-within:ring-gold-500/20 focus-within:border-gold-500/50 transition-all">
            <textarea
              className="w-full h-full resize-none outline-none text-stone-900 leading-relaxed font-serif text-lg placeholder:text-stone-400 bg-transparent caret-gold-600"
              placeholder="What is on your heart today? Describe your anxiety, your joy, or your confusion..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            
            <div className="absolute bottom-6 right-6">
              <button
                onClick={handleWeave}
                disabled={isWeaving || !entry.trim()}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isWeaving ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                <span>Weave Scripture</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Output Side */}
      <div className={`md:w-96 flex-shrink-0 transition-all duration-500 ${result ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-50'}`}>
        {result ? (
          <div className="h-full bg-stone-900 text-stone-200 rounded-2xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-600 to-amber-300" />
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest mb-3 border border-gold-500/30 px-3 py-1 rounded-full">
                <Bookmark size={12} /> The Word for You
              </div>
              <p className="font-serif text-xl leading-relaxed text-white">
                "{result.verseText}"
              </p>
              <p className="text-right mt-2 text-stone-400 font-medium">— {result.reference}</p>
            </div>

            <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
              <h4 className="text-xs font-bold text-stone-500 uppercase mb-3">Your Prayer Refined</h4>
              <p className="text-stone-300 italic leading-relaxed font-serif">
                {result.prayer}
              </p>
            </div>
            
            <button 
              onClick={handleSave}
              className="mt-6 w-full py-3 bg-gold-600 hover:bg-gold-500 text-stone-900 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save to Journal
            </button>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 p-8 text-center bg-stone-50/50">
            <Wand2 size={32} className="mb-4 text-stone-300" />
            <p>Write your thoughts and click "Weave Scripture" to receive biblical guidance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalWeaver;