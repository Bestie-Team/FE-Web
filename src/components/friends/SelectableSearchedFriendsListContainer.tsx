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

export default function SelectableSearchedFriendsListContainer({
  debouncedSearch,
  action,
}: {
  debouncedSearch: string;
  action: () => void;
}) {
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setFriendsToShare = useSetRecoilState<lighty.User[] | []>(
    friendsToShareAtom
  );
  const { data: searchedFriends, isFetching } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
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

  return (
    <Flex
      direction="column"
      className="px-5 pb-[72px] gap-3"
      style={{
        backgroundColor: "#F4F4F4",
      }}
    >
      <span className="text-T5">{`친구 ${searchedFriends.length}`}</span>
      <ul>
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
      <FixedBottomButton
        label={"공유없이 시작하기"}
        onClick={handleSubmitSelection}
      />
    </Flex>
  );
}
