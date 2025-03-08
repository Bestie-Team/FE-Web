"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState, useRecoilValue } from "recoil";
import clsx from "clsx";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import getHeader from "@/utils/getHeader";
import { modalStateAtom } from "@/atoms/modal";
import Feed from "@/components/feeds/Feed";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useEffect, useMemo, useState } from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Modal from "@/components/shared/Modal/Modal";
import useDisplayFeed from "@/components/feeds/hooks/useDisplayFeed";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { lightyToast } from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function FeedPage() {
  const [isClient, setIsClient] = useState(false);
  const header = useMemo(() => getHeader("/hidden"), []);
  const isPast = useScrollThreshold();
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

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  useInfiniteScroll({ isFetching, loadMore });

  if (!isClient) return <FullPageLoader />;

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

  return (
    <div className="pt-12">
      {header}
      {!hiddenFeed ? (
        <FullPageLoader />
      ) : (
        <>
          <div
            className={clsx(filterWrapperStyle, isPast ? "shadow-bottom" : "")}
          >
            <div
              style={{
                backgroundColor: "#fff",
              }}
              className={tabContainerStyle}
            >
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
          </div>
          <Feed
            feeds={hiddenFeed}
            onClickFeed={() => {}}
            className="!pt-12"
            isFetching={isFetching}
          />
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
        </>
      )}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] fixed z-10 flex w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "flex w-full px-5 justify-between items-center";
const tabWrapperStyle = "w-fit";
