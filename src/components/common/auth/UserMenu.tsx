"use client";

import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const profilePhoto = user?.profile?.photo || user?.photo;
  const userName = user?.profile?.name || user?.name || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 cursor-pointer group">
          <Avatar className="h-10 w-10 border  border-secondary transition-all">
            <AvatarImage src={profilePhoto} alt={userName} />
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">{userName}</span>
            <span className="text-xs text-slate-500 font-normal">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => logout()}
          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50 flex items-center gap-2"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
