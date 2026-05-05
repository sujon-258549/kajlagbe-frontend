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

export async function registerAction(payload: any) {
  try {
    const response = await fetch(`${getBaseUrl()}/employ/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Registration failed" };
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
    console.error("Registration Error:", error);
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

export async function getAllRolesAction() {
  try {
    const response = await fetch(`${getBaseUrl()}/role`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result.message || "Failed to fetch roles" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Fetch Roles Error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getAllSubCategoriesAction() {
  try {
    const response = await fetch(`${getBaseUrl()}/sub-category`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result.message || "Failed to fetch sub-categories" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Fetch SubCategories Error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getAllWorkTypesAction() {
  try {
    const response = await fetch(`${getBaseUrl()}/work-types`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result.message || "Failed to fetch work types" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Fetch WorkTypes Error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
