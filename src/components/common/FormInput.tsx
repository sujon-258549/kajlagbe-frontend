import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: FieldError | undefined;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, error, className, containerClassName, size = "md", type, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
      sm: "h-8 text-xs",
      md: "h-9 text-sm",
      lg: "h-11 text-base",
    };

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            className={cn(
              "font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          <Input
            ref={ref}
            type={inputType}
            className={cn(
              "global-input-style bg-white rounded-[6px]",
              sizeClasses[size],
              error
                ? "border-red-500 focus-visible:ring-red-500/50"
                : "focus-visible:ring-secondary/50",
              isPassword && "pr-10",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
