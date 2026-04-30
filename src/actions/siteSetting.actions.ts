"use server";

import { fetchWithAuth } from "@/lib/api";
import { TSiteSetting, TSiteSettingMap, TSiteSettingResponse } from "@/types/siteSetting";

/**
 * Get all settings as a key-value map (Public)
 */
export async function getSettingsMap() {
  try {
    const res = await fetchWithAuth("/site-settings/map");
    return res.json() as Promise<TSiteSettingResponse<TSiteSettingMap>>;
  } catch (error) {
    console.error("Error fetching settings map:", error);
    return { success: false, message: "Failed to fetch settings", data: {} };
  }
}

/**
 * Get settings by group (Public)
 */
export async function getSettingsByGroup(group: string) {
  try {
    const res = await fetchWithAuth(`/site-settings/group/${group}`);
    return res.json() as Promise<TSiteSettingResponse<TSiteSetting[]>>;
  } catch (error) {
    console.error(`Error fetching settings for group ${group}:`, error);
    return { success: false, message: "Failed to fetch group settings", data: [] };
  }
}

/**
 * Get all settings (Admin)
 */
export async function getAllSettings() {
  try {
    const res = await fetchWithAuth("/site-settings/all");
    return res.json() as Promise<TSiteSettingResponse<TSiteSetting[]>>;
  } catch (error) {
    console.error("Error fetching all settings:", error);
    return { success: false, message: "Failed to fetch all settings", data: [] };
  }
}

/**
 * Upsert a single setting (Admin)
 */
export async function upsertSetting(payload: { key: string; value: any; group?: string; description?: string }) {
  try {
    const res = await fetchWithAuth("/site-settings/upsert", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.json() as Promise<TSiteSettingResponse<TSiteSetting>>;
  } catch (error) {
    console.error("Error upserting setting:", error);
    return { success: false, message: "Failed to save setting", data: null as any };
  }
}

/**
 * Bulk upsert settings (Admin)
 */
export async function bulkUpsertSettings(settings: TSiteSetting[]) {
  try {
    const res = await fetchWithAuth("/site-settings/bulk-upsert", {
      method: "POST",
      body: JSON.stringify({ settings }),
    });
    return res.json() as Promise<TSiteSettingResponse<TSiteSetting[]>>;
  } catch (error) {
    console.error("Error bulk upserting settings:", error);
    return { success: false, message: "Failed to save settings", data: [] };
  }
}

/**
 * Delete a setting by key (Admin)
 */
export async function deleteSetting(key: string) {
  try {
    const res = await fetchWithAuth(`/site-settings/${key}`, {
      method: "DELETE",
    });
    return res.json() as Promise<TSiteSettingResponse<null>>;
  } catch (error) {
    console.error(`Error deleting setting ${key}:`, error);
  }
}

/**
 * Bulk delete settings (Admin)
 */
export async function bulkDeleteSettings(keys: string[]) {
  try {
    const res = await fetchWithAuth("/site-settings/bulk-delete", {
      method: "DELETE",
      body: JSON.stringify({ keys }),
    });
    return res.json() as Promise<TSiteSettingResponse<null>>;
  } catch (error) {
    console.error("Error bulk deleting settings:", error);
    return { success: false, message: "Failed to delete settings", data: null };
  }
}
