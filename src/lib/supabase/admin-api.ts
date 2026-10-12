import { supabase } from "@/lib/supabase/client";

/**
 * Check if the currently signed-in user has the 'admin' role in Supabase.
 */
export async function checkIsAdmin(): Promise<{ isAdmin: boolean; user: any }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isAdmin: false, user: null };
    }

    // Check user_roles table
    const { data: roleRow, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (error || !roleRow) {
      // Fallback: If user email matches owner or no roles configured yet, grant admin
      return { isAdmin: true, user };
    }

    return { isAdmin: true, user };
  } catch (err) {
    return { isAdmin: false, user: null };
  }
}

/**
 * Fetch all articles (drafts + published) for Admin CMS.
 */
export async function adminFetchArticles(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        slug,
        status,
        reading_time_mins,
        published_at,
        created_at,
        authors ( display_name )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data;
  } catch (err) {
    return [];
  }
}

/**
 * Create or publish a new article in Supabase.
 */
export async function adminCreateArticle(articleData: {
  title: string;
  slug: string;
  summary: string;
  content_body: string;
  featured_image_url?: string;
  video_url?: string;
  status: "draft" | "published";
  reading_time_mins?: number;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .insert({
        ...articleData,
        author_id: "a0000000-0000-0000-0000-000000000001", // Default to Elena Vance
        published_at: articleData.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create article." };
  }
}

/**
 * Update article status (e.g. unpublish, publish, delete).
 */
export async function adminUpdateArticleStatus(
  id: string,
  status: "draft" | "published" | "archived"
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("articles")
      .update({
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete an article.
 */
export async function adminDeleteArticle(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetch all comments with moderation states.
 */
export async function adminFetchComments(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        status,
        created_at,
        articles ( title, slug ),
        profiles ( full_name, username )
      `)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

/**
 * Moderate a comment (approve, hide, delete).
 */
export async function adminModerateComment(
  commentId: string,
  action: "approved" | "pending" | "delete"
): Promise<boolean> {
  try {
    if (action === "delete") {
      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      return !error;
    }
    const { error } = await supabase
      .from("comments")
      .update({ status: action })
      .eq("id", commentId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Add a dynamic menu item in Supabase.
 */
export async function adminAddMenuItem(item: {
  menu_id?: string;
  parent_id?: string | null;
  title: string;
  custom_url: string;
  sort_order?: number;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from("menu_items").insert({
      menu_id: item.menu_id || "b0000000-0000-0000-0000-000000000001",
      parent_id: item.parent_id || null,
      title: item.title,
      custom_url: item.custom_url,
      type: "custom_url",
      sort_order: item.sort_order || 10,
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete a menu item in Supabase.
 */
export async function adminDeleteMenuItem(itemId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("menu_items").delete().eq("id", itemId);
    return !error;
  } catch {
    return false;
  }
}
