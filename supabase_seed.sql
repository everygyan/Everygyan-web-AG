-- ==============================================================================
-- EVERYGYAN DATABASE SEED DATA SCRIPT
-- Populates Categories, Destinations, Tags, Menus, Menu Items, Authors & Articles
-- ==============================================================================

-- 1. SEED CATEGORIES (Hierarchical parent/child)
INSERT INTO public.categories (id, title, slug, description, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Adventure & Expeditions', 'adventure-expeditions', 'High-altitude mountaineering and remote wilderness treks', 1),
('c1000000-0000-0000-0000-000000000002', 'Cultural Journeys', 'cultural-journeys', 'Slow travel through ancient heritage, culinary arts and temples', 2),
('c1000000-0000-0000-0000-000000000003', 'Travel Knowledge & Gear', 'knowledge-gear', 'Camera kits, packing masterclasses, and digital nomad frameworks', 3)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED DESTINATIONS (Territories)
INSERT INTO public.destinations (id, name, slug, region, country_code, cover_image_url, description, featured, sort_order) VALUES
('d1000000-0000-0000-0000-000000000001', 'Switzerland', 'switzerland', 'Europe', 'CH', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', 'Towering alpine spires, pristine mountain railways, and tranquil turquoise lakes.', true, 1),
('d1000000-0000-0000-0000-000000000002', 'Japan', 'japan', 'Asia', 'JP', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', 'Ancient heritage harmonized with futuristic metropolises, culinary art, and zen gardens.', true, 2),
('d1000000-0000-0000-0000-000000000003', 'Indonesia', 'indonesia', 'Asia', 'ID', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', 'Emerald rice terraces, spiritual island culture, and world-class tropical surf breaks.', true, 3),
('d1000000-0000-0000-0000-000000000004', 'Iceland', 'iceland', 'Europe', 'IS', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80', 'Sublime volcanic landscapes, dancing aurora skies, and steaming glacial river pools.', true, 4)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED TAGS
INSERT INTO public.tags (id, name, slug, description) VALUES
('t1000000-0000-0000-0000-000000000001', 'Hiking', 'hiking', 'Trail expeditions and mountain trekking'),
('t1000000-0000-0000-0000-000000000002', 'Photography', 'photography', 'Camera equipment and framing techniques'),
('t1000000-0000-0000-0000-000000000003', 'Digital Nomad', 'digital-nomad', 'Remote working and location independence'),
('t1000000-0000-0000-0000-000000000004', 'Temples', 'temples', 'Sacred architecture and historic sites')
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED AUTHORS
INSERT INTO public.authors (id, display_name, slug, role_title, bio, avatar_url) VALUES
('a1000000-0000-0000-0000-000000000001', 'Elena Vance', 'elena-vance', 'Senior Alpine Correspondent', 'Geographer and mountain photographer with over 12 seasons in the European Alps.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
('a1000000-0000-0000-0000-000000000002', 'Kenji Sato', 'kenji-sato', 'Culture & Culinary Editor', 'Cultural journalist documenting ancient artisan communities and traditional tea heritage.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
('a1000000-0000-0000-0000-000000000003', 'Marcus Thorne', 'marcus-thorne', 'Nomad Logistics Lead', 'Software engineer and slow traveler researching co-working infrastructure worldwide.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80')
ON CONFLICT (slug) DO NOTHING;

-- 5. SEED MENUS
INSERT INTO public.menus (id, name, location_key, is_active) VALUES
('m1000000-0000-0000-0000-000000000001', 'Main Header Navigation', 'header_nav', true)
ON CONFLICT (location_key) DO NOTHING;

-- 6. SEED DYNAMIC MENU ITEMS (Root + Nested Sub-menus)
-- Root Item 1: Destinations
INSERT INTO public.menu_items (id, menu_id, parent_id, title, type, custom_url, sort_order) VALUES
('i1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', NULL, 'Destinations', 'custom_url', '/destinations', 1),
-- Submenu under Destinations: Europe
('i1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000001', 'Europe', 'custom_url', '/destinations/europe', 1),
-- Submenu under Destinations: Asia
('i1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000001', 'Asia', 'custom_url', '/destinations/asia', 2),

-- Nested leaf items under Europe
('i1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000002', 'Switzerland High Alps', 'custom_url', '/destinations/switzerland', 1),
('i1000000-0000-0000-0000-000000000005', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000002', 'Iceland Glaciers & Aurora', 'custom_url', '/destinations/iceland', 2),

-- Nested leaf items under Asia
('i1000000-0000-0000-0000-000000000006', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000003', 'Kyoto & Tokyo, Japan', 'custom_url', '/destinations/japan', 1),
('i1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000003', 'Bali, Indonesia', 'custom_url', '/destinations/indonesia', 2),

-- Root Item 2: Field Knowledge
('i1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000001', NULL, 'Field Knowledge', 'custom_url', '/knowledge', 2),
-- Submenu under Field Knowledge
('i1000000-0000-0000-0000-000000000009', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000008', 'Camera & Gear Kits', 'custom_url', '/knowledge/photography', 1),
('i1000000-0000-0000-0000-000000000010', 'm1000000-0000-0000-0000-000000000001', 'i1000000-0000-0000-0000-000000000008', 'Nomad Blueprints', 'custom_url', '/guides/digital-nomad', 2),

-- Root Item 3: Visual Stories & About
('i1000000-0000-0000-0000-000000000011', 'm1000000-0000-0000-0000-000000000001', NULL, 'Visual Stories', 'custom_url', '/galleries', 3),
('i1000000-0000-0000-0000-000000000012', 'm1000000-0000-0000-0000-000000000001', NULL, 'About', 'custom_url', '/about', 4)
ON CONFLICT (id) DO NOTHING;

-- 7. SEED ARTICLES
INSERT INTO public.articles (id, author_id, title, slug, summary, content_body, featured_image_url, video_url, status, visibility, is_featured, is_trending, reading_time_mins, published_at) VALUES
(
    'e1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000001',
    'The Ultimate Guide to Traversing the Swiss Alps: Hidden High-Altitude Trails',
    'ultimate-swiss-alps-hiking-guide',
    'From Grindelwald to the shadow of the Matterhorn, discover panoramic mountain passes, crystal-clear glacial lakes, and sustainable alpine hut experiences.',
    'Few landscapes on Earth stir the soul like these mountain passes. Whether stepping off early morning cogwheel trains or strapping on crampons for a sunrise glacier crossing, the sheer scale of the peaks commands reverence.

## Packing Smart for Elevation
When hiking above 2,500 meters, mountain weather can shift within minutes. Ensure your pack contains breathable merino wool base layers, a 3-layer weatherproof hardshell, mineral sunscreen, and offline satellite topographical maps.

> "In the mountains, there are only two rules: respect the terrain, and never rush the descent."

## Hut-to-Hut Circuit Logistics
Alpine huts provide hearty mountain dinners and comfortable dorms overlooking sea-of-clouds sunsets. Booking 2–3 months ahead is essential for peak summer months.',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    'published',
    'public',
    true,
    true,
    7,
    NOW()
),
(
    'e1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000002',
    'Autumn in Kyoto: Temples, Moss Gardens and Secret Bamboo Groves',
    'autumn-in-kyoto-temple-guide',
    'A serene walkthrough of Kyoto lesser-known zen sanctuaries, traditional tea ceremonies, and how to photograph autumn maple leaves without the crowds.',
    'Kyoto during late autumn is a symphony of fiery reds, deep ambers, and moss greens. While Kiyomizu-dera and Fushimi Inari draw massive crowds, the real magic resides in northern Kyotos quieter enclaves.',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    NULL,
    'published',
    'public',
    false,
    true,
    5,
    NOW() - INTERVAL '2 days'
),
(
    'e1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000003',
    'Nomad Life in Bali: The 2026 Comprehensive Cost & Co-Working Blueprint',
    'bali-digital-nomad-guide-2026',
    'From Canggus bustling cafes to Ubuds quiet co-working hubs: broadband speeds, villa rent breakdown, visa requirements, and health insurance advice.',
    'Bali continues to attract creators, coders, and founders from around the globe. But between scooter traffic and visa nuances, navigating the island smoothly requires local know-how.',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
    NULL,
    'published',
    'public',
    false,
    true,
    9,
    NOW() - INTERVAL '4 days'
)
ON CONFLICT (slug) DO NOTHING;
