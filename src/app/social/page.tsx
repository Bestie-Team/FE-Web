"use client";
import React, { Suspense } from "react";
import FriendsAndGroups from "@/components/social/FriendsAndGroups";
import SocialHeader from "@/components/social/SocialHeader";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function SocialPage() {
  return (
    <div className="h-dvh">
      <SocialHeader />
      <Suspense fallback={<DotSpinner />}>
        <FriendsAndGroups />
      </Suspense>
    </div>
  );
}
