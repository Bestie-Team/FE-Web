import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";

export default function MyFeed({ which }: { which: string }) {
  const items = [1, 2, 3];
  return (
    <div className="pt-[107px] pb-[111px] animate-fadeIn">
      {items.length > 0 ? (
        <Flex direction="column">
          <MemoryCard images={which === "1" ? allFeed : myFeed} />
          <MemoryCard images={which === "1" ? allFeed : myFeed} />
          <MemoryCard images={which === "1" ? allFeed : myFeed} />
          <MemoryCard images={which === "1" ? allFeed : myFeed} />
        </Flex>
      ) : (
        <NoFeed />
      )}
    </div>
  );
}
const myFeed = [
  "https://cdn.lighty.today/bini.JPG",
  "https://cdn.lighty.today/party.jpg",
  "https://cdn.lighty.today/ocean.JPG",
  "https://cdn.lighty.today/groom.JPG",
];

const allFeed = [
  "https://cdn.lighty.today/tongue_cake.jpeg",
  "https://cdn.lighty.today/binanton_jp.jpeg",
  "https://cdn.lighty.today/groom.JPG",
];
