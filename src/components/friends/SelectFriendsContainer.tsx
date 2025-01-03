import React, { useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import Modal from "../shared/modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import FRIENDS from "@/constants/friends";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRouter } from "next/navigation";
import { gatheringModalStateAtom } from "@/atoms/gathering";
import { UserInfo } from "@/models/user";

export default function SelectFriendsContainer({
  paddingTop,
}: {
  paddingTop?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(gatheringModalStateAtom);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setSelectedFriends = useSetRecoilState<UserInfo[]>(selectedFriendsAtom);
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
        paddingBottom: "72px",
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
                type="invite"
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
