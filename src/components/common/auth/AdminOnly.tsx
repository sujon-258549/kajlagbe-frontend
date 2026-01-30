"use client";

import React from "react";

// Simulated user role for now.
// In a real app, this would come from an AuthContext or Redux store.
const mockUser = {
  role: "superadmin" as "superadmin" | "admin" | "user",
};

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A wrapper component that only renders its children if the user
 * has 'superadmin' or 'admin' privileges.
 */
export const AdminOnly: React.FC<AdminOnlyProps> = ({
  children,
  fallback = null,
}) => {
  const isAdmin = mockUser.role === "superadmin" || mockUser.role === "admin";

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AdminOnly;
