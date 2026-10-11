-- ==============================================================================
-- WANDERLUST MASTER DATABASE MIGRATION SCRIPT
-- 21 Tables, Indexes, PostgreSQL Full-Text Search, RLS Policies, and Initial Seeds
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER ROLES (RBAC: admin, editor, moderator, user)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'moderator', 'user')),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- 3. CATEGORIES (Self-referential hierarchy for parent/child sub-menus)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DESTINATIONS (Hierarchical regions/countries/cities)
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    region TEXT,
    country_code TEXT,
    cover_image_url TEXT,
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TAGS (Cross-category descriptors: e.g. hiking, packing, budget, solo)
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUTHORS
CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    display_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    role_title TEXT DEFAULT 'Field Correspondent',
    bio TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ARTICLES
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content_body TEXT,
    featured_image_url TEXT,
    video_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'members_only')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    reading_time_mins INT DEFAULT 5,
    seo_title TEXT,
    seo_description TEXT,
    view_count INT DEFAULT 0,
    search_vector TSVECTOR,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ARTICLE REVISIONS (Version history)
CREATE TABLE IF NOT EXISTS public.article_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    content_snapshot JSONB NOT NULL,
    summary_of_changes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ARTICLE_CATEGORIES (Many-to-many)
CREATE TABLE IF NOT EXISTS public.article_categories (
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY(article_id, category_id)
);

-- 10. ARTICLE_DESTINATIONS (Many-to-many)
CREATE TABLE IF NOT EXISTS public.article_destinations (
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
    PRIMARY KEY(article_id, destination_id)
);

-- 11. ARTICLE_TAGS (Many-to-many)
CREATE TABLE IF NOT EXISTS public.article_tags (
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY(article_id, tag_id)
);

-- 12. COMMENTS (Nested replies, moderation states)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'flagged', 'deleted')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. COMMENT_REPORTS (Community moderation flags)
CREATE TABLE IF NOT EXISTS public.comment_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. BOOKMARKS (User saved articles)
CREATE TABLE IF NOT EXISTS public.bookmarks (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(user_id, article_id)
);

-- 15. NEWSLETTER_SUBSCRIBERS (GDPR double opt-in support)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending_confirmation' CHECK (status IN ('pending_confirmation', 'active', 'unsubscribed')),
    confirmation_token TEXT,
    consent_date TIMESTAMPTZ DEFAULT NOW(),
    consent_source TEXT DEFAULT 'website_homepage',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. MENUS (Header, mobile drawer, footer)
CREATE TABLE IF NOT EXISTS public.menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location_key TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. MENU_ITEMS (Nested hierarchy, linked to categories, destinations or URLs)
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'custom_url' CHECK (type IN ('category', 'destination', 'tag', 'page', 'custom_url')),
    target_id UUID,
    custom_url TEXT,
    sort_order INT DEFAULT 0,
    open_new_tab BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. MEDIA (Storage references with alt text and captions)
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    size_bytes BIGINT,
    caption TEXT,
    alt_text TEXT,
    dimensions JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. PAGES (Static editorial pages: about, contact, privacy)
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content_body TEXT,
    seo_title TEXT,
    seo_description TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. REDIRECTS (301/302 link longevity protection)
CREATE TABLE IF NOT EXISTS public.redirects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_slug TEXT NOT NULL UNIQUE,
    target_slug TEXT NOT NULL,
    status_code INT DEFAULT 301 CHECK (status_code IN (301, 302)),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. SITE_SETTINGS (Key-value store for site parameters)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- POSTGRESQL FULL-TEXT SEARCH TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.update_article_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.summary, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.content_body, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_search_vector ON public.articles;
CREATE TRIGGER trg_articles_search_vector
BEFORE INSERT OR UPDATE OF title, summary, content_body
ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_article_search_vector();

CREATE INDEX IF NOT EXISTS idx_articles_search_vector ON public.articles USING gin(search_vector);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public can read published articles
CREATE POLICY "Public articles read" ON public.articles
    FOR SELECT USING (status = 'published');

-- Admins full access to articles and revisions
CREATE POLICY "Admin articles all" ON public.articles
    FOR ALL USING (public.is_admin());

CREATE POLICY "Admin revisions all" ON public.article_revisions
    FOR ALL USING (public.is_admin());

-- Public read access to taxonomic and navigation tables
CREATE POLICY "Public categories read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public destinations read" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public tags read" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public authors read" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Public menus read" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Public menu_items read" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Public pages read" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public site_settings read" ON public.site_settings FOR SELECT USING (true);

-- Comments policies
CREATE POLICY "Public comments read" ON public.comments
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated user create comments" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- Newsletter insert policy (public can subscribe)
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Admin full access to administrative tables
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage destinations" ON public.destinations FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage tags" ON public.tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage menus" ON public.menus FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage menu_items" ON public.menu_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage media" ON public.media FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage redirects" ON public.redirects FOR ALL USING (public.is_admin());

-- User profile policies
CREATE POLICY "Public can view basic profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ==============================================================================
-- STORAGE BUCKETS (article-media & avatars)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('article-media', 'article-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read storage" ON storage.objects
    FOR SELECT USING (bucket_id IN ('article-media', 'avatars'));

CREATE POLICY "Admin manage storage" ON storage.objects
    FOR ALL USING (bucket_id IN ('article-media', 'avatars') AND public.is_admin());
