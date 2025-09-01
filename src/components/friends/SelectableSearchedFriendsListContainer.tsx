import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import * as lighty from "lighty-type";

import useSearchFriends from "./hooks/useSearchFriends";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import { friendsToShareAtom } from "@/atoms/record";

interface SelectableSearchedFriendsListContainerProps {
  className?: string;
  debouncedSearch: string;
  action: () => void;
}

export default function SelectableSearchedFriendsListContainer({
  className,
  debouncedSearch,
  action,
}: SelectableSearchedFriendsListContainerProps) {
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setFriendsToShare = useSetRecoilState<lighty.User[] | []>(
    friendsToShareAtom
  );

  const { data: searchedFriends, isFetching } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 1,
  });

  const toggleItemClick = useCallback((idx: number) => {
    setClickedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  }, []);

  const handleSubmitSelection = useCallback(() => {
    if (!searchedFriends) return;
    const clickedFriends = clickedItems.map((idx) => searchedFriends[idx]);
    setFriendsToShare(clickedFriends);
    action?.();
  }, [clickedItems, searchedFriends, setFriendsToShare, action]);

  const getLabel = () =>
    clickedItems.length === 0
      ? "공유 없이 시작하기"
      : `${clickedItems.length}명 선택 완료`;

  return (
    <Flex
      direction="column"
      className={clsx("px-5 pb-[72px] gap-3", className)}
      style={{ backgroundColor: "#F4F4F4" }}
    >
      <span className="text-T5" id="selectableFriendList">
        친구 {searchedFriends?.length ?? 0}
      </span>

      {isFetching ? (
        <Flex justify="center" className="py-10">
          <DotSpinnerSmall />
        </Flex>
      ) : (
        <ul aria-labelledby="selectableFriendList">
          {searchedFriends?.map((friendItem, idx) => (
            <React.Fragment key={friendItem.accountId}>
              <FriendListItem
                friendInfo={friendItem}
                idx={idx}
                type="select"
                onClick={() => toggleItemClick(idx)}
                clicked={clickedItems.includes(idx)}
              />
              <Spacing size={16} />
            </React.Fragment>
          ))}
        </ul>
      )}

      <FixedBottomButton
        label={getLabel()}
        className="mb-safe-bottom"
        bgColor="bg-grayscale-50"
        onClick={handleSubmitSelection}
      />
    </Flex>
  );
}
