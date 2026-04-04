
-- ============================================================
-- BLOG MANAGEMENT DASHBOARD — Full Database Schema
-- ============================================================

-- 1. User Roles (enum + table)
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- 2. Profiles (for authors)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  twitter_handle TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly viewable" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly viewable" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins/editors can manage categories" ON public.categories
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- 4. Tags
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are publicly viewable" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Admins/editors can manage tags" ON public.tags
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- 5. Blog Posts
CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'scheduled', 'archived');

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  -- SEO fields
  seo_title TEXT,
  seo_description TEXT,
  focus_keyword TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  -- Geo SEO
  geo_region TEXT,
  geo_city TEXT,
  geo_keywords TEXT,
  -- Metadata
  reading_time_minutes INTEGER DEFAULT 0,
  word_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  -- JSON-LD
  json_ld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Published posts are public
CREATE POLICY "Published posts are publicly viewable" ON public.posts
  FOR SELECT USING (status = 'published' OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can create posts" ON public.posts
  FOR INSERT WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can update posts" ON public.posts
  FOR UPDATE USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 6. Post-Tags junction
CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post tags are publicly viewable" ON public.post_tags
  FOR SELECT USING (true);

CREATE POLICY "Admins/editors can manage post tags" ON public.post_tags
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- 7. Media Library
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  description TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media is viewable by admins/editors" ON public.media
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can upload media" ON public.media
  FOR INSERT WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can update media" ON public.media
  FOR UPDATE USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete media" ON public.media
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 8. Storage bucket for blog media
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-media', 'blog-media', true);

CREATE POLICY "Blog media is publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-media');

CREATE POLICY "Admins/editors can upload blog media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-media' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can update blog media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-media' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete blog media" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-media' AND public.has_role(auth.uid(), 'admin'));

-- 9. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Indexes for performance
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);
CREATE INDEX idx_posts_scheduled_at ON public.posts(scheduled_at);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_tags_slug ON public.tags(slug);
