import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/buttons/Button";
import PencilIcon from "../shared/icons/PencilIcon";
import { GatheringResponse } from "@/models/gathering";
import { differenceInDays } from "date-fns";
import React from "react";

export default function GatheringCard({
  onClick,
  gathering,
  which,
}: {
  onClick: () => void;
  gathering: GatheringResponse;
  which: string;
}) {
  const { invitation_img_url, name, date } = gathering;
  const diff = differenceInDays(new Date(), date);

  return (
    <div className={styles.gatheringWrapper} onClick={onClick}>
      <Image
        src={invitation_img_url}
        className={styles.image}
        alt="invitationImg"
        width={168}
        height={168}
      />
      <div
        style={{
          background: styles.gradation,
        }}
        className="absolute inset-0"
      />
      <Flex direction="column" className={styles.textWrapper}>
        <span className="text-T4 truncate">{name}</span>
        <Spacing size={4} />
        <Flex className={styles.date}>
          <span className="flex-grow">날짜</span>
          <Spacing size={4} direction="horizontal" />
          <span> {diff > 0 ? `D+${diff}` : `D${diff}`}</span>
        </Flex>
      </Flex>
      {which === "2" ? (
        <Button className={styles.button} onClick={onClick}>
          <PencilIcon color="#0A0A0A" />
        </Button>
      ) : null}
    </div>
  );
}

const styles = {
  gatheringWrapper:
    "relative rounded-[16px] overflow-hidden aspect-square cursor-pointer",
  image: "object-cover object-center w-full h-full",
  gradation:
    "linear-gradient(180deg, color(display-p3 0 0 0 / 0) 65%, color(display-p3 0 0 0 / 0.9) 100%)",

  textWrapper: "absolute bottom-0 inset-x-0 p-[16px] pt-0 text-base-white",
  date: "w-full text-C2 text-grayscale-100",

  button:
    "absolute top-[10px] right-[10px] bg-base-white rounded-[9.6px] p-[8px]",
};
