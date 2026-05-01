"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createBlog(data: any) {
  const res = await fetchWithAuth("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (res.ok) revalidatePath("/");
  return result;
}

export async function getAllBlogs(query?: string) {
  const url = query ? `/blog?${query}` : "/blogs";
  const res = await fetchWithAuth(url);
  return res.json();
}

export async function getBlogById(id: string) {
  const res = await fetchWithAuth(`/blog/${id}`);
  return res.json();
}

export async function updateBlog(id: string, data: any) {
  const res = await fetchWithAuth(`/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (res.ok) revalidatePath("/");
  return result;
}

export async function deleteBlog(id: string) {
  const res = await fetchWithAuth(`/blog/${id}`, {
    method: "DELETE",
  });
  const result = await res.json();
  if (res.ok) revalidatePath("/");
  return result;
}

export async function updateBlogStatus(id: string, status: boolean) {
  const res = await fetchWithAuth(`/blog/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  const result = await res.json();
  if (res.ok) revalidatePath("/");
  return result;
}
