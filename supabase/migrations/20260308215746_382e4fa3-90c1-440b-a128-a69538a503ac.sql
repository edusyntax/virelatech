
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Admins/editors can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins/editors can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can submit leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins/editors can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins/editors can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
