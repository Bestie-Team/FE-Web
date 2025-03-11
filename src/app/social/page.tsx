"use client";
import React, { Suspense } from "react";
import FriendsAndGroups from "@/components/social/FriendsAndGroups";
import SocialHeader from "@/components/social/SocialHeader";
import SocialPageSkeleton from "@/components/shared/Skeleton/SocialPageSkeleton";

export default function SocialPage() {
  return (
    <div className="h-dvh">
      <SocialHeader />
      <Suspense fallback={<SocialPageSkeleton />}>
        <FriendsAndGroups />
      </Suspense>
    </div>
  );
}
