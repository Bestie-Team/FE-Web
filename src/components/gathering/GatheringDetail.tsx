import GatheringBannerContainer from "./GatheringBannerContainer";
import LeaderContainer from "../shared/LeaderContainer";
import Spacing from "../shared/Spacing";
import LightyInfoContainer from "../shared/LightyInfoContainer";
import FeedIcon from "../shared/Icon/FeedIcon";
import Flex from "../shared/Flex";
import CalendarIcon from "../shared/Icon/CalendarIcon";
import Image from "next/image";
import MapPinIcon from "../shared/Icon/MapPinIcon";
import UserIcon from "../shared/Icon/UserIcon";
import MemberContainer from "../shared/MembersContainer";
import { useAuth } from "../shared/providers/AuthProvider";
import { formatToKoreanTime } from "@/utils/makeUTC";
import { GatheringDetailResponse } from "@/models/gathering";
import { MAP } from "@/constants/images";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { MENU_TYPES } from "@/models/dropdown";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";

const GatheringOption = dynamic(() => import("./GatheringOption"), {
  ssr: false,
});

export default function GatheringDetail({
  selectedGathering,
  isLoaded,
  setIsLoaded,
}: {
  selectedGathering: GatheringDetailResponse;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const { userInfo } = useAuth();
  const { gatheringDate, members, hostUser, address, description, name, id } =
    selectedGathering;
  const { isReactNativeWebView } = useReactNativeWebView();

  const convertedDate = formatToKoreanTime(gatheringDate);
  const isEnded = new Date(gatheringDate).getTime() < new Date().getTime();

  return (
    <div>
      <div className="w-full relative h-[380px]">
        <GatheringBannerContainer
          gathering={selectedGathering}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
        />
        {!isLoaded && <div className="absolute bg-grayscale-10 h-full" />}
      </div>
      <div
        className={"absolute top-4 right-5 flex gap-[14px] z-50"}
        // TODO 헤더랑 분리돼 있고, top으로 위치가 맞춰져 있어서 아이콘 크기랑 계산해서 top을 변경했어요, 나중에 변경해야할듯
        style={
          isReactNativeWebView
            ? { top: "calc(env(safe-area-inset-top) - 12px)" }
            : {}
        }
      >
        {userInfo?.accountId === hostUser.accountId && (
          <GatheringOption
            type={isEnded ? MENU_TYPES.GATHERING_ENDED : MENU_TYPES.GATHERING}
            gathering={selectedGathering}
          />
        )}
      </div>
      <LeaderContainer leader={hostUser} />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<FeedIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 설명</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>약속 장소</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{address}</span>
            <Spacing size={8} direction="horizontal" />
            <Image
              className="rounded-[10.8px] w-9 h-9 object-cover"
              alt="mapIcon"
              width={36}
              height={36}
              src={MAP}
            />
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 시간</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{convertedDate.slice(0, 10)}</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">
              {convertedDate.slice(10)}
            </span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`약속 멤버 ${members.length}`}</span>
        }
        content={<MemberContainer members={members} />}
      />
    </div>
  );
}

const styles = {
  title: "font-[700] text-base leading-[20.8px]",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
};
