"use client";

import FilterBar from "@/components/shared/FilterBar";
import NavBar from "@/components/shared/NavBar";
import TabBar from "@/components/shared/tab/TabBar";
import Feed from "./Feed";

export default function FeedPage() {
  return (
    <div>
      <TabBar />
      <FilterBar />
      <Feed />
      <NavBar />
    </div>
  );
}
