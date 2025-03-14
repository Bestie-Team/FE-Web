import { Dispatch, SetStateAction } from "react";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import Spacing from "../shared/Spacing";
import { useRouter } from "next/navigation";
import HeaderWithBtn from "../shared/Header/HeaderWithBtn";

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
  const clickBackBtnHandler = () => {
    if (type === "groupEdit" || type === "group" || type === "gathering") {
      if (setStep) {
        setStep(1);
      }
    } else {
      router.back();
    }
  };
}
