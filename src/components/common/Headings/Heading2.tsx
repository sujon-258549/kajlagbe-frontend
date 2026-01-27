import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading2 = ({ children, className }: HeadingProps) => {
  return (
    <h2
      className={cn("text-3xl md:text-4xl font-bold leading-tight", className)}
    >
      {children}
    </h2>
  );
};

export default Heading2;
