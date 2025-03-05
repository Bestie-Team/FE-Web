"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

const SentReceivedFriendRequestsList = dynamic(
  () => import("@/components/friends/SentReceivedFriendRequestsList"),
  { ssr: false, loading: () => <DotSpinner /> }
);
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
