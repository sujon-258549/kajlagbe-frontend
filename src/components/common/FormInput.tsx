import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

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
    { label, error, className, containerClassName, size = "md", ...props },
    ref,
  ) => {
    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
      sm: "h-8 text-xs",
      md: "h-9 text-sm",
      lg: "h-11 text-base",
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            className={cn(
              "font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {label}
          </label>
        )}
        <Input
          ref={ref}
          className={cn(
            "transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:scale-[1.01]",
            sizeClasses[size],
            error
              ? "border-red-500 focus-visible:ring-red-500/50"
              : "focus-visible:ring-secondary/50 border-slate-200 hover:border-secondary/50",
            className,
          )}
          {...props}
        />
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
