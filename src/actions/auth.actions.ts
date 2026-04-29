"use server";

import { cookies } from "next/headers";
import { getBaseUrl } from "@/lib/api";

export async function loginAction(credentials: any) {
  try {
    const response = await fetch(`${getBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Login failed" };
    }

    const { accessToken, refreshToken, user } = result.data;
    const cookieStore = await cookies();

    // Set Access Token (1 hour)
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    // Set Refresh Token (30 days)
    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return { success: true };
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  try {
    const response = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (response.ok && result.data?.accessToken) {
      const { accessToken } = result.data;
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
      return accessToken;
    }
  } catch (error) {
    console.error("Refresh Token Error:", error);
  }

  // If refresh fails, clear cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return null;
}
