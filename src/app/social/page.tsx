"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import { useMemo, useCallback, useEffect, useState } from "react";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";
import { PanelLength } from "@/components/shared/Panel/Panel";
import Panel from "@/components/shared/Panel/Panel";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import getHeader from "@/utils/getHeader";
import Groups from "@/components/groups/Group";

export default function SocialPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);
  const isPast = useScrollThreshold();
  const renderSelectedTabContent = useCallback(() => {
    // 친구
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <>
          <Spacing size={107} />
          <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
        </>
      ) : (
        <>
          <Spacing size={107} />
          <UserFriendsListContainer />
        </>
      );
    }
    // 그룹
    if (selectedTab === "2") {
      return <Groups />;
    }
    return null;
  }, [selectedTab, debouncedSearch]);

  const PanelProps = useMemo(
    () => ({
      title1: "친구",
      title2: "그룹",
      long: "short" as PanelLength,
      selectedTab,
      onClick: setSelectedTab,
    }),
    [selectedTab, setSelectedTab]
  );

  const header = useMemo(() => getHeader("/social"), []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="h-dvh">
      <div
        className={clsx(
          "max-w-[430px] fixed w-full z-1",
          isPast ? "shadow-bottom" : ""
        )}
      >
        {header}
        <div className="px-[20px] pt-12">
          <Panel {...PanelProps} year={false} />
          <Spacing size={20} />
        </div>
      </div>
      {renderSelectedTabContent()}
    </div>
  );
}
