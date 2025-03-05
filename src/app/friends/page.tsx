"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";

export default function FriendsPage() {
  return (
    <div className="bg-grayscale-50 h-dvh">
      <div className={"max-w-[430px] fixed w-full z-1 bg-grayscale-50"}>
        <FriendsPageHeader label="친구 요청" />
      </div>
      <SentReceivedFriendRequestsList />
    </div>
  );
}
