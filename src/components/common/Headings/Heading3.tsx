import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading3 = ({ children, className }: HeadingProps) => {
  return (
    <h3
      className={cn("text-3xl md:text-4xl font-bold leading-tight", className)}
    >
      {children}
    </h3>
  );
};

export default Heading3;
