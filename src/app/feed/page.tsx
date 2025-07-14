import dynamic from "next/dynamic";

const FeedPageContainer = dynamic(
  () => import("@/components/feeds/FeedPageContainer"),
  {
    ssr: false,
  }
);

export default function FeedPage() {
  return <FeedPageContainer />;
}
