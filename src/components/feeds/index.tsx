"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import useGatheringNoFeeds from "../gathering/hooks/useGatheringNoFeed";
import FullPageLoader from "../shared/FullPageLoader";
import getHeader from "@/utils/getHeader";

const DynamicComponents: { [key: number]: React.ComponentType<any> } = {
  1: dynamic(() => import("./ChoosingKindOfMemory"), {
    loading: () => <FullPageLoader height="100dvh" />,
    ssr: false,
  }),
  2: dynamic(() => import("./ChoosingGatheringToRecord"), {
    loading: () => <FullPageLoader height="100dvh" />,
    ssr: false,
  }),
  2.5: dynamic(() => import("./ChooseFriendToShare"), {
    loading: () => <FullPageLoader height="100dvh" />,
    ssr: false,
  }),
  3: dynamic(() => import("./CreatingFeed"), {
    loading: () => <FullPageLoader height="100dvh" />,
    ssr: false,
  }),
  3.5: dynamic(() => import("./CreatingFeedNoGathering"), {
    loading: () => <FullPageLoader height="100dvh" />,
    ssr: false,
  }),
};

export default function Record() {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);
  const header = getHeader("/record");
  const { data: gathering_noFeed } = useGatheringNoFeeds({ limit: 30 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !gathering_noFeed || step === 0) {
    return <FullPageLoader height="100dvh" />;
  }

  // 동적 컴포넌트 렌더링
  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div className="pt-12 h-dvh">
      <div className={styles.headerWrapper}>{header}</div>
      <CurrentStepComponent
        add={add}
        setAdd={setAdd}
        setStep={setStep}
        onNext={() => setStep((prev) => prev + 1)}
        debouncedSearch={debouncedSearch}
        gathering={gathering_noFeed}
      />
    </div>
  );
}
const styles = {
  headerWrapper: "max-w-[430px] w-full fixed z-10",
};
