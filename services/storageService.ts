// Local Storage Service for Data Persistence
import { 
  PrayerLetter, 
  IntercessionItem, 
  VisionCard, 
  PivotStrategy, 
  PrayerSession,
  PrayerStreak,
  UserDevotionalProgress,
  CommunityPrayer,
  Testimony,
  FastingSession,
  PrayerReminder,
  BibleBookmark,
  BibleHighlight
} from '@/types';

const STORAGE_KEYS = {
  PRAYER_LETTERS: 'sanctum_prayer_letters',
  INTERCESSION_ITEMS: 'sanctum_intercession_items',
  VISION_CARDS: 'sanctum_vision_cards',
  PIVOT_STRATEGIES: 'sanctum_pivot_strategies',
  PRAYER_SESSIONS: 'sanctum_prayer_sessions',
  CALLINGS: 'sanctum_callings',
  TASKS: 'sanctum_tasks',
  LOVE_NOTES: 'sanctum_love_notes',
  PRAISE_PROGRESS: 'sanctum_praise_progress',
  USER_PREFERENCES: 'sanctum_user_preferences',
  // New keys for world-class features
  PRAYER_STREAK: 'sanctum_prayer_streak',
  DEVOTIONAL_PROGRESS: 'sanctum_devotional_progress',
  COMMUNITY_PRAYERS: 'sanctum_community_prayers',
  TESTIMONIES: 'sanctum_testimonies',
  FASTING_SESSIONS: 'sanctum_fasting_sessions',
  PRAYER_REMINDERS: 'sanctum_prayer_reminders',
  BIBLE_BOOKMARKS: 'sanctum_bible_bookmarks',
  BIBLE_HIGHLIGHTS: 'sanctum_bible_highlights',
};

// Generic storage helpers
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      const parsed = JSON.parse(item);
      // Handle date conversion for objects with date fields
      return parsed;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Prayer Letters
export const getPrayerLetters = (): PrayerLetter[] => {
  const letters = getItem<PrayerLetter[]>(STORAGE_KEYS.PRAYER_LETTERS, []);
  // Convert date strings back to Date objects
  return letters.map(letter => ({
    ...letter,
    createdAt: new Date(letter.createdAt),
    unlockDate: letter.unlockDate ? new Date(letter.unlockDate) : null,
  }));
};

export const savePrayerLetters = (letters: PrayerLetter[]): void => {
  setItem(STORAGE_KEYS.PRAYER_LETTERS, letters);
};

export const addPrayerLetter = (letter: PrayerLetter): void => {
  const letters = getPrayerLetters();
  savePrayerLetters([letter, ...letters]);
};

export const updatePrayerLetter = (id: string, updates: Partial<PrayerLetter>): void => {
  const letters = getPrayerLetters();
  const updated = letters.map(l => l.id === id ? { ...l, ...updates } : l);
  savePrayerLetters(updated);
};

// Intercession Items
export const getIntercessionItems = (): IntercessionItem[] => {
  const items = getItem<IntercessionItem[]>(STORAGE_KEYS.INTERCESSION_ITEMS, []);
  return items.map(item => ({
    ...item,
    lastPrayed: item.lastPrayed ? new Date(item.lastPrayed) : null,
  }));
};

export const saveIntercessionItems = (items: IntercessionItem[]): void => {
  setItem(STORAGE_KEYS.INTERCESSION_ITEMS, items);
};

export const addIntercessionItem = (item: IntercessionItem): void => {
  const items = getIntercessionItems();
  saveIntercessionItems([item, ...items]);
};

export const updateIntercessionItem = (id: string, updates: Partial<IntercessionItem>): void => {
  const items = getIntercessionItems();
  const updated = items.map(i => i.id === id ? { ...i, ...updates } : i);
  saveIntercessionItems(updated);
};

export const deleteIntercessionItem = (id: string): void => {
  const items = getIntercessionItems();
  saveIntercessionItems(items.filter(i => i.id !== id));
};

// Vision Cards
export const getVisionCards = (): VisionCard[] => {
  return getItem<VisionCard[]>(STORAGE_KEYS.VISION_CARDS, []);
};

export const saveVisionCards = (cards: VisionCard[]): void => {
  setItem(STORAGE_KEYS.VISION_CARDS, cards);
};

