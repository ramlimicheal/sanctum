import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, ArrowLeft, BookOpen, RotateCcw, Layers, Check } from 'lucide-react';
import { getPraiseProgress, savePraiseProgress } from '@/services/storageService';

// Structure for a Praise Card
interface Praise {
  id: number;
  title: string;
  verse: string;
  reference: string;
  context: string;
}

// Helper to generate the 1000 praises dynamically since we can't hardcode all.
// In a production app, this would be a JSON fetch.
const generatePraises = (): Praise[] => {
  const praises: Praise[] = [];
  
  // REAL DATA for the first 20 to show quality
  const seedData = [
    { title: "O God of Abraham", verse: "I am the God of your father Abraham.", reference: "Genesis 26:24", context: "The God of Covenant, who calls us out to new lands." },
    { title: "O God of Isaac", verse: "Fear not, for I am with you.", reference: "Genesis 26:24", context: "The God of Promise, who sustains the lineage of faith." },
    { title: "O God of Jacob", verse: "The God of Jacob is our fortress.", reference: "Psalm 46:7", context: "The God of Transformation, who meets us in our wrestling." },
    { title: "Abba, Father", verse: "And by him we cry, 'Abba, Father.'", reference: "Romans 8:15", context: "The intimate Father who adopts us as His own." },
    { title: "The Alpha", verse: "I am the Alpha and the Omega.", reference: "Revelation 1:8", context: "The Beginning of all things, the source of creation." },
    { title: "The Omega", verse: "The First and the Last.", reference: "Revelation 22:13", context: "The End of all things, the final word in history." },
    { title: "The Amen", verse: "These are the words of the Amen, the faithful and true witness.", reference: "Revelation 3:14", context: "The affirmation of all God's promises." },
    { title: "Ancient of Days", verse: "The Ancient of Days took his seat...", reference: "Daniel 7:9", context: "The Eternal Judge who sits enthroned before time began." },
    { title: "Anointed One", verse: "The kings of the earth take their stand against the Lord and his Anointed One.", reference: "Psalm 2:2", context: "The Messiah, set apart to save His people." },
    { title: "Author of Life", verse: "You killed the author of life, but God raised him from the dead.", reference: "Acts 3:15", context: "The Source from whom all existence flows." },
    { title: "Author of Our Faith", verse: "Fixing our eyes on Jesus, the pioneer and perfecter of faith.", reference: "Hebrews 12:2", context: "The One who writes your story from start to finish." },
    { title: "Balm of Gilead", verse: "Is there no balm in Gilead? Is there no physician there?", reference: "Jeremiah 8:22", context: "The ultimate Healer of spiritual wounds." },
    { title: "The Beginning", verse: "He is the beginning and the firstborn from among the dead.", reference: "Colossians 1:18", context: "The origin point of the new creation." },
    { title: "The Bread of Life", verse: "I am the bread of life. Whoever comes to me will never go hungry.", reference: "John 6:35", context: "The sustenance that truly satisfies the soul." },
    { title: "The Bridegroom", verse: "The bride belongs to the bridegroom.", reference: "John 3:29", context: "The passionate lover of the Church." },
    { title: "Bright Morning Star", verse: "I am the Root and the Offspring of David, and the bright Morning Star.", reference: "Revelation 22:16", context: "The sign of the new dawn and eternal hope." },
    { title: "Chief Cornerstone", verse: "Christ Jesus himself being the cornerstone.", reference: "Ephesians 2:20", context: "The foundational stone upon which the Church is built." },
    { title: "The Comforter", verse: "And I will pray the Father, and he shall give you another Comforter.", reference: "John 14:16", context: "The Holy Spirit who eases our grief and fear." },
    { title: "Consuming Fire", verse: "For our God is a consuming fire.", reference: "Hebrews 12:29", context: "The Holy power that purifies and burns away sin." },
    { title: "Creator of All", verse: "For by him all things were created.", reference: "Colossians 1:16", context: "The Artist behind every star and every cell." },
  ];

  // Fill first 20
  seedData.forEach((d, i) => {
    praises.push({ id: i + 1, ...d });
  });

  // Algorithmically generate the rest for demo purposes to reach 1000
  // In real app, this is fetched from a database.
  const attributes = ["Holiness", "Mercy", "Grace", "Power", "Love", "Justice", "Wisdom", "Truth", "Light", "Peace"];
  const titles = ["Lord of", "King of", "Source of", "Giver of", "Keeper of"];
  
  for (let i = 21; i <= 1000; i++) {
    const attr = attributes[i % attributes.length];
    const titleBase = titles[i % titles.length];
    praises.push({
      id: i,
      title: `${titleBase} ${attr} #${i}`,
      verse: `Praise the Lord for His infinite ${attr.toLowerCase()}.`,
      reference: `Psalm ${100 + (i % 50)}:${(i % 10) + 1}`,
      context: `Reflecting on the ${attr.toLowerCase()} of God in our daily lives.`
    });
  }

  return praises;
};

