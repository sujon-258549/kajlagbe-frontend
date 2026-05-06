"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
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
    ? new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const excerpt = post.excerpt || (post as any).description;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-7 pt-7 md:px-3 md:pb-8 md:pt-8">
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="line-clamp-2 text-[19px] font-bold leading-[1.35] text-[#0F1B2D] transition-colors duration-200 group-hover:text-secondary md:text-[20px]">
            {post.title}
          </h3>
        </Link>

        {excerpt && (
          <p className="mt-4 line-clamp-2 text-[15px] leading-relaxed text-slate-500">
            {excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src={authorAvatar}
                alt={authorName}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <p className="truncate text-[15px] font-semibold text-[#0F1B2D]">
              {authorName}
            </p>
          </div>

          {formattedDate && (
            <span className="shrink-0 text-[15px] text-slate-400">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
