"use server";

import { fetchWithAuth } from "@/lib/api";
import { TCategory, TCategoryResponse } from "@/types/category";

/**
 * Create a new category
 */
export async function createCategory(data: Partial<TCategory>) {
  try {
    const res = await fetchWithAuth("/category", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json() as Promise<TCategoryResponse<TCategory>>;
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Failed to create category", data: null };
  }
}

/**
 * Get all categories
 */
export async function getAllCategory() {
  try {
    const res = await fetchWithAuth("/category");
    return res.json() as Promise<TCategoryResponse<TCategory[]>>;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Failed to fetch categories", data: [] };
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string) {
  try {
    const res = await fetchWithAuth(`/category/${id}`);
    return res.json() as Promise<TCategoryResponse<TCategory>>;
  } catch (error) {
    console.error("Error fetching category:", error);
    return { success: false, message: "Failed to fetch category", data: null };
  }
}

/**
 * Update category
 */
export async function updateCategory(id: string, data: Partial<TCategory>) {
  try {
    const res = await fetchWithAuth(`/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.json() as Promise<TCategoryResponse<TCategory>>;
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category", data: null };
  }
}

/**
 * Update category status
 */
export async function updateCategoryStatus(id: string) {
  try {
    const res = await fetchWithAuth(`/category/${id}/status`, {
      method: "PATCH",
    });
    return res.json() as Promise<TCategoryResponse<TCategory>>;
  } catch (error) {
    console.error("Error updating category status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}

/**
 * Delete category
 */
export async function deleteCategory(id: string) {
  try {
    const res = await fetchWithAuth(`/category/${id}`, {
      method: "DELETE",
    });
    return res.json() as Promise<TCategoryResponse<null>>;
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category", data: null };
  }
}
