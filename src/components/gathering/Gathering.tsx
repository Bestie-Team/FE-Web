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
  const pathname = usePathname();

  const sortedGathering =
    myGatherings.length > 0 ? sortGatherings(myGatherings) : null;

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
    <div
      className={clsx(
        "z-0 pt-[12px] pb-[111px] w-full px-5",
        pathname.startsWith("/gathering") && "pt-[110px]",
        className
      )}
    >
      {which === "완료" && pathname.endsWith("gathering") && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {which === "예정"
          ? sortedGathering && renderGatherings(sortedGathering.expecting)
          : sortedGathering && renderGatherings(sortedGathering.passed)}
      </div>
    </div>
  );
}
