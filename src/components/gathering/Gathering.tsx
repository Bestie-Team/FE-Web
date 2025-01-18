"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  GatheringInWhichType,
  Gathering as GatheringType,
} from "@/models/gathering";
import GatheringCard from "./GatheringCard";
import Message from "../shared/Message";
import { sortGatherings } from "@/utils/sortGatherings";
import useGatherings from "./hooks/useGatherings";
import { useEffect, useState } from "react";
import { GatheringInWhich } from "@/constants/gathering";

type GatheringProps = {
  className?: string;
  where: GatheringInWhichType;
};

export default function Gathering({ className, where }: GatheringProps) {
  const pathname = usePathname();
  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  const [gatherings, setGatherings] = useState<GatheringType[]>([]);
  const { data: gathering_data } = useGatherings({
    cursor: minDate,
    limit: 50,
    minDate: minDate,
    maxDate: maxDate,
  });
  //일단 무한스크롤 구현 전짜기 이렇게 저장
  useEffect(() => {
    if (
      gatherings[0] &&
      gathering_data?.gatherings &&
      gathering_data?.gatherings[0].id === gatherings[0].id
    ) {
      return;
    }
    if (gathering_data) {
      setGatherings(gathering_data?.gatherings);
    }
    console.log(gathering_data?.gatherings);
  }, [gathering_data]);

  const sortedGathering =
    gatherings.length > 0 ? sortGatherings(gatherings) : null;

  const renderGatherings = (gatheringsList: GatheringType[]) =>
    gatheringsList.map((gathering) => (
      <GatheringCard key={gathering.id} gathering={gathering} where={where} />
    ));

  return (
    <div className={clsx("pb-[111px] w-full px-[20px]", className)}>
      {where === GatheringInWhich.GATHERING &&
        pathname.endsWith("gathering") && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {where === GatheringInWhich.HOME
          ? sortedGathering && renderGatherings(gatherings)
          : sortedGathering && renderGatherings(sortedGathering.passed)}
      </div>
    </div>
  );
}
