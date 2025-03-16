import React, { Dispatch, SetStateAction } from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import UploadPhotoSwiper from "./UploadPhotoSwiper";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import * as lighty from "lighty-type";
import { GatheringDetailResponse } from "@/models/gathering";
import { Feed } from "@/models/feed";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";
import { TogetherInfo } from "./InfoBar";

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
  const { isReactNativeWebView } = useReactNativeWebView();

  return (
    <>
      <Flex direction="column" className="px-5 pb-0">
        <Spacing size={20} />
        {selectedGathering ? (
          <Flex className="gap-4">
            <Flex direction="column" style={{ flexGrow: 1, gap: "8px" }}>
              <span className="text-T2">{selectedGathering?.name}</span>
              <span className="text-C2 text-grayscale-400">
                {selectedGathering?.description}
              </span>
            </Flex>
            {selectedGathering.members.length > 0 && (
              <TogetherInfo members={selectedGathering?.members} />
            )}
          </Flex>
        ) : null}
        <Spacing size={28} />
      </Flex>
      <UploadPhotoSwiper
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
          disabled={originalFeed?.content == feedInfoToEdit?.content}
          onClick={() => {
            if (edit) {
              edit();
            }
          }}
          className={isReactNativeWebView ? "mb-safe-bottom" : ""}
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
          className={isReactNativeWebView ? "mb-safe-bottom" : ""}
        />
      )}
    </>
  );
}
const styles = {
  selectWrapper: "p-5 pb-4",
  textareaWrapper: "px-[28px] py-4 pb-[98px] gap-3",

  recordTextarea:
    "h-[186.29px] leading-[22.86px] w-[114.29%] tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none transform origin-top-left scale-[0.875]",
};
