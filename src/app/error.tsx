"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* Header Section (Matching the Green Theme) */}
      <div className="bg-secondary text-white py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
          Error
        </h1>
        <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>500 Error Page</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white space-y-6">
        <div className="relative mb-4">
          {/* Custom Error Illustration Representation */}
          <div className="text-[120px] font-bold text-secondary flex items-center justify-center leading-none">
            5<span className="text-[#86b86b] mx-1">0</span>0
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          Oops! Something went wrong
        </h2>

        <p className="text-slate-500 max-w-lg text-lg">
          We apologize for the inconvenience. The server encountered an
          unexpected condition that prevented it from fulfilling the request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => reset()}
            className="bg-secondary hover:bg-[#0f3a22] text-white px-8 py-6 text-base rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" /> Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-6 text-base rounded-md transition-all flex items-center gap-2"
          >
            <Link href="/">
              <Home className="w-5 h-5" /> Back To Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