export const addVisionCard = (card: VisionCard): void => {
  const cards = getVisionCards();
  saveVisionCards([card, ...cards]);
};

export const deleteVisionCard = (id: string): void => {
  const cards = getVisionCards();
  saveVisionCards(cards.filter(c => c.id !== id));
};

// Pivot Strategies
export const getPivotStrategies = (): PivotStrategy[] => {
  return getItem<PivotStrategy[]>(STORAGE_KEYS.PIVOT_STRATEGIES, []);
};

export const savePivotStrategies = (strategies: PivotStrategy[]): void => {
  setItem(STORAGE_KEYS.PIVOT_STRATEGIES, strategies);
};

export const addPivotStrategy = (strategy: PivotStrategy): void => {
  const strategies = getPivotStrategies();
  savePivotStrategies([strategy, ...strategies]);
};

// Prayer Sessions (for analytics)
export const getPrayerSessions = (): PrayerSession[] => {
  return getItem<PrayerSession[]>(STORAGE_KEYS.PRAYER_SESSIONS, []);
};

export const savePrayerSession = (session: PrayerSession): void => {
  const sessions = getPrayerSessions();
  setItem(STORAGE_KEYS.PRAYER_SESSIONS, [session, ...sessions].slice(0, 100)); // Keep last 100
};

export const getWeeklyPrayerStats = (): { name: string; minutes: number }[] => {
  const sessions = getPrayerSessions();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekData = days.map((name, index) => {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + index);
    const dayStr = dayDate.toISOString().split('T')[0];
    
    const dayMinutes = sessions
      .filter(s => s.date === dayStr)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    
    return { name, minutes: dayMinutes };
  });

  return weekData;
};

export const getTotalWeeklyMinutes = (): number => {
  const stats = getWeeklyPrayerStats();
  return stats.reduce((sum, day) => sum + day.minutes, 0);
};

// Callings & Tasks (Purpose Aligner)
export const getCallings = (): string[] => {
  return getItem<string[]>(STORAGE_KEYS.CALLINGS, []);
};

export const saveCallings = (callings: string[]): void => {
  setItem(STORAGE_KEYS.CALLINGS, callings);
};

export const getTasks = (): string[] => {
  return getItem<string[]>(STORAGE_KEYS.TASKS, []);
};

export const saveTasks = (tasks: string[]): void => {
  setItem(STORAGE_KEYS.TASKS, tasks);
};

// Love Notes (Covenant)
export const getLoveNotes = (): string[] => {
  return getItem<string[]>(STORAGE_KEYS.LOVE_NOTES, []);
};

export const saveLoveNotes = (notes: string[]): void => {
  setItem(STORAGE_KEYS.LOVE_NOTES, notes);
};

export const addLoveNote = (note: string): void => {
  const notes = getLoveNotes();
  saveLoveNotes([note, ...notes]);
};

// Praise Progress
export const getPraiseProgress = (): { lastDeck: number; completedPraises: number[] } => {
  return getItem(STORAGE_KEYS.PRAISE_PROGRESS, { lastDeck: 0, completedPraises: [] });
};

export const savePraiseProgress = (progress: { lastDeck: number; completedPraises: number[] }): void => {
  setItem(STORAGE_KEYS.PRAISE_PROGRESS, progress);
};

// User Preferences
export interface UserPreferences {
  name: string;
  morningPrayerTime: string;
  eveningPrayerTime: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}

export const getDefaultPreferences = (): UserPreferences => ({
  name: 'Pilgrim',
  morningPrayerTime: '08:00',
  eveningPrayerTime: '21:00',
  notificationsEnabled: false,
  theme: 'light',
});

export const getUserPreferences = (): UserPreferences => {
  return getItem<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES, getDefaultPreferences());
};

export const saveUserPreferences = (prefs: UserPreferences): void => {
  setItem(STORAGE_KEYS.USER_PREFERENCES, prefs);
};

