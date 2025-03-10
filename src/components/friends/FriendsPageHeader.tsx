import { Dispatch, SetStateAction } from "react";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import Spacing from "../shared/Spacing";
import { useRouter } from "next/navigation";

export default function FriendsPageHeader({
  label,
  setStep,
  type,
}: {
  label: string;
  setStep?: Dispatch<SetStateAction<number>>;
  type: "default" | "group" | "gathering" | "groupEdit";
}) {
  const router = useRouter();

  return (
    <div className={styles.headerWrapper}>
      <button
        className={styles.arrowIconContainer}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (
            type === "groupEdit" ||
            type === "group" ||
            type === "gathering"
          ) {
            if (setStep) {
              setStep(1);
            }
          } else {
            router.back();
          }
        }}
      >
        <ArrowLeftIcon />
      </button>
      <Spacing size={6} direction="horizontal" />
      <span className="flex-grow text-T3">{label}</span>
      <Spacing size={6} direction="horizontal" />
    </div>
  );
}

const styles = {
  arrowIconContainer:
    "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer active:animate-shrink-grow",

  headerWrapper: "bg-grayscale-50 pr-5 flex w-full items-center h-12",
};
