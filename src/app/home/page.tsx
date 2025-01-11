"use client";

import { homeModalStateAtom } from "@/atoms/home";
import Gathering from "@/components/gathering/Gathering";
import GatheringSwiper from "@/components/gathering/GatheringSwiper";
import DateSlider from "@/components/home/DateSlider";
import FriendsSlider from "@/components/home/FriendsSlider";
import HomeBannerContainer from "@/components/home/HomeBannerContainer";
import Banner from "@/components/shared/banner/Banner";
import WelcomeBottomSheet from "@/components/shared/bottomSheet/WelcomeBottomSheet";
import Flex from "@/components/shared/Flex";
import ArrowRightIcon from "@/components/shared/icons/ArrowRightIcon";
import Spacing from "@/components/shared/Spacing";
import useChangeHeaderStyle from "@/hooks/useChangeHeaderStyle";
import getHeader from "@/utils/getHeader";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";

export default function HomePage() {
  useChangeHeaderStyle();
  const pathname = usePathname();
  const header = getHeader(pathname);
  const [modalOpen, setModalOpen] = useRecoilState(homeModalStateAtom);

  return (
    <div
      id="scrollable-container"
      className="bg-base-white overflow-y-scroll no-scrollbar"
    >
      {header}
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <Spacing size={8} />
      <GatheringSwiper percent={2.2} />
      <Banner />
      <Flex direction="column" align="center">
        <Flex className="w-full px-[20px]" align="center">
          <span className="text-T3 flex-grow">📝 추억을 기록해볼까요?</span>
          <ArrowRightIcon width="16" height="16" color="#808080" />
        </Flex>
        <Gathering which="2" className="pt-[16px]" />
      </Flex>
      {modalOpen && (
        <WelcomeBottomSheet
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
      <Spacing size={87} />
    </div>
  );
}
