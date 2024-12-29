-- Create repository_provider type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE repository_provider AS ENUM ('github', 'gitlab', 'bitbucket');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add provider column to repositories table
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS provider repository_provider NOT NULL DEFAULT 'github';

-- Create index on provider column
CREATE INDEX IF NOT EXISTS idx_repositories_provider ON repositories(provider);

-- Add RLS policy for provider column
DROP POLICY IF EXISTS "Users can view repositories provider" ON repositories;
CREATE POLICY "Users can view repositories provider" ON repositories
    FOR SELECT USING (true); 