/*
  # Spiritual Features Tables

  ## Overview
  This migration creates tables for advanced spiritual features including vision boards,
  habit breaking strategies, testimonies, fasting tracking, devotional plans, community prayers,
  and Bible study features.

  ## New Tables Created

  ### 1. `vision_cards`
  Vision board items for spiritual goals
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `focus` (text) - Spiritual focus/goal
  - `visual_keyword` (text) - Image search keyword
  - `affirmation` (text) - Biblical affirmation
  - `scripture` (text) - Supporting scripture text
  - `reference` (text) - Scripture reference
  - `created_at` (timestamptz)

  ### 2. `pivot_strategies`
  Habit breaking and pattern interrupt strategies
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `habit` (text) - Habit to break
  - `trigger` (text) - What triggers the habit
  - `interrupt_question` (text) - Question to stop autopilot
  - `scripture_truth` (jsonb) - Counter-acting scripture
  - `micro_action` (text) - Physical action to change state
  - `created_at` (timestamptz)

  ### 3. `testimonies`
  Personal testimonies and answered prayers
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `title` (text) - Testimony title
  - `story` (text) - Testimony content
  - `category` (text) - Type of testimony
  - `date` (date) - When event occurred
  - `related_scripture` (jsonb, nullable) - Related scripture
  - `tags` (text[]) - Searchable tags
  - `created_at` (timestamptz)

  ### 4. `fasting_sessions`
  Fasting commitment tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `type` (text) - Type of fast
  - `custom_description` (text, nullable) - Custom fast details
  - `start_date` (date) - Fast start date
  - `end_date` (date) - Fast end date
  - `purpose` (text) - Purpose of fast
  - `scripture` (jsonb) - Guiding scripture
  - `daily_reflections` (jsonb[]) - Daily reflection entries
  - `is_completed` (boolean) - Whether fast is complete
  - `created_at` (timestamptz)

  ### 5. `devotional_progress`
  User progress through devotional reading plans
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `plan_id` (text) - Devotional plan identifier
  - `current_day` (integer) - Current day in plan
  - `start_date` (date) - When user started plan
  - `completed_days` (integer[]) - Array of completed day numbers
  - `is_completed` (boolean) - Whether plan is finished
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `community_prayers`
  Shared prayer requests on community wall
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `request` (text) - Prayer request text
  - `category` (text) - Request category
  - `is_anonymous` (boolean) - Whether to hide author
  - `author_name` (text, nullable) - Display name if not anonymous
  - `prayer_count` (integer) - Number of prayers received
  - `is_answered` (boolean) - Whether prayer was answered
  - `answered_testimony` (text, nullable) - Testimony of answer
  - `created_at` (timestamptz)

  ### 7. `prayer_reminders`
  User-configured prayer reminder times
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `time` (text) - Time in HH:MM format
  - `label` (text) - Reminder label
  - `days` (text[]) - Days of week
  - `is_enabled` (boolean) - Whether reminder is active
  - `type` (text) - Reminder type
  - `created_at` (timestamptz)

  ### 8. `bible_bookmarks`
  Saved Bible passages
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `reference` (text) - Bible reference
  - `note` (text, nullable) - User note
  - `created_at` (timestamptz)

  ### 9. `bible_highlights`
  Highlighted Bible verses with colors
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `reference` (text) - Bible reference
  - `text` (text) - Verse text
  - `color` (text) - Highlight color
  - `created_at` (timestamptz)

  ## Security
  - All tables have Row Level Security enabled
  - Users can only access their own data
  - Community prayers have special SELECT policy for all authenticated users
  - Comprehensive policies for SELECT, INSERT, UPDATE, DELETE operations
*/

-- Create vision_cards table
CREATE TABLE IF NOT EXISTS vision_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  focus text NOT NULL,
  visual_keyword text NOT NULL,
  affirmation text NOT NULL,
  scripture text NOT NULL,
  reference text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vision_cards_user_id ON vision_cards(user_id);

ALTER TABLE vision_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vision cards"
  ON vision_cards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vision cards"
  ON vision_cards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own vision cards"
  ON vision_cards FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create pivot_strategies table
