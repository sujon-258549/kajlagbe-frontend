import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading6 = ({ children, className }: HeadingProps) => {
  return (
    <h6 className={cn("text-sm md:text-lg font-bold leading-tight", className)}>
      {children}
    </h6>
  );
};

export default Heading6;
