import { useState } from "react";
import { TogetherInfo } from "../feed/InfoBar";
import Flex from "../shared/Flex";
import PencilIcon from "../shared/icons/PencilIcon";
import Spacing from "../shared/Spacing";
import EditPhotoSwiper from "./EditPhotoSwiper";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";

export default function CreatingPostToRecord({
  onNext,
}: {
  onNext: (postInfoValues: {
    imageUrl: string[];
    recordContent: string;
  }) => void;
}) {
  const [postInfo, setPostInfo] = useState<{
    imageUrl: string[];
    recordContent: string;
  }>({ imageUrl: [], recordContent: "" });

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ padding: "24px", paddingBottom: 0 }}>
        <div>
          <PencilIcon width="28.8" height="28.8" color="#0A0A0A" />
        </div>
        <Spacing size={16} />
        <Flex>
          <Flex direction="column" style={{ flexGrow: 1 }}>
            <span className="text-T2">christmas party</span>
            <Spacing size={8} />
            <span className="text-C2 text-grayscale-400">
              먹고 죽는 크리스마스 돼지 파티에 초대합니다
            </span>
          </Flex>
          <Spacing direction="horizontal" size={16} />
          <TogetherInfo />
        </Flex>
        <Spacing size={28} />
      </Flex>
      <EditPhotoSwiper images={postInfo.imageUrl} setImages={setPostInfo} />
      <Spacing size={8} />
      <Flex direction="column" style={{ padding: "16px 28px" }}>
        <textarea
          placeholder="해당 모임에는 어떤 소중한 추억이 있었나요? 그날의 추억에 대해 글로 작성해 보세요."
          onChange={(e) => {
            setPostInfo((prev) => ({ ...prev, recordContent: e.target.value }));
          }}
          className={recordTextAreaStyle}
        >
          {postInfo.recordContent}
        </textarea>
        <Spacing size={12} />
        <div className="text-right">
          <span className="text-grayscale-900 text-B4">{`${postInfo.recordContent?.length}`}</span>
          <span className="text-grayscale-300 text-B4">{` / 150`}</span>
        </div>
      </Flex>
      <FixedBottomButton
        label={"기록 완료"}
        onClick={() => {
          onNext(postInfo);
        }}
        disabled={postInfo.imageUrl.length === 0}
      />
    </Flex>
  );
}

const recordTextAreaStyle =
  "h-[163px] text-B3 text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none";
