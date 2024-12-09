"use client";

import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
import TabBar from "@/components/shared/tab/TabBar";
import Feed from "./Feed";
import CommentContainer from "@/components/shared/comments/CommentContainer";
import { useRecoilState } from "recoil";
import { commentModalStateAtom } from "@/atom/feed";

export default function FeedPage() {
  const [modalOpen, setModalOpen] = useRecoilState(commentModalStateAtom);

  return (
    <div>
      <div className="fixed z-10 flex flex-col w-full bg-base-white">
        <div className="pl-[20px]">
          <TabBar long={false} title1="피드" title2="모아보기" />
        </div>
        <FilterBar />
      </div>
      <Feed />
      <NavBar />
      <CommentContainer
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
}
