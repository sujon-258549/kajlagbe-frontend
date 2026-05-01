"use server";

import { fetchWithAuth } from "@/lib/api";
import { TSubCategory, TSubCategoryResponse } from "@/types/subCategory";

/**
 * Create a new subcategory
 */
export async function createSubCategory(data: Partial<TSubCategory>) {
  try {
    const res = await fetchWithAuth("/sub-category", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      console.error("Create SubCategory Failed:", result);
    }
    return result as Promise<TSubCategoryResponse<TSubCategory>>;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return { success: false, message: "Failed to create subcategory", data: null };
  }
}

/**
 * Get all subcategories
 */
export async function getAllSubCategory() {
  try {
    const res = await fetchWithAuth("/sub-category");
    const result = await res.json();
    if (!res.ok) {
      console.error("Fetch SubCategories Failed:", result);
    }
    return result as Promise<TSubCategoryResponse<TSubCategory[]>>;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return { success: false, message: "Failed to fetch subcategories", data: [] };
  }
}

/**
 * Get subcategory by ID
 */
export async function getSubCategoryById(id: string) {
  try {
    const res = await fetchWithAuth(`/sub-category/${id}`);
    return res.json() as Promise<TSubCategoryResponse<TSubCategory>>;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return { success: false, message: "Failed to fetch subcategory", data: null };
  }
}

/**
 * Update subcategory
 */
export async function updateSubCategory(id: string, data: Partial<TSubCategory>) {
  try {
    const res = await fetchWithAuth(`/sub-category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      console.error("Update SubCategory Failed:", result);
    }
    return result as Promise<TSubCategoryResponse<TSubCategory>>;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return { success: false, message: "Failed to update subcategory", data: null };
  }
}

/**
 * Update subcategory status
 */
export async function updateSubCategoryStatus(id: string) {
  try {
    const res = await fetchWithAuth(`/sub-category/${id}/status`, {
      method: "PATCH",
    });
    return res.json() as Promise<TSubCategoryResponse<TSubCategory>>;
  } catch (error) {
    console.error("Error updating subcategory status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}

/**
 * Delete subcategory
 */
export async function deleteSubCategory(id: string) {
  try {
    const res = await fetchWithAuth(`/sub-category/${id}`, {
      method: "DELETE",
    });
    return res.json() as Promise<TSubCategoryResponse<null>>;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return { success: false, message: "Failed to delete subcategory", data: null };
  }
}
