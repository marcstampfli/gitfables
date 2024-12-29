-- Enable RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own activity" ON user_activity;
DROP POLICY IF EXISTS "System can insert activity" ON user_activity;

-- Create policies
CREATE POLICY "Users can view their own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity" ON user_activity
  FOR INSERT WITH CHECK (true); 