"use server";

import { fetchWithAuth } from "@/lib/api";

export async function getServiceSlider() {
  try {
    const res = await fetchWithAuth("/service-slider");
    return res.json();
  } catch (error) {
    console.error("Error fetching service slider:", error);
    return { success: false, message: "Failed to fetch slider", data: null };
  }
}

export async function upsertServiceSlider(payload: any) {
  try {
    const res = await fetchWithAuth("/service-slider/upsert", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.error("Error upserting service slider:", error);
    return { success: false, message: "Failed to save slider", data: null };
  }
}
