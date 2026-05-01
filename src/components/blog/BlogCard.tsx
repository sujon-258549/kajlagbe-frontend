"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-4/3 w-full">
          <Image
            src={(post as any)?.cover?.url || post.image || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4 md:p-6 space-y-4">
        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block">
          <h4 className="text-lg md:text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h4>
        </Link>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-100">
            <Image
              src={(post.author as any)?.avatar || (post.author as any)?.profile?.photo || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"}
              alt={(post.author as any)?.name || (post.author as any)?.profile?.name || "Author"}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs md:text-sm font-bold text-slate-700">
            {(post as any).authorName || 
             (typeof post.author === 'object' ? ((post.author as any)?.profile?.name || (post.author as any)?.mobile) : post.author) || 
             "Admin"}
          </span>
        </div>

        {/* Footer: Date & Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs md:text-sm font-medium text-slate-500">
            {post.date || (post as any).publishedAt || (post as any).createdAt ? 
              new Date((post as any).publishedAt || (post as any).createdAt || post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }) : "Unknown Date"}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            Read More <MoveRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
