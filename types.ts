
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
  COVENANT = 'COVENANT'
}

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
