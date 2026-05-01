"use server";

import { fetchWithAuth } from "@/lib/api";

export async function createContact(data: any) {
  try {
    const res = await fetchWithAuth("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating contact:", error);
    return { success: false, message: "Failed to send message", data: null };
  }
}
