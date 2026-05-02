"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Heading3 from "../common/Headings/Heading3";
import Heading4 from "../common/Headings/Heading4";
import { getCommentsByBlogSlug } from "@/actions/blog-comment.actions";
import { Button } from "../ui/button";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface CommentListProps {
  initialComments: Comment[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  blogSlug: string;
}

export default function CommentList({
  initialComments,
  meta,
  blogSlug,
}: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [currentPage, setCurrentPage] = useState(meta.page);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(comments.length < meta.total);

  // Update state if initialComments change (e.g. on new comment revalidation)
  useEffect(() => {
    setComments(initialComments);
    setHasMore(initialComments.length < meta.total);
    setCurrentPage(meta.page);
  }, [initialComments, meta]);

  const handleShowMore = async () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const res = await getCommentsByBlogSlug(blogSlug, nextPage, meta.limit);
      if (res.success && Array.isArray(res.data)) {
        const newComments = res.data;
        setComments((prev) => [...prev, ...newComments]);
        setCurrentPage(nextPage);
        setHasMore([...comments, ...newComments].length < meta.total);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (!comments || (comments.length === 0 && meta.total === 0)) {
    return null;
  }

  // Helper to get a consistent color for the avatar based on the name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-purple-100 text-purple-600",
      "bg-emerald-100 text-emerald-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
      "bg-indigo-100 text-indigo-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-3">
        <Heading4 className="font-bold text-secondary text-base md:text-lg">
          {meta.total} {meta.total === 1 ? "Comment" : "Comments"}
        </Heading4>
        <div className="h-px flex-grow bg-slate-100" />
      </div>

      <div className="space-y-4">
        {comments.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 md:gap-4 p-4 rounded-lg bg-gray-50 border border-gray-300"
          >
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-base shadow-inner ${getAvatarColor(item.name)}`}
              >
                {item.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="flex-grow space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-secondary text-sm md:text-base">
                    {item.name}
                  </h4>
                  <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Verified
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-medium text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs md:text-sm whitespace-pre-line">
                {item.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleShowMore}
            disabled={isLoadingMore}
            className="border-gray-300 text-secondary hover:bg-slate-50 min-w-[140px] font-bold"
          >
            {isLoadingMore ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}
