import getHeader from "@/utils/getHeader";
import Flex from "../shared/Flex";
import LightyIcon from "../shared/Icon/LightyIcon";
import Spacing from "../shared/Spacing";
import Image from "next/image";

export default function ChoosingKindOfMemory() {
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
        <Item title="일반 추억" subTitle="자유롭게 나의 추억을 기록해요" />
        <Item
          title="라이티 모임 추억"
          subTitle="라이티에서 만든 모임의 추억을 기록해요"
        />
      </Flex>
    </div>
  );
}

const Item = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <Flex className="bg-base-white rounded-2xl px-4 py-5 gap-3 cursor-pointer">
      <Image
        src={"/lighty_square.png"}
        width={40}
        height={40}
        alt="lighty_square"
      />
      <Flex direction="column">
        <span>{title}</span>
        <Spacing size={6} />
        <span className="text-C2 text-grayscale-400">{subTitle}</span>
      </Flex>
    </Flex>
  );
};
