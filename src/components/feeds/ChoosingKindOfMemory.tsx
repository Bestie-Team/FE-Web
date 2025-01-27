import getHeader from "@/utils/getHeader";
import Flex from "../shared/Flex";
import LightyIcon from "../shared/Icon/LightyIcon";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
const DEFAULT_IMAGE = "/lighty.jpg";

export default function ChoosingKindOfMemory({
  add,
  setAdd,
  setStep,
}: {
  add: number;
  setAdd: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const header = getHeader("/record");
  return (
    <div className="h-screen bg-grayscale-50 pt-12">
      {header}
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <LightyIcon width="24" height="24" color="#0A0A0A" />
        <span>어떤 추억을 기록할까요?</span>
        <span className="text-B3 text-grayscale-500">
          기록하고 싶은 추억을 선택해 주세요.
        </span>
      </Flex>
      <Spacing size={36} />
      <Flex direction="column" className="px-6 gap-5 text-T5">
        <Item
          title="일반 추억"
          subTitle="자유롭게 나의 추억을 기록해요"
          onClick={() => setAdd(1.5)}
          clicked={add === 1.5}
        />
        <Item
          title="라이티 약속 추억"
          subTitle="라이티에서 만든 약속의 추억을 기록해요"
          onClick={() => setAdd(1)}
          clicked={add === 1}
        />
      </Flex>
      <FixedBottomButton
        disabled={add < 1}
        label={"다음"}
        onClick={() => {
          setStep((prev) => prev + add);
        }}
      />
    </div>
  );
}

const Item = ({
  title,
  subTitle,
  onClick,
  clicked,
}: {
  title: string;
  subTitle: string;
  onClick: () => void;
  clicked: boolean;
}) => {
  return (
    <Flex
      onClick={onClick}
      className={clsx(
        "bg-base-white rounded-2xl px-4 py-5 gap-3 cursor-pointer border-[1px] border-base-white",
        clicked && "border-[1px] border-grayscale-900"
      )}
    >
      <Image src={DEFAULT_IMAGE} width={40} height={40} alt="lighty_square" />
      <Flex direction="column">
        <span>{title}</span>
        <Spacing size={6} />
        <span className="text-C2 text-grayscale-400">{subTitle}</span>
      </Flex>
    </Flex>
  );
};
