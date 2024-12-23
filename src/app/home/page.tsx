"use client";

import { homeModalStateAtom } from "@/atoms/home";
import DateSlider from "@/components/home/DateSlider";
import FriendsSlider from "@/components/home/FriendsSlider";
import HomeBannerContainer from "@/components/home/HomeBannerContainer";
import Banner from "@/components/shared/banner";
import TermsBottomSheet from "@/components/shared/bottomSheet/TermsBottomSheet";
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
        <TermsBottomSheet
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
  "https://d1al3w8x2wydb3.cloudfront.net/images/window.jpg",
  "https://d1al3w8x2wydb3.cloudfront.net/images/party.jpg",
  "https://d1al3w8x2wydb3.cloudfront.net/images/ocean.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
  "https://d1al3w8x2wydb3.cloudfront.net/images/groom.JPG",
];
