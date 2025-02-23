"use client";
import Image from "next/image";
import Flex from "../shared/Flex";
import Button from "../shared/Button/Button";
import PencilIcon from "../shared/Icon/PencilIcon";
import { Gathering, GatheringInWhichType } from "@/models/gathering";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom, recordStepAtom } from "@/atoms/record";
import { gatheringImageUrlAtom } from "@/atoms/gathering";
import clsx from "clsx";

const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty.jpg";

export default function GatheringCard({
  pencil = false,
  gathering,
  where,
  ended,
}: {
  pencil?: boolean;
  gathering: Gathering;
  where: GatheringInWhichType;
  ended: boolean;
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

    setGatheringId(gathering.id);
    router.push("/record");
    setStep(3);
  }, [gathering, setGatheringId, setInvitationUrl, router]);

  const { invitationImageUrl, name } = gathering;
  return (
    <div className="relative">
      <div
        className={clsx(styles.gatheringWrapper, "group")}
        onClick={() => router.push(`/gathering/${gathering.id}`)}
      >
        <Image
          layout="fixed"
          src={
            invitationImageUrl.startsWith("https://example") ||
            !invitationImageUrl
              ? DEFAULT_IMAGE
              : invitationImageUrl
          }
          className={clsx(styles.image, "scale-110")}
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
          <Flex className={styles.date}>
            <span className="flex-grow">{format(date, "yyyy.MM.dd")}</span>
            {where == "HOME" && (
              <span className="tracking-widest">
                {diff >= 0 ? `D+${diff}` : `D${diff}`}
              </span>
            )}
          </Flex>
        </Flex>
        {pencil || (!gathering.isFeedPosted && ended) ? (
          <Button
            name="moveToFeed_button"
            className={styles.button}
            onClick={handleClickGathering}
          >
            <PencilIcon color="#0A0A0A" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  gatheringWrapper:
    "relative overflow-hidden rounded-[16px] aspect-square cursor-pointer",
  image:
    "object-cover object-center w-full h-full group-hover:animate-smaller will-change-transform",
  gradation:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.9) 100%)",
  textWrapper:
    "absolute bottom-0 inset-x-0 p-[16px] pt-0 text-base-white gap-1",
  date: "w-full text-C2 text-grayscale-100 gap-1",

  button: "absolute top-[10px] right-[10px] bg-base-white rounded-[9.6px] p-2",
};
