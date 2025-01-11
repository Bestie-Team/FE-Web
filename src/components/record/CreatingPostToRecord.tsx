import { useState } from "react";
import { TogetherInfo } from "../feed/InfoBar";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import EditPhotoSwiper from "./UploadPhotoSwiper";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import HeaderReturner from "@/utils/getHeader";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import { GATHERINGS_PASSED } from "@/constants/gathering";
import { useRecoilValue } from "recoil";
import { recordGatheringAtom } from "@/atoms/record";
import { GatheringResponse } from "@/models/gathering";

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
  const selectedGatheringId = useRecoilValue(recordGatheringAtom);
  // const options = [
  //   {
  //     value: "최은재",
  //     label: (
  //       <Flex align="center">
  //         <Image
  //           alt="img"
  //           width={24}
  //           height={24}
  //           className="border-[0.86px] border-base-white rounded-full"
  //           src="https://cdn.lighty.today/anton.PNG"
  //         />
  //         <Spacing direction="horizontal" size={2} />
  //         <span className="text-C2 text-grayscale-600">최은재</span>
  //       </Flex>
  //     ),
  //   },
  //   {
  //     value: "정서인",
  //     label: (
  //       <Flex align="center">
  //         <Image
  //           alt="img"
  //           width={24}
  //           height={24}
  //           className="border-[0.86px] border-base-white rounded-full"
  //           src="https://cdn.lighty.today/anton.PNG"
  //         />
  //         <Spacing direction="horizontal" size={2} />
  //         <span className="text-C2 text-grayscale-600">정서인</span>
  //       </Flex>
  //     ),
  //   },
  //   {
  //     value: "임유진",
  //     label: (
  //       <Flex align="center">
  //         <Image
  //           alt="img"
  //           width={24}
  //           height={24}
  //           className="border-[0.86px] border-base-white rounded-full"
  //           src="https://cdn.lighty.today/anton.PNG"
  //         />
  //         <Spacing direction="horizontal" size={2} />
  //         <span className="text-C2 text-grayscale-600">임유진</span>
  //       </Flex>
  //     ),
  //   },
  // ];
  if (selectedGatheringId == null) return null;
  const gathering = GATHERINGS_PASSED.find(
    (g) => g.id === selectedGatheringId
  ) as GatheringResponse;

  const { description, name, group } = gathering;

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {HeaderReturner()}
        {/* <div className={styles.selectWrapper}>
          <SmallSelect
            options={options}
            selected={null}
            setSelected={null}
            placeholder="1명 작성 완료"
          />
        </div> */}
      </div>
      <Flex direction="column" className={styles.gatheringInfoWrapper}>
        <Flex>
          <Flex direction="column" style={{ flexGrow: 1 }}>
            <span className="text-T2">{name}</span>
            <Spacing size={8} />
            <span className="text-C2 text-grayscale-400">{description}</span>
          </Flex>
          <Spacing direction="horizontal" size={16} />
          <TogetherInfo members={group.members} />
        </Flex>
        <Spacing size={28} />
      </Flex>
      <EditPhotoSwiper images={postInfo.imageUrl} setImages={setPostInfo} />
      <Spacing size={8} />
      <Flex direction="column" className={styles.textareaWrapper}>
        <textarea
          inputMode="text"
          placeholder="해당 모임에는 어떤 소중한 추억이 있었나요? 그날의 추억에 대해 글로 작성해 보세요."
          onChange={(e) => {
            setPostInfo((prev) => ({ ...prev, recordContent: e.target.value }));
          }}
          className={styles.recordTextarea}
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

const styles = {
  container: "bg-base-white h-screen",
  headerWrapper: "bg-base-white max-w-[430px] w-full fixed z-10",
  selectWrapper: "p-[20px] pb-[16px]",

  gatheringInfoWrapper: "p-[20px] pt-[124px] pb-0",

  textareaWrapper: "px-[28px] py-[16px] pb-[98px]",
  recordTextarea:
    "h-[186.29px] leading-[22.86px] w-[114.29%] tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none transform origin-top-left scale-[0.875]",
};
