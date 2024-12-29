import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";
import FRIENDS from "@/constants/friends";

export default function FriendsSlider() {
  const router = useRouter();
  const friends = FRIENDS;

  return (
    <div className="w-full pl-[20px]">
      <Spacing size={16} />
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            router.push("/friends/add");
          }}
        />
        {friends.map((friend, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <FriendItem friendInfo={friend} />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}

        <SeeMoreItem
          onClick={() => {
            console.log("친구를 추가하라");
          }}
        />
      </Flex>
    </div>
  );
}
