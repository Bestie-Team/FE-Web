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
  ended: boolean;
  where: GatheringInWhichType;
  message?: boolean;
  isFetching?: boolean;
};

export default function Gathering({
  gatherings,
  className,
  where,
  ended,
  message,
  isFetching,
}: GatheringProps) {
  const renderGatherings = (gatheringsList: GatheringType[]) =>
    gatheringsList.map((gathering, i) => {
      return (
        <GatheringCard
          ended={ended}
          key={i}
          gathering={gathering}
          where={where}
          pencil={where === "HOME"}
        />
      );
    });

  return (
    <div
      className={clsx(
        "z-0 pt-3 pb-[80px] w-full px-5 min-h-[calc(100dvh-80px)]",
        className
      )}
    >
      {message && <Message />}

      <div className="grid grid-cols-2 gap-4">
        {renderGatherings(gatherings)}
        {isFetching && (
          <>
            <div className="overflow-hidden rounded-[16px] aspect-square bg-[#F4F4F4] w-full h-full" />
            <div className="overflow-hidden rounded-[16px] aspect-square bg-[#F4F4F4] w-full h-full" />
            <div className="overflow-hidden rounded-[16px] aspect-square bg-[#F4F4F4] w-full h-full" />
            <div className="overflow-hidden rounded-[16px] aspect-square bg-[#F4F4F4] w-full h-full" />
          </>
        )}
      </div>
    </div>
  );
}
