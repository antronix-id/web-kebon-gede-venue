"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { blogPostSchema, type BlogPostInput } from "@/lib/validations";
import { blogPosts as seedBlogs } from "@/lib/seed-data";
import type { BlogPost } from "@/types";

export async function getBlogPosts(statusFilter?: "published" | "draft" | "archived" | "all"): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    if (!statusFilter || statusFilter === "published") {
      return seedBlogs.filter((b) => b.status === "published");
    }
    if (statusFilter === "all") return seedBlogs;
    return seedBlogs.filter((b) => b.status === statusFilter);
  }

  const supabase = await createClient();
  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  } else if (!statusFilter) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching blog posts:", error);
    return seedBlogs.filter((b) => b.status === "published");
  }

  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return seedBlogs.find((b) => b.slug === slug) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  if (error || !data) {
    return seedBlogs.find((b) => b.slug === slug) || null;
  }

  return data as BlogPost;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return seedBlogs.find((b) => b.id === id) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error || !data) return null;

  return data as BlogPost;
}

export async function createBlogPost(input: BlogPostInput) {
  const result = blogPostSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: "Validasi data artikel gagal", issues: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
      .from("blog_posts")
      .insert({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        cover_image_url: data.cover_image_url || null,
        author_name: data.author_name || "Admin Kebon Gede",
        status: data.status,
        tags: data.tags || [],
        published_at: data.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true, data: created };
  }

  return { success: true, data: { id: "blog-" + Date.now(), ...data } };
}

export async function updateBlogPost(id: string, input: Partial<BlogPostInput>) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const updateData: any = {
      ...input,
      updated_at: new Date().toISOString(),
    };

    if (input.status === "published") {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true, data };
  }

  return { success: true, data: { id, ...input } };
}

export async function deleteBlogPost(id: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}
