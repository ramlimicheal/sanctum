import React, { useState } from 'react';
import { Feather, Wand2, Loader2, Bookmark } from 'lucide-react';
import { weaveScripture } from '../services/geminiService';
import { ScriptureWeaveResult } from '../types';

const JournalWeaver: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isWeaving, setIsWeaving] = useState(false);
  const [result, setResult] = useState<ScriptureWeaveResult | null>(null);

  const handleWeave = async () => {
    if (!entry.trim()) return;
    setIsWeaving(true);
    setResult(null);
    
    const data = await weaveScripture(entry);
    setResult(data);
    setIsWeaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 h-full flex flex-col md:flex-row gap-8">
      {/* Input Side */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-serif text-stone-900 flex items-center gap-2">
            <Feather className="text-gold-600" />
            Scripture Journal
          </h2>
          <p className="text-stone-500 text-sm mt-1">Pour out your heart. Let the Spirit weave the Word into your words.</p>
        </div>

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
            
            <button className="mt-6 w-full py-3 border border-stone-700 rounded-lg text-sm hover:bg-stone-800 transition-colors">
              Save to Journal
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