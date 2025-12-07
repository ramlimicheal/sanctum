

export enum ACTSStep {
  ADORATION = 'Adoration',
  CONFESSION = 'Confession',
  THANKSGIVING = 'Thanksgiving',
  SUPPLICATION = 'Supplication'
}

export interface IntercessionItem {
  id: string;
  name: string;
  request: string;
  lastPrayed: Date | null;
  category: 'Health' | 'Family' | 'Salvation' | 'Guidance' | 'General';
}

export interface ScriptureWeaveResult {
  verseText: string;
  reference: string;
  prayer: string;
}

export interface SpiritualPrescription {
  emotion: string;
  diagnosis: string;
  verses: { text: string; reference: string }[];
  insight: string; // The "Micro-Sermon"
}

export interface PrayerSession {
  date: string; // ISO date
  durationMinutes: number;
  focus: string;
}

export interface PrayerLetter {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  unlockDate: Date | null; // If null, it's readable immediately
  isAnswered: boolean;
  scriptureSeal?: ScriptureWeaveResult; // The AI component
  status: 'draft' | 'sealed' | 'opened';
}

export interface VisionCard {
  id: string;
  focus: string;
  visualKeyword: string; // e.g., "mountain", "ocean", "shield"
  affirmation: string;
  scripture: string;
  reference: string;
}

export interface TaskAlignment {
  task: string;
  status: 'aligned' | 'neutral' | 'drift';
  reason: string;
}

export interface AlignmentResult {
  score: number; // 0-100
  feedback: string;
  analysis: TaskAlignment[];
}

export interface PivotStrategy {
  id: string;
  habit: string;
  trigger: string;
  interruptQuestion: string; // The "Stop"
  scriptureTruth: { text: string; reference: string }; // The "Truth"
  microAction: string; // The "Action"
}

export interface PeaceResponse {
  originalEmotion: string;
  validation: string; // "It is understandable you feel hurt..."
  reframedScript: string; // The "soft startup" script
  biblicalPrinciple: string; // "A gentle answer turns away wrath..."
}

// New Types for World-Class Features

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  ARCHITECT = 'ARCHITECT',
  LETTERS = 'LETTERS',
  INTERCESSION = 'INTERCESSION',
  PRAISE = 'PRAISE',
  REFLECT = 'REFLECT',
  VISION = 'VISION',
  ALIGNMENT = 'ALIGNMENT',
  PIVOT = 'PIVOT',
  COVENANT = 'COVENANT',
  JOURNAL = 'JOURNAL',
  SETTINGS = 'SETTINGS',
  DEVOTIONAL = 'DEVOTIONAL',
  COMMUNITY = 'COMMUNITY',
  TESTIMONY = 'TESTIMONY',
  FASTING = 'FASTING',
  BIBLE = 'BIBLE'
}

// Prayer Streaks & Gamification
export interface PrayerStreak {
  currentStreak: number;
  longestStreak: number;
  lastPrayerDate: string | null;
  totalPrayerDays: number;
  milestones: number[]; // Days achieved (7, 30, 90, 365)
}

// Devotional Reading Plans
export interface DevotionalPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // days
  category: 'faith' | 'prayer' | 'character' | 'relationships' | 'purpose' | 'healing';
  coverImage: string;
  days: DevotionalDay[];
}

export interface DevotionalDay {
  day: number;
  title: string;
  scripture: { text: string; reference: string };
  reflection: string;
  prayer: string;
  actionStep: string;
}

export interface UserDevotionalProgress {
  planId: string;
  currentDay: number;
  startDate: string;
  completedDays: number[];
  isCompleted: boolean;
}

// Community Prayer Wall
export interface CommunityPrayer {
  id: string;
  request: string;
  category: 'healing' | 'provision' | 'guidance' | 'salvation' | 'gratitude' | 'other';
  isAnonymous: boolean;
  authorName?: string;
  createdAt: Date;
  prayerCount: number;
  isAnswered: boolean;
  answeredTestimony?: string;
}

// Testimony Journal
export interface Testimony {
  id: string;
  title: string;
  story: string;
  category: 'answered_prayer' | 'healing' | 'provision' | 'breakthrough' | 'transformation' | 'miracle';
  date: Date;
  relatedScripture?: { text: string; reference: string };
  tags: string[];
}

// Fasting Tracker
export interface FastingSession {
  id: string;
  type: 'daniel' | 'water' | 'intermittent' | 'media' | 'custom';
  customDescription?: string;
  startDate: Date;
  endDate: Date;
  purpose: string;
  scripture: { text: string; reference: string };
  dailyReflections: { date: string; reflection: string; completed: boolean }[];
  isCompleted: boolean;
}

// Prayer Reminders
export interface PrayerReminder {
  id: string;
  time: string; // HH:MM format
  label: string;
  days: ('sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat')[];
  isEnabled: boolean;
  type: 'morning' | 'midday' | 'evening' | 'custom';
}

// Bible Reading
export interface BibleBookmark {
  id: string;
  reference: string;
  note?: string;
  createdAt: Date;
}

export interface BibleHighlight {
  id: string;
  reference: string;
  text: string;
  color: 'gold' | 'green' | 'blue' | 'purple' | 'red';
  createdAt: Date;
}
