import React from "react";
import Flex from "../shared/Flex";
import TimelineButton from "../shared/Icon/TimelineButton";
import Spacing from "../shared/Spacing";
import Image from "next/image";

export default function TimelineItem({ imageUrl }: { imageUrl: string }) {
  const diff = "D-3";

  return (
    <Flex className="w-full" justify="space-between">
      <Flex>
        <TimelineButton />
        <Spacing size={8} direction="horizontal" />
        <span className="text-T4">{diff}</span>
        <Spacing size={24} direction="horizontal" />
        <Flex direction="column" justify="space-between">
          <span className="text-T4">christmas party</span>
          <div className={styles.date}>2024. 12. 24. 오후 6:00</div>
        </Flex>
      </Flex>
      <Image
        alt="timelineImage"
        src={imageUrl}
        width={56}
        height={56}
        className={styles.image}
      />
    </Flex>
  );
}

const styles = {
  date: "text-C2 text-grayscale-600 px-3 py-[6px] rounded-[12px] bg-grayscale-50",

  image: "rounded-[12px] w-14 h-14",
};
