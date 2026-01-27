"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lock, Camera } from "lucide-react";
import Image from "next/image";
import Heading4 from "@/components/common/Headings/Heading4";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>Profile Settings</Heading4>
        <p className="text-slate-500 font-medium">
          Manage your personal information and security.
        </p>
      </div>

      <div className="flex border-b border-gray-200 gap-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${
            activeTab === "profile"
              ? "text-secondary"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          General Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`pb-4 text-sm font-semibold uppercase tracking-widest transition-all relative ${
            activeTab === "password"
              ? "text-secondary"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Change Password
          {activeTab === "password" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-t-full" />
          )}
        </button>
      </div>

      {activeTab === "profile" ? (
        <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-10">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                <Image
                  src="https://placehold.co/400x400/154d2e/FFFFFF/png?text=S"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-secondary text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all cursor-pointer">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-bold text-secondary">Sujon Ahmed</h3>
              <p className="text-slate-500 text-sm font-semibold">
                sujon@example.com
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] pt-2">
                Regular User
              </p>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Full Name
              </label>
              <Input
                className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none shadow-none transition-all"
                defaultValue="Sujon Ahmed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Email Address
              </label>
              <Input
                className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none shadow-none transition-all"
                defaultValue="sujon@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <Input
                className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none shadow-none transition-all"
                placeholder="+880 1XXX XXXXXX"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Website (Optional)
              </label>
              <Input
                className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none shadow-none transition-all"
                placeholder="https://yoursite.com"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Bio / Information
              </label>
              <Textarea
                rows={4}
                className="bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none min-h-[120px] shadow-none transition-all"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <Button
                size="lg"
                className="px-10 rounded-lg bg-secondary hover:opacity-90 font-bold tracking-wide"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-2xl">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none pr-12 shadow-none"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                New Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none pr-12 shadow-none"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold pl-1 italic">
                Password must be at least 8 characters long.
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  className="h-12 bg-gray-50/50 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none pr-12 shadow-none"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>
            <div className="pt-4">
              <Button
                size="lg"
                className="px-10 rounded-lg bg-orange-600 hover:bg-orange-700 font-bold tracking-wide"
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
