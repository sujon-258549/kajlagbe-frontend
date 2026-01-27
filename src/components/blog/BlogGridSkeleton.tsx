import BlogSkeleton from "./BlogSkeleton";

export default function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}
