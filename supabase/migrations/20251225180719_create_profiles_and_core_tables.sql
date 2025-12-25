/*
  # Initial Database Schema for Theolyte Application

  ## Overview
  This migration creates the foundational database structure for the Theolyte spiritual marketplace application,
  including user profiles, prayer tracking, and core spiritual features.

  ## New Tables Created

  ### 1. `profiles`
  User profile information extending the auth.users table
  - `id` (uuid, primary key, references auth.users)
  - `name` (text) - User's display name
  - `email` (text) - User's email address
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `user_preferences`
  User settings and preferences
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `morning_prayer_time` (text) - Preferred morning prayer time
  - `evening_prayer_time` (text) - Preferred evening prayer time
  - `notifications_enabled` (boolean) - Notification preference
  - `theme` (text) - UI theme preference
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `prayer_letters`
  Letters to God written by users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `title` (text) - Letter title
  - `content` (text) - Letter content
  - `unlock_date` (timestamptz, nullable) - When letter becomes readable
  - `is_answered` (boolean) - Whether prayer was answered
  - `status` (text) - Letter status: draft, sealed, opened
  - `scripture_seal` (jsonb, nullable) - AI-generated scripture
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `intercession_items`
  Prayer requests for others
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `name` (text) - Person being prayed for
  - `request` (text) - Prayer request details
  - `category` (text) - Request category
  - `last_prayed` (timestamptz, nullable) - Last prayer date
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `prayer_sessions`
  Tracking of prayer sessions for analytics
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `date` (date) - Session date
  - `duration_minutes` (integer) - Session duration
  - `focus` (text) - Prayer focus/topic
  - `created_at` (timestamptz)

  ### 6. `prayer_streaks`
  Prayer consistency tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles, unique)
  - `current_streak` (integer) - Current consecutive days
  - `longest_streak` (integer) - Longest streak achieved
  - `last_prayer_date` (date, nullable) - Last prayer date
  - `total_prayer_days` (integer) - Total days prayed
  - `milestones` (integer[]) - Achieved milestone days
  - `updated_at` (timestamptz)

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Users can only access their own data
  - Policies created for SELECT, INSERT, UPDATE, DELETE operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  morning_prayer_time text DEFAULT '08:00',
  evening_prayer_time text DEFAULT '21:00',
  notifications_enabled boolean DEFAULT false,
  theme text DEFAULT 'light',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create prayer_letters table
CREATE TABLE IF NOT EXISTS prayer_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  unlock_date timestamptz,
  is_answered boolean DEFAULT false,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sealed', 'opened')),
  scripture_seal jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prayer_letters_user_id ON prayer_letters(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_letters_created_at ON prayer_letters(created_at DESC);

ALTER TABLE prayer_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prayer letters"
  ON prayer_letters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer letters"
  ON prayer_letters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer letters"
  ON prayer_letters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own prayer letters"
  ON prayer_letters FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create intercession_items table
CREATE TABLE IF NOT EXISTS intercession_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  request text NOT NULL,
  category text DEFAULT 'General' CHECK (category IN ('Health', 'Family', 'Salvation', 'Guidance', 'General')),
  last_prayed timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_intercession_items_user_id ON intercession_items(user_id);
CREATE INDEX IF NOT EXISTS idx_intercession_items_last_prayed ON intercession_items(last_prayed);

ALTER TABLE intercession_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own intercession items"
  ON intercession_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own intercession items"
  ON intercession_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own intercession items"
  ON intercession_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own intercession items"
  ON intercession_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create prayer_sessions table
CREATE TABLE IF NOT EXISTS prayer_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 0,
  focus text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prayer_sessions_user_id ON prayer_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_sessions_date ON prayer_sessions(date DESC);

ALTER TABLE prayer_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prayer sessions"
  ON prayer_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer sessions"
  ON prayer_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create prayer_streaks table
CREATE TABLE IF NOT EXISTS prayer_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_prayer_date date,
  total_prayer_days integer DEFAULT 0,
  milestones integer[] DEFAULT ARRAY[]::integer[],
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prayer_streaks_user_id ON prayer_streaks(user_id);

ALTER TABLE prayer_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prayer streak"
  ON prayer_streaks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer streak"
  ON prayer_streaks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer streak"
  ON prayer_streaks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'Pilgrim'),
    new.email
  );
  
  INSERT INTO public.user_preferences (user_id)
  VALUES (new.id);
  
  INSERT INTO public.prayer_streaks (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