// Export all data (for backup)
export const exportAllData = (): string => {
  const data = {
    prayerLetters: getPrayerLetters(),
    intercessionItems: getIntercessionItems(),
    visionCards: getVisionCards(),
    pivotStrategies: getPivotStrategies(),
    prayerSessions: getPrayerSessions(),
    callings: getCallings(),
    tasks: getTasks(),
    loveNotes: getLoveNotes(),
    praiseProgress: getPraiseProgress(),
    userPreferences: getUserPreferences(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// ============================================
// NEW WORLD-CLASS FEATURES
// ============================================

// Prayer Streak System
export const getDefaultStreak = (): PrayerStreak => ({
  currentStreak: 0,
  longestStreak: 0,
  lastPrayerDate: null,
  totalPrayerDays: 0,
  milestones: [],
});

export const getPrayerStreak = (): PrayerStreak => {
  return getItem<PrayerStreak>(STORAGE_KEYS.PRAYER_STREAK, getDefaultStreak());
};

export const updatePrayerStreak = (): PrayerStreak => {
  const streak = getPrayerStreak();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (streak.lastPrayerDate === today) {
    return streak; // Already prayed today
  }
  
  let newStreak: PrayerStreak;
  
  if (streak.lastPrayerDate === yesterday) {
    // Continue streak
    newStreak = {
      ...streak,
      currentStreak: streak.currentStreak + 1,
      longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
      lastPrayerDate: today,
      totalPrayerDays: streak.totalPrayerDays + 1,
    };
  } else {
    // Start new streak
    newStreak = {
      ...streak,
      currentStreak: 1,
      lastPrayerDate: today,
      totalPrayerDays: streak.totalPrayerDays + 1,
    };
  }
  
  // Check milestones
  const milestoneTargets = [7, 14, 30, 60, 90, 180, 365];
  milestoneTargets.forEach(target => {
    if (newStreak.currentStreak >= target && !newStreak.milestones.includes(target)) {
      newStreak.milestones.push(target);
    }
  });
  
  setItem(STORAGE_KEYS.PRAYER_STREAK, newStreak);
  return newStreak;
};

// Devotional Progress
export const getDevotionalProgress = (): UserDevotionalProgress[] => {
  return getItem<UserDevotionalProgress[]>(STORAGE_KEYS.DEVOTIONAL_PROGRESS, []);
};

export const saveDevotionalProgress = (progress: UserDevotionalProgress[]): void => {
  setItem(STORAGE_KEYS.DEVOTIONAL_PROGRESS, progress);
};

export const startDevotionalPlan = (planId: string): void => {
  const progress = getDevotionalProgress();
  const existing = progress.find(p => p.planId === planId);
  if (!existing) {
    progress.push({
      planId,
      currentDay: 1,
      startDate: new Date().toISOString(),
      completedDays: [],
      isCompleted: false,
    });
    saveDevotionalProgress(progress);
  }
};

export const completeDevotionalDay = (planId: string, day: number, totalDays: number): void => {
  const progress = getDevotionalProgress();
  const planProgress = progress.find(p => p.planId === planId);
  if (planProgress && !planProgress.completedDays.includes(day)) {
    planProgress.completedDays.push(day);
    planProgress.currentDay = Math.min(day + 1, totalDays);
    planProgress.isCompleted = planProgress.completedDays.length >= totalDays;
    saveDevotionalProgress(progress);
  }
};

// Community Prayers (local simulation)
export const getCommunityPrayers = (): CommunityPrayer[] => {
  const prayers = getItem<CommunityPrayer[]>(STORAGE_KEYS.COMMUNITY_PRAYERS, []);
  return prayers.map(p => ({ ...p, createdAt: new Date(p.createdAt) }));
};

export const saveCommunityPrayers = (prayers: CommunityPrayer[]): void => {
  setItem(STORAGE_KEYS.COMMUNITY_PRAYERS, prayers);
};

export const addCommunityPrayer = (prayer: CommunityPrayer): void => {
  const prayers = getCommunityPrayers();
  saveCommunityPrayers([prayer, ...prayers]);
};

export const prayForCommunityPrayer = (id: string): void => {
  const prayers = getCommunityPrayers();
  const updated = prayers.map(p => p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p);
  saveCommunityPrayers(updated);
};

export const markPrayerAnswered = (id: string, testimony?: string): void => {
  const prayers = getCommunityPrayers();
  const updated = prayers.map(p => p.id === id ? { ...p, isAnswered: true, answeredTestimony: testimony } : p);
  saveCommunityPrayers(updated);
};

// Testimonies
export const getTestimonies = (): Testimony[] => {
  const testimonies = getItem<Testimony[]>(STORAGE_KEYS.TESTIMONIES, []);
  return testimonies.map(t => ({ ...t, date: new Date(t.date) }));
};

export const saveTestimonies = (testimonies: Testimony[]): void => {
  setItem(STORAGE_KEYS.TESTIMONIES, testimonies);
};

export const addTestimony = (testimony: Testimony): void => {
  const testimonies = getTestimonies();
  saveTestimonies([testimony, ...testimonies]);
};

export const deleteTestimony = (id: string): void => {
  const testimonies = getTestimonies();
  saveTestimonies(testimonies.filter(t => t.id !== id));
};

// Fasting Sessions
export const getFastingSessions = (): FastingSession[] => {
  const sessions = getItem<FastingSession[]>(STORAGE_KEYS.FASTING_SESSIONS, []);
  return sessions.map(s => ({
    ...s,
    startDate: new Date(s.startDate),
    endDate: new Date(s.endDate),
  }));
};

export const saveFastingSessions = (sessions: FastingSession[]): void => {
  setItem(STORAGE_KEYS.FASTING_SESSIONS, sessions);
};

export const addFastingSession = (session: FastingSession): void => {
  const sessions = getFastingSessions();
  saveFastingSessions([session, ...sessions]);
};

export const updateFastingSession = (id: string, updates: Partial<FastingSession>): void => {
  const sessions = getFastingSessions();
  const updated = sessions.map(s => s.id === id ? { ...s, ...updates } : s);
  saveFastingSessions(updated);
};

export const getActiveFast = (): FastingSession | null => {
  const sessions = getFastingSessions();
  const now = new Date();
  return sessions.find(s => !s.isCompleted && new Date(s.startDate) <= now && new Date(s.endDate) >= now) || null;
};

// Prayer Reminders
export const getPrayerReminders = (): PrayerReminder[] => {
  return getItem<PrayerReminder[]>(STORAGE_KEYS.PRAYER_REMINDERS, [
    { id: '1', time: '06:00', label: 'Morning Prayer', days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], isEnabled: true, type: 'morning' },
    { id: '2', time: '12:00', label: 'Midday Prayer', days: ['mon', 'tue', 'wed', 'thu', 'fri'], isEnabled: false, type: 'midday' },
    { id: '3', time: '21:00', label: 'Evening Prayer', days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], isEnabled: true, type: 'evening' },
  ]);
};

export const savePrayerReminders = (reminders: PrayerReminder[]): void => {
  setItem(STORAGE_KEYS.PRAYER_REMINDERS, reminders);
};

export const toggleReminder = (id: string): void => {
  const reminders = getPrayerReminders();
  const updated = reminders.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r);
  savePrayerReminders(updated);
};

