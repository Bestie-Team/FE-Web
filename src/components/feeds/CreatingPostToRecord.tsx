import { useEffect, useRef, useState } from "react";
import { TogetherInfo } from "../feed/InfoBar";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import EditPhotoSwiper from "./UploadPhotoSwiper";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { recordGatheringAtom } from "@/atoms/record";
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import useMakeGatheringFeed from "./hooks/useMakeFeed";
import MakingFeedStatus from "./MakingFeedStatus";
import DotSpinner from "../shared/spinners/DotSpinner";

export default function CreatingPostToRecord({
  onNext,
}: {
  onNext: (postInfoValues: lighty.CreateGatheringFeedRequest) => void;
}) {
  const selectedGatheringId = useRecoilValue(recordGatheringAtom);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const [postInfo, setPostInfo] = useState<lighty.CreateGatheringFeedRequest>({
    gatheringId: selectedGatheringId ? selectedGatheringId : "",
    imageUrls: [],
    content: "",
  });
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: selectedGatheringId || "",
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      console.log(data);
      setFilesToUpload([]);
      setPostInfo((prev) => ({ ...prev, imageUrls: data.imageUrls }));
    },
  });

  const {
    mutate: makeGatheringFeed,
    isSuccess,
    isPending,
  } = useMakeGatheringFeed({
    gathering: postInfo,
    onSuccess: (data) => {
      setPostInfo({
        gatheringId: selectedGatheringId ? selectedGatheringId : "",
        imageUrls: [],
        content: "",
      });
    },
    onError: (error) => {
      console.log(error);
      setPostInfo({
        gatheringId: selectedGatheringId ? selectedGatheringId : "",
        imageUrls: [],
        content: "",
      });
    },
  });

  useEffect(() => {
    if (postInfo.imageUrls.length > 0) {
      makeGatheringFeed();
    }
  }, [postInfo.imageUrls]);

  if (selectedGatheringId == null) return null;
  const { data: selectedGathering } = useGatheringDetail({
    gatheringId: selectedGatheringId,
  });
  if (!selectedGathering) return null;

  const { name, members, description } = selectedGathering;

  if (isSuccess || isPending) {
    return <MakingFeedStatus isSuccess={isSuccess} />;
  }
  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      <Flex direction="column" className={styles.gatheringInfoWrapper}>
        <Flex>
          <Flex direction="column" style={{ flexGrow: 1 }}>
            <span className="text-T2">{name}</span>
            <Spacing size={8} />
            <span className="text-C2 text-grayscale-400">{description}</span>
          </Flex>
          <Spacing direction="horizontal" size={16} />
          <TogetherInfo members={members} />
        </Flex>
        <Spacing size={28} />
      </Flex>
      <EditPhotoSwiper
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
      />
      <Spacing size={8} />
      <Flex direction="column" className={styles.textareaWrapper}>
        <textarea
          value={postInfo.content}
          inputMode="text"
          placeholder="해당 모임에는 어떤 소중한 추억이 있었나요? 그날의 추억에 대해 글로 작성해 보세요."
          onChange={(e) => {
            setPostInfo((prev) => ({ ...prev, content: e.target.value }));
          }}
          className={styles.recordTextarea}
        />
        <Spacing size={12} />
        <div className="text-right">
          <span className="text-grayscale-900 text-B3">{`${postInfo.content?.length}`}</span>
          <span className="text-grayscale-300 text-B4">{` / 150`}</span>
        </div>
      </Flex>
      <FixedBottomButton
        label={isUploading || isPending ? <DotSpinner /> : "기록 완료"}
        onClick={() => {
          uploadImages();
          // onNext(postInfo);
        }}
        // disabled={}
      />
    </div>
  );
}

const styles = {
  container: "bg-base-white h-screen",

  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
  selectWrapper: "p-[20px] pb-[16px]",
  gatheringInfoWrapper: "p-[20px] pt-[124px] pb-0",
  textareaWrapper: "px-[28px] py-[16px] pb-[98px]",

  recordTextarea:
    "h-[186.29px] leading-[22.86px] w-[114.29%] tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none transform origin-top-left scale-[0.875]",
};
