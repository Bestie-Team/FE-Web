import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";

export default function FriendsSlider() {
  const router = useRouter();
  return (
    <div className="w-full">
      <Spacing size={16} />
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            router.push("/friends/add");
          }}
        />
        {Array.from({ length: 10 }, () => 1).map((_, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <FriendItem />
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
