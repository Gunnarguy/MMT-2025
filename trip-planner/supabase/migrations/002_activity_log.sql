-- ============================================
-- ACTIVITY LOG TABLE
-- Stores all changes made by family members
-- ============================================
CREATE TABLE IF NOT EXISTS mmt_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  day_label TEXT,
  activity_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mmt_activity_log ENABLE ROW LEVEL SECURITY;

-- All users can view the activity log
CREATE POLICY "All users can view activity log"
  ON mmt_activity_log
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view activity log"
  ON mmt_activity_log
  FOR SELECT
  TO authenticated
  USING (true);

-- All users can insert into activity log
CREATE POLICY "All users can insert activity log"
  ON mmt_activity_log
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert activity log"
  ON mmt_activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- ENABLE REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE mmt_activity_log;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_mmt_activity_log_created
  ON mmt_activity_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mmt_activity_log_user
  ON mmt_activity_log(user_email);
