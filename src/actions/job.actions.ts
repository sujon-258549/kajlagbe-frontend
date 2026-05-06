"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

/**
 * Create a new job
 */
export async function createJob(data: any) {
  try {
    const res = await fetchWithAuth("/job", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/jobs");
      revalidatePath("/dashboard/jobs");
    }
    return result;
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, message: "Failed to create job", data: null };
  }
}

/**
 * Get all jobs
 */
export async function getAllJobs(queryObj?: Record<string, any>) {
  try {
    let url = "/job";
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
    console.error("Error fetching jobs:", error);
    return { success: false, message: "Failed to fetch jobs", data: [] };
  }
}

/**
 * Get job by ID or Slug
 */
export async function getJobByIdentifier(identifier: string) {
  try {
    const res = await fetchWithAuth(`/job/${identifier}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return { success: false, message: "Failed to fetch job", data: null };
  }
}

/**
 * Update job
 */
export async function updateJob(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/job/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/jobs");
      revalidatePath(`/jobs/${id}`);
      revalidatePath("/dashboard/jobs");
    }
    return result;
  } catch (error) {
    console.error("Error updating job:", error);
    return { success: false, message: "Failed to update job", data: null };
  }
}

/**
 * Delete job
 */
export async function deleteJob(id: string) {
  try {
    const res = await fetchWithAuth(`/job/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/jobs");
      revalidatePath("/dashboard/jobs");
    }
    return result;
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, message: "Failed to delete job", data: null };
  }
}

/**
 * Update job status (toggle)
 */
export async function updateJobStatus(id: string) {
  try {
    const res = await fetchWithAuth(`/job/${id}/status`, {
      method: "PATCH",
    });
    const result = await res.json();
    if (res.ok) {
      revalidatePath("/jobs");
      revalidatePath("/dashboard/jobs");
    }
    return result;
  } catch (error) {
    console.error("Error updating job status:", error);
    return { success: false, message: "Failed to update status", data: null };
  }
}
