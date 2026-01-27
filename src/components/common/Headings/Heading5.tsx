import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading5 = ({ children, className }: HeadingProps) => {
  return (
    <h5 className={cn("text-lg md:text-xl font-bold leading-tight", className)}>
      {children}
    </h5>
  );
};

export default Heading5;
