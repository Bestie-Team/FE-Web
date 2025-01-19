import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import Spacing from "../shared/Spacing";
import { Gathering } from "@/models/gathering";
import { formatToDisplay } from "@/utils/makeUTC";

export default function GatheringSwiper({
  percent,
  gatherings,
}: {
  percent?: number;
  gatherings: Gathering[];
}) {
  const router = useRouter();

  return (
    <Swiper
      slidesPerView={percent ?? 1.077}
      spaceBetween={12}
      grabCursor={true}
      style={{
        paddingLeft: "20px",
      }}
      className="custom-swiper w-full"
    >
      {gatherings.map(
        ({ invitationImageUrl, id, name, gatheringDate }, idx) => (
          <SwiperSlide
            onClick={() => {
              router.push(`/gathering/${id}`);
            }}
            className={styles.slide}
            key={`slide${idx}`}
          >
            <Image
              src={invitationImageUrl}
              alt={`invitationImage${idx + 1}`}
              className={styles.image}
              width={340}
              height={360}
            />
            <div className={styles.gatheringImageInfo}>
              <span>{name}</span>
              <Spacing size={4} />
              <span className={styles.date}>
                {formatToDisplay(gatheringDate).slice(0, 10)}
              </span>
            </div>
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
}

const styles = {
  slide:
    "relative rounded-[16px] shadow-bottom mt-[8px] mb-[52px] cursor-pointer",
  gatheringImageInfo:
    "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-[12px] pt-[8px] rounded-b-[16px] bg-base-white",

  image: "slide-img object-cover rounded-[16px] aspect-[17/18]",
  date: "text-C2 text-grayscale-400",
};
