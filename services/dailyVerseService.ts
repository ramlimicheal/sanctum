// Daily Verse Service - Provides a rotating verse of the day

interface DailyVerse {
  text: string;
  reference: string;
}

const VERSES: DailyVerse[] = [
  { text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.", reference: "Psalm 23:1-2" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.", reference: "Jeremiah 29:11" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you.", reference: "Joshua 1:9" },
  { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  { text: "The Lord is my light and my salvation—whom shall I fear?", reference: "Psalm 27:1" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.", reference: "Philippians 4:6" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18" },
  { text: "For God so loved the world that he gave his one and only Son.", reference: "John 3:16" },
  { text: "And we know that in all things God works for the good of those who love him.", reference: "Romans 8:28" },
  { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives.", reference: "John 14:27" },
  { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10" },
  { text: "Delight yourself in the Lord, and he will give you the desires of your heart.", reference: "Psalm 37:4" },
  { text: "He heals the brokenhearted and binds up their wounds.", reference: "Psalm 147:3" },
  { text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.", reference: "Psalm 18:2" },
  { text: "Be still, and know that I am God.", reference: "Psalm 46:10" },
  { text: "Draw near to God, and he will draw near to you.", reference: "James 4:8" },
  { text: "The steadfast love of the Lord never ceases; his mercies never come to an end.", reference: "Lamentations 3:22" },
  { text: "For where two or three gather in my name, there am I with them.", reference: "Matthew 18:20" },
  { text: "The Lord bless you and keep you; the Lord make his face shine on you.", reference: "Numbers 6:24-25" },
  { text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.", reference: "Psalm 51:10" },
  { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105" },
  { text: "The Lord is gracious and compassionate, slow to anger and rich in love.", reference: "Psalm 145:8" },
  { text: "Seek first his kingdom and his righteousness, and all these things will be given to you.", reference: "Matthew 6:33" },
  { text: "Great is our Lord and mighty in power; his understanding has no limit.", reference: "Psalm 147:5" },
  { text: "The Lord your God is with you, the Mighty Warrior who saves.", reference: "Zephaniah 3:17" },
  { text: "Blessed are the pure in heart, for they will see God.", reference: "Matthew 5:8" },
  { text: "This is the day the Lord has made; let us rejoice and be glad in it.", reference: "Psalm 118:24" },
];

// Get verse based on day of year for consistency
export const getDailyVerse = (): DailyVerse => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  return VERSES[dayOfYear % VERSES.length];
};

// Get a random verse (for refresh functionality)
export const getRandomVerse = (): DailyVerse => {
  return VERSES[Math.floor(Math.random() * VERSES.length)];
};

// Get verse by category (future enhancement)
export const getVerseByMood = (mood: 'anxious' | 'grateful' | 'seeking' | 'weary'): DailyVerse => {
  const moodVerses: Record<string, DailyVerse[]> = {
    anxious: [
      { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" },
      { text: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.", reference: "Philippians 4:6" },
      { text: "Peace I leave with you; my peace I give you.", reference: "John 14:27" },
    ],
    grateful: [
      { text: "Give thanks to the Lord, for he is good; his love endures forever.", reference: "Psalm 107:1" },
      { text: "This is the day the Lord has made; let us rejoice and be glad in it.", reference: "Psalm 118:24" },
      { text: "The steadfast love of the Lord never ceases; his mercies never come to an end.", reference: "Lamentations 3:22" },
    ],
    seeking: [
      { text: "Draw near to God, and he will draw near to you.", reference: "James 4:8" },
      { text: "Seek first his kingdom and his righteousness.", reference: "Matthew 6:33" },
      { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105" },
    ],
    weary: [
      { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
      { text: "But those who hope in the Lord will renew their strength.", reference: "Isaiah 40:31" },
      { text: "The Lord is close to the brokenhearted.", reference: "Psalm 34:18" },
    ],
  };

  const verses = moodVerses[mood] || VERSES;
  return verses[Math.floor(Math.random() * verses.length)];
};
