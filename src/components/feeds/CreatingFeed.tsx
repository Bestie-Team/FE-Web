import { useRef, useState } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { recordGatheringAtom } from "@/atoms/record";
import { usePathname, useRouter } from "next/navigation";
import getHeader from "@/utils/getHeader";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";
import FeedForm from "./FeedForm";
import clsx from "clsx";
import { toast } from "react-toastify";
import useMakeGatheringFeed from "./hooks/useMakeFeed";
import DotSpinner from "../shared/Spinner/DotSpinner";

export default function CreatingFeed() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const selectedGatheringId = useRecoilValue(recordGatheringAtom);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
    imageUrls: [],
    content: "",
  });
  const { mutate: makeGatheringFeed, isPending } = useMakeGatheringFeed({
    feedRequest: feedInfo,
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/feed");
    },

    onError: (error) => {
      toast.error(error.message);

      // router.replace("/feed");
    },
  });
  const { data: selectedGathering } = useGatheringDetail({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
  });

  if (!selectedGathering || selectedGatheringId == null) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      {isPending ? (
        <DotSpinner />
      ) : (
        <FeedForm
          onNext={makeGatheringFeed}
          feedInfo={feedInfo}
          setFeedInfo={setFeedInfo}
          selectedGathering={selectedGathering}
          selectedGatheringId={selectedGatheringId}
        />
      )}
    </div>
  );
}

const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
};
