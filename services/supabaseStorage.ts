import { supabase } from '@/lib/supabase';
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

export interface UserPreferences {
  name: string;
  morningPrayerTime: string;
  eveningPrayerTime: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}

const getUserId = () => {
  const user = supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  return user;
};

export const getPrayerLetters = async (): Promise<PrayerLetter[]> => {
  const { data, error } = await supabase
    .from('prayer_letters')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching prayer letters:', error);
    return [];
  }

  return data.map(letter => ({
    ...letter,
    createdAt: new Date(letter.created_at),
    unlockDate: letter.unlock_date ? new Date(letter.unlock_date) : null,
  }));
};

export const addPrayerLetter = async (letter: Omit<PrayerLetter, 'id' | 'createdAt'>): Promise<void> => {
  const { error } = await supabase
    .from('prayer_letters')
    .insert([{
      title: letter.title,
      content: letter.content,
      unlock_date: letter.unlockDate?.toISOString(),
      is_answered: letter.isAnswered,
      status: letter.status,
      scripture_seal: letter.scriptureSeal,
    }]);

  if (error) {
    console.error('Error adding prayer letter:', error);
    throw error;
  }
};

export const updatePrayerLetter = async (id: string, updates: Partial<PrayerLetter>): Promise<void> => {
  const updateData: any = {};
  if (updates.title) updateData.title = updates.title;
  if (updates.content) updateData.content = updates.content;
  if (updates.unlockDate !== undefined) updateData.unlock_date = updates.unlockDate?.toISOString();
  if (updates.isAnswered !== undefined) updateData.is_answered = updates.isAnswered;
  if (updates.status) updateData.status = updates.status;
  if (updates.scriptureSeal !== undefined) updateData.scripture_seal = updates.scriptureSeal;
  updateData.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('prayer_letters')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating prayer letter:', error);
    throw error;
  }
};

export const getIntercessionItems = async (): Promise<IntercessionItem[]> => {
  const { data, error } = await supabase
    .from('intercession_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching intercession items:', error);
    return [];
  }

  return data.map(item => ({
    ...item,
    lastPrayed: item.last_prayed ? new Date(item.last_prayed) : null,
  }));
};

export const addIntercessionItem = async (item: Omit<IntercessionItem, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('intercession_items')
    .insert([{
      name: item.name,
      request: item.request,
      category: item.category,
      last_prayed: item.lastPrayed?.toISOString(),
    }]);

  if (error) {
    console.error('Error adding intercession item:', error);
    throw error;
  }
};

export const updateIntercessionItem = async (id: string, updates: Partial<IntercessionItem>): Promise<void> => {
  const updateData: any = { updated_at: new Date().toISOString() };
  if (updates.name) updateData.name = updates.name;
  if (updates.request) updateData.request = updates.request;
  if (updates.category) updateData.category = updates.category;
  if (updates.lastPrayed !== undefined) updateData.last_prayed = updates.lastPrayed?.toISOString();

  const { error } = await supabase
    .from('intercession_items')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating intercession item:', error);
    throw error;
  }
};

export const deleteIntercessionItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('intercession_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting intercession item:', error);
    throw error;
  }
};

export const getVisionCards = async (): Promise<VisionCard[]> => {
  const { data, error } = await supabase
    .from('vision_cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vision cards:', error);
    return [];
  }

  return data;
};

export const addVisionCard = async (card: Omit<VisionCard, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('vision_cards')
    .insert([{
      focus: card.focus,
      visual_keyword: card.visualKeyword,
      affirmation: card.affirmation,
      scripture: card.scripture,
      reference: card.reference,
    }]);

  if (error) {
    console.error('Error adding vision card:', error);
    throw error;
  }
};

export const deleteVisionCard = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('vision_cards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting vision card:', error);
    throw error;
  }
};

export const getPivotStrategies = async (): Promise<PivotStrategy[]> => {
  const { data, error } = await supabase
    .from('pivot_strategies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pivot strategies:', error);
    return [];
  }

  return data.map(strategy => ({
    ...strategy,
    interruptQuestion: strategy.interrupt_question,
    scriptureTruth: strategy.scripture_truth,
    microAction: strategy.micro_action,
  }));
};

