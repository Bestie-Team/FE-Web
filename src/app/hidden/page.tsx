"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState, useRecoilValue } from "recoil";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import { Suspense, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Modal from "@/components/shared/Modal/Modal";
import useDisplayFeed from "@/components/feeds/hooks/useDisplayFeed";
import { bottomSheetStateAtom, selectedFeedIdAtom } from "@/atoms/feed";
import { lightyToast } from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import Spacing from "@/components/shared/Spacing";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import FeedCard from "@/components/feeds/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import { FeedSkeleton } from "@/components/shared/Skeleton/FeedSkeleton";
import CommentContainer from "@/components/shared/Comment/CommentContainer";
import { MENU_CONFIGS } from "@/constants/menu-configs";
import MODAL_CONFIGS from "@/constants/modal-configs";
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import { selectedCommentIdAtom } from "@/atoms/comment";
import Report from "@/components/shared/Modal/Report/Report";
import useReport from "@/components/report/hooks/useReport";

export default function FeedPage() {
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
  const selectedFeedId = useRecoilValue(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);
  const [report, setReport] = useRecoilState(reportInfoAtom);
  const [selectedFeedWriter, setSelectedFeedWriter] = useState("");
  const [feedId, setFeedId] = useState("");
  const queryClient = useQueryClient();
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  const {
    data: hiddenFeed,
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 10 });

  const displaySuccessHandler = async (message: string) => {
    lightyToast.success(message);
    Promise.all([
      await queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/hidden"],
      }),
    ]);
  };

  const { mutate: displayFeed } = useDisplayFeed({
    feedId: selectedFeedId,
    onSuccess: displaySuccessHandler,
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId: commentId,
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      });
    },
  });

  const { mutate: reportComment } = useReport({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      });
    },
    onError: (e) => {
      lightyToast.error(e.message);
    },
  });

  useInfiniteScroll({ isFetching, loadMore });

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };
  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { openedBoxId, fBtnRef, friendsRef, toggleBox, closeBox } =
    useFriendsBox();

  if (!hiddenFeed || hiddenFeed.length === 0) {
    return <div>숨김 피드가 없어요</div>;
  }

  return (
    <div
      className="min-h-dvh"
      onClick={(e) => {
        closeDropdown(e);
        closeBox();
      }}
      onMouseDown={(e) => {
        closeDropdown(e);
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
              <FeedCard
                feed={feed}
                onClick={() => {
                  setFeedId(feed.id);
                  setSelectedFeedWriter(feed.writer.accountId);
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
                    ref={dropDownRef}
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
      </Suspense>
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
          selectedFeedWriter={selectedFeedWriter}
          onClose={() => setBottomSheetState(false)}
        />
      )}
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={
            modalState.type === "displayFeed"
              ? () => displayFeed()
              : () => deleteComment()
          }
          onClose={closeModal}
        />
      )}
      {reportModal.isOpen === true && (
        <Report
          setReport={setReport}
          report={report}
          handleReport={() => {
            reportComment(report);
            setReportModal((prev) => ({ ...prev, isOpen: false }));
          }}
          onClose={() => setReportModal((prev) => ({ ...prev, isOpen: false }))}
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
