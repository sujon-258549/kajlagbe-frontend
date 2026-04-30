"use server";

import { fetchWithAuth } from "@/lib/api";

// Create User/Employ
export async function createEmploy(payload: any) {
  const res = await fetchWithAuth("/employ/create-employ", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Get All Users
export async function getAllUsers(query?: string) {
  const res = await fetchWithAuth(`/employ${query ? `?${query}` : ""}`);
  return res.json();
}

// Get My Data (Profile)
export async function getMyData() {
  const res = await fetchWithAuth("/employ/my-data");
  if (!res.ok) return { success: false, message: "Failed to fetch user data" };
  return res.json();
}

// Get User By ID
export async function getUserById(id: string) {
  const res = await fetchWithAuth(`/employ/${id}`);
  return res.json();
}

// Update User
export async function updateUser(id: string, payload: any) {
  const res = await fetchWithAuth(`/employ/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Change Password
export async function changePassword(payload: any) {
  const res = await fetchWithAuth("/employ/change-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Verify OTP
export async function verifyOtp(payload: { email: string; otp: string }) {
  const res = await fetchWithAuth("/employ/varify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Delete User (Permanent)
export async function deleteUser(id: string) {
  const res = await fetchWithAuth(`/employ/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Soft Delete User
export async function softDeleteUser(id: string) {
  const res = await fetchWithAuth(`/employ/${id}/soft-delete`, {
    method: "PATCH",
  });
  return res.json();
}

// Block User
export async function blockUser(id: string) {
  const res = await fetchWithAuth(`/employ/${id}/block`, {
    method: "PATCH",
  });
  return res.json();
}
