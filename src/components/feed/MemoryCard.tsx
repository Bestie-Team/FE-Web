import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import InfoBar from "./InfoBar";
import PhotoSwiper from "../shared/PhotoSwiper";

export default function MemoryCard() {
  return (
    <Flex
      direction="column"
      style={{ paddingTop: "12px", paddingBottom: "12px" }}
    >
      <InfoBar />
      <Spacing size={12} />
      <PhotoSwiper images={imageList} />
      <Spacing size={8} />
      <ContentWithComments />
    </Flex>
  );
}

const imageList = [
  "/images/window.jpg",
  "/images/party.jpg",
  "/images/ocean.jpg",
  "/images/groom.jpg",
  "/images/groom.jpg",
];
