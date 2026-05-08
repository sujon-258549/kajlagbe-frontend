"use server";

import { fetchWithAuth } from "@/lib/api";

export async function getMyNotifications(
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
    const res = await fetchWithAuth(`/notification${qs ? `?${qs}` : ""}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      message: "Failed to fetch notifications",
      data: [],
    };
  }
}

export async function markNotificationRead(id: string) {
  try {
    const res = await fetchWithAuth(`/notification/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isRead: true }),
    });
    return res.json();
  } catch (error) {
    console.error("Error updating notification:", error);
    return { success: false, message: "Failed to mark as read", data: null };
  }
}

export async function markAllNotificationsRead() {
  try {
    const res = await fetchWithAuth(`/notification/mark-as-read`, {
      method: "PATCH",
      body: JSON.stringify({}),
    });
    return res.json();
  } catch (error) {
    console.error("Error marking all read:", error);
    return { success: false, message: "Failed to mark all as read", data: null };
  }
}

export async function deleteNotification(id: string) {
  try {
    const res = await fetchWithAuth(`/notification/${id}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, message: "Failed to delete", data: null };
  }
}
