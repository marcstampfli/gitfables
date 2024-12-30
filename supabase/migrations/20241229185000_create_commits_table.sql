-- Create commits table
CREATE TABLE IF NOT EXISTS commits (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    repository_id uuid NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sha text NOT NULL,
    message text NOT NULL,
    author_name text NOT NULL,
    author_email text NOT NULL,
    author_date timestamptz NOT NULL,
    url text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (repository_id, sha)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_commits_repository_id ON commits(repository_id);
CREATE INDEX IF NOT EXISTS idx_commits_user_id ON commits(user_id);
CREATE INDEX IF NOT EXISTS idx_commits_author_date ON commits(author_date DESC);
CREATE INDEX IF NOT EXISTS idx_commits_sha ON commits(sha);

-- Enable RLS
ALTER TABLE commits ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
DROP POLICY IF EXISTS "Users can view their own commits" ON commits;
CREATE POLICY "Users can view their own commits" ON commits
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = commits.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can insert their own commits" ON commits;
CREATE POLICY "Users can insert their own commits" ON commits
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = commits.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can delete their own commits" ON commits;
CREATE POLICY "Users can delete their own commits" ON commits
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = commits.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_commits_updated_at ON commits;
CREATE TRIGGER update_commits_updated_at
    BEFORE UPDATE ON commits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Grant permissions
GRANT ALL ON TABLE commits TO authenticated;
GRANT ALL ON TABLE commits TO service_role; 