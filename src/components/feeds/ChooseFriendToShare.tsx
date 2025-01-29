import React from "react";
import SearchInput from "../shared/Input/SearchBar";
import getHeader from "@/utils/getHeader";
import SearchedFriendsListContainer from "../friends/SearchedFriendsListContainer";
import LightyIcon from "../shared/Icon/LightyIcon";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import SelectFriendsContainer from "../friends/SelectFriendsContainer";

export default function ChooseFriendToShare({
  debouncedSearch,
}: {
  debouncedSearch: string;
}) {
  const header = getHeader("/record");
  return (
    <div className="bg-grayscale-50 pt-[48px] h-screen">
      {header}
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <LightyIcon width="24" height="24" color="#0A0A0A" />
        <span>추억을 공유하고 싶은 사람이 있나요?</span>
        <span className="text-B3 text-grayscale-500 mb-[16px]">
          공유하고 싶은 친구에게만 작성된 피드가 보여요.
        </span>
        <SearchInput placeholder="이름/아이디로 검색하기" type="record" />
      </Flex>

      {debouncedSearch.length > 0 ? (
        <>
          <Spacing size={20} />
          <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
        </>
      ) : (
        <>
          <Spacing size={20} />
          <SelectFriendsContainer isNew={false} paddingTop="0" type="record" />
        </>
      )}
    </div>
  );
}
