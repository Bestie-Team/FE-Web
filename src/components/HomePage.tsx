import React, { useEffect, useMemo, useState } from "react";
import HomeBannerContainer from "./home/HomeBannerContainer";
import FriendsSlider from "./home/FriendsSlider";
import Spacing from "./shared/Spacing";
import DateSlider from "./home/DateSlider";
import GatheringSwiper from "./gathering/GatheringSwiper";
import Banner from "./shared/Banner";
import Flex from "./shared/Flex";
import ArrowRightIcon from "./shared/Icon/ArrowRightIcon";
import Gathering from "./gathering/Gathering";
import MemoriesBottomSheet from "./shared/BottomDrawer/MemoriesBottomSheet";
import WelcomeBottomSheet from "./shared/BottomDrawer/WelcomeBottomSheet";
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { homeModalStateAtom } from "@/atoms/home";
import STORAGE_KEYS from "@/constants/storageKeys";
import { useAuth } from "./shared/providers/AuthProvider";
import { getWeekDates } from "@/utils/getThisWeekDates";
import useGatherings from "./gathering/hooks/useGatherings";
import FullPageLoader from "./shared/FullPageLoader";
import { GatheringInWhich } from "@/models/gathering";

export default function HomePage() {
  const { setUserInfo } = useAuth();
  const header = getHeader("/");

  const [isModalOpen, setIsModalOpen] = useRecoilState(homeModalStateAtom);
  const [isNew, setIsNew] = useState(false);

  const sevenDays = getWeekDates();
  const minDate = useMemo(() => new Date(sevenDays[0]).toISOString(), []);
  const maxDate = useMemo(() => new Date(sevenDays[6]).toISOString(), []);
  const {
    data: this_week,
    isFetching,
    isError,
  } = useGatherings({
    cursor: minDate,
    limit: 10,
    minDate,
    maxDate,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    const imageUrlFromSignup = localStorage.getItem(
      STORAGE_KEYS.PROFILE_IMAGE_URL
    );
    if (refParam === "signup") {
      setIsNew(true);
      setUserInfo((prev) => ({
        ...prev,
        profileImageUrl: imageUrlFromSignup,
        accountId: prev?.accountId || "",
      }));
      console.log("from signup");
    }
  }, []);

  if (!this_week || isFetching || isError) return <FullPageLoader />;
  console.log(this_week);

  return (
    <div>
      {header}
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <Spacing size={8} />
      {this_week ? (
        <GatheringSwiper percent={2.2} gatherings={this_week?.gatherings} />
      ) : null}
      <Banner />
      <Flex direction="column" align="center">
        <Flex className="w-full px-5" align="center">
          <span className="text-T3 flex-grow">📝 추억을 기록해볼까요?</span>
          <ArrowRightIcon width="16" height="16" color="#808080" />
        </Flex>
        {this_week ? (
          <Gathering
            where={GatheringInWhich.HOME}
            className="pt-4"
            myGatherings={this_week.gatherings}
          />
        ) : null}
      </Flex>
      {isModalOpen && (
        <MemoriesBottomSheet
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isNew && <WelcomeBottomSheet onClose={() => setIsNew(false)} />}
      <Spacing size={87} />
    </div>
  );
}
