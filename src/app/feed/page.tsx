import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/components/feeds/FeedPage/FeedPage"), {
  ssr: false,
});

export default function Page() {
  return <FeedPage />;
}
