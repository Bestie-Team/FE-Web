"use client";

import FeedPageSkeleton from "@/components/shared/Skeleton/FeedSkeleton";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function Page() {
  return (
    <FeedPageSkeleton>
      <DotSpinner />
    </FeedPageSkeleton>
  );
}
