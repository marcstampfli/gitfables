-- Backup existing data
CREATE TABLE IF NOT EXISTS user_settings_backup AS 
SELECT * FROM user_settings;

-- Drop existing user_settings table
DROP TABLE IF EXISTS user_settings CASCADE;

-- Recreate user settings table with JSONB column
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{
    "theme": {
      "mode": "system",
      "accent_color": "default"
    },
    "notifications": {
      "email": true,
      "web": true,
      "digest": "weekly"
    },
    "privacy": {
      "show_activity": true,
      "default_story_visibility": "private"
    },
    "repository": {
      "auto_sync": true,
      "sync_frequency": "daily",
      "default_branch": "main"
    },
    "accessibility": {
      "font_size": "medium",
      "reduce_animations": false,
      "high_contrast": false,
      "keyboard_shortcuts": true
    }
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migrate existing data
INSERT INTO user_settings (id, user_id, settings, created_at, updated_at)
SELECT 
  id,
  user_id,
  jsonb_build_object(
    'theme', jsonb_build_object(
      'mode', theme,
      'accent_color', 'default'
    ),
    'notifications', jsonb_build_object(
      'email', email_notifications,
      'web', true,
      'digest', 'weekly'
    ),
    'privacy', jsonb_build_object(
      'show_activity', true,
      'default_story_visibility', 'private'
    ),
    'repository', jsonb_build_object(
      'auto_sync', true,
      'sync_frequency', 'daily',
      'default_branch', 'main'
    ),
    'accessibility', jsonb_build_object(
      'font_size', 'medium',
      'reduce_animations', false,
      'high_contrast', false,
      'keyboard_shortcuts', true
    )
  ),
  created_at,
  updated_at
FROM user_settings_backup;

-- Drop backup table
DROP TABLE user_settings_backup;

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- User settings policies
CREATE POLICY "Users can view their own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
