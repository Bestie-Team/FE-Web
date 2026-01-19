"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import GroupListSkeleton from "@/components/shared/Skeleton/GroupListSkeleton";
import { SocialHeader } from "@/components/layout/Header/ScrollAwareHeader";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";

const Groups = dynamic(() => import("@/components/groups/Group"), {
  ssr: false,
  loading: () => <GroupListSkeleton />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const tabParam = searchParams?.get("tab");
  const derivedTab = tabParam ? (tabParam === "group" ? "2" : "1") : selectedTab;

  useEffect(() => {
    if (!tabParam) return;
    setSelectedTab(tabParam === "group" ? "2" : "1");
    router.replace("/social");
  }, [router, setSelectedTab, tabParam]);

  return (
    <div className="h-dvh pt-safe-top pb-safe-bottom">
      <SocialHeader selectedTab={derivedTab} setSelectedTab={setSelectedTab} />
      <div className="pt-[87px] pb-16">
        {derivedTab === "1" ? <UserFriendsListContainer /> : <Groups />}
      </div>
    </div>
  );
}
