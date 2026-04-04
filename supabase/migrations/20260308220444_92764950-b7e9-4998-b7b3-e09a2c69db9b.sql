
-- ============================================================
-- Fix ALL RLS policies: convert RESTRICTIVE → PERMISSIVE
-- ============================================================

-- ─── LEADS ───
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Admins/editors can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins/editors can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins/editors can view leads" ON public.leads FOR SELECT TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update leads" ON public.leads FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ─── CATEGORIES ───
DROP POLICY IF EXISTS "Admins/editors can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Categories are publicly viewable" ON public.categories;

CREATE POLICY "Categories are publicly viewable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update categories" ON public.categories FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete categories" ON public.categories FOR DELETE TO authenticated USING (is_admin_or_editor(auth.uid()));

-- ─── TAGS ───
DROP POLICY IF EXISTS "Admins/editors can manage tags" ON public.tags;
DROP POLICY IF EXISTS "Tags are publicly viewable" ON public.tags;

CREATE POLICY "Tags are publicly viewable" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert tags" ON public.tags FOR INSERT TO authenticated WITH CHECK (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update tags" ON public.tags FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete tags" ON public.tags FOR DELETE TO authenticated USING (is_admin_or_editor(auth.uid()));

-- ─── POSTS ───
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Admins/editors can create posts" ON public.posts;
DROP POLICY IF EXISTS "Admins/editors can update posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are publicly viewable" ON public.posts;

CREATE POLICY "Published posts are publicly viewable" ON public.posts FOR SELECT USING ((status = 'published'::post_status) OR is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can create posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update posts" ON public.posts FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete posts" ON public.posts FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ─── POST_TAGS ───
DROP POLICY IF EXISTS "Admins/editors can manage post tags" ON public.post_tags;
DROP POLICY IF EXISTS "Post tags are publicly viewable" ON public.post_tags;

CREATE POLICY "Post tags are publicly viewable" ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "Admins/editors can insert post tags" ON public.post_tags FOR INSERT TO authenticated WITH CHECK (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update post tags" ON public.post_tags FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can delete post tags" ON public.post_tags FOR DELETE TO authenticated USING (is_admin_or_editor(auth.uid()));

-- ─── MEDIA ───
DROP POLICY IF EXISTS "Admins can delete media" ON public.media;
DROP POLICY IF EXISTS "Admins/editors can update media" ON public.media;
DROP POLICY IF EXISTS "Admins/editors can upload media" ON public.media;
DROP POLICY IF EXISTS "Media is viewable by admins/editors" ON public.media;

CREATE POLICY "Media is viewable by admins/editors" ON public.media FOR SELECT TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can upload media" ON public.media FOR INSERT TO authenticated WITH CHECK (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update media" ON public.media FOR UPDATE TO authenticated USING (is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete media" ON public.media FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ─── PROFILES ───
DROP POLICY IF EXISTS "Profiles are publicly viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Profiles are publicly viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ─── USER_ROLES ───
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;

CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
