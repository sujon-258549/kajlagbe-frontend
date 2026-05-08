"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Send,
  Settings,
  LogOut,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Heading5 from "../common/Headings/Heading5";
import { useAuth } from "@/context/AuthContext";

type MenuItem = {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles?: string[];
};

const menuItems: MenuItem[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Blog List", href: "/dashboard/blog-list", icon: Newspaper },
  { name: "My Jobs", href: "/dashboard/my-works", icon: Briefcase, roles: ["USER"] },
  {
    name: "My Applications",
    href: "/dashboard/my-applications",
    icon: Send,
    roles: ["WORKER"],
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = (user?.role?.role || user?.role || "").toString().toUpperCase();
  const isPrivileged = role === "ADMIN" || role === "SUPER_ADMIN";

  const visibleItems = menuItems.filter(
    (item) => !item.roles || isPrivileged || item.roles.includes(role),
  );

  return (
    <div
      className={cn(
        "w-full lg:w-72 bg-secondary border border-white/10 rounded-xl flex flex-col sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden shadow-xl",
        className,
      )}
    >
      <div className="p-8 border-b border-white/5">
        <Heading5 className="text-white font-semibold">User Dashboard</Heading5>
        <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mt-1.5">
          Welcome Back, Sujon
        </p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-md transition-all font-semibold text-[13px] tracking-wide group",
                isActive
                  ? "bg-white text-secondary shadow-lg shadow-black/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-secondary"
                    : "text-white/40 group-hover:text-white",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/10">
        <button className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-red-400 font-bold text-[13px] hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer group">
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </div>
  );
}
