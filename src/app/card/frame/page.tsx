"use client";
import SelectFrameSwiper from "@/components/cards/SelectFrameSwiper";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";

export default function FramePage() {
  return (
    <Flex className="bg-grayscale-50 h-screen" direction="column">
      <div className={styles.header}>{HeaderReturner()}</div>
      <Spacing size={88} />
      <Flex className="px-[24px]" direction="column">
        <span className="text-T2">프레임을 선택해 주세요</span>
        <Spacing size={16} />
        <span className="text-B3">나만의 특별한 카드를 만들어봐요</span>
      </Flex>
      <Spacing size={40} />
      <SelectFrameSwiper />
    </Flex>
  );
}
const styles = {
  header: "max-w-[430px] fixed z-10 w-full",
};
