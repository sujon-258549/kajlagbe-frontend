"use server";

import { fetchWithAuth } from "@/lib/api";

export async function getMe() {
  const res = await fetchWithAuth("/auth/me");
  if (!res.ok) return null;
  return res.json();
}

// Add other auth related server actions here
