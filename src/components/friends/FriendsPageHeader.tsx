"use client";
import { Dispatch, SetStateAction } from "react";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import Spacing from "../shared/Spacing";
import { useRouter } from "next/navigation";

export default function FriendsPageHeader({
  label,
  setStep,
}: {
  label: string;
  setStep?: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();

  return (
    <div className={styles.headerWrapper}>
      <div
        className={styles.arrowIconContainer}
        onClick={() => {
          if (setStep) {
            setStep(0);
          } else {
            router.back();
          }
        }}
      >
        <ArrowLeftIcon />
      </div>
      <Spacing size={6} direction="horizontal" />
      <span className="flex-grow text-T3">{label}</span>
      <Spacing size={6} direction="horizontal" />
    </div>
  );
}

const styles = {
  arrowIconContainer:
    "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer hover:animate-shrink-grow",

  headerWrapper: "bg-grayscale-50 pr-5 flex w-full items-center h-12",
};
