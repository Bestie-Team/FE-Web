import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/Icon/LightyLogo";
import Spacing from "../shared/Spacing";
import useFeedMine from "../feeds/hooks/useFeedMine";
import { cardSelectedFeedAtom } from "@/atoms/card";
import { maxDate, minDate } from "@/constants/time";
import { Feed } from "@/models/feed";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { NoFeedToMakeCard } from "../feeds/NoFeed";
import ClickableGatheringSwiperForDeco from "./ClickableGatheringSwiperForDeco";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const router = useRouter();
  const [selectedFeed, setSelectedFeed] = useRecoilState<
    Partial<Feed> & { name: string; imageUrl: string; date: string }
  >(cardSelectedFeedAtom);

  const { data } = useFeedMine({
    order: "DESC",
    minDate: minDate(),
    maxDate: maxDate(),
    limit: 20,
  });

  const handleImageClick = (feedInfo: {
    id: string;
    name: string;
    content: string;
    imageUrl: string;
    date: string;
  }) => {
    setSelectedFeed(
      feedInfo as Partial<Feed> & {
        imageUrl: string;
        name: string;
        date: string;
      }
    );
  };

  const feeds = data;

  return (
    <Flex
      direction="column"
      justify="space-between"
      className="h-dvh relative pt-safe-top pb-safe-bottom overflow-y-scroll no-scrollbar"
    >
      <Flex direction="column">
        <div className="px-6">
          <Spacing size={76} />
          <LightyLogo />
          <Spacing size={16} />
          <span className="text-T2">어떤 피드의</span>
          <Spacing size={7} />
          <span className="text-T2">포토 카드를 꾸밀까요?</span>
          <Spacing size={16} />
          <span className="text-B3 text-grayscale-500">
            직접 작성한 피드만 카드로 꾸밀 수 있어요.
          </span>
          <Spacing size={20} />
        </div>
        {!feeds || feeds.length < 1 ? (
          <NoFeedToMakeCard />
        ) : (
          <ClickableGatheringSwiperForDeco
            feed={feeds}
            onImageClick={handleImageClick}
            selectedFeedId={selectedFeed?.id || null}
          />
        )}
      </Flex>
      <div className={styles.buttonWrapper}>
        {feeds && feeds.length < 1 ? (
          <button
            disabled={selectedFeed == null}
            className={styles.button}
            onClick={() => {
              router.push("/record");
            }}
          >
            {"피드 작성하러 가기"}
          </button>
        ) : (
          <button
            className={clsx(
              styles.button,
              selectedFeed.id === "" && "!bg-grayscale-200"
            )}
            disabled={selectedFeed.id === ""}
            onClick={() => {
              onNext();
            }}
          >
            {"꾸미기 시작!"}
          </button>
        )}
      </div>
    </Flex>
  );
}

const styles = {
  button: `bg-grayscale-900 w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`,
  buttonWrapper: `w-full px-5 pt-3 animate-slide-up will-change-transform pb-16`,
};
