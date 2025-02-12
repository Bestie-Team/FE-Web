"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState } from "recoil";
import clsx from "clsx";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import getHeader from "@/utils/getHeader";
import { recordModalAtom } from "@/atoms/modal";
import Feed from "@/components/feeds/Feed";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useEffect, useMemo, useState } from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function FeedPage() {
  const [isClient, setIsClient] = useState(false);
  const header = useMemo(() => getHeader("/hidden"), []);
  const isPast = useScrollThreshold();
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const {
    data: hiddenFeed,
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 2 });

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
          <Feed feeds={hiddenFeed} onClickFeed={() => {}} className="!pt-12" />
        </>
      )}

      {recordModalOpen ? (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] fixed z-10 flex w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "flex w-full px-5 justify-between items-center";
const tabWrapperStyle = "w-fit";
