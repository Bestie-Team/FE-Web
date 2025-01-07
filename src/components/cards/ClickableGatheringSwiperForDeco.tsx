import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import clsx from "clsx";
import CheckIcon from "../shared/icons/CheckIcon";
import Flex from "../shared/Flex";
import { GatheringResponse } from "@/models/gathering";

export default function ClickableGatheringSwiperForDeco({
  gathering,
  onImageClick,
  selectedGatheringId,
}: {
  gathering: GatheringResponse[];
  onImageClick?: (
    groupId: {
      id: string;
      name: string;
      description: string;
      invitation_img_url: string;
      date: string;
    } | null
  ) => void;
  selectedGatheringId: string | null;
}) {
  const handleGatheringClick = ({
    id,
    name,
    description,
    invitation_img_url,
    date,
  }: {
    id: string;
    name: string;
    description: string;
    invitation_img_url: string;
    date: string;
  }) => {
    if (onImageClick) {
      if (selectedGatheringId === id) {
        onImageClick(null);
        return;
      }
      onImageClick({
        id,
        name,
        description,
        invitation_img_url,
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
        {gathering.map(
          ({ invitation_img_url, id, name, description, date }, idx) => (
            <SwiperSlide
              onClick={() =>
                handleGatheringClick({
                  id,
                  name,
                  description,
                  invitation_img_url,
                  date,
                })
              }
              className={clsx(styles.slide, idx === 0 && "ml-[20px]")}
              key={`gathering${id}`}
            >
              <Image
                src={invitation_img_url}
                alt={`gathering${idx + 1}`}
                className={styles.image}
                width={270}
                height={320}
              />
              <div className={styles.gatheringInfoWrapper}>
                <span className="text-T3">{name}</span>
                <Spacing size={6} />
                <span className="text-C2 text-grayscale-600">
                  {description}
                </span>
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
          )
        )}
      </Swiper>
    </div>
  );
}

const styles = {
  swiperContainer: "relative w-full bg-gray-100",

  slide:
    "relative !h-[320px] my-auto shadow-custom rounded-[20px] overflow-hidden",
  image: "slide-img object-cover w-[270px] h-[320px]",

  gatheringInfoWrapper:
    "bg-base-white flex flex-col w-full absolute bottom-[-2px] pl-[20px] pt-[12px] pb-[24px] rounded-b-[20px] z-10",

  checkWrapper: "absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]",
};
