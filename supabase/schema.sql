-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id BIGINT UNIQUE NOT NULL,
  email TEXT,
  name TEXT NOT NULL,
  avatar_url TEXT,
  github_token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user settings table
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'system',
  default_story_style TEXT NOT NULL DEFAULT 'epic',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create stories table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  repository_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  style TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- User settings policies
CREATE POLICY "Users can view their own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Stories policies
CREATE POLICY "Users can view their own stories" ON stories
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own stories" ON stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" ON stories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories" ON stories
  FOR DELETE USING (auth.uid() = user_id);

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at(); 