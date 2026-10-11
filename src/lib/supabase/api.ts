import { supabase } from "@/lib/supabase/client";
import { FEATURED_ARTICLES, NAVIGATION_MENU, TOP_DESTINATIONS } from "@/data/mock-data";
import { Article, MenuItem, Destination } from "@/types";

/**
 * Fetch dynamic navigation tree from Supabase.
 */
export async function getNavigationMenus(): Promise<MenuItem[]> {
  try {
    const { data: menuData, error: menuErr } = await supabase
      .from("menus")
      .select("id")
      .eq("location_key", "header_nav")
      .single();

    if (menuErr || !menuData) return NAVIGATION_MENU;

    const { data: items, error: itemsErr } = await supabase
      .from("menu_items")
      .select("*")
      .eq("menu_id", menuData.id)
      .order("sort_order", { ascending: true });

    if (itemsErr || !items || items.length === 0) return NAVIGATION_MENU;

    const roots = items.filter((i) => !i.parent_id);
    return roots.map((root) => ({
      id: root.id,
      title: root.title,
      href: root.custom_url || "#",
      type: root.type,
      children: items
        .filter((child) => child.parent_id === root.id)
        .map((child) => ({
          id: child.id,
          title: child.title,
          href: child.custom_url || "#",
          type: child.type,
          children: items
            .filter((leaf) => leaf.parent_id === child.id)
            .map((leaf) => ({
              id: leaf.id,
              title: leaf.title,
              href: leaf.custom_url || "#",
            })),
        })),
    }));
  } catch (err) {
    return NAVIGATION_MENU;
  }
}

/**
 * Fetch all published articles.
 */
export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        slug,
        summary,
        content_body,
        featured_image_url,
        video_url,
        reading_time_mins,
        published_at,
        is_featured,
        is_trending,
        authors ( id, display_name, avatar_url, bio, role_title )
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FEATURED_ARTICLES;
    }

    return data.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary || "",
      content: a.content_body || "",
      coverImage:
        a.featured_image_url ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
      videoUrl: a.video_url,
      category: { name: "Expedition", slug: "expedition" },
      tags: ["Travel", "Adventure"],
      author: {
        id: a.authors?.id || "a0000000-0000-0000-0000-000000000001",
        name: a.authors?.display_name || "Elena Vance",
        avatar:
          a.authors?.avatar_url ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: a.authors?.role_title || "Senior Alpine Correspondent",
        bio: a.authors?.bio,
      },
      publishedAt: a.published_at ? new Date(a.published_at).toLocaleDateString() : "Recent",
      readingTime: `${a.reading_time_mins || 5} min read`,
      isFeatured: a.is_featured,
      isTrending: a.is_trending,
    }));
  } catch (err) {
    return FEATURED_ARTICLES;
  }
}

/**
 * Fetch a single article by slug directly from Supabase.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        slug,
        summary,
        content_body,
        featured_image_url,
        video_url,
        reading_time_mins,
        published_at,
        is_featured,
        is_trending,
        authors ( id, display_name, avatar_url, bio, role_title )
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      // Fallback to local data
      return FEATURED_ARTICLES.find((a) => a.slug === slug) || null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      summary: data.summary || "",
      content: data.content_body || "",
      coverImage:
        data.featured_image_url ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
      videoUrl: data.video_url,
      category: { name: "Expedition", slug: "expedition" },
      tags: ["Travel", "Adventure", "Knowledge"],
      author: {
        id: (data.authors as any)?.id || "a0000000-0000-0000-0000-000000000001",
        name: (data.authors as any)?.display_name || "Editorial Desk",
        avatar:
          (data.authors as any)?.avatar_url ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: (data.authors as any)?.role_title || "Field Correspondent",
        bio: (data.authors as any)?.bio,
      },
      publishedAt: data.published_at ? new Date(data.published_at).toLocaleDateString() : "Recent",
      readingTime: `${data.reading_time_mins || 5} min read`,
      isFeatured: data.is_featured,
      isTrending: data.is_trending,
    };
  } catch (err) {
    return FEATURED_ARTICLES.find((a) => a.slug === slug) || null;
  }
}

/**
 * PostgreSQL Full-Text Search on articles via Supabase.
 */
export async function searchArticles(query: string): Promise<Article[]> {
  try {
    if (!query || query.trim().length === 0) {
      return getPublishedArticles();
    }

    const { data, error } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        slug,
        summary,
        content_body,
        featured_image_url,
        video_url,
        reading_time_mins,
        published_at,
        is_featured,
        is_trending,
        authors ( id, display_name, avatar_url, bio, role_title )
      `)
      .textSearch("search_vector", query.trim(), {
        type: "websearch",
        config: "english",
      })
      .eq("status", "published");

    if (error || !data || data.length === 0) {
      // Graceful fallback to client filtering
      const all = await getPublishedArticles();
      const q = query.toLowerCase();
      return all.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return data.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary || "",
      content: a.content_body || "",
      coverImage:
        a.featured_image_url ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
      videoUrl: a.video_url,
      category: { name: "Expedition", slug: "expedition" },
      tags: ["Travel", "Adventure"],
      author: {
        id: a.authors?.id || "a0000000-0000-0000-0000-000000000001",
        name: a.authors?.display_name || "Elena Vance",
        avatar:
          a.authors?.avatar_url ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: a.authors?.role_title || "Field Correspondent",
        bio: a.authors?.bio,
      },
      publishedAt: a.published_at ? new Date(a.published_at).toLocaleDateString() : "Recent",
      readingTime: `${a.reading_time_mins || 5} min read`,
      isFeatured: a.is_featured,
      isTrending: a.is_trending,
    }));
  } catch (err) {
    return getPublishedArticles();
  }
}

/**
 * Fetch destinations from Supabase.
 */
export async function getDestinations(): Promise<Destination[]> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return TOP_DESTINATIONS;
    }

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      region: d.region || "Global",
      country: d.name,
      image:
        d.cover_image_url ||
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      articleCount: 5,
      description: d.description || "",
    }));
  } catch (err) {
    return TOP_DESTINATIONS;
  }
}
