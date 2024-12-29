-- Add indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_stories_is_public ON stories(is_public);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_repositories_updated_at ON repositories(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_story_views_viewed_at ON story_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_story_shares_shared_at ON story_shares(shared_at DESC);
CREATE INDEX IF NOT EXISTS idx_repository_syncs_status ON repository_syncs(status);
CREATE INDEX IF NOT EXISTS idx_repository_syncs_started_at ON repository_syncs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_keys_expires_at ON api_keys(expires_at); 