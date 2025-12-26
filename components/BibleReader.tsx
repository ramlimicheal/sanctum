import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Bookmark, ChevronLeft, ChevronRight, Copy, Check, Heart, AlertCircle, Loader } from 'lucide-react';
import { BibleBookmark } from '@/types';
import { getBibleBookmarks, addBibleBookmark } from '@/services/storageService';
import { bibleService } from '@/services/bibleApiService';
const BIBLE_BOOKS = [
  { name: 'Genesis', chapters: 50, testament: 'old' },
  { name: 'Exodus', chapters: 40, testament: 'old' },
  { name: 'Leviticus', chapters: 27, testament: 'old' },
  { name: 'Numbers', chapters: 36, testament: 'old' },
  { name: 'Deuteronomy', chapters: 34, testament: 'old' },
  { name: 'Joshua', chapters: 24, testament: 'old' },
  { name: 'Judges', chapters: 21, testament: 'old' },
  { name: 'Ruth', chapters: 4, testament: 'old' },
  { name: 'Psalms', chapters: 150, testament: 'old' },
  { name: 'Proverbs', chapters: 31, testament: 'old' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'old' },
  { name: 'Isaiah', chapters: 66, testament: 'old' },
  { name: 'Jeremiah', chapters: 52, testament: 'old' },
  { name: 'Matthew', chapters: 28, testament: 'new' },
  { name: 'Mark', chapters: 16, testament: 'new' },
  { name: 'Luke', chapters: 24, testament: 'new' },
  { name: 'John', chapters: 21, testament: 'new' },
  { name: 'Acts', chapters: 28, testament: 'new' },
  { name: 'Romans', chapters: 16, testament: 'new' },
  { name: '1 Corinthians', chapters: 16, testament: 'new' },
  { name: '2 Corinthians', chapters: 13, testament: 'new' },
  { name: 'Galatians', chapters: 6, testament: 'new' },
  { name: 'Ephesians', chapters: 6, testament: 'new' },
  { name: 'Philippians', chapters: 4, testament: 'new' },
  { name: 'Colossians', chapters: 4, testament: 'new' },
  { name: 'James', chapters: 5, testament: 'new' },
  { name: '1 Peter', chapters: 5, testament: 'new' },
  { name: '2 Peter', chapters: 3, testament: 'new' },
  { name: '1 John', chapters: 5, testament: 'new' },
  { name: 'Revelation', chapters: 22, testament: 'new' },
];


