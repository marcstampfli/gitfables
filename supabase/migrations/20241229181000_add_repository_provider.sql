-- Create provider type
CREATE TYPE repository_provider AS ENUM ('github', 'gitlab', 'bitbucket');

-- Add provider column to repositories
ALTER TABLE repositories 
ADD COLUMN provider repository_provider NOT NULL DEFAULT 'github';

-- Update existing repositories based on URL
UPDATE repositories
SET provider = 
  CASE 
    WHEN url LIKE '%github.com%' THEN 'github'
    WHEN url LIKE '%gitlab.com%' THEN 'gitlab'
    WHEN url LIKE '%bitbucket.org%' THEN 'bitbucket'
    ELSE 'github'  -- Default to github for unknown URLs
  END;

-- Create index for provider column
CREATE INDEX idx_repositories_provider ON repositories(provider); 