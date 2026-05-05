"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createBlog(data: any) {
  try {
    const res = await fetchWithAuth("/blog", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/");
      revalidatePath("/blog");
    }
    return result;
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, message: "Failed to create blog", data: null };
  }
}

export async function getAllBlogs(queryObj?: Record<string, any>) {
  try {
    let url = "/blog";
    if (queryObj) {
      const params = new URLSearchParams();
      Object.entries(queryObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    const res = await fetchWithAuth(url);
    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, message: "Failed to fetch blogs", data: [] };
  }
}

export async function getBlogById(id: string) {
  try {
    const res = await fetchWithAuth(`/blog/${id}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: "Failed to fetch blog", data: null };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetchWithAuth(`/blog/${slug}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return { success: false, message: "Failed to fetch blog", data: null };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/");
      revalidatePath("/blog");
    }
    return result;
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, message: "Failed to update blog", data: null };
  }
}

export async function deleteBlog(id: string) {
  try {
    const res = await fetchWithAuth(`/blog/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/");
      revalidatePath("/blog");
    }
    return result;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, message: "Failed to delete blog", data: null };
  }
}

export async function updateBlogStatus(id: string, status: boolean) {
  try {
    const res = await fetchWithAuth(`/blog/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/");
      revalidatePath("/blog");
    }
    return result;
  } catch (error) {
    console.error("Error updating blog status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}
