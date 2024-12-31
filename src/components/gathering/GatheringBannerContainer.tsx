import React from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { GatheringResponse } from "@/models/gathering";

export default function GatheringBannerContainer({
  gathering,
}: {
  gathering: GatheringResponse;
}) {
  const dateInfo = format(gathering.date, "yyyy.MM.dd (E)", { locale: ko });
  const diff = differenceInDays(new Date(), gathering.date);

  return (
    <Flex>
      <div className="relative">
        <Image
          priority
          alt="homeImage"
          src={
            gathering.invitation_img_url ||
            "https://cdn.lighty.today/gathering.png"
          }
          width={600}
          height={434}
          className="h-[434px] object-cover"
        />
        <div className="absolute inset-0 bg-[#00000080]" />
        <Flex justify="space-between" className={styles.wrapper}>
          <Flex direction="column">
            <Flex direction="column">
              {gathering.name.length >= 10 ? (
                <>
                  <span className={styles.gatheringName}>
                    {gathering.name.slice(0, 5)}
                  </span>
                  <Spacing size={6} />
                  <span className={styles.gatheringName}>
                    {gathering.name.slice(5)}
                  </span>
                </>
              ) : (
                <span className={styles.gatheringName}>{gathering.name}</span>
              )}
            </Flex>
            <Spacing size={4} />
            <span className={styles.date}>{dateInfo}</span>
          </Flex>
          <div className={styles.diff}>
            {diff > 0 ? `D + ${diff}` : `D${diff}`}
          </div>
        </Flex>
      </div>
    </Flex>
  );
}

const styles = {
  wrapper: "absolute left-0 right-0 bottom-0 p-[24px] pt-0",

  gatheringName: "text-base-white text-T1",

  date: "text-grayscale-100 text-B3",
  diff: "text-base-white text-T2 self-end",
};