export const addPivotStrategy = async (strategy: Omit<PivotStrategy, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('pivot_strategies')
    .insert([{
      habit: strategy.habit,
      trigger: strategy.trigger,
      interrupt_question: strategy.interruptQuestion,
      scripture_truth: strategy.scriptureTruth,
      micro_action: strategy.microAction,
    }]);

  if (error) {
    console.error('Error adding pivot strategy:', error);
    throw error;
  }
};

export const savePrayerSession = async (session: PrayerSession): Promise<void> => {
  const { error } = await supabase
    .from('prayer_sessions')
    .insert([{
      date: session.date,
      duration_minutes: session.durationMinutes,
      focus: session.focus,
    }]);

  if (error) {
    console.error('Error saving prayer session:', error);
    throw error;
  }
};

export const getPrayerSessions = async (): Promise<PrayerSession[]> => {
  const { data, error } = await supabase
    .from('prayer_sessions')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching prayer sessions:', error);
    return [];
  }

  return data.map(session => ({
    date: session.date,
    durationMinutes: session.duration_minutes,
    focus: session.focus,
  }));
};

export const getWeeklyPrayerStats = async (): Promise<{ name: string; minutes: number }[]> => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const { data, error } = await supabase
    .from('prayer_sessions')
    .select('date, duration_minutes')
    .gte('date', weekStart.toISOString().split('T')[0])
    .lt('date', weekEnd.toISOString().split('T')[0]);

  if (error) {
    console.error('Error fetching weekly stats:', error);
    return days.map(name => ({ name, minutes: 0 }));
  }

  return days.map((name, index) => {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + index);
    const dayStr = dayDate.toISOString().split('T')[0];

    const dayMinutes = data
      .filter(s => s.date === dayStr)
      .reduce((sum, s) => sum + s.duration_minutes, 0);

    return { name, minutes: dayMinutes };
  });
};

export const getTotalWeeklyMinutes = async (): Promise<number> => {
  const stats = await getWeeklyPrayerStats();
  return stats.reduce((sum, day) => sum + day.minutes, 0);
};

export const getPrayerStreak = async (): Promise<PrayerStreak> => {
  const { data, error } = await supabase
    .from('prayer_streaks')
    .select('*')
    .single();

  if (error || !data) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPrayerDate: null,
      totalPrayerDays: 0,
      milestones: [],
    };
  }

  return {
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastPrayerDate: data.last_prayer_date,
    totalPrayerDays: data.total_prayer_days,
    milestones: data.milestones,
  };
};

export const updatePrayerStreak = async (): Promise<PrayerStreak> => {
  const streak = await getPrayerStreak();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (streak.lastPrayerDate === today) {
    return streak;
  }

  let newStreak: PrayerStreak;

  if (streak.lastPrayerDate === yesterday) {
    newStreak = {
      ...streak,
      currentStreak: streak.currentStreak + 1,
      longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
      lastPrayerDate: today,
      totalPrayerDays: streak.totalPrayerDays + 1,
    };
  } else {
    newStreak = {
      ...streak,
      currentStreak: 1,
      lastPrayerDate: today,
      totalPrayerDays: streak.totalPrayerDays + 1,
    };
  }

  const milestoneTargets = [7, 14, 30, 60, 90, 180, 365];
  milestoneTargets.forEach(target => {
    if (newStreak.currentStreak >= target && !newStreak.milestones.includes(target)) {
      newStreak.milestones.push(target);
    }
  });

  const { error } = await supabase
    .from('prayer_streaks')
    .upsert({
      current_streak: newStreak.currentStreak,
      longest_streak: newStreak.longestStreak,
      last_prayer_date: newStreak.lastPrayerDate,
      total_prayer_days: newStreak.totalPrayerDays,
      milestones: newStreak.milestones,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error updating prayer streak:', error);
  }

  return newStreak;
};

export const getDevotionalProgress = async (): Promise<UserDevotionalProgress[]> => {
  const { data, error } = await supabase
    .from('devotional_progress')
    .select('*');

  if (error) {
    console.error('Error fetching devotional progress:', error);
    return [];
  }

  return data.map(progress => ({
    planId: progress.plan_id,
    currentDay: progress.current_day,
    startDate: progress.start_date,
    completedDays: progress.completed_days,
    isCompleted: progress.is_completed,
  }));
};

export const startDevotionalPlan = async (planId: string): Promise<void> => {
  const { error } = await supabase
    .from('devotional_progress')
    .insert([{
      plan_id: planId,
      current_day: 1,
      start_date: new Date().toISOString().split('T')[0],
      completed_days: [],
      is_completed: false,
    }]);

  if (error && !error.message.includes('duplicate')) {
    console.error('Error starting devotional plan:', error);
    throw error;
  }
};

export const completeDevotionalDay = async (planId: string, day: number, totalDays: number): Promise<void> => {
  const progress = await getDevotionalProgress();
  const planProgress = progress.find(p => p.planId === planId);

  if (planProgress && !planProgress.completedDays.includes(day)) {
    const newCompletedDays = [...planProgress.completedDays, day];
    const isCompleted = newCompletedDays.length >= totalDays;

    const { error } = await supabase
      .from('devotional_progress')
      .update({
        completed_days: newCompletedDays,
        current_day: Math.min(day + 1, totalDays),
        is_completed: isCompleted,
        updated_at: new Date().toISOString(),
      })
      .eq('plan_id', planId);

    if (error) {
      console.error('Error completing devotional day:', error);
      throw error;
    }
  }
};

export const getCommunityPrayers = async (): Promise<CommunityPrayer[]> => {
  const { data, error } = await supabase
    .from('community_prayers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching community prayers:', error);
    return [];
  }

  return data.map(prayer => ({
    ...prayer,
    isAnonymous: prayer.is_anonymous,
    authorName: prayer.author_name,
    prayerCount: prayer.prayer_count,
    isAnswered: prayer.is_answered,
    answeredTestimony: prayer.answered_testimony,
    createdAt: new Date(prayer.created_at),
  }));
};

