"use client";
import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
import Feed from "../../components/feed/Feed";
import CommentContainer from "@/components/shared/comments/CommentContainer";
import { useRecoilState } from "recoil";
import { commentModalStateAtom } from "@/atoms/feed";
import BottomSheet from "@/components/shared/bottomSheet/BottomSheet";
import { recordModalStateAtom } from "@/atoms/record";
import HeaderReturner from "@/utils/headerReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TabButton from "@/components/shared/tab/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";

export default function FeedPage() {
  const hasShadow = useScrollShadow();
  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    commentModalStateAtom
  );
  const [recordModalOpen, setRecordModalOpen] =
    useRecoilState(recordModalStateAtom);

  return (
    <div className="relative">
      <div
        className={clsx(filterWrapperStyle, hasShadow ? "shadow-bottom" : "")}
      >
        {HeaderReturner()}
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
                onClick={() => {}}
                current={true}
                fresh={"never"}
              />
              <BottomLine />
            </div>
          </div>
          <FilterBar />
        </div>
      </div>

      <Feed which="1" />

      <NavBar />
      {recordModalOpen ? (
        <BottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
      {commentModalOpen ? (
        <CommentContainer
          onClose={() => {
            setCommentModalOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] fixed z-10 flex flex-col w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "max-w-[430px] w-full";
const tabWrapperStyle = "relative flex gap-[16px]";
