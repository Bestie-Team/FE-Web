import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";
import useFriends from "../friends/hooks/useFriends";

export default function FriendsSlider() {
  const router = useRouter();
  const { data } = useFriends();
  if (!data) return;

  return (
    <div className="w-max-[430px] pl-[20px] overflow-scroll no-scrollbar">
      <Spacing size={16} />
      <Flex>
        <AddFriendItem
          onClick={() => {
            router.push("/friends/search");
          }}
        />
        {data.map((friend, i) => {
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
