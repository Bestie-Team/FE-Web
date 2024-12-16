"use client";

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
import useChangeHeaderStyle from "@/hooks/useChangeHeaderStyle";
import HeaderReturner from "@/utils/headerReturner";
import { useRecoilState } from "recoil";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useRecoilState(homeModalStateAtom);
  useChangeHeaderStyle();

  return (
    <>
      {HeaderReturner()}
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <Spacing size={8} />
      <PhotoSwiper images={imageList} percent={2.2} type="home" />
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
