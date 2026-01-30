import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <div className="group">
      <div className="block overflow-hidden rounded-lg mb-6">
        <Skeleton className="aspect-4/3 w-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />

        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-24" />
        </div>
        
      </div>
    </div>
  );
}
