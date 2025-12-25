import React, { useState, useEffect } from 'react';
import { Plus, Heart, Clock, Sparkles, Loader2, X, AlertCircle, Maximize2, Trash2 } from 'lucide-react';
import { IntercessionItem } from '@/types';
import { generateIntercessionPrayer } from '@/services/megallmService';
import { getIntercessionItems, addIntercessionItem, updateIntercessionItem, deleteIntercessionItem } from '@/services/supabaseStorage';

const Intercession: React.FC = () => {
  const [items, setItems] = useState<IntercessionItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', request: '', category: 'General' as IntercessionItem['category'] });
  const [generatedPrayer, setGeneratedPrayer] = useState<{id: string, text: string} | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [focusModeItem, setFocusModeItem] = useState<IntercessionItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await getIntercessionItems();
        setItems(storedItems);
      } catch (error) {
        console.error('Error loading intercession items:', error);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const handleAdd = async () => {
    if (!newItem.name || !newItem.request) return;
    try {
      const itemData = {
        name: newItem.name,
        request: newItem.request,
        lastPrayed: null,
        category: newItem.category
      };
      await addIntercessionItem(itemData);
      const item: IntercessionItem = {
        id: Date.now().toString(),
        ...itemData
      };
      setItems([item, ...items]);
      setNewItem({ name: '', request: '', category: 'General' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding intercession item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteIntercessionItem(id);
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting intercession item:', error);
    }
  };

  const generatePrayer = async (item: IntercessionItem) => {
    setLoadingId(item.id);
    setGeneratedPrayer(null);
    const text = await generateIntercessionPrayer(item.name, item.request);
    setGeneratedPrayer({ id: item.id, text });
    setLoadingId(null);
  };

  const markPrayed = async (id: string) => {
    try {
      const updatedItem = items.find(i => i.id === id);
      if (updatedItem) {
        await updateIntercessionItem(id, { lastPrayed: new Date() });
        setItems(items.map(i => i.id === id ? { ...i, lastPrayed: new Date() } : i));
      }
      setGeneratedPrayer(null);
      if (focusModeItem?.id === id) setFocusModeItem(null);
    } catch (error) {
      console.error('Error marking prayer as prayed:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-10 pb-24 flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-gold-600" size={48} />
      </div>
    );
  }

  // Focus Mode Overlay
  if (focusModeItem) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/95 flex items-center justify-center p-6 animate-fade-in backdrop-blur-sm">
        <button 
          onClick={() => setFocusModeItem(null)} 
          className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
        
        <div className="max-w-2xl w-full text-center space-y-8">
           <div className="inline-block px-4 py-1 rounded-full border border-stone-700 text-stone-400 text-xs font-bold tracking-widest uppercase">
             Focus Mode
           </div>
           
           <div>
             <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{focusModeItem.name}</h2>
             <p className="text-xl text-stone-300 font-light leading-relaxed max-w-xl mx-auto">
               "{focusModeItem.request}"
             </p>
           </div>

           <div className="bg-stone-800/50 rounded-2xl p-8 border border-stone-700/50">
              {loadingId === focusModeItem.id ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gold-500" size={32} /></div>
              ) : generatedPrayer?.id === focusModeItem.id ? (
                <div className="animate-fade-in">
                  <p className="font-serif italic text-gold-100 text-lg mb-8 leading-relaxed">
                    "{generatedPrayer.text}"
                  </p>
                  <button 
                    onClick={() => markPrayed(focusModeItem.id)}
                    className="bg-gold-600 text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-gold-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    Amen
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <p className="text-stone-500 mb-6 text-sm">Use the AI to guide your words, or pray silently.</p>
                  <button 
                    onClick={() => generatePrayer(focusModeItem)}
                    className="flex items-center justify-center gap-2 mx-auto text-gold-500 hover:text-gold-400 transition-colors border border-gold-500/30 px-6 py-2 rounded-full hover:bg-gold-500/10"
                  >
                    <Sparkles size={18} /> Help me pray
                  </button>
                  <button 
                    onClick={() => markPrayed(focusModeItem.id)}
                    className="mt-4 block mx-auto text-stone-500 hover:text-stone-300 text-sm underline underline-offset-4"
                  >
                    I have prayed silently
                  </button>
                </div>
              )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-10 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">Intercession Circle</h2>
          <p className="text-stone-500 mt-1 text-sm md:text-base">Bear one another's burdens.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-stone-900 text-white p-2.5 md:p-3 rounded-full hover:bg-gold-600 transition-colors shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      {isAdding && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gold-100 animate-slide-down">
          <div className="flex justify-between mb-4">
             <h3 className="font-semibold text-stone-700">New Request</h3>
             <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-red-500"><X size={18}/></button>
          </div>
          <input 
            className="w-full mb-3 p-3 bg-stone-50 rounded-lg border border-stone-200 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-stone-900 placeholder:text-stone-400"
            placeholder="Who are you praying for?"
            value={newItem.name}
            onChange={e => setNewItem({...newItem, name: e.target.value})}
          />
          <textarea 
            className="w-full mb-3 p-3 bg-stone-50 rounded-lg border border-stone-200 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-stone-900 placeholder:text-stone-400 resize-none h-24"
            placeholder="What is the need?"
            value={newItem.request}
            onChange={e => setNewItem({...newItem, request: e.target.value})}
          />
          <select
            className="w-full mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-stone-900"
            value={newItem.category}
            onChange={e => setNewItem({...newItem, category: e.target.value as IntercessionItem['category']})}
          >
            <option value="General">General</option>
            <option value="Health">Health</option>
            <option value="Family">Family</option>
            <option value="Salvation">Salvation</option>
            <option value="Guidance">Guidance</option>
          </select>
          <button 
            onClick={handleAdd}
            className="w-full bg-stone-800 text-white py-2 rounded-lg font-medium hover:bg-stone-700"
          >
            Add to Circle
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-stone-800">{item.name}</h3>
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-xs rounded-full uppercase tracking-wider font-semibold">{item.category}</span>
                </div>
                <p className="text-stone-600 mb-4 font-serif leading-relaxed">{item.request}</p>
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> 
                    {item.lastPrayed ? `Prayed ${Math.floor((Date.now() - item.lastPrayed.getTime()) / (1000 * 60 * 60 * 24))} days ago` : 'Not prayed yet'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                 <button 
                  onClick={() => setFocusModeItem(item)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                  title="Focus Mode"
                >
                  <Maximize2 size={16} /> <span className="hidden md:inline">Focus</span>
                </button>
                <button 
                  onClick={() => generatePrayer(item)}
                  disabled={loadingId === item.id}
                  className="text-gold-600 hover:bg-gold-50 p-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                  title="Quick Prayer Starter"
                >
                  {loadingId === item.id ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Generated Prayer Expansion */}
            {generatedPrayer?.id === item.id && (
              <div className="mt-4 pt-4 border-t border-stone-100 animate-fade-in">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 mb-3">
                  <p className="font-serif italic text-stone-800">{generatedPrayer.text}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                    onClick={() => markPrayed(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold-600 text-white py-2 rounded-lg hover:bg-gold-500 transition-colors shadow-sm"
                    >
                    <Heart size={16} fill="currentColor" /> I Prayed This
                    </button>
                     <button 
                    onClick={() => setGeneratedPrayer(null)}
                    className="px-4 text-stone-400 hover:text-stone-600"
                    >
                    Cancel
                    </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intercession;