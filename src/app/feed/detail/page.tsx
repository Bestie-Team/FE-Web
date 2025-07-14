"use client";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import { User } from "lighty-type";
import Flex from "@/components/shared/Flex";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import FeedCard from "@/components/feeds/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import { MENU_CONFIGS } from "@/constants/menu-configs";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import { bottomSheetStateAtom, selectedFeedIdAtom } from "@/atoms/feed";
import useFeedDetail from "@/components/feeds/hooks/useFeedDetail";
import { useCallback } from "react";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import FeedPageSkeleton from "@/components/shared/Skeleton/FeedSkeleton";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import ModalWithReport from "@/components/shared/ModalWithReport";
import useFeed from "@/components/feeds/hooks/useFeed";

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function FeedDetailPage() {
  const searchParams = useSearchParams();
  const { userInfo } = useAuth();
  const id = searchParams.get("id");

  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);

  const { data: selectedFeed, isFetching } = useFeedDetail({
    id: id || "",
  });

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { deleteFeed, deleteComment, hideFeed, report } = useFeed();

  const handleFeedSelect = useCallback(
    (feedId: string) => {
      setSelectedFeedId(feedId);
    },
    [setSelectedFeedId]
  );

  if (!selectedFeed) {
    return <FeedPageSkeleton />;
  }

  return (
    <Flex direction="column" className="w-full min-h-dvh">
      <HeaderWithBtn headerLabel="피드 상세" fontColor="black" />
      <div className={styles.feedWrapper}>
        {/**바로 아래의 pb를 높일수록 스크롤에 빨리 반응 */}
        <div className="pt-safe-top pb-14">
          <div
            className="mb-8"
            onClick={(e) => {
              closeDropdown(e);
              closeBox();
            }}
            onMouseDown={(e) => {
              closeDropdown(e);
              closeBox();
            }}
          >
            <div key={id} className="relative">
              <FeedCard
                feed={selectedFeed}
                onClick={() => {
                  if (id) {
                    handleFeedSelect(id);
                  }
                }}
              >
                <InfoBar
                  ref={fBtnRef}
                  onClick={(e) => {
                    if (id) {
                      e.stopPropagation();
                      toggleBox(id);
                    }
                  }}
                  withMembers={selectedFeed.withMembers}
                  feed={selectedFeed}
                />
                <div className="absolute top-11 right-14" ref={friendsRef}>
                  {openedBoxId === id && (
                    <FriendsInfoContainer
                      withMembers={selectedFeed.withMembers}
                      isOpen={openedBoxId === id}
                    />
                  )}
                </div>
              </FeedCard>
              <div
                style={{ width: 24, height: 24 }}
                className={styles.optionWithDropdownContainer}
              >
                <div
                  ref={btnRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(selectedFeed.id);
                    setSelectedFeedId(selectedFeed.id);
                  }}
                >
                  <OptionsSelectIcon />
                </div>
                {openedDropdownId === selectedFeed.id && (
                  <FeedDropdownMenu
                    feed={selectedFeed}
                    ref={dropDownRef}
                    menuItems={
                      MENU_CONFIGS[
                        selectedFeed.writer.accountId === userInfo?.accountId
                          ? "feed_mine"
                          : "feed"
                      ].menuItems
                    }
                    className={
                      MENU_CONFIGS[
                        selectedFeed.writer.accountId === userInfo?.accountId
                          ? "feed_mine"
                          : "feed"
                      ].className
                    }
                  />
                )}
              </div>
            </div>
            {isFetching && <DotSpinnerSmall />}
          </div>
        </div>
      </div>

      {bottomSheetState && id && (
        <CommentContainer
          selectedFeedId={id}
          onClose={() => setBottomSheetState(false)}
        />
      )}

      <ModalWithReport
        onReport={report}
        deleteFeed={deleteFeed}
        deleteComment={deleteComment}
        hideFeed={hideFeed}
      />
    </Flex>
  );
}

const styles = {
  feedWrapper: "h-full overflow-y-scroll no-scrollbar pt-12 pb-14",
  optionWithDropdownContainer:
    "absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1",
};
