"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { friendToRecordAtom, recordStepAtom } from "@/atoms/record";
import getHeader from "@/utils/getHeader";
import DotSpinner from "../shared/Spinner/DotSpinner";
import ErrorPage from "../shared/ErrorPage";

const DynamicComponents: { [key: number]: React.ComponentType<any> } = {
  1: dynamic(() => import("./ChoosingKindOfMemory"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  2: dynamic(() => import("./ChoosingGatheringToRecord"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  2.5: dynamic(() => import("./ChooseFriendToShare"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  3: dynamic(() => import("./CreatingFeed"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  3.5: dynamic(() => import("./CreatingFeedNoGathering"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
};

export default function Record() {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useRecoilState(recordStepAtom);
  const [add, setAdd] = useState<number>(0);
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);
  const header = useMemo(() => getHeader("/record"), []);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  if (!isClient) {
    return <ErrorPage />;
  } else if (step === 0) {
    return <DotSpinner />;
  }

  // 동적 컴포넌트 렌더링
  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div className="relative pt-12 h-dvh">
      <div className={styles.headerWrapper}>{header}</div>
      <CurrentStepComponent
        add={add}
        setAdd={setAdd}
        setStep={setStep}
        onNext={() => setStep((prev) => prev + 1)}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
}
const styles = {
  headerWrapper: "max-w-[430px] w-full fixed z-10",
};
