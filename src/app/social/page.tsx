"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import GroupListSkeleton from "@/components/shared/Skeleton/GroupListSkeleton";
import { SocialHeader } from "@/components/shared/Header/ScrollAwareHeader";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";

const Groups = dynamic(() => import("@/components/groups/Group"), {
  ssr: false,
  loading: () => <GroupListSkeleton />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam) {
      setSelectedTab(tabParam === "group" ? "2" : "1");
      router.replace("/social");
    }
  }, [searchParams, setSelectedTab]);

  return (
    <div className="h-dvh pt-safe-top overflow-y-scroll no-scrollbar">
      <SocialHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="pt-[87px] pb-14">
        {selectedTab === "1" ? <UserFriendsListContainer /> : <Groups />}
      </div>
    </div>
  );
}
