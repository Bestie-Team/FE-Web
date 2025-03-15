"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState, useRecoilValue } from "recoil";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import { modalStateAtom } from "@/atoms/modal";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import { Suspense } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Modal from "@/components/shared/Modal/Modal";
import useDisplayFeed from "@/components/feeds/hooks/useDisplayFeed";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { lightyToast } from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import Spacing from "@/components/shared/Spacing";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import { MENU_CONFIGS } from "@/components/feeds/FeedOption";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import FeedCard from "@/components/feeds/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import { FeedSkeleton } from "@/components/shared/Skeleton/FeedSkeleton";

export default function FeedPage() {
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const selectedFeedId = useRecoilValue(selectedFeedIdAtom);
  const queryClient = useQueryClient();

  const {
    data: hiddenFeed,
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 10 });

  const displaySuccessHandler = async (message: string) => {
    lightyToast.success(message);
    await queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] });
  };

  const { mutate: displayFeed } = useDisplayFeed({
    feedId: selectedFeedId,
    onSuccess: displaySuccessHandler,
  });

  useInfiniteScroll({ isFetching, loadMore });

  const MODAL_CONFIGS = {
    displayFeed: {
      title: "피드 숨김을 해제할까요?",
      leftButton: "취소",
      rightButton: "해제",
      action: () => displayFeed(),
    },
  };

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };
  const { btnRef, toggleDropdown, openedDropdownId, ref, closeDropdown } =
    useDropdown();

  const { openedBoxId, c_ref, boxRef, toggleBox, closeBox } = useFriendsBox();

  if (!hiddenFeed || hiddenFeed.length < 0) {
    return <div>숨김 피드가 없어요</div>;
  }

  return (
    <div
      className="min-h-dvh pt-safe-top"
      onClick={() => {
        closeDropdown();
        closeBox();
      }}
      onTouchStart={() => {
        closeDropdown();
        closeBox();
      }}
    >
      <HeaderWithBtn headerLabel="숨김 피드" bgColor="white">
        <div className={styles.tabContainerStyle}>
          <div className={styles.tabWrapperStyle}>
            <TabButton
              title={`숨김 피드`}
              onMouseDown={() => {}}
              current={true}
              fresh={"never"}
            />
            <BottomLine />
          </div>
          <FilterBar />
        </div>
      </HeaderWithBtn>
      <Suspense>
        <Spacing size={96} />
        <div className={"pt-safe-top"}>
          {hiddenFeed.map((feed) => (
            <div key={feed.id} className="relative">
              <FeedCard feed={feed} onClick={() => {}}>
                <InfoBar
                  ref={boxRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBox(feed.id);
                  }}
                  withMembers={feed.withMembers}
                  feed={feed}
                />
                <div className="absolute top-11 right-14" ref={c_ref}>
                  {openedBoxId == feed.id && (
                    <FriendsInfoContainer
                      withMembers={feed.withMembers}
                      isOpen={openedBoxId === feed.id}
                    />
                  )}
                </div>
              </FeedCard>
              <div
                ref={btnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(feed.id);
                }}
                style={{ width: 24, height: 24 }}
                className={styles.optionWrapper}
              >
                <OptionsSelectIcon />
                {openedDropdownId === feed.id && (
                  <FeedDropdownMenu
                    feed={feed}
                    ref={ref}
                    menuItems={MENU_CONFIGS["hidden"].menuItems}
                    className={MENU_CONFIGS["hidden"].className}
                  />
                )}
              </div>
            </div>
          ))}
          <Spacing size={50} />
          {isFetching && <FeedSkeleton />}
        </div>

        {/* <Feed
          feeds={hiddenFeed}
          onClickFeed={() => {}}
          isFetching={isFetching}
        /> */}
      </Suspense>
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={MODAL_CONFIGS[modalState.type].action}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

const styles = {
  optionWrapper:
    "absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1",
  tabContainerStyle: "flex w-full px-5 justify-between items-center",
  tabWrapperStyle: "w-fit",
};
