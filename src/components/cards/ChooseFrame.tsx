import { cardFrameAtom } from "@/atoms/card";
import SelectFrameSwiper from "@/components/cards/SelectFrameSwiper";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRecoilValue } from "recoil";

export default function ChooseFrame({ onNext }: { onNext: () => void }) {
  const selectedFrame = useRecoilValue(cardFrameAtom);

  return (
    <Flex
      className="relative h-dvh pt-safe-top pb-safe-bottom overflow-y-scroll no-scrollbar"
      justify="space-between"
      direction="column"
    >
      <div>
        <Spacing size={76} />
        <Flex className="px-6 gap-4" direction="column">
          <span className="text-T2">프레임을 선택해 주세요</span>
          <span className="text-B3">나만의 특별한 카드를 만들어봐요</span>
        </Flex>
        <Spacing size={28} />
        <SelectFrameSwiper />
      </div>
      <div className={styles.buttonWrapper}>
        <button
          disabled={selectedFrame == null}
          className={styles.button}
          onClick={() => {
            onNext();
          }}
        >
          {"스티커로 꾸미기"}
        </button>
      </div>
    </Flex>
  );
}

const styles = {
  button: `mb-safe-bottom bg-grayscale-900 w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`,
  buttonWrapper: `w-full px-5 pb-16 pt-3 animate-slide-up will-change-transform`,
};
