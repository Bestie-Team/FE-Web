"use client";

import GatheringCard from "./GatheringCard";
import clsx from "clsx";
import Message from "../shared/Message";
import { usePathname, useRouter } from "next/navigation";
import { GATHERINGS } from "@/constants/gathering";
import { differenceInDays } from "date-fns";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom } from "@/atoms/record";
import { useMemo } from "react";

type GatheringProps = {
  className?: string;
  which: "1" | "2";
};

export default function Gathering({ className, which }: GatheringProps) {
  const router = useRouter();
  const setGatheringId = useSetRecoilState(recordGatheringAtom);
  const pathname = usePathname();

  const gatherings = useMemo(() => {
    const now = new Date();
    return {
      expecting: GATHERINGS.filter((g) => differenceInDays(now, g.date) < 0),
      passed: GATHERINGS.filter((g) => differenceInDays(now, g.date) >= 0),
    };
  }, []);

  const renderGatherings = (
    gatheringsList: typeof GATHERINGS,
    action: (id: string) => void
  ) =>
    gatheringsList.map((gathering, i) => (
      <GatheringCard
        key={`${gathering.name}-${i}`}
        gathering={gathering}
        onClick={() => action(gathering.id)}
        which={which}
      />
    ));

  return (
    <div className={clsx(styles.container, className)}>
      {which === "2" && pathname.endsWith("gathering") && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {which === "1" &&
          renderGatherings(gatherings.expecting, (id) =>
            router.push(`/gathering/${id}`)
          )}
        {which === "2" && renderGatherings(gatherings.passed, setGatheringId)}
      </div>
    </div>
  );
}

const styles = {
  container: "pt-[155px] pb-[111px] animate-fadeIn w-full px-[20px]",
};
