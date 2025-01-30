import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { HOME_BANNER } from "@/constants/images";

export default function HomeBannerContainer() {
  const subTitle = "Welcome To Lighty";
  const title = "소중한 당신의 추억을 기록하세요";

  return (
    <Flex className="w-full">
      <div className="relative w-full">
        <div className="h-[420px] w-full">
          <Image
            priority
            alt="homeBanner"
            layout="fixed"
            src={HOME_BANNER}
            width={600}
            height={420}
            className={styles.homeBannerImage}
          />
        </div>
        <Flex direction="column" className={styles.textWrapper}>
          <span className={styles.subTitle}>{subTitle}</span>
          <Spacing size={8} />
          <Flex direction="column">
            <span className={styles.title}>{title.slice(0, 7)}</span>
            <Spacing size={6} />
            <span className={styles.title}>{title.slice(7)}</span>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
}

const styles = {
  homeBannerImage: "h-[420px]",

  textWrapper: "absolute bottom-0 left-0 pl-6 pb-8",
  subTitle:
    "text-base-white font-[500] text-[14px] leading-[24px] tracking-[-0.42px]",
  title: "text-base-white text-T1",
};
