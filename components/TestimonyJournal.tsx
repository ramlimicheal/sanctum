import React, { useState, useEffect } from 'react';
import { Star, Plus, X, BookOpen, Calendar, Tag, Trash2, Edit2, Sparkles } from 'lucide-react';
import { Testimony } from '@/types';
import { getTestimonies, addTestimony, deleteTestimony } from '@/services/storageService';

const TestimonyJournal: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [filter, setFilter] = useState<'all' | Testimony['category']>('all');
  const [newTestimony, setNewTestimony] = useState({
    title: '',
    story: '',
    category: 'answered_prayer' as Testimony['category'],
    relatedScripture: { text: '', reference: '' },
    tags: [] as string[],
    tagInput: '',
  });

  useEffect(() => {
    setTestimonies(getTestimonies());
  }, []);

  const handleSubmit = () => {
    if (!newTestimony.title.trim() || !newTestimony.story.trim()) return;
    
    const testimony: Testimony = {
      id: `testimony-${Date.now()}`,
      title: newTestimony.title,
      story: newTestimony.story,
      category: newTestimony.category,
      date: new Date(),
      relatedScripture: newTestimony.relatedScripture.text ? newTestimony.relatedScripture : undefined,
      tags: newTestimony.tags,
    };
    
    addTestimony(testimony);
    setTestimonies([testimony, ...testimonies]);
    setNewTestimony({
      title: '',
      story: '',
      category: 'answered_prayer',
      relatedScripture: { text: '', reference: '' },
      tags: [],
      tagInput: '',
    });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    deleteTestimony(id);
    setTestimonies(testimonies.filter(t => t.id !== id));
    setSelectedTestimony(null);
  };

  const handleAddTag = () => {
    if (newTestimony.tagInput.trim() && !newTestimony.tags.includes(newTestimony.tagInput.trim())) {
      setNewTestimony({
        ...newTestimony,
        tags: [...newTestimony.tags, newTestimony.tagInput.trim()],
        tagInput: '',
      });
    }
  };

  const filteredTestimonies = testimonies.filter(t => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  const categoryColors: Record<string, string> = {
    answered_prayer: 'bg-amber-100 text-amber-700',
    healing: 'bg-rose-100 text-rose-700',
    provision: 'bg-emerald-100 text-emerald-700',
    breakthrough: 'bg-purple-100 text-purple-700',
    transformation: 'bg-sky-100 text-sky-700',
    miracle: 'bg-indigo-100 text-indigo-700',
  };

  const categoryLabels: Record<string, string> = {
    answered_prayer: '🙏 Answered Prayer',
    healing: '💚 Healing',
    provision: '🎁 Provision',
    breakthrough: '⚡ Breakthrough',
    transformation: '🦋 Transformation',
    miracle: '✨ Miracle',
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-5xl mx-auto space-y-4 md:space-y-6 animate-fade-in pb-24 relative z-10">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-amber-600 mb-2 font-medium text-sm md:text-base">
          <Star size={16} />
          <span>Testimony Journal</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-serif text-stone-800 mb-2">Remember His Faithfulness</h1>
        <p className="text-stone-500 max-w-xl text-sm md:text-base">
          "Come and see what God has done, his awesome deeds for mankind!" — Psalm 66:5
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-serif text-stone-800">{testimonies.length}</p>
          <p className="text-[10px] md:text-xs text-stone-500">Total Testimonies</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-serif text-amber-600">{testimonies.filter(t => t.category === 'answered_prayer').length}</p>
          <p className="text-[10px] md:text-xs text-stone-500">Answered Prayers</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-serif text-rose-600">{testimonies.filter(t => t.category === 'healing').length}</p>
          <p className="text-[10px] md:text-xs text-stone-500">Healings</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-serif text-indigo-600">{testimonies.filter(t => t.category === 'miracle').length}</p>
          <p className="text-[10px] md:text-xs text-stone-500">Miracles</p>
        </div>
      </div>

      {/* Filter & Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="flex flex-wrap gap-1.5 md:gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
              filter === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          {(Object.keys(categoryLabels) as Testimony['category'][]).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                filter === cat ? categoryColors[cat] : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
        >
          <Plus size={16} /> Record Testimony
        </button>
      </div>

      {/* Testimonies Grid */}
      {filteredTestimonies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {filteredTestimonies.map(testimony => (
            <div 
              key={testimony.id}
              onClick={() => setSelectedTestimony(testimony)}
              className="bg-white rounded-xl border border-stone-200 p-4 md:p-5 cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${categoryColors[testimony.category]}`}>
                  {categoryLabels[testimony.category]}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(testimony.date)}
                </span>
              </div>
              
              <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                {testimony.title}
              </h3>
              
              <p className="text-stone-600 text-sm line-clamp-3 mb-3">{testimony.story}</p>
              
              {testimony.relatedScripture && (
                <div className="flex items-center gap-2 text-xs text-amber-600 mb-3">
                  <BookOpen size={12} />
                  <span>{testimony.relatedScripture.reference}</span>
                </div>
              )}
              
              {testimony.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {testimony.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-stone-100 text-stone-500 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {testimony.tags.length > 3 && (
                    <span className="text-xs text-stone-400">+{testimony.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
          <Sparkles size={48} className="mx-auto text-stone-300 mb-4" />
          <h3 className="text-lg font-medium text-stone-800 mb-2">No testimonies yet</h3>
          <p className="text-stone-500 mb-4">Start recording God's faithfulness in your life</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Record Your First Testimony
          </button>
        </div>
      )}

      {/* View Testimony Modal */}
      {selectedTestimony && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6 border-b border-stone-100 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[selectedTestimony.category]}`}>
                  {categoryLabels[selectedTestimony.category]}
                </span>
                <button onClick={() => setSelectedTestimony(null)} className="text-stone-400 hover:text-stone-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-serif text-stone-800 mb-2">{selectedTestimony.title}</h2>
              <p className="text-sm text-stone-400 mb-6 flex items-center gap-2">
                <Calendar size={14} /> {formatDate(selectedTestimony.date)}
              </p>
              
              <div className="prose prose-stone max-w-none mb-6">
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{selectedTestimony.story}</p>
              </div>
              
              {selectedTestimony.relatedScripture && (
                <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <BookOpen size={18} className="text-amber-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-stone-700 italic mb-1">"{selectedTestimony.relatedScripture.text}"</p>
                      <span className="text-sm font-medium text-amber-600">{selectedTestimony.relatedScripture.reference}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTestimony.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTestimony.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-3 pt-4 border-t border-stone-100">
                <button 
                  onClick={() => handleDelete(selectedTestimony.id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Testimony Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6 border-b border-stone-100 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-stone-800">Record Testimony</h2>
                <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTestimony.title}
                  onChange={(e) => setNewTestimony({ ...newTestimony, title: e.target.value })}
                  placeholder="Give your testimony a title..."
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(categoryLabels) as Testimony['category'][]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewTestimony({ ...newTestimony, category: cat })}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        newTestimony.category === cat ? categoryColors[cat] : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Your Story</label>
                <textarea
                  value={newTestimony.story}
                  onChange={(e) => setNewTestimony({ ...newTestimony, story: e.target.value })}
                  placeholder="Share what God has done..."
                  className="w-full h-40 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Related Scripture (optional)</label>
                <input
                  type="text"
                  value={newTestimony.relatedScripture.reference}
                  onChange={(e) => setNewTestimony({ 
                    ...newTestimony, 
                    relatedScripture: { ...newTestimony.relatedScripture, reference: e.target.value }
                  })}
                  placeholder="e.g., Psalm 23:1"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-2"
                />
                <textarea
                  value={newTestimony.relatedScripture.text}
                  onChange={(e) => setNewTestimony({ 
                    ...newTestimony, 
                    relatedScripture: { ...newTestimony.relatedScripture, text: e.target.value }
                  })}
                  placeholder="The verse text..."
                  className="w-full h-20 px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTestimony.tagInput}
                    onChange={(e) => setNewTestimony({ ...newTestimony, tagInput: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button 
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {newTestimony.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newTestimony.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-stone-100 text-stone-600 rounded-full text-sm flex items-center gap-1"
                      >
                        #{tag}
                        <button 
                          onClick={() => setNewTestimony({ 
                            ...newTestimony, 
                            tags: newTestimony.tags.filter(t => t !== tag) 
                          })}
                          className="hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!newTestimony.title.trim() || !newTestimony.story.trim()}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Star size={18} /> Save Testimony
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonyJournal;
