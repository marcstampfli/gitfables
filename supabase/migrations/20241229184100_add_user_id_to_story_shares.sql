-- Add user_id column to story_shares table
ALTER TABLE story_shares
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL;

-- Create index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_story_shares_user_id ON story_shares(user_id);

-- Add RLS policy for user_id
ALTER TABLE story_shares ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own shares" ON story_shares;
CREATE POLICY "Users can view their own shares" ON story_shares
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own shares" ON story_shares;
CREATE POLICY "Users can create their own shares" ON story_shares
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own shares" ON story_shares;
CREATE POLICY "Users can delete their own shares" ON story_shares
    FOR DELETE USING (auth.uid() = user_id); 