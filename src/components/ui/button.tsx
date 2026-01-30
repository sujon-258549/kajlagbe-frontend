import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-sm",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
        warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm",
        info: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
        dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200",
        "outline-primary":
          "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        "outline-secondary":
          "border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
        "soft-primary": "bg-primary/10 text-primary hover:bg-primary/20",
        "soft-secondary":
          "bg-secondary/10 text-secondary hover:bg-secondary/20",
        gradient:
          "bg-gradient-to-r from-primary to-orange-600 text-white hover:opacity-90 shadow-md border-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 rounded-xl text-base font-semibold",
        "2xl": "h-14 px-10 rounded-2xl text-lg font-bold tracking-wide",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-md": "size-10",
        "icon-lg": "size-12",
        "icon-xl": "size-14",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "xl",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "lg",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
