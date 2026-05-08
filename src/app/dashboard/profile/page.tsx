"use client";

import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import Heading4 from "@/components/common/Headings/Heading4";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { updateUser, changePassword } from "@/services/user/userService";
import { uploadToCloudinary } from "@/lib/imageUpload";
import {
  profileSchema,
  changePasswordSchema,
  ProfileFormData,
  ChangePasswordFormData,
} from "@/schemas/profile/profile.schema";

const PLACEHOLDER_AVATAR =
  "https://placehold.co/400x400/154d2e/FFFFFF/png?text=U";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const { user, refreshUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormData>,
    defaultValues: { name: "", email: "", mobile: "", photo: "" },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(
      changePasswordSchema,
    ) as Resolver<ChangePasswordFormData>,
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!user) return;
    const next = {
      name: user.profile?.name ?? user.name ?? "",
      email: user.email ?? "",
      mobile: user.profile?.mobile ?? user.mobile ?? "",
      photo: user.profile?.photo ?? user.photo ?? "",
    };
    profileForm.reset(next);
    setPhotoUrl(next.photo);
  }, [user, profileForm]);

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setPhotoUrl(url);
      profileForm.setValue("photo", url, { shouldDirty: true });
      toast.success("Photo uploaded");
    } catch {
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSaveProfile = async (values: ProfileFormData) => {
    if (!user?.id) {
      toast.error("Not signed in");
      return;
    }
    const res = await updateUser(user.id, {
      user: { email: values.email, mobile: values.mobile },
      profile: { name: values.name, photo: values.photo || undefined },
    });
    if (res?.success) {
      toast.success("Profile updated");
      await refreshUser();
    } else {
      toast.error(res?.message || "Update failed");
    }
  };

  const onChangePassword = async (values: ChangePasswordFormData) => {
    const res = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    if (res?.success) {
      toast.success("Password changed");
      passwordForm.reset();
    } else {
      toast.error(res?.message || "Failed to change password");
    }
  };

  const displayName =
    user?.profile?.name || user?.name || profileForm.getValues("name") || "User";
  const displayEmail = user?.email || "";
  const displayRole = user?.role?.role || "Regular User";

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
          type="button"
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
          type="button"
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
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-slate-100">
                <Image
                  src={photoUrl || PLACEHOLDER_AVATAR}
                  alt={displayName}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  unoptimized={!!photoUrl}
                />
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-secondary text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-bold text-secondary">
                {displayName}
              </h3>
              <p className="text-slate-500 text-sm font-semibold">
                {displayEmail}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] pt-2">
                {displayRole}
              </p>
            </div>
          </div>

          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onSaveProfile)}
              className="space-y-6 pt-6 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <FormInput
                          placeholder="Your full name"
                          error={profileForm.formState.errors.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <FormInput
                          type="email"
                          placeholder="you@example.com"
                          error={profileForm.formState.errors.email}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <FormInput
                          placeholder="+880 1XXX XXXXXX"
                          error={profileForm.formState.errors.mobile}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={profileForm.formState.isSubmitting}
                  className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
                >
                  {profileForm.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-2xl">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onChangePassword)}
              className="space-y-6"
            >
              <FormField
                control={passwordForm.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <FormInput
                        type="password"
                        placeholder="••••••••"
                        error={passwordForm.formState.errors.oldPassword}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <FormInput
                        type="password"
                        placeholder="••••••••"
                        error={passwordForm.formState.errors.newPassword}
                        {...field}
                      />
                    </FormControl>
                    <p className="text-[10px] text-slate-400 font-semibold pl-1 italic">
                      Password must be at least 8 characters long.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <FormInput
                        type="password"
                        placeholder="••••••••"
                        error={passwordForm.formState.errors.confirmPassword}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={passwordForm.formState.isSubmitting}
                  className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
                >
                  {passwordForm.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
