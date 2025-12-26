interface BibleVerse {
  text: string;
  reference: string;
}

interface BibleBook {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;

class BibleService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private baseUrl = 'https://api.scripture.api.bible/v1';
  private bibleId = 'de4e12af7f28f599-02'; // ESV translation

  private getApiKey(): string {
    return import.meta.env.VITE_BIBLE_API_KEY || '';
  }

  private getCacheKey(reference: string): string {
    return `bible_${reference.toLowerCase().replace(/\s+/g, '_')}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  async getVerse(reference: string): Promise<BibleVerse | null> {
    try {
      const cacheKey = this.getCacheKey(reference);
      const cached = this.cache.get(cacheKey);

      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.data;
      }

      const apiKey = this.getApiKey();
      if (!apiKey) {
        return this.getFallbackVerse(reference);
      }

      const response = await fetch(
        `${this.baseUrl}/bibles/${this.bibleId}/search?query=${encodeURIComponent(reference)}`,
        {
          headers: { 'api-key': apiKey }
        }
      );

      if (!response.ok) {
        return this.getFallbackVerse(reference);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const verse: BibleVerse = {
          text: data.results[0].text,
          reference: reference
        };
        this.cache.set(cacheKey, { data: verse, timestamp: Date.now() });
        return verse;
      }

      return this.getFallbackVerse(reference);
    } catch (error) {
      console.error('Error fetching verse:', error);
      return this.getFallbackVerse(reference);
    }
  }

  async searchVerses(query: string): Promise<BibleVerse[]> {
    try {
      const apiKey = this.getApiKey();
      if (!apiKey) {
        return [];
      }

      const response = await fetch(
        `${this.baseUrl}/bibles/${this.bibleId}/search?query=${encodeURIComponent(query)}`,
        {
          headers: { 'api-key': apiKey }
        }
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return (data.results || []).map((result: any) => ({
        text: result.text,
        reference: result.reference
      }));
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }

  private getFallbackVerse(reference: string): BibleVerse | null {
    const fallbackVerses: Record<string, string> = {
      'psalm 23': 'The LORD is my shepherd; I shall not want. He makes me lie down in green pastures; he leads me beside still waters.',
      'john 3:16': 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      'proverbs 3:5': 'Trust in the LORD with all your heart and lean not on your own understanding.',
      'jeremiah 29:11': 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
      'romans 8:28': 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      'philippians 4:6': 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
      'matthew 11:28': 'Come to me, all you who are weary and burdened, and I will give you rest.',
      'psalm 46:10': 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    };

    const key = reference.toLowerCase();
    const text = fallbackVerses[key];
    return text ? { text, reference } : null;
  }
}

export const bibleService = new BibleService();

export type { BibleVerse, BibleBook };
