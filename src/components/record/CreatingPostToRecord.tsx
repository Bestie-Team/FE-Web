import { useState } from "react";
import { TogetherInfo } from "../feed/InfoBar";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import EditPhotoSwiper from "./UploadPhotoSwiper";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import Image from "next/image";
import SmallSelect from "./SmallSelect";
import HeaderReturner from "@/utils/headerReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";

export default function CreatingPostToRecord({
  onNext,
}: {
  onNext: (postInfoValues: {
    imageUrl: string[];
    recordContent: string;
  }) => void;
}) {
  const hasShadow = useScrollShadow();
  const [postInfo, setPostInfo] = useState<{
    imageUrl: string[];
    recordContent: string;
  }>({ imageUrl: [], recordContent: "" });

  const options = [
    {
      value: "최은재",
      label: (
        <Flex align="center">
          <Image
            alt="img"
            width={24}
            height={24}
            className="border-[0.86px] border-base-white rounded-full"
            src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
          />
          <Spacing direction="horizontal" size={2} />
          <span className="text-C2 text-grayscale-600">최은재</span>
        </Flex>
      ),
    },
    {
      value: "정서인",
      label: (
        <Flex align="center">
          <Image
            alt="img"
            width={24}
            height={24}
            className="border-[0.86px] border-base-white rounded-full"
            src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
          />
          <Spacing direction="horizontal" size={2} />
          <span className="text-C2 text-grayscale-600">정서인</span>
        </Flex>
      ),
    },
    {
      value: "임유진",
      label: (
        <Flex align="center">
          <Image
            alt="img"
            width={24}
            height={24}
            className="border-[0.86px] border-base-white rounded-full"
            src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
          />
          <Spacing direction="horizontal" size={2} />
          <span className="text-C2 text-grayscale-600">임유진</span>
        </Flex>
      ),
    },
  ];

  return (
    <div className="bg-base-white h-screen">
      <div
        className={clsx(
          "bg-base-white max-w-[430px] w-full fixed z-10",
          hasShadow ? "shadow-bottom" : ""
        )}
      >
        {HeaderReturner()}
        <div className="p-[20px] pb-[16px]">
          <SmallSelect
            options={options}
            selected={null}
            setSelected={null}
            placeholder="1명 작성 완료"
          />
        </div>
      </div>
      <Flex
        direction="column"
        style={{ padding: "20px", paddingTop: "124px", paddingBottom: 0 }}
      >
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
      <Flex
        direction="column"
        style={{ padding: "16px 28px", paddingBottom: "98px" }}
      >
        <textarea
          inputMode="text"
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
          <span className="text-grayscale-900 text-B3">{`${postInfo.recordContent?.length}`}</span>
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
    </div>
  );
}

const recordTextAreaStyle =
  "h-[186.29px] leading-[22.86px] w-[114.29%] tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none transform origin-top-left scale-[0.875]";
