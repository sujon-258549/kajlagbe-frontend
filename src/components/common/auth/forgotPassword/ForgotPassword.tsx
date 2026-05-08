"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import CustomImage from "@/components/common/CustomImage";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "@/actions/auth.actions";
import { useAuth } from "@/context/AuthContext";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});
type EmailValues = z.infer<typeof emailSchema>;

const resetSchema = z
  .object({
    otp: z.string().min(4, "Enter the OTP code"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type ResetValues = z.infer<typeof resetSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [step, setStep] = useState<0 | 1>(0);
  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSendOtp = async (values: EmailValues) => {
    setServerError(null);
    const res = await forgotPasswordAction(values.email);
    if (res.success) {
      setEmail(values.email);
      setStep(1);
    } else {
      setServerError(res.message || "Failed to send OTP. Try again.");
    }
  };

  const onReset = async (values: ResetValues) => {
    setServerError(null);
    const res = await resetPasswordAction({
      email,
      otp: values.otp,
      password: values.password,
    });
    if (res.success) {
      await refreshUser();
      router.push("/dashboard");
      router.refresh();
    } else {
      setServerError(res.message || "Invalid OTP or request failed.");
    }
  };

  const inputBase =
    "w-full text-secondary text-sm border-b focus:border-secondary pl-2 pr-10 py-3 outline-none transition-colors";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 my-12 md:my-16">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 box_shadow rounded-xl bg-white">
        {/* Left: Brand panel */}
        <div className="w-full h-full flex items-center bg-secondary rounded-xl p-8">
          <div className="relative w-full aspect-square">
            <CustomImage
              src="/images/logo/sign.png"
              alt="forgot-password-image"
              fill
              className="object-contain"
              wrapperClassName="w-full h-full"
            />
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:max-w-md w-full px-4 py-4">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                {step === 0 ? (
                  <ShieldCheck className="text-secondary w-6 h-6" />
                ) : (
                  <Lock className="text-secondary w-6 h-6" />
                )}
              </div>
              <h1 className="text-secondary text-3xl font-bold">
                {step === 0 ? "Recover Password" : "New Credentials"}
              </h1>
            </div>
            <p className="text-[15px] text-slate-600">
              {step === 0
                ? "Enter your email and we'll send you an OTP code to reset your password."
                : `We've sent a 6-digit code to ${email}. Enter it below along with your new password.`}
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {serverError}
            </div>
          )}

          {step === 0 ? (
            <form onSubmit={emailForm.handleSubmit(onSendOtp)}>
              <div>
                <label className="text-slate-900 text-[13px] font-medium block mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    {...emailForm.register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputBase} ${
                      emailForm.formState.errors.email
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                  />
                  <Mail className="absolute right-2 w-4 h-4 text-slate-400" />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="w-full py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-secondary hover:bg-secondary/90 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {emailForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    "Send OTP Code"
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="text-slate-500 text-sm font-medium hover:text-secondary transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </div>
            </form>
          ) : (
            <form
              onSubmit={resetForm.handleSubmit(onReset)}
              className="space-y-7"
            >
              <div>
                <label className="text-slate-900 text-[13px] font-medium block mb-2">
                  OTP Code
                </label>
                <input
                  {...resetForm.register("otp")}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="••••••"
                  className={`w-full text-secondary border-b focus:border-secondary px-2 py-3 outline-none text-center text-xl font-black tracking-[0.5em] bg-slate-50 rounded-md ${
                    resetForm.formState.errors.otp
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                {resetForm.formState.errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {resetForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-slate-900 text-[13px] font-medium block mb-2">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...resetForm.register("password")}
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter new password"
                    className={`${inputBase} ${
                      resetForm.formState.errors.password
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-2 cursor-pointer text-slate-400 hover:text-secondary"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {resetForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {resetForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-slate-900 text-[13px] font-medium block mb-2">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...resetForm.register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-type new password"
                    className={`${inputBase} ${
                      resetForm.formState.errors.confirmPassword
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-2 cursor-pointer text-slate-400 hover:text-secondary"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {resetForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {resetForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={resetForm.formState.isSubmitting}
                  className="w-full py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-secondary hover:bg-secondary/90 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {resetForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Reset & Sign In
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setServerError(null);
                    resetForm.reset();
                    setStep(0);
                  }}
                  className="text-slate-500 text-sm font-medium hover:text-secondary transition-colors"
                >
                  Change Email Address?
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
