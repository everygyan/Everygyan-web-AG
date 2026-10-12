-- ==============================================================================
-- ADMIN ROLES & PROFILES RESYNC SCRIPT
-- Resolves Foreign Key constraint: Populates profiles before assigning roles
-- ==============================================================================

-- 1. Ensure all auth.users have an existing profile in public.profiles
INSERT INTO public.profiles (id, username, full_name, created_at, updated_at)
SELECT 
    id, 
    COALESCE(raw_user_meta_data->>'username', split_part(email, '@', 1)),
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
    created_at,
    NOW()
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 2. Automatically assign 'admin' role to all current users in user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM public.profiles
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Update RLS policies on articles to allow authenticated users to publish/edit
DROP POLICY IF EXISTS "Admin articles all" ON public.articles;
DROP POLICY IF EXISTS "Public articles read" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users manage articles" ON public.articles;

CREATE POLICY "Public articles read" ON public.articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users manage articles" ON public.articles
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Set up an automatic trigger on auth.users for new registrations:
-- First creates the profile, then assigns the admin role
CREATE OR REPLACE FUNCTION public.handle_new_user_setup()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert profile
    INSERT INTO public.profiles (id, username, full_name, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;

    -- Assign admin role
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
EXECUTE FUNCTION public.handle_new_user_setup();
