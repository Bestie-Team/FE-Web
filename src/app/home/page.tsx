"use client";

import { headerBgColorAtom, headerFontColorAtom } from "@/atoms/header";
import { homeModalStateAtom } from "@/atoms/home";
import DateSlider from "@/components/home/DateSlider";
import FriendsSlider from "@/components/home/FriendsSlider";
import HomeBannerContainer from "@/components/home/HomeBannerContainer";
import Banner from "@/components/shared/banner";
import BottomSheet from "@/components/shared/bottomSheet/BottomSheet";
import Flex from "@/components/shared/Flex";
import NavBar from "@/components/shared/NavBar";
import PhotoSwiper from "@/components/shared/PhotoSwiper";
import Spacing from "@/components/shared/Spacing";
import useScrollThreshold from "@/hooks/useScrollThreshold";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function HomePage() {
  const isPastThreshold = useScrollThreshold(92);
  const setBgColor = useSetRecoilState(headerBgColorAtom);
  const setFontColor = useSetRecoilState(headerFontColorAtom);
  const [modalOpen, setModalOpen] = useRecoilState(homeModalStateAtom);

  if (isPastThreshold) {
    setBgColor("#fff");
    setFontColor("#0A0A0A");
  } else {
    setBgColor("transparent");
    setFontColor("#fff");
  }

  return (
    <>
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <PhotoSwiper images={imageList} percent={2.2} />
      <Banner />
      <Flex direction="column" align="center">
        <div className="mb-[3px]">icon</div>
        <p>태권도</p>
      </Flex>
      {modalOpen && (
        <BottomSheet
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
      <NavBar />
      <Spacing size={87} />
    </>
  );
}
const imageList = [
  "https://d20j4cey9ep9gv.cloudfront.net/window.jpg",
  "https://d20j4cey9ep9gv.cloudfront.net/party.jpg",
  "https://d20j4cey9ep9gv.cloudfront.net/ocean.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
];
