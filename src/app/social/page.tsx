import React from "react";
import FriendsAndGroups from "@/components/social/FriendsAndGroups";
import SocialHeader from "@/components/social/SocialHeader";

export default function SocialPage() {
  return (
    <div className="h-dvh">
      <SocialHeader />
      <FriendsAndGroups />
    </div>
  );
}
