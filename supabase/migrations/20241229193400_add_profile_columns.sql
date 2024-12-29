-- Add missing profile columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC+00:00'; 