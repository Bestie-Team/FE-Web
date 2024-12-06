"use client";
import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import FilterBar from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import NavBar from "@/components/shared/NavBar";
import TabBar from "@/components/shared/tab/TabBar";

export default function FeedPage() {
  const items = [1, 2, 3];
  return (
    <div>
      <TabBar />
      <FilterBar />
      {items.length > 0 ? (
        <Flex direction="column">
          <MemoryCard />
          <MemoryCard />
          <MemoryCard />
          <MemoryCard />
        </Flex>
      ) : (
        <NoFeed />
      )}
      <NavBar />
    </div>
  );
}