// Bible Bookmarks & Highlights
export const getBibleBookmarks = (): BibleBookmark[] => {
  const bookmarks = getItem<BibleBookmark[]>(STORAGE_KEYS.BIBLE_BOOKMARKS, []);
  return bookmarks.map(b => ({ ...b, createdAt: new Date(b.createdAt) }));
};

export const saveBibleBookmarks = (bookmarks: BibleBookmark[]): void => {
  setItem(STORAGE_KEYS.BIBLE_BOOKMARKS, bookmarks);
};

export const addBibleBookmark = (bookmark: BibleBookmark): void => {
  const bookmarks = getBibleBookmarks();
  saveBibleBookmarks([bookmark, ...bookmarks]);
};

export const getBibleHighlights = (): BibleHighlight[] => {
  const highlights = getItem<BibleHighlight[]>(STORAGE_KEYS.BIBLE_HIGHLIGHTS, []);
  return highlights.map(h => ({ ...h, createdAt: new Date(h.createdAt) }));
};

export const saveBibleHighlights = (highlights: BibleHighlight[]): void => {
  setItem(STORAGE_KEYS.BIBLE_HIGHLIGHTS, highlights);
};

export const addBibleHighlight = (highlight: BibleHighlight): void => {
  const highlights = getBibleHighlights();
  saveBibleHighlights([highlight, ...highlights]);
};
