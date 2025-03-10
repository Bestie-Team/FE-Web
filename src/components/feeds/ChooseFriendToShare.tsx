import React, { Dispatch, SetStateAction } from "react";
import SearchInput from "../shared/Input/SearchBar";
import LightyIcon from "../shared/Icon/LightyIcon";
import Flex from "../shared/Flex";
import SelectFriendsContainer from "../friends/SelectFriendsContainer";
import SelectableSearchedFriendsListContainer from "../friends/SelectableSearchedFriendsListContainer";

export default function ChooseFriendToShare({
  debouncedSearch,
  setStep,
}: {
  debouncedSearch: string;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const isClient = typeof window !== "undefined";
  return (
    <div
      className="absolute inset-0 bg-grayscale-50 min-h-dvh pt-12"
      style={
        isClient && window.ReactNativeWebView
          ? {
              paddingTop: `calc(env(safe-area-inset-top) + 3rem)`,
            }
          : {}
      }
    >
      <Flex
        direction="column"
        className="absolute left-0 right-0 pt-5 px-6 gap-4 text-T2"
      >
        <LightyIcon width="24" height="24" color="#0A0A0A" />
        <span>추억을 공유하고 싶은 사람이 있나요?</span>
        <span className="text-B3 text-grayscale-500 mb-4">
          공유하고 싶은 친구에게만 작성된 피드가 보여요.
        </span>
        <SearchInput placeholder="이름/아이디로 검색하기" type="record" />
        {debouncedSearch.length > 0 ? (
          <SelectableSearchedFriendsListContainer
            className="!px-0 !h-[calc(100dvh-288px)] overflow-y-scroll no-scrollbar"
            debouncedSearch={debouncedSearch}
            action={() => setStep(3.5)}
          />
        ) : (
          <SelectFriendsContainer
            className="!px-0 !h-[calc(100dvh-288px)] overflow-y-scroll no-scrollbar"
            paddingTop="0"
            type="record"
            setStep={setStep}
          />
        )}
      </Flex>
    </div>
  );
}
