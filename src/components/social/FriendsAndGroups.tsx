"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import Panel from "@/components/shared/Panel/Panel";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import DotSpinner from "../shared/Spinner/DotSpinner";
import UserFriendsListContainer from "../friends/UserFriendsListContainer";
import clsx from "clsx";

const Groups = dynamic(() => import("@/components/groups/Group"), {
  ssr: false,
  loading: () => <DotSpinner />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
    const tabParam = searchParams?.get("tab");
    if (tabParam) {
      setSelectedTab(tabParam === "group" ? "2" : "1");
      router.replace("/social");
    }
  }, [searchParams, setSelectedTab, isClient]);

  const renderTabContent = useMemo(() => {
    if (selectedTab === "1") {
      return <UserFriendsListContainer />;
    } else return <Groups />;
  }, [selectedTab]);

  return (
    <>
      <div
        className={clsx(
          "w-full bg-base-white fixed px-5 mt-12",
          window.ReactNativeWebView ? "pt-safe-top" : ""
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
      <div className="h-dvh pt-[87px] pb-14">{renderTabContent}</div>
    </>
  );
}
