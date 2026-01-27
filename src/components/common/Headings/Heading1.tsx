import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading1 = ({ children, className }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl font-medium leading-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Heading1;
