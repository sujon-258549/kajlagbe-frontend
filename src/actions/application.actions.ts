"use server";

import { fetchWithAuth } from "@/lib/api";



export async function createApplication(payload: any) {
  try {
    const res = await fetchWithAuth("/application", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false, message: "Failed to submit application", data: null };
  }
}

export async function getMyApplications(
  query: Record<string, string | number | boolean | undefined> = {},
) {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });
    const qs = params.toString();
    const res = await fetchWithAuth(`/application${qs ? `?${qs}` : ""}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { success: false, message: "Failed to fetch applications", data: [] };
  }
}
