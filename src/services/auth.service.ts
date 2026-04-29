import { fetchWithAuth, getBaseUrl } from "@/lib/api";

export const AuthService = {
  getMe: async () => {
    const res = await fetchWithAuth("/auth/me");
    if (!res.ok) return null;
    return res.json();
  },

  // Add other auth related services here
};
