-- Update the default settings JSONB value
ALTER TABLE "public"."user_settings"
ALTER COLUMN "settings" SET DEFAULT '{"theme": {"mode": "system", "accent_color": "default", "language": "en"}, "notifications": {"email": true, "web": true, "digest": "weekly"}, "privacy": {"show_activity": true, "default_story_visibility": "private"}, "repository": {"auto_sync": true, "default_branch": "main", "sync_frequency": "daily"}, "accessibility": {"font_size": "medium", "high_contrast": false, "reduce_animations": false, "keyboard_shortcuts": true}}'::"jsonb";

-- Update existing settings to include new fields if they don't exist
UPDATE "public"."user_settings"
SET settings = jsonb_set(
  jsonb_set(
    settings,
    '{theme,language}',
    '"en"',
    true
  ),
  '{notifications,digest}',
  '"weekly"',
  true
)
WHERE NOT (settings->'theme' ? 'language')
   OR NOT (settings->'notifications' ? 'digest'); 