"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createReview(data: any) {
  try {
    const res = await fetchWithAuth("/review", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/services");
    }
    return result;
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "Failed to create review", data: null };
  }
}

export async function getAllReviews(query?: any) {
  try {
    const queryString = query ? new URLSearchParams(query).toString() : "";
    const res = await fetchWithAuth(`/review${queryString ? `?${queryString}` : ""}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: "Failed to fetch reviews", data: [] };
  }
}

export async function updateReview(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/review/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/services");
    }
    return result;
  } catch (error) {
    console.error("Error updating review:", error);
    return { success: false, message: "Failed to update review", data: null };
  }
}

export async function deleteReview(id: string) {
  try {
    const res = await fetchWithAuth(`/review/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/services");
    }
    return result;
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, message: "Failed to delete review", data: null };
  }
}
