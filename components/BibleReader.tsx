import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, ChevronLeft, ChevronRight, Copy, Check, Heart } from 'lucide-react';
import { BibleBookmark } from '@/types';
import { getBibleBookmarks, addBibleBookmark } from '@/services/storageService';

// Sample Bible data (in production, this would come from an API)
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

// Sample verses for popular chapters
const SAMPLE_VERSES: Record<string, string[]> = {
  'Psalms 23': [
    'The LORD is my shepherd; I shall not want.',
    'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
    'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.',
    'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
    'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
  ],
  'John 3': [
    'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:',
    'The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.',
    'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.',
    'Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother\'s womb, and be born?',
    'Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.',
    'That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.',
    'Marvel not that I said unto thee, Ye must be born again.',
    'The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.',
    'Nicodemus answered and said unto him, How can these things be?',
    'Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?',
    'Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness.',
    'If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?',
    'And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.',
    'And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:',
    'That whosoever believeth in him should not perish, but have eternal life.',
    'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
  ],
  'Romans 8': [
    'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.',
    'For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.',
    'For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:',
    'That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit.',
    'For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit.',
    'For to be carnally minded is death; but to be spiritually minded is life and peace.',
    'Because the carnal mind is enmity against God: for it is not subject to the law of God, neither indeed can be.',
    'So then they that are in the flesh cannot please God.',
    'But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his.',
    'And if Christ be in you, the body is dead because of sin; but the Spirit is life because of righteousness.',
  ],
  'Philippians 4': [
    'Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved.',
    'I beseech Euodias, and beseech Syntyche, that they be of the same mind in the Lord.',
    'And I intreat thee also, true yokefellow, help those women which laboured with me in the gospel, with Clement also, and with other my fellowlabourers, whose names are in the book of life.',
    'Rejoice in the Lord alway: and again I say, Rejoice.',
    'Let your moderation be known unto all men. The Lord is at hand.',
    'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
    'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.',
    'Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you.',
    'But I rejoiced in the Lord greatly, that now at the last your care of me hath flourished again; wherein ye were also careful, but ye lacked opportunity.',
    'Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.',
    'I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need.',
    'I can do all things through Christ which strengtheneth me.',
  ],
};

const BibleReader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<BibleBookmark[]>(getBibleBookmarks());
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [view, setView] = useState<'books' | 'chapters' | 'reading'>('books');

  const handleSelectBook = (bookName: string) => {
    setSelectedBook(bookName);
    setView('chapters');
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    setView('reading');
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

  const getVerses = (): string[] => {
    if (!selectedBook || !selectedChapter) return [];
    const key = `${selectedBook} ${selectedChapter}`;
    if (SAMPLE_VERSES[key]) return SAMPLE_VERSES[key];
    
    // Generate placeholder verses for chapters without sample data
    return Array.from({ length: 20 }, (_, i) => 
      `This is verse ${i + 1} of ${selectedBook} chapter ${selectedChapter}. In a full implementation, this would contain the actual Scripture text from a Bible API.`
    );
  };

  const currentBook = BIBLE_BOOKS.find(b => b.name === selectedBook);
  const verses = getVerses();

  // Books View
  if (view === 'books') {
    const filteredBooks = BIBLE_BOOKS.filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const oldTestament = filteredBooks.filter(b => b.testament === 'old');
    const newTestament = filteredBooks.filter(b => b.testament === 'new');

    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6 animate-fade-in pb-24 relative z-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-emerald-600 mb-2 font-medium">
            <BookOpen size={18} />
            <span>Bible</span>
          </div>
          <h1 className="text-4xl font-serif text-stone-800 mb-2">Read Scripture</h1>
          <p className="text-stone-500 max-w-xl">
            "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
          </p>
        </header>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <h3 className="text-sm font-semibold text-stone-600 mb-3 flex items-center gap-2">
              <Bookmark size={14} /> Recent Bookmarks
            </h3>
            <div className="flex flex-wrap gap-2">
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
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm hover:bg-emerald-100 transition-colors"
                >
                  {bookmark.reference}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Old Testament */}
        <div>
          <h2 className="text-lg font-semibold text-stone-800 mb-3">Old Testament</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {oldTestament.map(book => (
              <button
                key={book.name}
                onClick={() => handleSelectBook(book.name)}
                className="p-3 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                <p className="font-medium text-stone-800 text-sm truncate">{book.name}</p>
                <p className="text-xs text-stone-400">{book.chapters} ch</p>
              </button>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div>
          <h2 className="text-lg font-semibold text-stone-800 mb-3">New Testament</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {newTestament.map(book => (
              <button
                key={book.name}
                onClick={() => handleSelectBook(book.name)}
                className="p-3 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all"
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

  // Reading View
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

        {/* Verses */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 md:p-8">
          <div className="space-y-4">
            {verses.map((verse, index) => (
              <div 
                key={index}
                className="group flex gap-3 hover:bg-emerald-50 -mx-2 px-2 py-1 rounded-lg transition-colors"
              >
                <span className="text-emerald-600 font-medium text-sm w-6 shrink-0 pt-1">
                  {index + 1}
                </span>
                <p className="text-stone-700 leading-relaxed font-serif flex-1">
                  {verse}
                </p>
                <button
                  onClick={() => handleCopyVerse(index, verse)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-emerald-600 transition-all"
                >
                  {copiedVerse === index ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>

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
