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
  "https://d20j4cey9ep9gv.cloudfront.net/bini.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/party.jpg",
  "https://d20j4cey9ep9gv.cloudfront.net/ocean.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
];

const allFeed = [
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
];
