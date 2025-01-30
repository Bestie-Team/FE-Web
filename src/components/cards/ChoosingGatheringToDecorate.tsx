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
import { maxDate, minDate } from "@/constants/time";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const [selectedFeed, setSelectedFeed] = useRecoilState<
    Partial<Feed> & { name: string; imageUrl: string; date: string }
  >(cardSelectedFeedAtom);

  const { data, isFetching } = useFeedMine({
    order: "DESC",
    minDate: minDate(),
    maxDate: maxDate(),
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
