import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Save, Check, Flame, Clock, Trophy, LogOut } from 'lucide-react';
import { getUserPreferences, saveUserPreferences, UserPreferences, getPrayerStreak } from '@/services/supabaseStorage';
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: 'Pilgrim',
    morningPrayerTime: '08:00',
    eveningPrayerTime: '21:00',
    notificationsEnabled: false,
    theme: 'light'
  });
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastPrayerDate: null, totalPrayerDays: 0, milestones: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prefs, streakData] = await Promise.all([
          getUserPreferences(),
          getPrayerStreak()
        ]);
        setPreferences(prefs);
        setStreak(streakData);
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await saveUserPreferences(preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const getMilestoneProgress = () => {
    const milestones = [7, 14, 30, 60, 90, 180, 365];
    const current = streak.currentStreak;
    const nextMilestone = milestones.find(m => m > current) || 365;
    const prevMilestone = milestones.filter(m => m <= current).pop() || 0;
    const progress = ((current - prevMilestone) / (nextMilestone - prevMilestone)) * 100;
    return { nextMilestone, progress: Math.min(progress, 100) };
  };

  const { nextMilestone, progress } = getMilestoneProgress();

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <SettingsIcon className="text-white" size={32} />
          </div>
          <p className="text-stone-600 font-serif">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-10 pb-24 animate-fade-in">
      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2 flex items-center gap-3">
          <SettingsIcon className="text-gold-600" size={24} /> Settings
        </h2>
        <p className="text-stone-500 text-sm md:text-base">
          Customize your spiritual journey experience.
        </p>
      </div>

      {/* Success Messages */}
      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-slide-down">
          <Check size={18} /> Settings saved successfully!
        </div>
      )}

      <div className="space-y-8">
        {/* Prayer Streak Section */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg overflow-hidden text-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Flame size={28} className="text-yellow-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Prayer Streak</h3>
                  <p className="text-orange-100 text-sm">Keep the flame burning!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-serif">{streak.currentStreak}</p>
                <p className="text-orange-100 text-sm">days</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Trophy size={18} className="mx-auto mb-1 text-yellow-200" />
                <p className="text-2xl font-serif">{streak.longestStreak}</p>
                <p className="text-xs text-orange-100">Best Streak</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Clock size={18} className="mx-auto mb-1 text-yellow-200" />
                <p className="text-2xl font-serif">{streak.totalPrayerDays}</p>
                <p className="text-xs text-orange-100">Total Days</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Flame size={18} className="mx-auto mb-1 text-yellow-200" />
                <p className="text-2xl font-serif">{streak.milestones.length}</p>
                <p className="text-xs text-orange-100">Milestones</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to {nextMilestone} days</span>
                <span>{streak.currentStreak}/{nextMilestone}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-300 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              <User size={18} /> Profile
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={preferences.name}
                onChange={(e) => setPreferences({ ...preferences, name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                placeholder="Enter your name"
              />
              <p className="text-xs text-stone-400 mt-1">This will be used in greetings throughout the app.</p>
            </div>
          </div>
        </div>


        {/* Prayer Schedule Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              <Clock size={18} /> Prayer Schedule
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Morning Prayer Time
                </label>
                <input
                  type="time"
                  value={preferences.morningPrayerTime}
                  onChange={(e) => setPreferences({ ...preferences, morningPrayerTime: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Evening Prayer Time
                </label>
                <input
                  type="time"
                  value={preferences.eveningPrayerTime}
                  onChange={(e) => setPreferences({ ...preferences, eveningPrayerTime: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                />
              </div>
            </div>
            <p className="text-xs text-stone-400">Set your preferred prayer times for the liturgy clock.</p>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              <User size={18} /> Account
            </h3>
          </div>
          <div className="p-6">
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-3 rounded-lg transition-colors"
            >
              <LogOut size={18} /> Sign Out
            </button>
            <p className="text-xs text-stone-400 mt-2 text-center">
              You'll be redirected to the landing page
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-stone-900 hover:bg-gold-600 text-white py-4 rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Save size={18} /> Save Settings
        </button>
      </div>

    </div>
  );
};

export default Settings;
