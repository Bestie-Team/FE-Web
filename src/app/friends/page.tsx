import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import clsx from "clsx";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import { Suspense } from "react";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function FriendsPage() {
  return (
    <div className="bg-grayscale-50 h-full">
      <Suspense fallback={<DotSpinner />}>
        <div className={clsx("max-w-[430px] fixed w-full z-1 bg-grayscale-50")}>
          <FriendsPageHeader label="친구 요청" />
        </div>
        <SentReceivedFriendRequestsList />
      </Suspense>
    </div>
  );
}