export const addCommunityPrayer = async (prayer: Omit<CommunityPrayer, 'id' | 'createdAt' | 'prayerCount'>): Promise<void> => {
  const { error } = await supabase
    .from('community_prayers')
    .insert([{
      request: prayer.request,
      category: prayer.category,
      is_anonymous: prayer.isAnonymous,
      author_name: prayer.authorName,
      prayer_count: 0,
      is_answered: prayer.isAnswered,
      answered_testimony: prayer.answeredTestimony,
    }]);

  if (error) {
    console.error('Error adding community prayer:', error);
    throw error;
  }
};

export const prayForCommunityPrayer = async (id: string): Promise<void> => {
  const { data, error } = await supabase
    .from('community_prayers')
    .select('prayer_count')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching prayer count:', error);
    return;
  }

  const { error: updateError } = await supabase
    .from('community_prayers')
    .update({ prayer_count: (data.prayer_count || 0) + 1 })
    .eq('id', id);

  if (updateError) {
    console.error('Error incrementing prayer count:', error);
  }
};

export const markPrayerAnswered = async (id: string, testimony?: string): Promise<void> => {
  const { error } = await supabase
    .from('community_prayers')
    .update({
      is_answered: true,
      answered_testimony: testimony,
    })
    .eq('id', id);

  if (error) {
    console.error('Error marking prayer as answered:', error);
    throw error;
  }
};

export const getTestimonies = async (): Promise<Testimony[]> => {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching testimonies:', error);
    return [];
  }

  return data.map(testimony => ({
    ...testimony,
    relatedScripture: testimony.related_scripture,
    date: new Date(testimony.date),
  }));
};

export const addTestimony = async (testimony: Omit<Testimony, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('testimonies')
    .insert([{
      title: testimony.title,
      story: testimony.story,
      category: testimony.category,
      date: testimony.date.toISOString().split('T')[0],
      related_scripture: testimony.relatedScripture,
      tags: testimony.tags,
    }]);

  if (error) {
    console.error('Error adding testimony:', error);
    throw error;
  }
};

export const deleteTestimony = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('testimonies')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimony:', error);
    throw error;
  }
};

export const getFastingSessions = async (): Promise<FastingSession[]> => {
  const { data, error } = await supabase
    .from('fasting_sessions')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching fasting sessions:', error);
    return [];
  }

  return data.map(session => ({
    ...session,
    customDescription: session.custom_description,
    startDate: new Date(session.start_date),
    endDate: new Date(session.end_date),
    dailyReflections: session.daily_reflections,
    isCompleted: session.is_completed,
  }));
};

