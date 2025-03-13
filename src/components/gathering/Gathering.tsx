import clsx from "clsx";
import {
  GatheringInWhichType,
  Gathering as GatheringType,
} from "@/models/gathering";
import GatheringCard from "./GatheringCard";
import Message from "../shared/Message";
import { useEffect, useState } from "react";
import NoGathering from "./NoGathering";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);
  const renderGatherings = (gatheringsList: GatheringType[]) => {
    return gatheringsList.map((gathering, i) => {
      return (
        <GatheringCard
          key={i}
          ended={ended}
          tabIndex={i}
          gathering={gathering}
          where={where}
          pencil={where === "HOME"}
        />
      );
    });
  };

  useEffect(() => {
    const firstFewGatherings = gatherings.slice(0, 6);
    firstFewGatherings.forEach((gathering) => {
      router.prefetch(`/gatherings/${gathering.id}`);
    });
  }, []);

  return (
    <div className={clsx("z-0 pt-3 w-full px-5 extended-container", className)}>
      {message && showMessage && (
        <Message onClose={() => setShowMessage(false)} />
      )}
      {gatherings.length < 1 ? (
        <NoGathering type="ENDED" />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {renderGatherings(gatherings)}
          {isFetching && (
            <>
              <div className={gatheringSkeleton} />
              <div className={gatheringSkeleton} />
              <div className={gatheringSkeleton} />
              <div className={gatheringSkeleton} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
const gatheringSkeleton =
  "overflow-hidden rounded-2xl aspect-square bg-[#F4F4F4] w-full h-full animate-pulse";
