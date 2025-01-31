"use client";
import clsx from "clsx";
import {
  GatheringInWhichType,
  Gathering as GatheringType,
} from "@/models/gathering";
import GatheringCard from "./GatheringCard";
import Message from "../shared/Message";

type GatheringProps = {
  gatherings: GatheringType[];
  className?: string;
  where: GatheringInWhichType;
};

export default function Gathering({
  gatherings,
  className,
  where,
}: GatheringProps) {
  const renderGatherings = (gatheringsList: GatheringType[]) =>
    gatheringsList.map((gathering, i) => {
      return <GatheringCard key={i} gathering={gathering} where={where} />;
    });

  return (
    <div className={clsx("z-0 pt-3 pb-[111px] w-full px-5", className)}>
      {where === "GATHERING" && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {renderGatherings(gatherings)}
      </div>
    </div>
  );
}
