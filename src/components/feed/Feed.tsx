import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";

export default function MyFeed({ which }: { which: string }) {
  const items = [1, 2, 3];
  return (
    <div className="pt-[155px] pb-[111px] animate-fadeIn">
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
  "https://d1al3w8x2wydb3.cloudfront.net/images/bini.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/party.jpg",
  "https://d1al3w8x2wydb3.cloudfront.net/images/ocean.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
];

const allFeed = [
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
];
