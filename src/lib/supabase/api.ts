import { supabase } from "@/lib/supabase/client";
import {
  FEATURED_ARTICLES,
  NAVIGATION_MENU,
  TOP_DESTINATIONS,
} from "@/data/mock-data";
import { Article, MenuItem, Destination } from "@/types";

/**
 * Fetch dynamic navigation tree. Falls back to curated seed mock-data
 * if tables are initially empty in Supabase.
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

    // Build hierarchy (root items + submenus)
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
 * Fetch published articles from Supabase.
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
        id: a.authors?.id || "auth-1",
        name: a.authors?.display_name || "Editorial Desk",
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
    return FEATURED_ARTICLES;
  }
}

/**
 * Fetch single article by slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getPublishedArticles();
  return articles.find((a) => a.slug === slug) || null;
}