CREATE TABLE IF NOT EXISTS pivot_strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  habit text NOT NULL,
  trigger text NOT NULL,
  interrupt_question text NOT NULL,
  scripture_truth jsonb NOT NULL,
  micro_action text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pivot_strategies_user_id ON pivot_strategies(user_id);

ALTER TABLE pivot_strategies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pivot strategies"
  ON pivot_strategies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pivot strategies"
  ON pivot_strategies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pivot strategies"
  ON pivot_strategies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create testimonies table
CREATE TABLE IF NOT EXISTS testimonies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  story text NOT NULL,
  category text DEFAULT 'answered_prayer' CHECK (category IN ('answered_prayer', 'healing', 'provision', 'breakthrough', 'transformation', 'miracle')),
  date date NOT NULL,
  related_scripture jsonb,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonies_user_id ON testimonies(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonies_date ON testimonies(date DESC);

ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own testimonies"
  ON testimonies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own testimonies"
  ON testimonies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonies"
  ON testimonies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonies"
  ON testimonies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create fasting_sessions table
CREATE TABLE IF NOT EXISTS fasting_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('daniel', 'water', 'intermittent', 'media', 'custom')),
  custom_description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  purpose text NOT NULL,
  scripture jsonb NOT NULL,
  daily_reflections jsonb[] DEFAULT ARRAY[]::jsonb[],
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fasting_sessions_user_id ON fasting_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_sessions_dates ON fasting_sessions(start_date, end_date);

ALTER TABLE fasting_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fasting sessions"
  ON fasting_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fasting sessions"
  ON fasting_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fasting sessions"
  ON fasting_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create devotional_progress table
CREATE TABLE IF NOT EXISTS devotional_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id text NOT NULL,
  current_day integer DEFAULT 1,
  start_date date NOT NULL,
  completed_days integer[] DEFAULT ARRAY[]::integer[],
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, plan_id)
);

CREATE INDEX IF NOT EXISTS idx_devotional_progress_user_id ON devotional_progress(user_id);

ALTER TABLE devotional_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own devotional progress"
  ON devotional_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own devotional progress"
  ON devotional_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own devotional progress"
  ON devotional_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create community_prayers table
CREATE TABLE IF NOT EXISTS community_prayers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  request text NOT NULL,
  category text DEFAULT 'other' CHECK (category IN ('healing', 'provision', 'guidance', 'salvation', 'gratitude', 'other')),
  is_anonymous boolean DEFAULT false,
  author_name text,
  prayer_count integer DEFAULT 0,
  is_answered boolean DEFAULT false,
  answered_testimony text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_prayers_created_at ON community_prayers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_prayers_category ON community_prayers(category);

ALTER TABLE community_prayers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view community prayers"
  ON community_prayers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own community prayers"
  ON community_prayers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own community prayers"
  ON community_prayers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own community prayers"
  ON community_prayers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create prayer_reminders table
CREATE TABLE IF NOT EXISTS prayer_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  time text NOT NULL,
  label text NOT NULL,
  days text[] DEFAULT ARRAY['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']::text[],
  is_enabled boolean DEFAULT true,
  type text DEFAULT 'custom' CHECK (type IN ('morning', 'midday', 'evening', 'custom')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prayer_reminders_user_id ON prayer_reminders(user_id);

ALTER TABLE prayer_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prayer reminders"
  ON prayer_reminders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer reminders"
  ON prayer_reminders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer reminders"
  ON prayer_reminders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own prayer reminders"
  ON prayer_reminders FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create bible_bookmarks table
CREATE TABLE IF NOT EXISTS bible_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reference text NOT NULL,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bible_bookmarks_user_id ON bible_bookmarks(user_id);

ALTER TABLE bible_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bible bookmarks"
  ON bible_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bible bookmarks"
  ON bible_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bible bookmarks"
  ON bible_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create bible_highlights table
CREATE TABLE IF NOT EXISTS bible_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reference text NOT NULL,
  text text NOT NULL,
  color text DEFAULT 'gold' CHECK (color IN ('gold', 'green', 'blue', 'purple', 'red')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bible_highlights_user_id ON bible_highlights(user_id);

ALTER TABLE bible_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bible highlights"
  ON bible_highlights FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bible highlights"
  ON bible_highlights FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bible highlights"
  ON bible_highlights FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
