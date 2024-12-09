import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";

export default function Feed() {
  const items = [1, 2, 3];
  return (
    <div className="py-[111px]">
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
    </div>
  );
}
