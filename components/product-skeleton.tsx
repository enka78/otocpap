import { Skeleton } from "@/components/ui/skeleton";

interface ProductSkeletonProps {
  view?: "grid" | "list";
}

export function ProductSkeleton({ view = "grid" }: ProductSkeletonProps) {
  if (view === "list") {
    return (
      <div className="flex gap-6 p-4 border rounded-lg">
        <Skeleton className="w-1/3 h-[200px] rounded-lg" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="w-full aspect-square rounded-lg" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
