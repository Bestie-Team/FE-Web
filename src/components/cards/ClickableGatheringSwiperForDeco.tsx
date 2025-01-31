import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import clsx from "clsx";
import CheckIcon from "../shared/Icon/CheckIcon";
import Flex from "../shared/Flex";
import { Feed } from "@/models/feed";

export default function ClickableGatheringSwiperForDeco({
  feed,
  onImageClick,
  selectedFeedId,
}: {
  feed: Feed[];
  onImageClick?: (
    feedInfo: {
      id: string;
      name: string;
      content: string;
      imageUrl: string;
      date: string;
    } | null
  ) => void;
  selectedFeedId: string | null;
}) {
  const handleGatheringClick = ({
    id,
    name,
    content,
    imageUrl,
    date,
  }: {
    id: string;
    name: string;
    content: string;
    imageUrl: string;
    date: string;
  }) => {
    if (onImageClick) {
      if (selectedFeedId === id) {
        onImageClick(null);
        return;
      }
      onImageClick({
        id,
        name,
        content,
        imageUrl,
        date,
      });
    } else return;
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1.4}
        spaceBetween={20}
        grabCursor={true}
        className="custom-swiper w-full h-[340px]"
      >
        {feed.map(({ gathering, id, content, images }, idx) => (
          <SwiperSlide
            onClick={() =>
              handleGatheringClick({
                id,
                name: gathering?.name || "",
                content: content || "",
                imageUrl: images[0] || "",
                date: gathering?.gatheringDate || "",
              })
            }
            className={clsx(styles.slide, idx === 0 && "ml-5")}
            key={`feed${id}`}
          >
            <Image
              src={images[0] || ""}
              alt={`feed${idx + 1}`}
              className={styles.image}
              width={270}
              height={320}
            />
            <div className={styles.gatheringInfoWrapper}>
              <span className="text-T3">{gathering?.name}</span>
              <Spacing size={6} />
              <span className="text-C2 text-grayscale-600">{content}</span>
            </div>
            {id === selectedFeedId ? (
              <Flex
                align="center"
                justify="center"
                className={styles.checkWrapper}
              >
                <CheckIcon />
              </Flex>
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  swiperContainer: "relative w-full bg-gray-50",

  slide:
    "relative !h-[320px] my-auto shadow-custom rounded-[20px] overflow-hidden",
  image: "slide-img object-cover w-[270px] h-[320px]",

  gatheringInfoWrapper:
    "bg-base-white flex flex-col w-full absolute bottom-[-2px] px-5 pt-3 pb-6 rounded-b-[20px] z-10",

  checkWrapper: "absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]",
};
