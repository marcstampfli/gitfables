-- Clean up duplicate settings
DELETE FROM user_settings a USING (
  SELECT MIN(ctid) as ctid, user_id
  FROM user_settings
  GROUP BY user_id
  HAVING COUNT(*) > 1
) b
WHERE a.user_id = b.user_id
AND a.ctid <> b.ctid;

-- Add unique constraint to prevent duplicates
ALTER TABLE user_settings
DROP CONSTRAINT IF EXISTS user_settings_user_id_key,
ADD CONSTRAINT user_settings_user_id_key UNIQUE (user_id);

-- Make required columns nullable temporarily
ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL;
ALTER TABLE users ALTER COLUMN name DROP NOT NULL;
ALTER TABLE users ALTER COLUMN github_token DROP NOT NULL;

-- Ensure users table has records for all auth.users
INSERT INTO users (id, email, username, name, created_at, updated_at)
SELECT 
  id,
  email,
  LOWER(SPLIT_PART(email, '@', 1)), -- Use email prefix as username
  SPLIT_PART(email, '@', 1), -- Use email prefix as name
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE users.id = auth.users.id
);

-- Add trigger to automatically create user record when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, username, name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    LOWER(SPLIT_PART(NEW.email, '@', 1)),
    SPLIT_PART(NEW.email, '@', 1),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user(); 