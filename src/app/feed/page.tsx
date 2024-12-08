"use client";

import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
import TabBar from "@/components/shared/tab/TabBar";
import Feed from "./Feed";
import CommentContainer from "@/components/shared/comments/CommentContainer";

export default function FeedPage() {
  return (
    <div>
      <TabBar />
      <FilterBar />
      <Feed />
      <NavBar />
      <CommentContainer onClose={() => {}} />
    </div>
  );
}
