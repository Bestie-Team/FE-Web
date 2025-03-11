import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import Panel from "@/components/shared/Panel/Panel";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import clsx from "clsx";
import UserFriendsListContainer from "../friends/UserFriendsListContainer";
import GroupListSkeleton from "../shared/Skeleton/GroupListSkeleton";

const Groups = dynamic(() => import("@/components/groups/Group"), {
  ssr: false,
  loading: () => <GroupListSkeleton />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam) {
      setSelectedTab(tabParam === "group" ? "2" : "1");
      router.replace("/social");
    }
  }, [searchParams, setSelectedTab]);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return (
    <>
      <div
        className={clsx(
          "w-full bg-base-white fixed px-5 mt-12",
          isClient && window.ReactNativeWebView ? "pt-safe-top" : ""
        )}
      >
        <Panel
          title1="친구"
          title2="그룹"
          long="short"
          selectedTab={selectedTab}
          onClick={setSelectedTab}
          year={false}
        />
      </div>
      <div className="h-dvh pt-[87px] pb-14">
        {selectedTab === "1" ? <UserFriendsListContainer /> : <Groups />}
      </div>
    </>
  );
}
