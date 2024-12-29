-- Add timestamp columns to story_shares table
ALTER TABLE story_shares
ADD COLUMN created_at timestamptz NOT NULL DEFAULT now(),
ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now(),
ADD COLUMN expires_at timestamptz,
ADD COLUMN last_viewed_at timestamptz,
ADD COLUMN views_count integer NOT NULL DEFAULT 0;

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_story_shares_created_at ON story_shares(created_at DESC);

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_story_shares_updated_at ON story_shares;
CREATE TRIGGER update_story_shares_updated_at
    BEFORE UPDATE ON story_shares
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at(); 