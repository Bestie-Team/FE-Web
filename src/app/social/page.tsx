import React, { memo } from "react";
import FriendsAndGroups from "@/components/social/FriendsAndGroups";
import SocialHeader from "@/components/social/SocialHeader";

const SocialContainer = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh">
      <SocialHeader />
      {children}
    </div>
  );
});

SocialContainer.displayName = "SocialContainer";

export default function SocialPage() {
  return (
    <SocialContainer>
      <FriendsAndGroups />
    </SocialContainer>
  );
}
