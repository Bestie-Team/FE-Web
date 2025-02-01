import React, { Dispatch, SetStateAction } from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import EditPhotoSwiper from "./UploadPhotoSwiper";
import { TogetherInfo } from "../feed/InfoBar";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import * as lighty from "lighty-type";
import { GatheringDetailResponse } from "@/models/gathering";
import { Feed } from "@/models/feed";

interface FeedFormProps<T> {
  edit?: () => void;
  uploadImages?: () => void;
  originalFeed?: Feed;
  feedInfo?: T;
  setFeedInfo?: Dispatch<SetStateAction<T>>;
  filesToUpload: File[];
  setFilesToUpload: Dispatch<SetStateAction<File[]>>;
  selectedGathering?: GatheringDetailResponse;
  feedInfoToEdit?: { content: string; imageUrls: string[] };
}
export default function FeedForm<
  T extends lighty.CreateGatheringFeedRequest | lighty.CreateFriendFeedRequest
>({
  edit,
  uploadImages,
  originalFeed,
  feedInfo,
  setFeedInfo,
  filesToUpload,
  setFilesToUpload,
  selectedGathering,
  feedInfoToEdit,
}: FeedFormProps<T>) {
  const content = feedInfo?.content || feedInfoToEdit?.content || "";
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setFeedInfo) {
      setFeedInfo((prev) => ({ ...prev, content: e.target.value }));
    }
  };

  return (
    <>
      <Flex direction="column" className={styles.gatheringInfoWrapper}>
        {selectedGathering ? (
          <Flex>
            <Flex direction="column" style={{ flexGrow: 1 }}>
              <span className="text-T2">{selectedGathering?.name}</span>
              <Spacing size={8} />
              <span className="text-C2 text-grayscale-400">
                {selectedGathering?.description}
              </span>
            </Flex>
            <Spacing direction="horizontal" size={16} />
            <TogetherInfo members={selectedGathering?.members} />
          </Flex>
        ) : null}
        <Spacing size={28} />
      </Flex>
      <EditPhotoSwiper
        feedInfoToEdit={feedInfoToEdit}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
      />
      <Spacing size={8} />
      <Flex direction="column" className={styles.textareaWrapper}>
        <textarea
          value={content}
          inputMode="text"
          placeholder="해당 약속에는 어떤 소중한 추억이 있었나요? 그날의 추억에 대해 글로 작성해 보세요."
          onChange={handleTextChange}
          className={styles.recordTextarea}
        />
        <Spacing size={12} />
        <div className="text-right">
          <span className="text-grayscale-900 text-B3">{`${
            feedInfo ? feedInfo.content?.length : feedInfoToEdit?.content.length
          }`}</span>
          <span className="text-grayscale-300 text-B4">{` / 150`}</span>
        </div>
      </Flex>
      {edit ? (
        <FixedBottomButton
          label={"수정 완료"}
          disabled={
            originalFeed?.content == feedInfoToEdit?.content &&
            originalFeed?.images?.join() === feedInfoToEdit?.imageUrls?.join()
          }
          onClick={() => {
            if (edit) {
              edit();
            }
          }}
        />
      ) : (
        <FixedBottomButton
          label={"기록 완료"}
          disabled={filesToUpload.length == 0 || !feedInfo?.content}
          onClick={() => {
            if (feedInfo && uploadImages) {
              uploadImages();
            }
          }}
        />
      )}
    </>
  );
}
const styles = {
  selectWrapper: "p-[20px] pb-[16px]",
  gatheringInfoWrapper: "p-[20px] pt-[68px] pb-0",
  textareaWrapper: "px-[28px] py-[16px] pb-[98px]",

  recordTextarea:
    "h-[186.29px] leading-[22.86px] w-[114.29%] tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none transform origin-top-left scale-[0.875]",
};
