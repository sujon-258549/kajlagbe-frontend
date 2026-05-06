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

export async function getMyApplications() {
  try {
    const res = await fetchWithAuth("/application");
    return res.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { success: false, message: "Failed to fetch applications", data: [] };
  }
}
