"use client";
import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button/Button";
import PencilIcon from "../shared/Icon/PencilIcon";
import { Gathering } from "@/models/gathering";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom, recordStepAtom } from "@/atoms/record";
import { gatheringImageUrlAtom } from "@/atoms/gathering";

const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty.jpg";

export default function GatheringCard({
  gathering,
  which,
}: {
  gathering: Gathering;
  which?: string;
}) {
  //기록할 약속의 id 저장
  const setStep = useSetRecoilState(recordStepAtom);
  const setGatheringId = useSetRecoilState(recordGatheringAtom);
  const setInvitationUrl = useSetRecoilState(gatheringImageUrlAtom);
  const router = useRouter();

  const { date, diff } = useMemo(() => {
    const date = new Date(gathering.gatheringDate);
    const diff = differenceInCalendarDays(new Date(), date);
    return { date, diff };
  }, [gathering.gatheringDate]);

  const handleClickGathering = useCallback(() => {
    setInvitationUrl(gathering.invitationImageUrl);
    if (which === "예정") {
      router.push(`/gathering/${gathering.id}`);
    } else {
      setGatheringId(gathering.id);
      router.push("/record");
      setStep(3);
    }
  }, [gathering, which, setGatheringId, setInvitationUrl, router]);

  const { invitationImageUrl, name } = gathering;
  return (
    <div className="relative">
      <div className={styles.gatheringWrapper} onClick={handleClickGathering}>
        <Image
          src={
            invitationImageUrl.startsWith("https://example") ||
            !invitationImageUrl
              ? DEFAULT_IMAGE
              : invitationImageUrl
          }
          className={styles.image}
          alt={name}
          width={168}
          height={168}
        />
        <div
          style={{
            background: styles.gradation,
          }}
          className="absolute bottom-0 left-0 right-0 h-[73.8%]"
        />
        <Flex direction="column" className={styles.textWrapper}>
          <span className="text-T4 truncate">{name}</span>
          <Spacing size={4} />
          <Flex className={styles.date}>
            <span className="flex-grow">{format(date, "yyyy.MM.dd")}</span>
            <Spacing size={4} direction="horizontal" />
            <span className="tracking-widest">
              {diff >= 0 ? `D+${diff}` : `D${diff}`}
            </span>
          </Flex>
        </Flex>
        {which === "완료" ? (
          <Button className={styles.button} onClick={handleClickGathering}>
            <PencilIcon color="#0A0A0A" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

// const GatheringCardSkeleton = () => {
//   return (
//     <Skeleton className="w-full h-full rounded-[16px] absolute inset-0 z-10" />
//   );
// };

const styles = {
  gatheringWrapper:
    "relative rounded-[16px] overflow-hidden aspect-square cursor-pointer",
  image: "object-cover object-center w-full h-full",
  gradation:
    // "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)",
    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.9) 100%)",
  textWrapper: "absolute bottom-0 inset-x-0 p-[16px] pt-0 text-base-white",
  date: "w-full text-C2 text-grayscale-100",

  button: "absolute top-[10px] right-[10px] bg-base-white rounded-[9.6px] p-2",
};
