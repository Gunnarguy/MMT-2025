-- MMT-2025 Trip Planner Database Schema
-- Run this in Supabase SQL Editor to create required tables

-- ============================================
-- TRIP SELECTIONS TABLE
-- Stores individual user's selected activities
-- ============================================
CREATE TABLE IF NOT EXISTS mmt_trip_selections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  selections JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE mmt_trip_selections ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own selections
CREATE POLICY "Users can view own selections"
  ON mmt_trip_selections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own selections"
  ON mmt_trip_selections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own selections"
  ON mmt_trip_selections
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- SHARED TRIP STATE TABLE
-- Stores the shared trip state visible to all team members
-- ============================================
CREATE TABLE IF NOT EXISTS mmt_shared_trip (
  id TEXT PRIMARY KEY DEFAULT 'mmt-2025-maine',
  state JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mmt_shared_trip ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view shared state
CREATE POLICY "Authenticated users can view shared trip"
  ON mmt_shared_trip
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admin (Gunnar) can modify shared state
-- For now, allow all authenticated users to update (can restrict later)
CREATE POLICY "Authenticated users can update shared trip"
  ON mmt_shared_trip
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert shared trip"
  ON mmt_shared_trip
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- ENABLE REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE mmt_shared_trip;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_mmt_selections_user_id 
  ON mmt_trip_selections(user_id);

CREATE INDEX IF NOT EXISTS idx_mmt_selections_updated 
  ON mmt_trip_selections(updated_at DESC);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mmt_trip_selections_updated_at
  BEFORE UPDATE ON mmt_trip_selections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mmt_shared_trip_updated_at
  BEFORE UPDATE ON mmt_shared_trip
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA
-- ============================================
INSERT INTO mmt_shared_trip (id, state)
VALUES ('mmt-2025-maine', '{"initialized": true, "activities": [], "notes": ""}')
ON CONFLICT (id) DO NOTHING;
