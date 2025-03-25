import React, { useState } from "react";
import useSearchFriends from "./hooks/useSearchFriends";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import * as lighty from "lighty-type";

import FixedBottomButton from "../shared/Button/FixedBottomButton";
import { useSetRecoilState } from "recoil";
import { friendsToShareAtom } from "@/atoms/record";
import clsx from "clsx";

export default function SelectableSearchedFriendsListContainer({
  className,
  debouncedSearch,
  action,
}: {
  className?: string;
  debouncedSearch: string;
  action: () => void;
}) {
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setFriendsToShare = useSetRecoilState<lighty.User[] | []>(
    friendsToShareAtom
  );
  const { data: searchedFriends, isFetching } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 1,
  });

  const toggleItemClick = (idx: number) => {
    setClickedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  if (isFetching || !searchedFriends) return <DotSpinnerSmall />;

  const handleSubmitSelection = () => {
    const clickedFriends = clickedItems.map((idx) => searchedFriends[idx]);
    setFriendsToShare(clickedFriends);
    action?.();
  };

  const getLabel = () => {
    if (clickedItems.length == 0) return "공유 없이 시작하기";
    return `${clickedItems.length}명 선택 완료`;
  };

  return (
    <Flex
      direction="column"
      className={(clsx("px-5 pb-[72px] gap-3"), className)}
      style={{
        backgroundColor: "#F4F4F4",
      }}
    >
      <span className="text-T5" id="selectableFriendList">{`친구 ${
        searchedFriends ? searchedFriends.length : 0
      }`}</span>
      <Spacing size={12} />
      <ul aria-labelledby="selectableFriendList">
        {searchedFriends.map((friendItem, idx) => {
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
      <FixedBottomButton label={getLabel()} onClick={handleSubmitSelection} />
    </Flex>
  );
}
