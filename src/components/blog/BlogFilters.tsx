"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: { id: string; name: string }[];
  className?: string;
}

export default function BlogFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  className,
}: BlogFiltersProps) {
  return (
    <div
      className={cn(
        "py-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4",
        className
      )}
    >
      {/* Search Input */}
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search blogs by title, keywords..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9 h-11 border-slate-200 bg-slate-50/50 focus:bg-white transition-all rounded-lg"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Select */}
      <div className="w-full md:w-[220px]">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 rounded-lg focus:ring-secondary/20">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-medium pl-3">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem 
                key={cat.id} 
                value={cat.name}
                className="pl-3 data-[state=checked]:bg-secondary data-[state=checked]:text-white focus:bg-secondary/10"
              >
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
