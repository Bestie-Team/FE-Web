import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import InfoBar from "./InfoBar";
import PhotoSwiper from "../shared/PhotoSwiper";

export default function MemoryCard({ images }: { images: string[] }) {
  return (
    <Flex direction="column" className="py-[12px]">
      <InfoBar />
      <Spacing size={12} />
      <PhotoSwiper images={images} />
      <Spacing size={8} />
      <ContentWithComments />
    </Flex>
  );
}
