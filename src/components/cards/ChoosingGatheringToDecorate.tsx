"use client";
import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/Icon/LightyLogo";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import ClickableGatheringSwiperForDeco from "./ClickableGatheringSwiperForDeco";
import useFeedMine from "../feeds/hooks/useFeedMine";
import DotSpinner from "../shared/Spinner/DotSpinner";
import { Feed } from "@/models/feed";
import { cardSelectedFeedAtom } from "@/atoms/card";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const [selectedFeed, setSelectedFeed] = useRecoilState<
    Partial<Feed> & { name: string; imageUrl: string; date: string }
  >(cardSelectedFeedAtom);

  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  const { data, isFetching } = useFeedMine({
    order: "DESC",
    minDate,
    maxDate,
    limit: 20,
  });

  const handleImageClick = (
    feedInfo: {
      id: string;
      name: string;
      content: string;
      imageUrl: string;
      date: string;
    } | null
  ) => {
    setSelectedFeed(
      feedInfo as Partial<Feed> & {
        imageUrl: string;
        name: string;
        date: string;
      }
    );
  };

  const feeds = data?.feeds;
  // if (feeds && feeds?.length < 1) {
  //   return <div>작성할 수 있는 피드가 없네여~</div>;
  // }
  // const feed = {
  //   id: "12345",
  //   content:
  //     "오늘 지연이 생파 완전 꿀잼이었다..!! 애들아 앞으로 더 자주 보자 💖",
  //   images: [""],
  //   commentCount: 2,
  //   writer: {
  //     id: "",
  //     accountId: "",
  //     name: "",
  //     profileImageUrl: null,
  //   },
  //   createdAt: new Date().toISOString(),
  //   gathering: {
  //     id: "00000",
  //     name: "지연이 생일 파티🎂",
  //     description:
  //       "오늘 지연이 생파 완전 꿀잼이었다..!! 애들아 앞으로 더 자주 보자 💖",
  //     gatheringDate: "",
  //     invitationImageUrl: "/IMG_5062.jpg",
  //   },
  // };
  console.log(feeds);
  return (
    <Flex direction="column" className="bg-base-white h-screen pt-12">
      <Flex direction="column" className="px-6">
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 피드의</span>
        <Spacing size={7} />
        <span className="text-T2">포토 카드를 꾸밀까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          직접 작성한 피드만 카드로 꾸밀 수 있어요.
        </span>
      </Flex>
      <Spacing size={40} />
      {isFetching || !feeds ? (
        <DotSpinner />
      ) : (
        <ClickableGatheringSwiperForDeco
          feed={feeds}
          onImageClick={handleImageClick}
          selectedFeedId={selectedFeed?.id || null}
        />
      )}
      <FixedBottomButton
        disabled={selectedFeed?.id === ""}
        label={"꾸미기 시작!"}
        onClick={() => {
          onNext();
        }}
      />
    </Flex>
  );
}
