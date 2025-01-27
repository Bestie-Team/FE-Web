"use client";
import FilterBar from "@/components/shared/YearFilter";
// import CommentContainer from "@/components/shared/comments/CommentContainer";
import { useRecoilState } from "recoil";
// import { commentModalStateAtom } from "@/atoms/feed";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import getHeader from "@/utils/getHeader";
import { useRef } from "react";
import { recordModalAtom } from "@/atoms/modal";

export default function FeedPage() {
  const header = getHeader("/hidden");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  // const [commentModalOpen, setCommentModalOpen] = useRecoilState(
  //   commentModalStateAtom
  // );
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);

  return (
    <div
      ref={containerRef}
      className="overflow-y-scroll no-scrollbar pt-[48px]"
    >
      {header}
      <div
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        <div className="px-[20px]">
          <div
            style={{
              backgroundColor: "#fff",
            }}
            className={tabContainerStyle}
          >
            <div className={tabWrapperStyle}>
              <TabButton
                title={"숨김 피드 3"}
                onMouseDown={() => {}}
                current={true}
                fresh={"never"}
              />
              <BottomLine />
            </div>
          </div>
          <FilterBar />
        </div>
      </div>

      {/* <Feed which="1" /> */}

      {recordModalOpen ? (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
      {/* {commentModalOpen ? (
        <CommentContainer
          onClose={() => {
            setCommentModalOpen(false);
          }}
        />
      ) : null} */}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] fixed z-10 flex flex-col w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "max-w-[430px] w-full";
const tabWrapperStyle = "relative flex gap-[16px]";
