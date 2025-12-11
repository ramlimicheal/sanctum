import React, { useState, useEffect } from 'react';
import { Mail, PenLine, Lock, Unlock, Calendar, Sparkles, Send, CheckCircle2, ChevronLeft, Loader2, Bookmark, Copy, Check } from 'lucide-react';
import { PrayerLetter, ScriptureWeaveResult } from '@/types';
import { weaveScripture } from '@/services/geminiService';
import { getPrayerLetters, savePrayerLetters } from '@/services/storageService';

const PrayerLetters: React.FC = () => {
  const [view, setView] = useState<'list' | 'write' | 'read'>('list');
  const [letters, setLetters] = useState<PrayerLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<PrayerLetter | null>(null);
  const [copied, setCopied] = useState(false);

  // Writer State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [unlockDays, setUnlockDays] = useState<number>(0);
  const [isWeaving, setIsWeaving] = useState(false);
  const [scriptureSeal, setScriptureSeal] = useState<ScriptureWeaveResult | null>(null);

  // Load letters from storage on mount
  useEffect(() => {
    const storedLetters = getPrayerLetters();
    if (storedLetters.length > 0) {
      setLetters(storedLetters);
    } else {
      // Set default mock data for first-time users
      const mockLetters: PrayerLetter[] = [
        {
          id: '1',
          title: 'Anxiety about the move',
          content: 'Lord, I am terrified of this new city. I feel alone...',
          createdAt: new Date(Date.now() - 86400000 * 5),
          unlockDate: new Date(Date.now() - 86400000 * 1),
          isAnswered: true,
          status: 'opened',
          scriptureSeal: { verseText: "Be strong and courageous.", reference: "Joshua 1:9", prayer: "Lord, grant me courage." }
        },
        {
          id: '2',
          title: 'Waiting for a spouse',
          content: 'It is hard to be patient. I feel like time is running out...',
          createdAt: new Date(),
          unlockDate: new Date(Date.now() + 86400000 * 30),
          isAnswered: false,
          status: 'sealed'
        }
      ];
      setLetters(mockLetters);
      savePrayerLetters(mockLetters);
    }
  }, []);

  // Save letters whenever they change
  useEffect(() => {
    if (letters.length > 0) {
      savePrayerLetters(letters);
    }
  }, [letters]);

  const handleOpenWrite = () => {
    setNewTitle('');
    setNewContent('');
    setScriptureSeal(null);
    setUnlockDays(0);
    setView('write');
  };

  const handleWeave = async () => {
    if (!newContent) return;
    setIsWeaving(true);
    const result = await weaveScripture(newContent);
    setScriptureSeal(result);
    setIsWeaving(false);
  };

  const handleSealAndSend = () => {
    if (!newTitle || !newContent) return;

    const unlockDate = unlockDays > 0 
      ? new Date(Date.now() + (unlockDays * 24 * 60 * 60 * 1000)) 
      : null;

    const newLetter: PrayerLetter = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      createdAt: new Date(),
      unlockDate: unlockDate,
      isAnswered: false,
      scriptureSeal: scriptureSeal || undefined,
      status: unlockDate ? 'sealed' : 'opened'
    };

    setLetters([newLetter, ...letters]);
    setView('list');
  };

  const handleRead = (letter: PrayerLetter) => {
    // Logic to prevent reading locked letters
    if (letter.status === 'sealed' && letter.unlockDate && new Date() < letter.unlockDate) {
      alert(`This letter is sealed until ${letter.unlockDate.toLocaleDateString()}`);
      return;
    }
    // If it was sealed but time passed, mark opened
    if (letter.status === 'sealed') {
       // Ideally update state here to mark as 'opened' permanently
    }
    setSelectedLetter(letter);
    setView('read');
  };

  const markAnswered = (id: string) => {
    setLetters(letters.map(l => l.id === id ? { ...l, isAnswered: !l.isAnswered } : l));
    if (selectedLetter && selectedLetter.id === id) {
      setSelectedLetter({ ...selectedLetter, isAnswered: !selectedLetter.isAnswered });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- WRITE VIEW ---
  if (view === 'write') {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-10 pb-20 h-full flex flex-col">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <button onClick={() => setView('list')} className="p-1.5 md:p-2 hover:bg-stone-200 rounded-full text-stone-500">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl md:text-2xl font-serif text-stone-800">New Letter to God</h2>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-xl border border-stone-200 flex flex-col overflow-hidden relative">
          {/* Paper Header */}
          <div className="bg-stone-50 p-6 border-b border-stone-100 flex gap-4">
             <input 
               className="flex-1 bg-transparent text-xl font-serif text-stone-900 placeholder:text-stone-400 outline-none border-b border-transparent focus:border-gold-300 transition-colors"
               placeholder="Title (e.g., Prayer for Peace)"
               value={newTitle}
               onChange={e => setNewTitle(e.target.value)}
             />
             <div className="flex items-center gap-2 text-stone-400 text-sm">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString()}</span>
             </div>
          </div>

          {/* Paper Body */}
          <textarea
            className="flex-1 w-full p-8 resize-none outline-none text-lg leading-relaxed font-serif text-stone-900 placeholder:text-stone-300 bg-stone-50/50 caret-gold-600"
            style={{ backgroundImage: 'linear-gradient(transparent 95%, #e7e5e4 95%)', backgroundSize: '100% 2rem', lineHeight: '2rem' }}
            placeholder="Dear Lord, today I am feeling..."
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />

          {/* AI Seal Section */}
          {scriptureSeal && (
            <div className="bg-gold-50/50 p-6 border-t border-gold-100 animate-slide-up">
              <div className="flex items-start gap-3">
                <Sparkles className="text-gold-500 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-gold-700 uppercase tracking-widest mb-1">Scripture Seal</h4>
                  <p className="font-serif italic text-stone-700">"{scriptureSeal.verseText}" — {scriptureSeal.reference}</p>
                </div>
                <button onClick={() => setScriptureSeal(null)} className="ml-auto text-stone-400 hover:text-stone-600"><span className="text-xs">Remove</span></button>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-stone-200 shadow-sm">
                 <Lock size={16} className="text-stone-400" />
                 <select 
                   className="bg-transparent outline-none text-sm text-stone-600 cursor-pointer"
                   value={unlockDays}
                   onChange={e => setUnlockDays(Number(e.target.value))}
                 >
                   <option value={0}>Open immediately</option>
                   <option value={7}>Open in 1 week</option>
                   <option value={30}>Open in 1 month</option>
                   <option value={365}>Open in 1 year</option>
                 </select>
               </div>

               <button 
                onClick={handleWeave}
                disabled={isWeaving || !!scriptureSeal || !newContent}
                className="text-sm font-medium text-gold-600 hover:text-gold-700 flex items-center gap-2 disabled:opacity-50"
               >
                 {isWeaving ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                 {scriptureSeal ? 'Seal Applied' : 'Add Scripture Seal'}
               </button>
            </div>

            <button 
              onClick={handleSealAndSend}
              disabled={!newTitle || !newContent}
              className="w-full md:w-auto bg-stone-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} /> Seal & Save Letter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- READ VIEW ---
  if (view === 'read' && selectedLetter) {
    return (
       <div className="max-w-3xl mx-auto p-6 md:p-10 pb-20 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setView('list')} className="flex items-center gap-2 text-stone-500 hover:text-stone-800">
              <ChevronLeft size={20} /> Back to Letters
            </button>
            <button 
              onClick={() => markAnswered(selectedLetter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                ${selectedLetter.isAnswered 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}
              `}
            >
              <CheckCircle2 size={18} />
              {selectedLetter.isAnswered ? 'Prayer Answered' : 'Mark as Answered'}
            </button>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-stone-100 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200" />
             
             <div className="mb-8 text-center border-b border-stone-100 pb-8">
                <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-2">
                  {selectedLetter.createdAt.toLocaleDateString()}
                </p>
                <h2 className="text-4xl font-serif text-stone-900 mb-4">{selectedLetter.title}</h2>
                {selectedLetter.isAnswered && (
                   <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">
                     Answered
                   </span>
                )}
             </div>

             <div className="prose prose-stone max-w-none mb-10">
               <p className="text-xl leading-relaxed font-serif text-stone-800 whitespace-pre-wrap">
                 {selectedLetter.content}
               </p>
             </div>

             {selectedLetter.scriptureSeal && (
               <div className="bg-gold-50/50 rounded-xl p-6 border border-gold-100 text-center relative">
                 <Bookmark className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-gold-500 bg-white p-1 rounded-full shadow-sm" />
                 <p className="font-serif italic text-stone-800 text-lg mb-2">"{selectedLetter.scriptureSeal.verseText}"</p>
                 <p className="text-stone-500 text-sm font-medium">{selectedLetter.scriptureSeal.reference}</p>
               </div>
             )}

             {/* Action Buttons */}
             <div className="flex gap-3 mt-8">
               <button
                 onClick={() => copyToClipboard(selectedLetter.content)}
                 className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
               >
                 {copied ? <Check size={16} /> : <Copy size={16} />}
                 {copied ? 'Copied!' : 'Copy'}
               </button>
               <button
                 onClick={() => markAnswered(selectedLetter.id)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                   selectedLetter.isAnswered 
                     ? 'bg-green-100 text-green-700' 
                     : 'bg-gold-100 hover:bg-gold-200 text-gold-700'
                 }`}
               >
                 <CheckCircle2 size={16} />
                 {selectedLetter.isAnswered ? 'Answered' : 'Mark as Answered'}
               </button>
             </div>
          </div>
       </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 h-full">
       <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
         <div>
           <h2 className="text-3xl font-serif text-stone-900 mb-2">Letters to God</h2>
           <p className="text-stone-500 max-w-xl">
             "Cast all your anxiety on him because he cares for you." — 1 Peter 5:7
             <br/>
             Write your prayers, seal them with scripture, and trust Him with the timing.
           </p>
         </div>
         <button 
           onClick={handleOpenWrite}
           className="bg-stone-900 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
         >
           <PenLine size={18} /> Write New Letter
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card (Empty State Alternative) */}
          <div 
            onClick={handleOpenWrite}
            className="border-2 border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center text-stone-400 hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50/30 transition-all cursor-pointer min-h-[240px] group"
          >
            <div className="w-16 h-16 rounded-full bg-stone-100 group-hover:bg-gold-100 flex items-center justify-center mb-4 transition-colors">
               <Mail size={32} />
            </div>
            <span className="font-medium">Draft a new prayer</span>
          </div>

          {letters.map((letter) => {
             const isLocked = letter.status === 'sealed' && letter.unlockDate && new Date() < letter.unlockDate;
             const timeLeft = letter.unlockDate ? Math.ceil((letter.unlockDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

             return (
               <div 
                 key={letter.id}
                 onClick={() => handleRead(letter)}
                 className={`
                   relative p-6 rounded-xl border transition-all cursor-pointer flex flex-col min-h-[240px]
                   ${isLocked 
                     ? 'bg-stone-100 border-stone-200 hover:bg-stone-200 opacity-80' 
                     : 'bg-white border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gold-200'}
                 `}
               >
                 {/* Envelope Flap Visual */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 opacity-50" />
                 
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                      {letter.createdAt.toLocaleDateString()}
                    </span>
                    {letter.isAnswered && (
                      <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold uppercase">Answered</span>
                    )}
                 </div>

                 {isLocked ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-stone-400">
                     <Lock size={32} className="mb-2 text-stone-300" />
                     <h3 className="font-serif text-lg text-stone-500 mb-1">Sealed Prayer</h3>
                     <p className="text-xs">Opens in {timeLeft} days</p>
                   </div>
                 ) : (
                   <>
                     <h3 className="font-serif text-xl text-stone-800 mb-3 line-clamp-2">{letter.title}</h3>
                     <p className="text-stone-500 text-sm line-clamp-3 leading-relaxed font-serif italic mb-auto">
                       "{letter.content}"
                     </p>
                     
                     <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-stone-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Unlock size={12} /> Open
                        </span>
                        {letter.scriptureSeal && (
                          <span className="flex items-center gap-1 text-gold-600">
                            <Sparkles size={12} /> Sealed with Word
                          </span>
                        )}
                     </div>
                   </>
                 )}
               </div>
             );
          })}
       </div>
    </div>
  );
};

export default PrayerLetters;