export const addFastingSession = async (session: Omit<FastingSession, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('fasting_sessions')
    .insert([{
      type: session.type,
      custom_description: session.customDescription,
      start_date: session.startDate.toISOString().split('T')[0],
      end_date: session.endDate.toISOString().split('T')[0],
      purpose: session.purpose,
      scripture: session.scripture,
      daily_reflections: session.dailyReflections,
      is_completed: session.isCompleted,
    }]);

  if (error) {
    console.error('Error adding fasting session:', error);
    throw error;
  }
};

export const updateFastingSession = async (id: string, updates: Partial<FastingSession>): Promise<void> => {
  const updateData: any = {};
  if (updates.type) updateData.type = updates.type;
  if (updates.customDescription !== undefined) updateData.custom_description = updates.customDescription;
  if (updates.startDate) updateData.start_date = updates.startDate.toISOString().split('T')[0];
  if (updates.endDate) updateData.end_date = updates.endDate.toISOString().split('T')[0];
  if (updates.purpose) updateData.purpose = updates.purpose;
  if (updates.scripture) updateData.scripture = updates.scripture;
  if (updates.dailyReflections) updateData.daily_reflections = updates.dailyReflections;
  if (updates.isCompleted !== undefined) updateData.is_completed = updates.isCompleted;

  const { error } = await supabase
    .from('fasting_sessions')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating fasting session:', error);
    throw error;
  }
};

export const getActiveFast = async (): Promise<FastingSession | null> => {
  const sessions = await getFastingSessions();
  const now = new Date();
  return sessions.find(s => !s.isCompleted && s.startDate <= now && s.endDate >= now) || null;
};

export const getUserPreferences = async (): Promise<UserPreferences> => {
  const { data: profileData } = await supabase
    .from('profiles')
    .select('name')
    .single();

  const { data: prefsData } = await supabase
    .from('user_preferences')
    .select('*')
    .single();

  return {
    name: profileData?.name || 'Pilgrim',
    morningPrayerTime: prefsData?.morning_prayer_time || '08:00',
    eveningPrayerTime: prefsData?.evening_prayer_time || '21:00',
    notificationsEnabled: prefsData?.notifications_enabled || false,
    theme: prefsData?.theme || 'light',
  };
};

export const saveUserPreferences = async (prefs: UserPreferences): Promise<void> => {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name: prefs.name, updated_at: new Date().toISOString() })
    .eq('id', (await supabase.auth.getUser()).data.user?.id);

  if (profileError) {
    console.error('Error updating profile:', profileError);
  }

  const { error: prefsError } = await supabase
    .from('user_preferences')
    .update({
      morning_prayer_time: prefs.morningPrayerTime,
      evening_prayer_time: prefs.eveningPrayerTime,
      notifications_enabled: prefs.notificationsEnabled,
      theme: prefs.theme,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (prefsError) {
    console.error('Error updating preferences:', prefsError);
  }
};

export const getBibleBookmarks = async (): Promise<BibleBookmark[]> => {
  const { data, error } = await supabase
    .from('bible_bookmarks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bible bookmarks:', error);
    return [];
  }

  return data.map(bookmark => ({
    ...bookmark,
    createdAt: new Date(bookmark.created_at),
  }));
};

export const addBibleBookmark = async (bookmark: Omit<BibleBookmark, 'id' | 'createdAt'>): Promise<void> => {
  const { error } = await supabase
    .from('bible_bookmarks')
    .insert([{
      reference: bookmark.reference,
      note: bookmark.note,
    }]);

  if (error) {
    console.error('Error adding bible bookmark:', error);
    throw error;
  }
};

export const getBibleHighlights = async (): Promise<BibleHighlight[]> => {
  const { data, error } = await supabase
    .from('bible_highlights')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bible highlights:', error);
    return [];
  }

  return data.map(highlight => ({
    ...highlight,
    createdAt: new Date(highlight.created_at),
  }));
};

export const addBibleHighlight = async (highlight: Omit<BibleHighlight, 'id' | 'createdAt'>): Promise<void> => {
  const { error } = await supabase
    .from('bible_highlights')
    .insert([{
      reference: highlight.reference,
      text: highlight.text,
      color: highlight.color,
    }]);

  if (error) {
    console.error('Error adding bible highlight:', error);
    throw error;
  }
};
