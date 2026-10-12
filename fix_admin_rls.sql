-- ==============================================================================
-- ADMIN PERMISSIONS & RLS REPAIR SCRIPT
-- Grants Admin Role to your account and updates Article RLS Policies
-- ==============================================================================

-- 1. Ensure any authenticated user with an account can publish articles
-- (or explicitly when logged in as admin)
DROP POLICY IF EXISTS "Admin articles all" ON public.articles;
DROP POLICY IF EXISTS "Public articles read" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users create articles" ON public.articles;

-- Allow public to read published articles
CREATE POLICY "Public articles read" ON public.articles
    FOR SELECT USING (status = 'published');

-- Allow authenticated users to manage articles in the CMS
CREATE POLICY "Authenticated users manage articles" ON public.articles
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 2. Automatically assign 'admin' role to all current registered users in user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Trigger to automatically grant 'admin' role to any new registered user for this website
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_assign_admin_role ON auth.users;
CREATE TRIGGER trg_assign_admin_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();
