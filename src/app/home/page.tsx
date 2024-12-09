"use client";

import { headerBgColorAtom, headerFontColorAtom } from "@/atom/header";
import DateSlider from "@/components/home/DateSlider";
import FriendsSlider from "@/components/home/FriendsSlider";
import HomeBannerContainer from "@/components/home/HomeBannerContainer";
import Banner from "@/components/shared/banner";
import NavBar from "@/components/shared/NavBar";
import PhotoSwiper from "@/components/shared/PhotoSwiper";
import Spacing from "@/components/shared/Spacing";
import useScrollThreshold from "@/hooks/useScrollThreshold";
import { useSetRecoilState } from "recoil";

export default function HomePage() {
  const isPastThreshold = useScrollThreshold(92);
  const setBgColor = useSetRecoilState(headerBgColorAtom);
  const setFontColor = useSetRecoilState(headerFontColorAtom);
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

      <NavBar />
      <Spacing size={87} />
    </>
  );
}
const imageList = [
  "/images/window.jpg",
  "/images/party.jpg",
  "/images/ocean.jpg",
  "/images/groom.jpg",
  "/images/groom.jpg",
];
