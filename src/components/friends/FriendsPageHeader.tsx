import { Dispatch, SetStateAction } from "react";
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
