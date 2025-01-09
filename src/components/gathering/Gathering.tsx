"use client";
import GatheringCard from "./GatheringCard";
import clsx from "clsx";
import Message from "../shared/Message";
import { usePathname, useRouter } from "next/navigation";
import { GATHERINGS } from "@/constants/gathering";
import { differenceInDays } from "date-fns";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom } from "@/atoms/record";

export default function Gathering({
  className,
  which,
}: {
  className?: string;
  which: string;
}) {
  const expectingGathering = GATHERINGS.filter(
    (gathering) => differenceInDays(new Date(), gathering.date) < 0
  );

  const passedGathering = GATHERINGS.filter(
    (gathering) => differenceInDays(new Date(), gathering.date) >= 0
  );

  const setGatheringId = useSetRecoilState(recordGatheringAtom);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={clsx(styles.container, className)}>
      {which === "2" && pathname.endsWith("gathering") ? <Message /> : null}
      <div className="grid grid-cols-2 gap-4">
        {which === "1"
          ? expectingGathering.map((gathering, i) => (
              <GatheringCard
                onClick={() => {
                  router.push(`/gathering/${gathering.id}`);
                }}
                gathering={gathering}
                key={`${gathering.name}-${i}`}
                which={which}
              />
            ))
          : null}
        {which === "2"
          ? passedGathering.map((gathering, i) => (
              <GatheringCard
                onClick={() => {
                  setGatheringId(gathering.id);
                }}
                gathering={gathering}
                key={`${gathering.name}-${i}`}
                which={which}
              />
            ))
          : null}
      </div>
    </div>
  );
}

const styles = {
  container: "pt-[155px] pb-[111px] animate-fadeIn w-full px-[20px]",
};
