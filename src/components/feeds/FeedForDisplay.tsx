import React from "react";
import Flex from "../shared/Flex";
import InfoBar from "./InfoBar";
import Spacing from "../shared/Spacing";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { formatToDisplay } from "@/utils/makeUTC";
import { Lighty } from "@/constants/images";
import MessageIcon from "../shared/Icon/MessageIcon";

export default function FeedForDisplay() {
  const formattedDate = () => {
    const date = feed.gathering?.gatheringDate
      ? new Date(feed.gathering.gatheringDate)
      : new Date(feed.createdAt);
    return formatToDisplay(date).slice(0, 10);
  };
  const friendInfo = feed.withMembers.map((other) => ({
    name: other.name,
    imageUrl: other.profileImageUrl,
  }));

  return (
    <Flex direction="column" className={"my-3 pt-safe-top"}>
      <InfoBar friendInfo={friendInfo} feed={feed} />
      <Spacing size={12} />
      <Swiper
        slidesPerView={1.077}
        spaceBetween={12}
        grabCursor={true}
        style={{ paddingLeft: "20px" }}
        className="custom-swiper w-full"
        onTouchStart={(swiper, e) => {
          e.stopPropagation();
        }}
        onTouchMove={(swiper, e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(swiper, e) => {
          e.stopPropagation();
        }}
      >
        <SwiperSlide className={"relative bg-[#F4F4F4] rounded-2xl"}>
          <Image
            alt="feedImage"
            loading="eager"
            src={feed.gathering.invitationImageUrl || Lighty}
            className={styles.image}
            width={340}
            height={360}
          />
          <div className={styles.feedImageInfo}>
            <span>{"반가워요"}</span>
            <span>{formattedDate()}</span>
          </div>
          <Flex className="absolute inset-0" justify="center" align="center">
            <span className={styles.greeting}>
              {"💬 이곳에서 자유롭게"}
              <br />
              {"나만의 추억을 기록해보세요 :)"}
            </span>
          </Flex>
        </SwiperSlide>
      </Swiper>
      <Spacing size={8} />
      <div className={styles.wrapper}>
        <div className={styles.content}>{feed.content}</div>
        <Spacing size={4} />
        <Flex align="center" onClick={() => {}}>
          <MessageIcon />
          <Spacing direction="horizontal" size={2} />
          <span className="text-B4 text-grayscale-600 cursor-pointer">
            {feed.commentCount}
          </span>
        </Flex>
      </div>
    </Flex>
  );
}

const styles = {
  greeting:
    "text-[14px] leading-[24px] text-center text-grayscale-700 font-[500]",
  feedImageInfo:
    "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-4 py-[10px] rounded-b-[16px] bg-[#00000080]",
  gatheringImageInfo:
    "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-3 pt-2 rounded-b-[16px] bg-base-white",
  image: "slide-img object-cover rounded-2xl aspect-[17/18]",
  wrapper: "pl-6 pr-4 max-w-[430px]",
  content:
    "break-words whitespace-normal overflow-wrap-anywhere text-B4 text-grayscale-800 pr-3",
};

const feed = {
  id: "123412456",
  content: "첫 피드가 작성되면 이 피드는 자동으로 사라져요!",
  images: ["https://cdn.lighty.today/lighty_square.png"],
  commentCount: 3,
  writer: {
    id: "sadfsge23409374",
    accountId: "lighty",
    name: "라이티",
    profileImageUrl: "https://cdn.lighty.today/lighty.jpg",
  },
  createdAt: new Date().toISOString(),
  gathering: {
    id: "1234456yt4erwfd",
    name: "반가워요",
    members: [
      {
        id: "sadfsge23409374",
        accountId: "lighty",
        name: "라이티",
        profileImageUrl: "https://cdn.lighty.today/lighty.jpg",
      },
      {
        id: "123jhgsfd8074t6",
        accountId: "lighty2",
        name: "라이티2",
        profileImageUrl: "https://cdn.lighty.today/blanket.jpg",
      },
      {
        id: "sadfsge23409374",
        accountId: "lighty3",
        name: "라이티3",
        profileImageUrl: "https://cdn.lighty.today/cat.jpg",
      },
    ],
    gatheringDate: new Date().toISOString(),
    invitationImageUrl: "https://cdn.lighty.today/paper.png",
  },
  withMembers: [
    {
      id: "123jhgsfd8074t6",
      accountId: "lighty2",
      name: "라이티2",
      profileImageUrl: "https://cdn.lighty.today/blanket.jpg",
    },
    {
      id: "sadfsge23409374",
      accountId: "lighty3",
      name: "라이티3",
      profileImageUrl: "https://cdn.lighty.today/cat.jpg",
    },
  ],
};
