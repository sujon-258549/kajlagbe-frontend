"use client";

import { useMemo, useState } from "react";
import { blogPosts } from "@/data/blogData";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import BlogGridSkeleton from "./BlogGridSkeleton";

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);

    // Simulate loading for better UX feel
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 min-h-[600px]">
      {isLoading ? (
        <BlogGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}

    <div className="flex justify-center">
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> 
    </div>
    </div>
  );
}