const ITEMS_PER_DECK = 10;
const DECKS_PER_VOLUME = 10; // 100 cards per volume

const PraiseDeck: React.FC = () => {
  const allPraises = useMemo(() => generatePraises(), []);
  
  // Navigation State
  const [view, setView] = useState<'volumes' | 'decks' | 'card'>('volumes');
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null); // 0-9 (Volume 1 is 0)
  const [selectedDeck, setSelectedDeck] = useState<number | null>(null); // Absolute deck index 0-99
  
  // Card State
  const [currentIndex, setCurrentIndex] = useState(0); // 0-9 within a deck
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  // Progress tracking
  const [completedPraises, setCompletedPraises] = useState<number[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const totalVolumes = Math.ceil(allPraises.length / (ITEMS_PER_DECK * DECKS_PER_VOLUME));

  // Load progress from storage
  useEffect(() => {
    const progress = getPraiseProgress();
    setCompletedPraises(progress.completedPraises);
    if (progress.lastDeck > 0) {
      const volumeIndex = Math.floor(progress.lastDeck / DECKS_PER_VOLUME);
      setSelectedVolume(volumeIndex);
    }
  }, []);

  // Save progress when completed praises change
  useEffect(() => {
    if (completedPraises.length > 0) {
      savePraiseProgress({ 
        lastDeck: selectedDeck || 0, 
        completedPraises 
      });
    }
  }, [completedPraises, selectedDeck]);

  const markAsCompleted = (praiseId: number) => {
    if (!completedPraises.includes(praiseId)) {
      setCompletedPraises([...completedPraises, praiseId]);
      setShowCompleted(true);
      setTimeout(() => setShowCompleted(false), 1500);
    }
  };

  const getVolumeProgress = (volIndex: number) => {
    const start = volIndex * 100 + 1;
    const end = (volIndex + 1) * 100;
    const completed = completedPraises.filter(id => id >= start && id <= end).length;
    return Math.round((completed / 100) * 100);
  };

  const getDeckProgress = (deckIdx: number) => {
    const start = deckIdx * ITEMS_PER_DECK + 1;
    const end = (deckIdx + 1) * ITEMS_PER_DECK;
    const completed = completedPraises.filter(id => id >= start && id <= end).length;
    return completed;
  };

  const handleSelectVolume = (volIndex: number) => {
    setSelectedVolume(volIndex);
    setView('decks');
  };

  const handleSelectDeck = (deckIndex: number) => {
    setSelectedDeck(deckIndex);
    setCurrentIndex(0);
    setIsFlipped(false);
    setView('card');
  };

  const handleNext = () => {
    setIsFlipped(false);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ITEMS_PER_DECK);
      setDirection(null);
    }, 400);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + ITEMS_PER_DECK) % ITEMS_PER_DECK);
      setDirection(null);
    }, 400);
  };

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view !== 'card') return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' || e.key === 'Enter') setIsFlipped(prev => !prev);
      if (e.key === 'Escape') setView('decks');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, currentIndex]);


  // --- VIEW: VOLUMES (1-100, 101-200...) ---
  if (view === 'volumes') {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10 pb-24 animate-fade-in">
        <div className="text-center mb-8 md:mb-12">
           <h2 className="text-2xl md:text-4xl font-serif text-stone-900 mb-2 md:mb-3">The 1000 Praises</h2>
           <p className="text-stone-500 text-sm md:text-base">Select a Volume to begin your ascent.</p>
           <p className="text-gold-600 text-xs md:text-sm mt-2 font-medium">{completedPraises.length} / 1000 Praises Completed</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
           {[...Array(totalVolumes)].map((_, i) => {
             const start = i * 100 + 1;
             const end = (i + 1) * 100;
             const progress = getVolumeProgress(i);
             return (
               <button 
                 key={i}
                 onClick={() => handleSelectVolume(i)}
                 className="bg-white p-8 rounded-xl shadow-md border border-stone-200 hover:shadow-2xl hover:border-gold-400 hover:-translate-y-1 transition-all group text-left relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers size={64} />
                 </div>
                 {progress === 100 && (
                   <div className="absolute top-4 left-4 bg-gold-100 text-gold-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                     <Check size={12} /> Complete
                   </div>
                 )}
                 <h3 className="text-2xl font-serif text-stone-800 mb-2">Volume {i + 1}</h3>
                 <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">Praises {start} - {end}</p>
                 <div className="mt-4 w-full bg-stone-100 rounded-full h-2">
                   <div className="bg-gold-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                 </div>
                 <p className="text-xs text-stone-400 mt-1">{progress}% complete</p>
                 <div className="mt-4 flex items-center gap-2 text-gold-600 font-medium group-hover:translate-x-2 transition-transform">
                    Open Volume <ChevronRight size={16} />
                 </div>
               </button>
             );
           })}
        </div>
      </div>
    );
  }

  // --- VIEW: DECKS (Within a Volume) ---
  if (view === 'decks' && selectedVolume !== null) {
     const startDeckIndex = selectedVolume * DECKS_PER_VOLUME;
     const decks = [...Array(DECKS_PER_VOLUME)].map((_, i) => startDeckIndex + i);

     return (
       <div className="max-w-6xl mx-auto p-6 md:p-10 pb-24 animate-fade-in">
         <div className="flex items-center gap-4 mb-8">
           <button onClick={() => setView('volumes')} className="p-2 rounded-full hover:bg-stone-200 transition-colors">
             <ArrowLeft size={20} />
           </button>
           <div>
             <h2 className="text-2xl font-serif text-stone-800">Volume {selectedVolume + 1}</h2>
             <p className="text-stone-500 text-sm">Select a deck of 10 praises</p>
           </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {decks.map((deckIdx) => {
               const start = deckIdx * ITEMS_PER_DECK + 1;
               const end = (deckIdx + 1) * ITEMS_PER_DECK;
               const deckCompleted = getDeckProgress(deckIdx);
               return (
                 <button
                   key={deckIdx}
                   onClick={() => handleSelectDeck(deckIdx)}
                   className={`aspect-[3/4] rounded-lg border flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-all group relative ${
                     deckCompleted === 10 ? 'bg-gold-50 border-gold-200' : 'bg-stone-100 border-stone-200 hover:bg-white'
                   }`}
                 >
                    {deckCompleted === 10 && (
                      <div className="absolute top-2 right-2 bg-gold-500 text-white p-1 rounded-full">
                        <Check size={12} />
                      </div>
                    )}
                    <span className={`text-3xl font-serif transition-colors mb-2 ${
                      deckCompleted === 10 ? 'text-gold-600' : 'text-stone-300 group-hover:text-gold-500'
                    }`}>{deckIdx + 1}</span>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Deck</span>
                    <span className="text-[10px] text-stone-400 mt-1">{start}-{end}</span>
                    <span className="text-[10px] text-gold-600 mt-2">{deckCompleted}/10</span>
                 </button>
               )
            })}
         </div>
       </div>
     )
  }

  // --- VIEW: CARD (The Experience) ---
  const currentDeckStart = (selectedDeck || 0) * ITEMS_PER_DECK;
  const currentCard = allPraises[currentDeckStart + currentIndex];
  const isCurrentCompleted = completedPraises.includes(currentCard?.id);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center p-6 relative">
      
      {/* Completed Toast */}
      {showCompleted && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gold-100 text-gold-800 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-slide-down">
          <Check size={18} /> Praise Completed!
        </div>
      )}
      
      {/* Header / Nav */}
      <div className="absolute top-6 left-6 md:left-10 z-20">
        <button 
          onClick={() => setView('decks')}
          className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} /> <span className="hidden md:inline">Back to Volume {selectedVolume! + 1}</span>
        </button>
      </div>

      <div className="absolute top-6 right-6 md:right-10 z-20 text-stone-400 text-sm font-medium tracking-widest uppercase bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
        Praise {currentCard.id} / 1000
      </div>

      {/* 3D Card Container */}
      <div 
        className="relative w-full max-w-md aspect-[3/4] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`
            relative w-full h-full transition-all duration-700 transform-style-3d shadow-2xl rounded-3xl
            ${isFlipped ? 'rotate-y-180' : ''}
            ${direction === 'right' ? 'translate-x-full opacity-0' : ''}
            ${direction === 'left' ? '-translate-x-full opacity-0' : ''}
          `}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 backface-hidden bg-stone-900 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-4 border-double border-gold-600/30 overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-600 via-amber-300 to-gold-600" />
             <Sparkles className="absolute top-8 left-8 text-gold-600 opacity-30" size={24} />
             <Sparkles className="absolute bottom-8 right-8 text-gold-600 opacity-30" size={24} />
             
             <div className="flex-1 flex flex-col items-center justify-center">
               <span className="inline-block px-3 py-1 mb-6 rounded-full border border-stone-700 text-stone-500 text-xs font-bold uppercase tracking-[0.2em]">
                 #{currentCard.id}
               </span>
               <h2 className="text-4xl md:text-5xl font-serif text-gold-100 leading-tight mb-4 drop-shadow-md">
                 {currentCard.title}
               </h2>
               <p className="text-stone-500 text-sm mt-8 animate-pulse">Tap to Reveal</p>
             </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl flex flex-col items-center justify-center p-8 text-center border border-stone-200 overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200" />
             
             <div className="mb-6">
                <BookOpen className="mx-auto text-gold-600 mb-4" size={32} />
                <h3 className="text-2xl font-serif text-stone-900 mb-2">{currentCard.title}</h3>
                <div className="w-12 h-1 bg-gold-200 mx-auto rounded-full" />
             </div>

             <div className="flex-1 flex flex-col justify-center">
               <p className="font-serif text-xl italic text-stone-700 leading-relaxed mb-4">
                 "{currentCard.verse}"
               </p>
               <p className="text-stone-400 text-sm font-bold uppercase tracking-wider mb-8">
                 — {currentCard.reference} —
               </p>

               <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 shadow-inner">
                 <p className="text-stone-600 text-sm leading-relaxed">
                   {currentCard.context}
                 </p>
               </div>
             </div>

             <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="mt-6 flex items-center justify-center gap-2 text-stone-400 text-xs uppercase tracking-widest hover:text-gold-600 transition-colors"
             >
               <RotateCcw size={12} /> Flip Back
             </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 flex items-center gap-8 z-10">
         <button 
           onClick={(e) => { e.stopPropagation(); handlePrev(); }}
           className="p-4 rounded-full bg-white text-stone-400 hover:text-stone-900 hover:bg-gold-50 shadow-lg transition-all transform hover:scale-110 active:scale-90"
         >
           <ChevronLeft size={24} />
         </button>
         
         <div className="flex gap-2">
            {[...Array(ITEMS_PER_DECK)].map((_, i) => {
              const praiseId = currentDeckStart + i + 1;
              const isCompleted = completedPraises.includes(praiseId);
              return (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-gold-600 w-6' 
                      : isCompleted 
                        ? 'bg-gold-400 w-2' 
                        : 'bg-stone-300 w-2'
                  }`} 
                />
              );
            })}
         </div>

         <button 
           onClick={(e) => { e.stopPropagation(); handleNext(); }}
           className="p-4 rounded-full bg-white text-stone-400 hover:text-stone-900 hover:bg-gold-50 shadow-lg transition-all transform hover:scale-110 active:scale-90"
         >
           <ChevronRight size={24} />
         </button>
      </div>
      
      {/* Mark Complete Button */}
      <button 
        onClick={() => markAsCompleted(currentCard.id)}
        disabled={isCurrentCompleted}
        className={`mt-6 px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
          isCurrentCompleted 
            ? 'bg-gold-100 text-gold-700 cursor-default' 
            : 'bg-stone-900 text-white hover:bg-gold-600'
        }`}
      >
        <Check size={16} />
        {isCurrentCompleted ? 'Completed' : 'Mark as Prayed'}
      </button>
      
      <p className="mt-4 text-stone-400 text-xs hidden md:block">Arrow Keys to Navigate • Spacebar to Flip</p>
    </div>
  );
};

export default PraiseDeck;