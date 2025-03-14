"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState, useRecoilValue } from "recoil";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import { modalStateAtom } from "@/atoms/modal";
import Feed from "@/components/feeds/Feed";
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
  if (!hiddenFeed || hiddenFeed.length < 0) {
    return <div>숨김 피드가 없어요</div>;
  }
  return (
    <div className="min-h-dvh pt-safe-top">
      <HeaderWithBtn headerLabel="숨김 피드" bgColor="white">
        <div className={tabContainerStyle}>
          <div className={tabWrapperStyle}>
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
        <Feed
          feeds={hiddenFeed}
          onClickFeed={() => {}}
          isFetching={isFetching}
        />
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

const tabContainerStyle = "flex w-full px-5 justify-between items-center";
const tabWrapperStyle = "w-fit";
