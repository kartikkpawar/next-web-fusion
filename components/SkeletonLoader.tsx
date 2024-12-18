import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function SkeletonLoader({
  length = 3,
  className,
}: {
  length?: number;
  className?: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {Array(length)
        .fill("")
        .map((i, index) => (
          <Skeleton
            className={cn("w-full h-[300px] rounded-lg", className)}
            key={index}
          />
        ))}
    </div>
  );
}