const BibleReader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<BibleBookmark[]>(getBibleBookmarks());
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [view, setView] = useState<'books' | 'chapters' | 'reading'>('books');
  const [verses, setVerses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectBook = (bookName: string) => {
    setSelectedBook(bookName);
    setView('chapters');
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    setView('reading');
    setError(null);
  };

  useEffect(() => {
    if (selectedChapter && selectedBook) {
      loadChapter();
    }
  }, [selectedChapter, selectedBook]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      setError(null);
      const reference = `${selectedBook} ${selectedChapter}`;
      const verse = await bibleService.getVerse(reference);
      if (verse) {
        setVerses([verse.text]);
      } else {
        setError('Could not load scripture. Using fallback content.');
        setVerses([`Scripture text for ${reference} could not be retrieved. Please try again or check your internet connection.`]);
      }
    } catch (err) {
      setError('Failed to load scripture content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = () => {
    if (selectedBook && selectedChapter) {
      const reference = `${selectedBook} ${selectedChapter}`;
      const bookmark: BibleBookmark = {
        id: `bookmark-${Date.now()}`,
        reference,
        createdAt: new Date(),
      };
      addBibleBookmark(bookmark);
      setBookmarks([bookmark, ...bookmarks]);
    }
  };

  const handleCopyVerse = (verseIndex: number, text: string) => {
    const reference = `${selectedBook} ${selectedChapter}:${verseIndex + 1}`;
    navigator.clipboard.writeText(`"${text}" - ${reference}`);
    setCopiedVerse(verseIndex);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const currentBook = BIBLE_BOOKS.find(b => b.name === selectedBook);

  // Books View
  if (view === 'books') {
    const filteredBooks = BIBLE_BOOKS.filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const oldTestament = filteredBooks.filter(b => b.testament === 'old');
    const newTestament = filteredBooks.filter(b => b.testament === 'new');

    return (
      <div className="p-4 md:p-6 lg:p-10 max-w-5xl mx-auto space-y-4 md:space-y-6 animate-fade-in pb-24 relative z-10">
        <header className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-emerald-600 mb-2 font-medium text-sm md:text-base">
            <BookOpen size={16} />
            <span>Bible</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif text-stone-800 mb-2">Read Scripture</h1>
          <p className="text-stone-500 max-w-xl text-sm md:text-base">
            "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
          </p>
        </header>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
          />
        </div>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div className="bg-white rounded-xl border border-stone-200 p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-semibold text-stone-600 mb-2 md:mb-3 flex items-center gap-2">
              <Bookmark size={12} /> Recent Bookmarks
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {bookmarks.slice(0, 5).map(bookmark => (
                <button
                  key={bookmark.id}
                  onClick={() => {
                    const [book, chapter] = bookmark.reference.split(' ');
                    const bookName = bookmark.reference.replace(/ \d+$/, '');
                    const chapterNum = parseInt(bookmark.reference.match(/\d+$/)?.[0] || '1');
                    setSelectedBook(bookName);
                    setSelectedChapter(chapterNum);
                    setView('reading');
                  }}
                  className="px-2.5 md:px-3 py-1 md:py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs md:text-sm hover:bg-emerald-100 transition-colors"
                >
                  {bookmark.reference}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Old Testament */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-stone-800 mb-2 md:mb-3">Old Testament</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2">
            {oldTestament.map(book => (
              <button
                key={book.name}
                onClick={() => handleSelectBook(book.name)}
                className="p-2.5 md:p-3 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                <p className="font-medium text-stone-800 text-xs md:text-sm truncate">{book.name}</p>
                <p className="text-[10px] md:text-xs text-stone-400">{book.chapters} ch</p>
              </button>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-stone-800 mb-2 md:mb-3">New Testament</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2">
            {newTestament.map(book => (
              <button
                key={book.name}
                onClick={() => handleSelectBook(book.name)}
                className="p-2.5 md:p-3 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                <p className="font-medium text-stone-800 text-sm truncate">{book.name}</p>
                <p className="text-xs text-stone-400">{book.chapters} ch</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chapters View
  if (view === 'chapters' && selectedBook && currentBook) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6 animate-fade-in pb-24 relative z-10">
        <button 
          onClick={() => setView('books')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-4"
        >
          <ChevronLeft size={18} /> Back to Books
        </button>

        <header className="mb-8">
          <h1 className="text-4xl font-serif text-stone-800 mb-2">{selectedBook}</h1>
          <p className="text-stone-500">Select a chapter to read</p>
        </header>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(chapter => (
            <button
              key={chapter}
              onClick={() => handleSelectChapter(chapter)}
              className="aspect-square flex items-center justify-center bg-white rounded-lg border border-stone-200 font-medium text-stone-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              {chapter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'reading' && selectedBook && selectedChapter) {
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6 animate-fade-in pb-24 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setView('chapters')}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ChevronLeft size={18} /> {selectedBook}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500 hover:text-emerald-600"
            >
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">{error}</p>
          </div>
        )}

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-stone-200 p-4">
          <button
            onClick={() => selectedChapter > 1 && setSelectedChapter(selectedChapter - 1)}
            disabled={selectedChapter <= 1}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-xl font-serif text-stone-800">
            {selectedBook} {selectedChapter}
          </h2>
          
          <button
            onClick={() => currentBook && selectedChapter < currentBook.chapters && setSelectedChapter(selectedChapter + 1)}
            disabled={!currentBook || selectedChapter >= currentBook.chapters}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-stone-200 p-8 flex items-center justify-center gap-3">
            <Loader size={20} className="text-emerald-600 animate-spin" />
            <p className="text-stone-600">Loading scripture...</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 md:p-8">
            {verses.length > 0 ? (
              <div className="space-y-4">
                {verses.map((verse, index) => (
                  <div
                    key={index}
                    className="group flex gap-3 hover:bg-emerald-50 -mx-2 px-2 py-1 rounded-lg transition-colors"
                  >
                    <span className="text-emerald-600 font-medium text-sm w-6 shrink-0 pt-1">
                      {index + 1}
                    </span>
                    <p className="text-stone-700 leading-relaxed font-serif flex-1 whitespace-pre-wrap">
                      {verse}
                    </p>
                    <button
                      onClick={() => handleCopyVerse(index, verse)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-emerald-600 transition-all shrink-0"
                    >
                      {copiedVerse === index ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">No scripture content available.</p>
            )}
          </div>
        )}

        {/* Quick Navigation */}
        <div className="flex justify-center gap-1 flex-wrap">
          {currentBook && Array.from({ length: Math.min(currentBook.chapters, 20) }, (_, i) => i + 1).map(ch => (
            <button
              key={ch}
              onClick={() => setSelectedChapter(ch)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                ch === selectedChapter 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {ch}
            </button>
          ))}
          {currentBook && currentBook.chapters > 20 && (
            <span className="text-stone-400 text-sm self-center ml-2">...</span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default BibleReader;
