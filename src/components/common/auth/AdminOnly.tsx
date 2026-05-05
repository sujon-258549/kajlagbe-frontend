"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  module?: string;
  permission?: string; // Optional: specific permission like 'CREATE', 'UPDATE', etc.
}

/**
 * A wrapper component that restricts visibility based on User Roles and Module Permissions.
 * - SUPER_ADMIN: Always has full access.
 * - Other Roles: Access is granted only if the specific 'module' and optional 'permission' match the user's assigned permissions.
 */
export const AdminOnly: React.FC<AdminOnlyProps> = ({
  children,
  fallback = null,
  module = "Update Content",
  permission = "CREATE",
}) => {
  const { user, isLoading } = useAuth();

  // Log permissions for debugging as requested
  React.useEffect(() => {
    if (user) {
      console.log("User Role:", user.role?.role);
      console.log("User Permissions:", user.role?.permissions);
    }
  }, [user]);

  if (isLoading) return null;

  const role = user?.role?.role;
  const isSuperAdmin = role === "SUPER_ADMIN";

  // Case-insensitive check for module and specific permission
  const checkPermission = () => {
    if (isSuperAdmin) return true;
    if (!module) return false;

    const moduleData = user?.role?.permissions?.find(
      (p: any) => p.module.toLowerCase() === module.toLowerCase()
    );

    if (!moduleData) return false;

    if (permission) {
      return moduleData.permissions.some(
        (p: string) => p.toLowerCase() === permission.toLowerCase()
      );
    }

    return true; // Has access to the module
  };

  const hasPermission = checkPermission();

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AdminOnly;
