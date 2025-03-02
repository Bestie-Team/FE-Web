"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function FriendsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="bg-grayscale-50 h-full">
      <div className={clsx("max-w-[430px] fixed w-full z-1 bg-grayscale-50")}>
        <FriendsPageHeader label="친구 요청" />
      </div>
      <SentReceivedFriendRequestsList />
    </div>
  );
}
