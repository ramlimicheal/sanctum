import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Download, Trash2, Save, Check, AlertTriangle, X, Flame, Clock, Trophy, LogOut } from 'lucide-react';
import { getUserPreferences, saveUserPreferences, exportAllData, clearAllData, UserPreferences, getPrayerStreak, getPrayerReminders, savePrayerReminders, toggleReminder } from '@/services/storageService';
import { PrayerReminder } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { signOut } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(getUserPreferences());
  const [saved, setSaved] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [streak, setStreak] = useState(getPrayerStreak());
  const [reminders, setReminders] = useState<PrayerReminder[]>(getPrayerReminders());

  const handleSave = () => {
    saveUserPreferences(preferences);
    savePrayerReminders(reminders);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleReminder = (id: string) => {
    const updated = reminders.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r);
    setReminders(updated);
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theolyte-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    clearAllData();
    setShowClearConfirm(false);
    setCleared(true);
    setPreferences(getUserPreferences());
    setStreak(getPrayerStreak());
    setTimeout(() => setCleared(false), 3000);
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

      {cleared && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-slide-down">
          <Check size={18} /> All data has been cleared. Starting fresh!
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

        {/* Prayer Times Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              <Bell size={18} /> Prayer Reminders
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {reminders.map(reminder => (
              <div key={reminder.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    reminder.isEnabled ? 'bg-amber-100 text-amber-600' : 'bg-stone-200 text-stone-400'
                  }`}>
                    <Bell size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{reminder.label}</p>
                    <p className="text-sm text-stone-500">{reminder.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleReminder(reminder.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    reminder.isEnabled ? 'bg-amber-500' : 'bg-stone-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    reminder.isEnabled ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
            <p className="text-xs text-stone-400">
              Note: Browser notifications require permission. Click "Allow" when prompted.
            </p>
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

        {/* Data Management Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              <Download size={18} /> Data Management
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-3 rounded-lg transition-colors"
              >
                <Download size={18} /> Export All Data
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-lg transition-colors"
              >
                <Trash2 size={18} /> Clear All Data
              </button>
            </div>
            <p className="text-xs text-stone-400">
              Export your data for backup or clear all stored data to start fresh.
            </p>
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

      {/* Clear Data Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900">Clear All Data?</h3>
                <p className="text-sm text-stone-500">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-stone-600 mb-6">
              This will permanently delete all your prayer letters, intercession requests, vision cards, and other saved data. Consider exporting your data first.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
