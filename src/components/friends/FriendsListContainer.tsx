import React, { useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import Modal from "../shared/modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recordModalStateAtom } from "@/atoms/record";
import FRIENDS from "@/constants/friends";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import { FriendInfo } from "@/models/friend";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRouter } from "next/navigation";

export default function FriendsListContainer({
  paddingTop,
}: {
  paddingTop?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(recordModalStateAtom);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setSelectedFriends =
    useSetRecoilState<FriendInfo[]>(selectedFriendsAtom);
  const userFriends = FRIENDS;

  const router = useRouter();

  const toggleItemClick = (idx: number) => {
    setClickedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const handleSubmitClickedFriends = () => {
    const clickedFriends = clickedItems.map((idx) => userFriends[idx]);
    setSelectedFriends(clickedFriends);
    router.back();
  };

  return (
    <Flex
      direction="column"
      style={{
        backgroundColor: "#F4F4F4",
        paddingTop: paddingTop ?? "177px",
        paddingBottom: "60px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <span className="text-T5">{`친구 ${userFriends.length}`}</span>
      <Spacing size={12} />
      <ul>
        {userFriends.map((friendItem, idx) => {
          return (
            <React.Fragment key={`${friendItem}${idx}`}>
              <FriendListItem
                friendInfo={friendItem}
                idx={idx}
                type="basic"
                onClick={() => {
                  toggleItemClick(idx);
                }}
                clicked={clickedItems.includes(idx)}
              />
              <Spacing size={16} />
            </React.Fragment>
          );
        })}
      </ul>
      <FixedBottomButton
        label={`${clickedItems.length}명 선택 완료`}
        disabled={clickedItems.length < 1}
        onClick={handleSubmitClickedFriends}
      />
      {isModalOpen ? (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </Flex>
  );
}
