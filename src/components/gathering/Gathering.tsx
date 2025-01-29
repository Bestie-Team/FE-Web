"use client";
import clsx from "clsx";
import {
  GatheringInWhichType,
  Gathering as GatheringType,
} from "@/models/gathering";
import GatheringCard from "./GatheringCard";
import Message from "../shared/Message";
import { sortGatherings } from "@/utils/sortGatherings";

type GatheringProps = {
  myGatherings: GatheringType[];
  className?: string;
  which?: string;
  where: GatheringInWhichType;
};

export default function Gathering({
  myGatherings,
  className,
  where,
  which,
}: GatheringProps) {
  const sortedGathering =
    myGatherings.length > 0 ? sortGatherings(myGatherings) : null;

  const renderGatherings = (gatheringsList: GatheringType[]) =>
    gatheringsList.map((gathering) => (
      <GatheringCard key={gathering.id} gathering={gathering} which={which} />
    ));

  return (
    <div className={clsx("z-0 pt-3 pb-[111px] w-full px-5", className)}>
      {which === "완료" && where === "GATHERING" && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {which === "예정"
          ? sortedGathering && renderGatherings(sortedGathering.expecting)
          : sortedGathering && renderGatherings(sortedGathering.passed)}
      </div>
    </div>
  );
}
