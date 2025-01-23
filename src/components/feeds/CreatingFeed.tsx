import { useEffect, useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { recordGatheringAtom } from "@/atoms/record";
import { usePathname, useRouter } from "next/navigation";
import getHeader from "@/utils/getHeader";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";
import useMakeGatheringFeed from "./hooks/useMakeFeed";
import { toast } from "react-toastify";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import FullPageLoader from "../shared/FullPageLoader";

export default function CreatingFeed({
  onNext,
}: {
  onNext: (feedInfo: lighty.CreateGatheringFeedRequest) => void;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const selectedGatheringId = useRecoilValue(recordGatheringAtom);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
    imageUrls: [],
    content: "",
  });

  const { mutate: makeGatheringFeed, isPending } = useMakeGatheringFeed({
    gathering: feedInfo,
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/feed");
    },
    onError: (error) => {
      toast.error(error.message);
      router.replace("/feed");
    },
  });

  const { data: selectedGathering } = useGatheringDetail({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeGatheringFeed();
    }
  }, [feedInfo.imageUrls]);

  if (!selectedGathering || selectedGatheringId == null) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      <FeedForm
        onNext={onNext}
        feedInfo={feedInfo}
        setFeedInfo={setFeedInfo}
        selectedGathering={selectedGathering}
        selectedGatheringId={selectedGatheringId}
      />
      {isPending && <FullPageLoader />}
    </div>
  );
}
const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
