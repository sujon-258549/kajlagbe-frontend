"use client";

import Image from "next/image";
import Heading3 from "../common/Headings/Heading3";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 space-y-8">
      <Heading3 className="font-bold text-secondary">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </Heading3>
      
      <div className="space-y-8">
        {comments.map((item) => (
          <div key={item.id} className="flex gap-4 md:gap-6 pb-8 border-b border-slate-100 last:border-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 flex items-center justify-center text-secondary font-bold text-lg overflow-hidden relative">
                 {/* Fallback for avatar */}
                 <span className="relative z-10">{item.name.charAt(0).toUpperCase()}</span>
                 {/* You could use a generic avatar image here if desired */}
              </div>
            </div>
            
            <div className="flex-grow space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-secondary text-base md:text-lg">{item.name}</h4>
                <span className="text-xs md:text-sm text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {item.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
