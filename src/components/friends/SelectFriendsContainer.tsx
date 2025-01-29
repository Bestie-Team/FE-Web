import React, { Dispatch, SetStateAction, useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import { newGroupMembersAtom, selectedFriendsAtom } from "@/atoms/friends";
import { gatheringModalStateAtom } from "@/atoms/gathering";
import * as lighty from "lighty-type";
import useFriends from "./hooks/useFriends";
import Modal from "../shared/Modal/Modal";

export default function SelectFriendsContainer({
  type = "default",
  paddingTop,
  action,
  setStep,
  isNew,
}: {
  type?: "default" | "record";
  paddingTop?: string;
  action?: () => void;
  setStep?: Dispatch<SetStateAction<number>>;
  isNew: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(gatheringModalStateAtom);
  const [countModal, setCountModal] = useState(false);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setFriendsToAdd = useSetRecoilState<lighty.User[] | []>(
    selectedFriendsAtom
  );
  const setFriendsToNewGroup = useSetRecoilState<lighty.User[] | []>(
    newGroupMembersAtom
  );

  const { data: friends } = useFriends();

  const toggleItemClick = (idx: number) => {
    if (clickedItems.length >= 10 && !clickedItems.includes(idx)) {
      setCountModal(true);
      return;
    }
    setClickedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const renderModal = () => {
    if (countModal) {
      return (
        <Modal
          action={() => {
            setStep?.(3);
          }}
          content="최대 10명 까지만 초대할 수 있어요."
          left="확인"
          onClose={() => setCountModal(false)}
        />
      );
    }

    if (isModalOpen) {
      return <Modal action={() => {}} onClose={() => setIsModalOpen(false)} />;
    }

    return null;
  };

  if (!friends) return;

  const handleSubmitSelection = () => {
    const clickedFriends = clickedItems.map((idx) => friends[idx]);
    setFriendsToAdd(clickedFriends);
    action?.();
  };

  const handleSubmitSelectionToNewGroup = () => {
    const clickedFriends = clickedItems.map((idx) => friends[idx]);
    setFriendsToNewGroup(clickedFriends);
    setStep?.(1);
  };

  const getLabel = () => {
    if (type == "record" && clickedItems.length == 0)
      return "공유 없이 시작하기";
    return `${clickedItems.length}명 선택 완료`;
  };

  return (
    <Flex
      direction="column"
      className="px-[20px] pb-[72px]"
      style={{
        backgroundColor: "#F4F4F4",
        paddingTop: paddingTop ?? "177px",
      }}
    >
      <span className="text-T5">{`친구 ${friends.length}`}</span>
      <Spacing size={12} />
      <ul>
        {friends.map((friendItem, idx) => {
          return (
            <React.Fragment key={`${friendItem.accountId}`}>
              <FriendListItem
                friendInfo={friendItem}
                idx={idx}
                type="select"
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
        bgColor="bg-grayscale-50"
        label={getLabel()}
        disabled={clickedItems.length < 1}
        onClick={
          isNew ? handleSubmitSelectionToNewGroup : handleSubmitSelection
        }
      />
      {renderModal()}
    </Flex>
  );
}
