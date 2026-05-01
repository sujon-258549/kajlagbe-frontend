"use server";

import { fetchWithAuth } from "@/lib/api";

export async function createProject(payload: any) {
  try {
    const res = await fetchWithAuth("/project", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, message: "Failed to create project", data: null };
  }
}

export async function getAllProjects(query?: Record<string, any>) {
  try {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    const res = await fetchWithAuth(`/project${queryString ? `?${queryString}` : ""}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, message: "Failed to fetch projects", data: [] };
  }
}

export async function getSingleProject(id: string) {
  try {
    const res = await fetchWithAuth(`/project/${id}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false, message: "Failed to fetch project", data: null };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const res = await fetchWithAuth(`/project/slug/${slug}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return { success: false, message: "Failed to fetch project", data: null };
  }
}

export async function updateProject(id: string, payload: any) {
  try {
    const res = await fetchWithAuth(`/project/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, message: "Failed to update project", data: null };
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await fetchWithAuth(`/project/${id}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Failed to delete project", data: null };
  }
}

export async function updateProjectStatus(id: string, status: boolean) {
  try {
    const res = await fetchWithAuth(`/project/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (error) {
    console.error("Error updating project status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}
