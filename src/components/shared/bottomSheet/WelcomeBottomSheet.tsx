import Image from "next/image";
import Spacing from "../Spacing";
import Flex from "../Flex";
import Button from "../Button/Button";
import clsx from "clsx";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";

export default function WelcomeBottomSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <BottomSheetWrapper onClose={onClose}>
      <Flex direction="column" align="center">
        <Spacing size={20} />
        <span className="text-T3">라이티에 오신 걸 환영해요! 🙌🏻</span>
        <Spacing size={8} />
        <span className="text-T3">
          <span className="text-[#6795FA]">서비스 기능</span>을 간단하게
          살펴볼까요?
        </span>
        <Spacing size={4} />
        <Image
          priority
          width={176}
          height={180}
          alt="welcomeImg"
          src={"https://cdn.lighty.today/welcome.png"}
        />
        <div className={styles.buttonWrapper}>
          <Button
            className={clsx(styles.button, styles.good)}
            onClick={onClose}
          >
            좋아요
          </Button>
          <Button
            className={clsx(styles.button, styles.okay)}
            onClick={onClose}
          >
            괜찮아요
          </Button>
        </div>
      </Flex>
    </BottomSheetWrapper>
  );
}

const styles = {
  button: "w-full py-[18px] rounded-full",
  good: "bg-grayscale-900 text-base-white hover:bg-grayscale-800",
  okay: "bg-base-white text-grayscale-400 hover:bg-grayscale-50",
  buttonWrapper:
    "w-full px-[20px] pt-[12px] font-[600] text-[14px] leading-[16.8px]",
};
