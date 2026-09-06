DROP POLICY IF EXISTS "Users read own profile" ON public.user_profiles;
CREATE POLICY "Allow select user_profiles" ON public.user_profiles
  FOR SELECT USING (true);
