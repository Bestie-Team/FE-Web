import SelectFriendsContainer from "@/components/friends/SelectFriendsContainer";
import SearchInput from "@/components/shared/Input/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { Dispatch, SetStateAction } from "react";
import * as lighty from "lighty-type";
import HeaderWithBtn from "../shared/Header/HeaderWithBtn";

export default function InviteFriends({
  setStep,
  type,
  exceptFriends,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  type: "default" | "group" | "gathering" | "groupEdit";
  exceptFriends?: lighty.User[] | null;
}) {
  return (
    <div>
      <HeaderWithBtn
        headerLabel="초대할 친구"
        bgColor="#F4F4F4"
        onClickBackBtn={() => setStep(1)}
      >
        <div className="w-full px-5">
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white"
            placeholder="이름/아이디로 검색하기"
          />
        </div>
        <Spacing size={16} />
      </HeaderWithBtn>
      <SelectFriendsContainer
        exceptFriends={exceptFriends}
        paddingTop="138px"
        setStep={setStep}
        type={type}
      />
    </div>
  );
}
