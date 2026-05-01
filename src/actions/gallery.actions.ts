"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createGallery(payload: any) {
  try {
    const res = await fetchWithAuth("/gallery", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/blog");
    return result;
  } catch (error) {
    console.error("Error creating gallery:", error);
    return { success: false, message: "Failed to create gallery", data: null };
  }
}

export async function getAllGalleries(query?: Record<string, any>) {
  try {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    const res = await fetchWithAuth(`/gallery${queryString ? `?${queryString}` : ""}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return { success: false, message: "Failed to fetch galleries", data: [] };
  }
}

export async function getSingleGallery(id: string) {
  try {
    const res = await fetchWithAuth(`/gallery/${id}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return { success: false, message: "Failed to fetch gallery", data: null };
  }
}

export async function updateGallery(id: string, payload: any) {
  try {
    const res = await fetchWithAuth(`/gallery/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/blog");
    return result;
  } catch (error) {
    console.error("Error updating gallery:", error);
    return { success: false, message: "Failed to update gallery", data: null };
  }
}

export async function deleteGallery(id: string) {
  try {
    const res = await fetchWithAuth(`/gallery/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/blog");
    return result;
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return { success: false, message: "Failed to delete gallery", data: null };
  }
}

export async function updateGalleryStatus(id: string, status: boolean) {
  try {
    const res = await fetchWithAuth(`/gallery/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/blog");
    return result;
  } catch (error) {
    console.error("Error updating gallery status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}
