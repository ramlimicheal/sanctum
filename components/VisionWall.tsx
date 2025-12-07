
import React, { useState } from 'react';
import { Plus, Loader2, RefreshCw, X } from 'lucide-react';
import { VisionCard } from '../types';
import { generateVisionBoard } from '../services/geminiService';

const MOCK_CARDS: VisionCard[] = [
  {
    id: '1',
    focus: 'Peace',
    visualKeyword: 'calm lake sunrise',
    affirmation: 'I am guarded by the peace that surpasses understanding.',
    scripture: 'Peace I leave with you; my peace I give to you.',
    reference: 'John 14:27'
  },
  {
    id: '2',
    focus: 'Strength',
    visualKeyword: 'high mountain peak',
    affirmation: 'I can do all things through Christ who strengthens me.',
    scripture: 'The Lord is my rock and my fortress.',
    reference: 'Psalm 18:2'
  }
];

// Helper to get a high quality image URL based on keyword
const getImageUrl = (keyword: string, id: string) => {
  // Use a predictable hash from ID to select a 'random' but consistent image from a curated list if needed,
  // or just append to keyword to bust cache.
  return `https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80`; 
  // NOTE: For true dynamic images in a demo without an API key, we use unsplash source. 
  // But source is deprecated. We will use a reliable pattern.
  // Ideally: `https://source.unsplash.com/featured/?${encodeURIComponent(keyword)}`
  // Since source is unreliable, I'll use a specific set of IDs for the demo or the keyword endpoint if available.
  // Fallback to a standard keyword search URL pattern:
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(keyword)}?width=800&height=1000&nologo=true`;
};

const VisionWall: React.FC = () => {
  const [cards, setCards] = useState<VisionCard[]>(MOCK_CARDS);
  const [newFocus, setNewFocus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = async () => {
    if (!newFocus.trim()) return;
    setIsGenerating(true);
    const card = await generateVisionBoard(newFocus);
    if (card) {
      setCards([card, ...cards]);
      setNewFocus('');
    }
    setIsGenerating(false);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-24 h-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-serif text-stone-900 mb-2">Vision Wall</h2>
          <p className="text-stone-500 max-w-xl">
            "Write the vision; make it plain on tablets, so he may run who reads it." — Habakkuk 2:2
            <br />
            Visualize the promises of God over your life.
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <input 
            className="flex-1 md:w-80 bg-white border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-400"
            placeholder="What spiritual truth do you need to see? (e.g. Courage)"
            value={newFocus}
            onChange={(e) => setNewFocus(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            onClick={handleAdd}
            disabled={isGenerating || !newFocus.trim()}
            className="bg-stone-900 hover:bg-gold-600 text-white px-4 py-3 rounded-lg transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center min-w-[60px]"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Plus />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div 
            key={card.id}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-900"
          >
            {/* Background Image with Breathing Animation */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out transform group-hover:scale-110 animate-pulse-slow"
              style={{ 
                backgroundImage: `url(${getImageUrl(card.visualKeyword, card.id)})`,
                opacity: 0.7
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <button 
                onClick={() => removeCard(card.id)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>

              <div className="mb-4 transform transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-8 h-px bg-gold-400"></span>
                  {card.focus}
                </p>
                <h3 className="text-2xl font-serif text-white leading-tight mb-4 drop-shadow-lg">
                  "{card.affirmation}"
                </h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 transform transition-all duration-700 opacity-80 group-hover:opacity-100">
                <p className="font-serif italic text-stone-200 text-sm mb-2">"{card.scripture}"</p>
                <p className="text-stone-400 text-xs font-bold uppercase text-right">{card.reference}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionWall;
