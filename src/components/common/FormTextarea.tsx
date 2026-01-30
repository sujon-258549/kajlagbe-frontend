import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError | undefined;
  containerClassName?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label className="font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm mb-3 inline-block">
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          className={cn(
            "min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:scale-[1.01]",
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

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
