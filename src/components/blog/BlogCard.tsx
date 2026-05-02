"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Calendar } from "lucide-react";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post }: BlogCardProps) {
  const coverSrc =
    (post as any)?.cover?.url ||
    post.image ||
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800";

  const authorAvatar =
    (post.author as any)?.avatar ||
    (post.author as any)?.profile?.photo ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin";

  const authorName =
    (post as any).authorName ||
    (typeof post.author === "object"
      ? (post.author as any)?.profile?.name || (post.author as any)?.mobile
      : post.author) ||
    "Admin";

  const rawDate =
    (post as any).publishedAt || (post as any).createdAt || post.date;

  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl">
      {/* Cover Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Category Badge */}
          {post.category && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary shadow-sm backdrop-blur">
              {post.category}
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Meta: Date */}
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block">
          <h4 className="line-clamp-2 text-lg font-bold leading-snug text-secondary transition-colors duration-200 group-hover:text-primary md:text-xl">
            {post.title}
          </h4>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 md:pt-5">
          {/* Author */}
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100">
              <Image
                src={authorAvatar}
                alt={authorName}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-800">
                {authorName}
              </p>
              <p className="text-[11px] text-slate-400">Author</p>
            </div>
          </div>

          {/* Read More */}
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-secondary transition-all duration-200 hover:gap-2 hover:text-primary md:text-sm"
          >
            Read More
            <MoveRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}