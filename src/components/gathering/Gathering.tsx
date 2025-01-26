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
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

type GatheringProps = {
  className?: string;
  which?: string;
  where: GatheringInWhichType;
};

export default function Gathering({ className, where, which }: GatheringProps) {
  const pathname = usePathname();
  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  const [gatherings, setGatherings] = useState<GatheringType[]>([]);
  const {
    data: gathering_data,
    isFetching,
    isError,
  } = useGatherings({
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
      <GatheringCard
        key={gathering.id}
        gathering={gathering}
        where={where}
        which={which}
      />
    ));

  return (
    <div className={clsx("pb-[111px] w-full px-5", className)}>
      {which === "완료" && pathname.endsWith("gathering") && <Message />}
      {isFetching || isError ? (
        <DotSpinnerSmall />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {which === "예정"
            ? sortedGathering && renderGatherings(sortedGathering.expecting)
            : sortedGathering && renderGatherings(sortedGathering.passed)}
        </div>
      )}
    </div>
  );
}
