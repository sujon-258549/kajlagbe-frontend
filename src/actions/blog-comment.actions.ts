"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createBlogComment(data: any) {
  try {
    const res = await fetchWithAuth("/blog-comment", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath(`/blog/${data.blogSlug}`);
    }
    return result;
  } catch (error) {
    console.error("Error creating blog comment:", error);
    return { success: false, message: "Failed to create comment", data: null };
  }
}

export async function getCommentsByBlogSlug(
  slug: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    const res = await fetchWithAuth(
      `/blog-comment/blog/${slug}?page=${page}&limit=${limit}`,
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    return { success: false, message: "Failed to fetch comments", data: [] };
  }
}

export async function getAllBlogComments() {
  try {
    const res = await fetchWithAuth("/blog-comment");
    return res.json();
  } catch (error) {
    console.error("Error fetching all blog comments:", error);
    return { success: false, message: "Failed to fetch comments", data: [] };
  }
}

export async function deleteBlogComment(id: string) {
  try {
    const res = await fetchWithAuth(`/blog-comment/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error deleting blog comment:", error);
    return { success: false, message: "Failed to delete comment", data: null };
  }
}
