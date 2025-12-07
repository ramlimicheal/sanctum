import React, { useState, useEffect } from 'react';
import { Users, Heart, Plus, X, Send, Filter, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { CommunityPrayer as CommunityPrayerType } from '@/types';
import { 
  getCommunityPrayers, 
  addCommunityPrayer, 
  prayForCommunityPrayer, 
  markPrayerAnswered,
  updatePrayerStreak 
} from '@/services/storageService';

// Sample community prayers for demo
const SAMPLE_PRAYERS: CommunityPrayerType[] = [
  {
    id: 'sample-1',
    request: 'Please pray for my mother who is undergoing surgery next week. We trust in God\'s healing hands.',
    category: 'healing',
    isAnonymous: false,
    authorName: 'Sarah M.',
    createdAt: new Date(Date.now() - 86400000 * 2),
    prayerCount: 47,
    isAnswered: false,
  },
  {
    id: 'sample-2',
    request: 'Seeking guidance for a major career decision. Praying for clarity and wisdom to follow God\'s will.',
    category: 'guidance',
    isAnonymous: true,
    createdAt: new Date(Date.now() - 86400000 * 1),
    prayerCount: 23,
    isAnswered: false,
  },
  {
    id: 'sample-3',
    request: 'Praise God! After months of prayer, my son has returned to faith. Thank you all for your prayers!',
    category: 'gratitude',
    isAnonymous: false,
    authorName: 'David K.',
    createdAt: new Date(Date.now() - 86400000 * 5),
    prayerCount: 89,
    isAnswered: true,
    answeredTestimony: 'God is faithful! My son called me last Sunday and said he wants to come back to church. We cried together and praised God.',
  },
  {
    id: 'sample-4',
    request: 'Please pray for my family\'s financial situation. We\'re trusting God to provide.',
    category: 'provision',
    isAnonymous: true,
    createdAt: new Date(Date.now() - 86400000 * 3),
    prayerCount: 56,
    isAnswered: false,
  },
  {
    id: 'sample-5',
    request: 'Praying for my neighbor who doesn\'t know Jesus yet. May God soften their heart.',
    category: 'salvation',
    isAnonymous: false,
    authorName: 'Grace L.',
    createdAt: new Date(Date.now() - 86400000 * 4),
    prayerCount: 34,
    isAnswered: false,
  },
];

const CommunityPrayer: React.FC = () => {
  const [prayers, setPrayers] = useState<CommunityPrayerType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'answered' | CommunityPrayerType['category']>('all');
  const [prayedFor, setPrayedFor] = useState<Set<string>>(new Set());
  const [newPrayer, setNewPrayer] = useState({
    request: '',
    category: 'other' as CommunityPrayerType['category'],
    isAnonymous: false,
    authorName: '',
  });

  useEffect(() => {
    const stored = getCommunityPrayers();
    // Merge with sample prayers for demo
    const allPrayers = [...stored];
    SAMPLE_PRAYERS.forEach(sample => {
      if (!allPrayers.find(p => p.id === sample.id)) {
        allPrayers.push(sample);
      }
    });
    setPrayers(allPrayers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const handlePrayFor = (id: string) => {
    if (prayedFor.has(id)) return;
    
    prayForCommunityPrayer(id);
    setPrayedFor(new Set([...prayedFor, id]));
    setPrayers(prayers.map(p => p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p));
    updatePrayerStreak();
  };

  const handleSubmitPrayer = () => {
    if (!newPrayer.request.trim()) return;
    
    const prayer: CommunityPrayerType = {
      id: `prayer-${Date.now()}`,
      request: newPrayer.request,
      category: newPrayer.category,
      isAnonymous: newPrayer.isAnonymous,
      authorName: newPrayer.isAnonymous ? undefined : newPrayer.authorName || 'Anonymous',
      createdAt: new Date(),
      prayerCount: 0,
      isAnswered: false,
    };
    
    addCommunityPrayer(prayer);
    setPrayers([prayer, ...prayers]);
    setNewPrayer({ request: '', category: 'other', isAnonymous: false, authorName: '' });
    setShowAddModal(false);
  };

  const filteredPrayers = prayers.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'answered') return p.isAnswered;
    return p.category === filter;
  });

  const categoryColors: Record<string, string> = {
    healing: 'bg-rose-100 text-rose-700',
    provision: 'bg-emerald-100 text-emerald-700',
    guidance: 'bg-amber-100 text-amber-700',
    salvation: 'bg-purple-100 text-purple-700',
    gratitude: 'bg-sky-100 text-sky-700',
    other: 'bg-stone-100 text-stone-700',
  };

  const categoryIcons: Record<string, string> = {
    healing: '🩹',
    provision: '🙏',
    guidance: '🧭',
    salvation: '✝️',
    gratitude: '🎉',
    other: '💭',
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6 animate-fade-in pb-24 relative z-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 mb-2 font-medium">
          <Users size={18} />
          <span>Community Prayer Wall</span>
        </div>
        <h1 className="text-4xl font-serif text-stone-800 mb-2">Pray Together</h1>
        <p className="text-stone-500 max-w-xl">
          "For where two or three gather in my name, there am I with them." — Matthew 18:20
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
          <p className="text-2xl font-serif text-stone-800">{prayers.length}</p>
          <p className="text-xs text-stone-500">Prayer Requests</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
          <p className="text-2xl font-serif text-indigo-600">{prayers.reduce((sum, p) => sum + p.prayerCount, 0)}</p>
          <p className="text-xs text-stone-500">Prayers Lifted</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
          <p className="text-2xl font-serif text-emerald-600">{prayers.filter(p => p.isAnswered).length}</p>
          <p className="text-xs text-stone-500">Answered</p>
        </div>
      </div>

      {/* Filter & Add */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('answered')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'answered' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ✨ Answered
          </button>
          {(['healing', 'provision', 'guidance', 'salvation', 'gratitude'] as const).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? categoryColors[cat] : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Share Request
        </button>
      </div>

      {/* Prayer Cards */}
      <div className="space-y-4">
        {filteredPrayers.map(prayer => (
          <div 
            key={prayer.id}
            className={`bg-white rounded-xl border ${prayer.isAnswered ? 'border-emerald-200 bg-emerald-50/50' : 'border-stone-200'} p-5 transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[prayer.category]}`}>
                  {categoryIcons[prayer.category]} {prayer.category}
                </span>
                {prayer.isAnswered && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <CheckCircle size={12} /> Answered
                  </span>
                )}
              </div>
              <span className="text-xs text-stone-400">{formatTimeAgo(prayer.createdAt)}</span>
            </div>
            
            <p className="text-stone-700 mb-4 leading-relaxed">{prayer.request}</p>
            
            {prayer.isAnswered && prayer.answeredTestimony && (
              <div className="bg-emerald-100 rounded-lg p-3 mb-4 border border-emerald-200">
                <p className="text-sm text-emerald-800 flex items-start gap-2">
                  <Sparkles size={16} className="shrink-0 mt-0.5" />
                  <span><strong>Testimony:</strong> {prayer.answeredTestimony}</span>
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">
                {prayer.isAnonymous ? 'Anonymous' : prayer.authorName}
              </span>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-400 flex items-center gap-1">
                  <Heart size={14} className="text-rose-400" /> {prayer.prayerCount} prayed
                </span>
                
                <button 
                  onClick={() => handlePrayFor(prayer.id)}
                  disabled={prayedFor.has(prayer.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    prayedFor.has(prayer.id) 
                      ? 'bg-rose-100 text-rose-600 cursor-default' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  {prayedFor.has(prayer.id) ? (
                    <>
                      <Heart size={16} className="fill-current" /> Prayed
                    </>
                  ) : (
                    <>
                      <Heart size={16} /> I Prayed
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPrayers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
          <MessageCircle size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500">No prayer requests in this category yet.</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-indigo-600 font-medium hover:underline"
          >
            Be the first to share
          </button>
        </div>
      )}

      {/* Add Prayer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-stone-800">Share Prayer Request</h2>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Your Prayer Request</label>
                <textarea
                  value={newPrayer.request}
                  onChange={(e) => setNewPrayer({ ...newPrayer, request: e.target.value })}
                  placeholder="Share what's on your heart..."
                  className="w-full h-32 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {(['healing', 'provision', 'guidance', 'salvation', 'gratitude', 'other'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewPrayer({ ...newPrayer, category: cat })}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        newPrayer.category === cat ? categoryColors[cat] : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newPrayer.isAnonymous}
                  onChange={(e) => setNewPrayer({ ...newPrayer, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-stone-600">Post anonymously</label>
              </div>
              
              {!newPrayer.isAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Your Name (optional)</label>
                  <input
                    type="text"
                    value={newPrayer.authorName}
                    onChange={(e) => setNewPrayer({ ...newPrayer, authorName: e.target.value })}
                    placeholder="First name or initials"
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <button
                onClick={handleSubmitPrayer}
                disabled={!newPrayer.request.trim()}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={18} /> Submit Prayer Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPrayer;
