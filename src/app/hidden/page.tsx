"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState, useRecoilValue } from "recoil";
import clsx from "clsx";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import getHeader from "@/utils/getHeader";
import { feedDisplayModalAtom } from "@/atoms/modal";
import Feed from "@/components/feeds/Feed";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useEffect, useMemo, useState } from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Modal from "@/components/shared/Modal/Modal";
import useDisplayFeed from "@/components/feeds/hooks/useDisplayFeed";
import { selectedFeedIdAtom } from "@/atoms/feed";

export default function FeedPage() {
  const [isClient, setIsClient] = useState(false);
  const header = useMemo(() => getHeader("/hidden"), []);
  const isPast = useScrollThreshold();
  const [feedHideModalOpen, setFeedDisplayModalOpen] =
    useRecoilState(feedDisplayModalAtom);
  const selectedFeedId = useRecoilValue(selectedFeedIdAtom);
  const {
    data: hiddenFeed,
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 10 });

  const { mutate: displayFeed } = useDisplayFeed({ feedId: selectedFeedId });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useInfiniteScroll({ isFetching, loadMore });

  if (!isClient) return <FullPageLoader />;

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
          {feedHideModalOpen && (
            <Modal
              title="피드 숨김을 해제할까요?"
              left="취소"
              right="해제"
              action={displayFeed}
              onClose={() => setFeedDisplayModalOpen(false)}
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
