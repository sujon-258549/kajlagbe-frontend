import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading4 = ({ children, className }: HeadingProps) => {
  return (
    <h4
      className={cn("text-2xl md:text-3xl font-bold leading-tight", className)}
    >
      {children}
    </h4>
  );
};

export default Heading4;
