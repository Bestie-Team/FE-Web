import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import Spacing from "../shared/Spacing";
import { Gathering } from "@/models/gathering";
import { formatToDisplay } from "@/utils/makeUTC";
import clsx from "clsx";
import { differenceInCalendarDays } from "date-fns";
import { NoGatheringHome } from "./NoGathering";

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
      {gatherings.length < 1 ? (
        <>
          <NoGatheringHome type="slider" />
          <Spacing size={52} />
        </>
      ) : (
        gatherings.map(
          ({ invitationImageUrl, id, name, gatheringDate }, idx) => {
            const date = new Date(gatheringDate);
            const diff = differenceInCalendarDays(new Date(), date);
            return (
              <SwiperSlide
                onClick={() => {
                  router.push(`/gathering/${id}`);
                }}
                className={clsx(styles.slide, "group")}
                key={`slide${idx}`}
              >
                <div className="relative w-full h-[146px]">
                  <Image
                    src={
                      invitationImageUrl ||
                      "https://cdn.lighty.today/lighty_square.png"
                    }
                    alt={`invitationImage${idx + 1}`}
                    className={styles.image}
                    width={164}
                    height={146}
                  />
                  <div
                    style={{ background: styles.shadow }}
                    className={"z-5 absolute bottom-0 left-0 right-0 h-[47px]"}
                  />
                  <span className={styles.dDay}>
                    {diff >= 0 ? `D+${diff}` : `D${diff}`}
                  </span>
                  <div className={styles.gatheringImageInfo}>
                    <span>{name}</span>
                    <Spacing size={4} />
                    <span className={styles.date}>
                      {formatToDisplay(new Date(gatheringDate)).slice(0, 10)}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        )
      )}
    </Swiper>
  );
}

const styles = {
  shadow:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.9) 100%)",
  slide:
    "relative !h-[202px] flex flex-col rounded-[16px] shadow-bottom mt-[8px] mb-[52px] cursor-pointer overflow-hidden",
  gatheringImageInfo:
    "absolute -bottom-[56px] left-0 right-0 flex flex-col justify-between w-full  text-grayscale-900 text-T5 p-[12px] pt-[8px] rounded-b-[16px] bg-base-white",

  image:
    "absolute top-0 left-0 right-0 slide-img object-cover w-full h-[146px] group-hover:animate-bigger",
  date: "text-C2 text-grayscale-400",
  dDay: "tracking-wider absolute left-0 text-T4 text-base-white bottom-0 py-2 px-3",
};
