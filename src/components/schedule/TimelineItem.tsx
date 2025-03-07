import React from "react";
import Flex from "../shared/Flex";
import TimelineButton from "../shared/Icon/TimelineButton";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import { Gathering } from "@/models/gathering";
import { formatToDisplay } from "@/utils/makeUTC";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

export default function TimelineItem({
  upcomingGathering,
}: {
  upcomingGathering: Gathering;
}) {
  const diff = differenceInCalendarDays(
    new Date(),
    new Date(upcomingGathering.gatheringDate)
  );
  return (
    <Flex className="w-full" justify="space-between">
      <Flex>
        <TimelineButton />
        <Spacing size={8} direction="horizontal" />
        <span className="text-T4 min-w-11">{`D${
          diff == 0 ? `-day` : diff
        }`}</span>
        <Spacing size={24} direction="horizontal" />
        <Link
          href={`/gathering/${upcomingGathering.id}`}
          className="flex flex-col justify-between cursor-pointer active:bg-grayscale-10"
        >
          <span className="text-T4">{upcomingGathering.name}</span>
          <div className={styles.date}>
            {formatToDisplay(new Date(upcomingGathering.gatheringDate))}
          </div>
        </Link>
      </Flex>
      <Image
        alt="timelineImage"
        src={upcomingGathering.invitationImageUrl}
        width={56}
        height={56}
        className={styles.image}
      />
    </Flex>
  );
}

const styles = {
  date: "text-C2 text-grayscale-600 px-3 py-[6px] rounded-xl bg-grayscale-50",

  image: "rounded-xl w-14 !h-14",
};
