"use server";

import { fetchWithAuth } from "@/lib/api";

export async function getDashboardOverview() {
  try {
    const res = await fetchWithAuth("/dashboard/overview");
    return res.json();
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    return {
      success: false,
      message: "Failed to fetch dashboard overview",
      data: null,
    };
  }
}
