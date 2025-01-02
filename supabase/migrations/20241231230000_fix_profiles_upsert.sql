-- Add upsert policy for profiles
DROP POLICY IF EXISTS "Users can upsert their own profile" ON public.profiles;
CREATE POLICY "Users can upsert their own profile"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Ensure all existing users have profiles
INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING; 