"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showPrevNext?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showPrevNext = true,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages) {
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  const handlePageChange = (page: number | string) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page as number);
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-2 mt-12", className)}
    >
      {showPrevNext && (
        <button
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-lg border border-slate-200 transition-all",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-400"
              : "hover:border-[#86b86b] hover:text-[#86b86b] bg-white text-slate-700 cursor-pointer",
          )}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="w-10 text-center text-slate-400 font-bold"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all cursor-pointer",
                page === currentPage
                  ? "bg-[#154d2e] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-[#86b86b] hover:text-[#86b86b]",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {showPrevNext && (
        <button
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-lg border border-slate-200 transition-all",
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-400"
              : "hover:border-[#86b86b] hover:text-[#86b86b] bg-white text-slate-700 cursor-pointer",
          )}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
