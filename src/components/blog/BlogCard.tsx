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
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-5 space-y-4">
        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block">
          <h4 className="text-xl  font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h4>
        </Link>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-bold text-gray-700">
            {post.author.name}
          </span>
        </div>

        {/* Footer: Date & Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-semibold text-gray-500">
            {post.date}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            Read More <MoveRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
