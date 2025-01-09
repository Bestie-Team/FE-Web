"use client";

import GatheringCard from "./GatheringCard";
import clsx from "clsx";
import Message from "../shared/Message";
import { usePathname } from "next/navigation";
import { DividedGatherings, GATHERINGS } from "@/constants/gathering";

type GatheringProps = {
  className?: string;
  which: "1" | "2";
};

export default function Gathering({ className, which }: GatheringProps) {
  const pathname = usePathname();

  const renderGatherings = (gatheringsList: typeof GATHERINGS) =>
    gatheringsList.map((gathering, i) => (
      <GatheringCard
        key={`${gathering?.name}-${i}`}
        gathering={gathering}
        which={which}
      />
    ));

  return (
    <div className={clsx("pt-[155px] pb-[111px] w-full px-[20px]", className)}>
      {which === "2" && pathname.endsWith("gathering") && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {which === "1"
          ? renderGatherings(DividedGatherings.expecting)
          : renderGatherings(DividedGatherings.passed)}
      </div>
    </div>
  );
}
