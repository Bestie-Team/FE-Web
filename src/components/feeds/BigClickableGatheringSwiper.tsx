import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import clsx from "clsx";
import CheckIcon from "../shared/Icon/CheckIcon";
import Flex from "../shared/Flex";
import { Gathering } from "@/models/gathering";

export default function BigClickableGatheringSwiper({
  gathering,
  onImageClick,
  selectedGatheringId,
}: {
  gathering: Gathering[];
  onImageClick?: (groupId: null | string) => void;
  selectedGatheringId: string | null;
}) {
  const handleGatheringClick = (id: string) => {
    if (onImageClick) {
      if (selectedGatheringId === id) {
        onImageClick(null);
        return;
      }
      onImageClick(id);
    } else return;
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1.4}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full h-[340px]"
      >
        {gathering.map(({ invitationImageUrl, id, name, description }, idx) => (
          <SwiperSlide
            onClick={() => handleGatheringClick(id)}
            className={clsx(styles.slide, idx === 0 && "ml-[20px]")}
            key={`gathering${id}`}
          >
            <Image
              layout="fixed"
              src={invitationImageUrl}
              alt={`gathering${idx + 1}`}
              className={styles.image}
              width={270}
              height={320}
            />
            <div className={styles.gatheringInfoWrapper}>
              <span className="text-T3">{name}</span>
              <Spacing size={6} />
              <span className="text-C2 text-grayscale-600">{description}</span>
            </div>
            {id === selectedGatheringId ? (
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
    "bg-base-white flex flex-col w-full absolute bottom-[-2px] pl-[20px] pt-[12px] pb-[24px] rounded-b-[20px] z-10",

  checkWrapper: "absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]",
};
