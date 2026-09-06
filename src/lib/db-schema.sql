-- ============================================================
-- AlyoRA Capital Research — Admin CMS Database Schema
-- Run via: npx @insforge/cli db push
-- ============================================================

-- 1. User Profiles (extends InsForge auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Users can only read their own profile; users can insert/update their own profile; admins have full access
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins full access to profiles" ON public.user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- Auto-sync trigger from auth.users to public.user_profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. Site Content (key-value content store per page/section)
CREATE TABLE IF NOT EXISTS public.site_content (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page        TEXT NOT NULL,        -- e.g. 'home', 'about', 'navbar'
  section     TEXT NOT NULL,        -- e.g. 'hero', 'stats', 'why-us'
  key         TEXT NOT NULL,        -- e.g. 'heading', 'subheading', 'tagline'
  type        TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'image', 'pdf', 'boolean', 'number', 'url')),
  value       TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES auth.users(id),
  UNIQUE (page, section, key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site_content" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can modify site_content" ON public.site_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- ============================================================
-- 3. Page Cards (structured card data per page/section)
CREATE TABLE IF NOT EXISTS public.page_cards (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page          TEXT NOT NULL,       -- e.g. 'services', 'reports', 'pricing'
  section       TEXT NOT NULL,       -- e.g. 'main-cards', 'feature-cards'
  position      INTEGER NOT NULL DEFAULT 0,
  title         TEXT NOT NULL DEFAULT '',
  subtitle      TEXT DEFAULT '',
  description   TEXT DEFAULT '',
  image_url     TEXT DEFAULT '',
  button_label  TEXT DEFAULT '',
  button_url    TEXT DEFAULT '',
  badge         TEXT DEFAULT '',
  visible       BOOLEAN NOT NULL DEFAULT true,
  extra_data    JSONB DEFAULT '{}',  -- flexible: pricing tiers, PDF links, etc.
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    UUID REFERENCES auth.users(id)
);

ALTER TABLE public.page_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible page_cards" ON public.page_cards
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage all page_cards" ON public.page_cards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- ============================================================
-- 4. Page Sections (visibility & ordering of sections per page)
CREATE TABLE IF NOT EXISTS public.page_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page        TEXT NOT NULL,
  section_id  TEXT NOT NULL,       -- matches component section identifier
  title       TEXT NOT NULL DEFAULT '',
  visible     BOOLEAN NOT NULL DEFAULT true,
  position    INTEGER NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES auth.users(id),
  UNIQUE (page, section_id)
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read page_sections" ON public.page_sections
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage page_sections" ON public.page_sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- ============================================================
-- 5. PDF Files (uploaded PDFs linked to pages/sections)
CREATE TABLE IF NOT EXISTS public.pdf_files (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  url         TEXT NOT NULL,
  key         TEXT NOT NULL,       -- InsForge Storage key
  page        TEXT NOT NULL DEFAULT 'reports',
  section     TEXT DEFAULT 'main',
  visible     BOOLEAN NOT NULL DEFAULT true,
  file_size   BIGINT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES auth.users(id)
);

ALTER TABLE public.pdf_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible pdf_files" ON public.pdf_files
  FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage pdf_files" ON public.pdf_files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- ============================================================
-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_site_content_updated
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_page_cards_updated
  BEFORE UPDATE ON public.page_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_page_sections_updated
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
