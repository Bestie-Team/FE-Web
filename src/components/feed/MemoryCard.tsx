import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import InfoBar from "./InfoBar";
import PhotoSwiper from "../shared/PhotoSwiper";
import { GROUPS } from "@/constants/groups";

export default function MemoryCard({ images }: { images: string[] }) {
  const members = GROUPS[0];
  return (
    <Flex direction="column" className="py-[12px]">
      <InfoBar group={members} />
      <Spacing size={12} />
      <PhotoSwiper images={images} type="feed" />
      <Spacing size={8} />
      <ContentWithComments />
    </Flex>
  );
}
