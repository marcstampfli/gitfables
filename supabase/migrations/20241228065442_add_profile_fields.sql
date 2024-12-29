-- Add new columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;

-- Create a function to generate a unique username from email
CREATE OR REPLACE FUNCTION generate_unique_username(email TEXT)
RETURNS TEXT AS $$
DECLARE
  base_username TEXT;
  new_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Extract username from email (before @)
  base_username := split_part(email, '@', 1);
  -- Remove special characters and spaces
  base_username := regexp_replace(base_username, '[^a-zA-Z0-9]', '', 'g');
  -- Convert to lowercase
  base_username := lower(base_username);
  
  -- Try the base username first
  new_username := base_username;
  
  -- Keep trying with incrementing numbers until we find a unique username
  WHILE EXISTS (SELECT 1 FROM users WHERE username = new_username) LOOP
    counter := counter + 1;
    new_username := base_username || counter::TEXT;
  END LOOP;
  
  RETURN new_username;
END;
$$ LANGUAGE plpgsql;

-- Generate usernames for existing users
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id, email FROM users WHERE username IS NULL LOOP
    UPDATE users
    SET username = generate_unique_username(r.email)
    WHERE id = r.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Make username required for new records
ALTER TABLE users
ALTER COLUMN username SET NOT NULL;

-- Add RLS policies for the new fields
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a trigger to automatically generate username for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.username IS NULL THEN
    NEW.username := generate_unique_username(NEW.email);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
