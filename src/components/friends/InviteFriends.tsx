import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SelectFriendsContainer from "@/components/friends/SelectFriendsContainer";
import SearchInput from "@/components/shared/Input/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { Dispatch, SetStateAction } from "react";
import * as lighty from "lighty-type";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";
import clsx from "clsx";

export default function InviteFriends({
  setStep,
  type,
  exceptFriends,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  type: "default" | "group" | "gathering" | "groupEdit";
  exceptFriends?: lighty.User[] | null;
}) {
  const { isReactNativeWebView } = useReactNativeWebView();

  return (
    <div
      className={clsx(
        "h-full bg-grayscale-50",
        isReactNativeWebView ? "pt-safe-top" : ""
      )}
    >
      <div className="max-w-[430px] fixed w-full z-10 bg-grayscale-50">
        <FriendsPageHeader label="초대할 친구" setStep={setStep} type={type} />
        <div className="px-5">
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white"
            placeholder="이름/아이디로 검색하기"
          />
        </div>
        <Spacing size={16} />
      </div>
      <SelectFriendsContainer
        exceptFriends={exceptFriends}
        paddingTop="138px"
        setStep={setStep}
        type={type}
      />
    </div>
  );
}
