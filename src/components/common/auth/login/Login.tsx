"use client";

import Link from "next/link";
import CustomImage from "@/components/common/CustomImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

// Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email or Mobile is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginAction({
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        // Successful login
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 my-12 md:my-16">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4  rounded-md">
        <div className="w-full h-full flex items-center bg-secondary rounded-xl p-8">
          <div className="relative w-full aspect-square">
            <CustomImage
              src="/images/logo/sign.png"
              alt="login-image"
              fill
              className="object-contain"
              wrapperClassName="w-full h-full"
            />
          </div>
        </div>

        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
              <h1 className="text-secondary text-3xl font-bold">Sign in</h1>
              <p className="text-[15px] mt-6 text-slate-600">
                Don,t have an account{" "}
                <Link
                  href="/register"
                  className="text-secondary font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="text-slate-900 text-[13px] font-medium block mb-2">
                Email or Mobile
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("email")}
                  type="text"
                  className={`w-full text-secondary text-sm border-b ${
                    errors.email ? "border-red-500" : "border-slate-300"
                  } focus:border-secondary pl-2 pr-8 py-3 outline-none`}
                  placeholder="Enter email or mobile"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-8">
              <label className="text-slate-900 text-[13px] font-medium block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`w-full text-secondary text-sm border-b ${
                    errors.password ? "border-red-500" : "border-slate-300"
                  } focus:border-secondary pl-2 pr-8 py-3 outline-none`}
                  placeholder="Enter password"
                />
                <div
                  className="absolute right-2 cursor-pointer text-slate-400 hover:text-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="flex items-center">
                <input
                  {...register("rememberMe")}
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-secondary focus:ring-secondary border-slate-300 rounded-sm"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-900"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  href="/forgot-password"
                  className="text-secondary font-medium text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-secondary hover:bg-secondary/90 focus:outline-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-900 text-center">or</p>
              <hr className="w-full border-slate-300" />
            </div>

            <div className="space-x-8 flex justify-center">
              {/* Social login buttons (logic can be added later) */}
              <button type="button" className="border-0 outline-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 512 512">
                   <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                   <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                   <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                   <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                   <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                   <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                </svg>
              </button>
              <button type="button" className="border-0 outline-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="#000" viewBox="0 0 22.773 22.773">
                   <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" />
                </svg>
              </button>
              <button type="button" className="border-0 outline-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="#007bff" viewBox="0 0 167.657 167.657">
                   <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
