import type React from "react";
// import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import FeedCard from "@/components/feeds/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import { MENU_CONFIGS } from "@/constants/menu-configs";
import { useSetRecoilState } from "recoil";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { UserInfoMini } from "../../shared/providers/AuthProvider";
import { FeedSkeleton } from "../../shared/Skeleton/FeedSkeleton";
import { Feed } from "@/models/feed";

interface FeedListProps {
  feeds: any[];
  userInfo: false | UserInfoMini | null;
  onFeedSelect: (feedId: string, feed: Feed) => void;
  isFetching: boolean;
  isMine?: boolean;
}

export const FeedList: React.FC<FeedListProps> = ({
  feeds,
  userInfo,
  onFeedSelect,
  isFetching,
  isMine = false,
}) => {
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();

  return (
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
      {feeds.map((feed) => (
        <div key={feed.id} className="relative">
          <FeedCard
            feed={feed}
            onClick={() => {
              onFeedSelect(feed.id, feed);
            }}
          >
            <InfoBar
              ref={fBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                toggleBox(feed.id);
              }}
              withMembers={feed.withMembers}
              feed={feed}
            />
            <div className="absolute top-11 right-14" ref={friendsRef}>
              {openedBoxId === feed.id && (
                <FriendsInfoContainer
                  withMembers={feed.withMembers}
                  isOpen={openedBoxId === feed.id}
                />
              )}
            </div>
          </FeedCard>

          <div
            style={{ width: 24, height: 24 }}
            className="absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1"
          >
            <button
              type="button"
              ref={btnRef}
              aria-label="피드 옵션"
              aria-haspopup="menu"
              aria-expanded={openedDropdownId === feed.id}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(feed.id);
                setSelectedFeedId(feed.id);
              }}
              className="flex justify-center items-center bg-transparent border-0 p-0"
            >
              <OptionsSelectIcon />
            </button>
            {openedDropdownId === feed.id && (
              <FeedDropdownMenu
                feed={feed}
                ref={dropDownRef}
                menuItems={
                  MENU_CONFIGS[
                    userInfo === false
                      ? "hidden"
                      : feed.writer.accountId === userInfo?.accountId || isMine
                      ? "feed_mine"
                      : "feed"
                  ].menuItems
                }
                className={
                  MENU_CONFIGS[
                    userInfo === false
                      ? "hidden"
                      : feed.writer.accountId === userInfo?.accountId || isMine
                      ? "feed_mine"
                      : "feed"
                  ].className
                }
              />
            )}
          </div>
        </div>
      ))}
      {isFetching && (
        <div className="relative">
          <FeedSkeleton />
          <DotSpinnerSmall className="absolute top-0 w-full" />
        </div>
      )}
    </div>
  );
};
