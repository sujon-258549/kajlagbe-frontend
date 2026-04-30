import { config } from "@/components/config";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/actions/auth.actions";

/**
 * Base Fetcher for Server-Side requests
 */

export const getBaseUrl = () => {
  return config.apiBaseUrl || "http://localhost:4500/api";
};

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 1. Proactive Refresh: If access token is missing but refresh token exists, try to refresh first
  if (!accessToken && refreshToken) {
    console.log("🔄 [API] Access token missing. Attempting proactive refresh...");
    const newToken = await refreshAccessToken();
    if (newToken) {
      accessToken = newToken;
    }
  }

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  let response = await fetch(`${getBaseUrl()}${endpoint}`, {
    cache: "no-store",
    ...options,
    headers,
  });

  // 2. Reactive Refresh: If request fails with 401, try to refresh once and retry
  if (response.status === 401) {
    console.log("🔴 [API] 401 Unauthorized. Attempting reactive refresh...");
    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log("✅ [API] Token refreshed. Retrying request...");
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(`${getBaseUrl()}${endpoint}`, {
        ...options,
        headers,
      });
    } else {
      console.error("❌ [API] Refresh failed. Session expired.");
    }
  }

  return response;
};
