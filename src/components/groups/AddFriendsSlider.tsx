import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import FriendItem, { AddFriendItem } from "../home/FriendItem";
import { useRouter } from "next/navigation";
import { FriendInfo } from "@/models/friend";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRecoilValue } from "recoil";

export default function AddFriendsSlider() {
  const router = useRouter();
  const friends = useRecoilValue<FriendInfo[]>(selectedFriendsAtom);
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files as ArrayLike<File>);
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setImages((prev) => [...prev, ...newImages]);
  // };
  return (
    <div className="w-full">
      <Spacing size={16} />
      <Flex className="overflow-scroll no-scrollbar">
        {/* <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          /> */}
        <AddFriendItem onClick={() => router.push("/friends/invite")} />
        {/* </label> */}
        {friends.map((friend, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <FriendItem friendInfo={friend} />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}
