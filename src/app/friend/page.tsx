"use client";

import ArrowLeftIcon from "@/components/shared/icons/ArrowLeftIcon";
import SearchIcon from "@/components/shared/icons/SearchIcon";
import { useState } from "react";
import clsx from "clsx";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import { useRouter } from "next/navigation";
import { useFriendStore } from "@/store/friend";

const placeholderText = "아이디를 검색해보세요.";

export default function Friend() {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [friends, setFriends] = useState<string[]>([]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const selectedFriends = useFriendStore((state) => state.selectedFriends);

  const setSelectedFriends = useFriendStore(
    (state) => state.setSelectedFriends
  );

  const handleClick = (name: string) => {
    if (friends.includes(name)) {
      // Remove friend if already selected
      setFriends(friends.filter((friend) => friend !== name));
      setSelectedFriends(friends.filter((friend) => friend !== name));
    } else {
      // Add friend if not selected
      setFriends([...friends, name]);
      setSelectedFriends([...friends, name]);
    }
  };

  const isSelected = (name: string) => selectedFriends?.includes(name);

  return (
    <div className="pt-[97px] mx-auto h-screen pl-5 bg-[#f4f4f4]">
      <div className="h-12 justify-start items-center gap-1.5 inline-flex mb-[32.5px]">
        <div className="w-10 pl-[17px] pr-[3px] py-2.5 justify-end items-center flex">
          <div className="w-5 h-5 relative flex-col justify-start items-start flex">
            <div>
              <ArrowLeftIcon
                onClick={() => router.back()}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 text-neutral-950 text-lg font-semibold font-['Pretendard'] leading-normal">
          초대할 친구
        </div>
        <div className="w-11 h-11 relative" />
      </div>
      <div
        className={clsx(
          inputWrapperStyle,
          isFocused ? "border-grayscale-900" : "border-grayscale-300"
        )}
      >
        <SearchIcon />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputStyle}
          placeholder={inputValue.length === 0 ? placeholderText : ""}
        />
      </div>
      <div className="flex gap-[4px]">
        <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
          친구
        </div>
        <div className="text-center text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
          24
        </div>
      </div>
      <div
        onClick={() => handleClick("maybin")}
        className={clsx(
          "h-16 px-4 py-3.5 bg-base-white rounded-[20px] justify-between items-center inline-flex w-full max-w-[350px] mt-[12px] mb-[16px]",
          isSelected("maybin")
            ? "border-neutral-950 border"
            : "border border-[#e8e8e8]"
        )}
      >
        <div className="h-9 justify-start items-center gap-2 flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="self-stretch text-neutral-950 text-[13px] font-semibold font-['Pretendard'] leading-[16.90px]">
              maybin
            </div>
            <div className="justify-start items-start gap-1 inline-flex">
              <div className="text-[#979797] text-xs font-medium font-['Pretendard'] leading-[14px]">
                김땡땡
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "px-3 py-2 rounded-lg justify-center items-center gap-2 flex cursor-pointer border border-[#e8e8e8]"
          )}
        >
          <div className="text-neutral-950 text-xs font-medium font-['Pretendard'] leading-[14px]">
            선택
          </div>
        </div>
      </div>
      <div
        onClick={() => handleClick("maybin2")}
        className={clsx(
          "h-16 px-4 py-3.5 bg-base-white rounded-[20px] justify-between items-center inline-flex w-full max-w-[350px] mt-[12px] mb-[16px]",
          isSelected("maybin2")
            ? "border-neutral-950 border"
            : "border border-[#e8e8e8]"
        )}
      >
        <div className="h-9 justify-start items-center gap-2 flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="self-stretch text-neutral-950 text-[13px] font-semibold font-['Pretendard'] leading-[16.90px]">
              maybin2
            </div>
            <div className="justify-start items-start gap-1 inline-flex">
              <div className="text-[#979797] text-xs font-medium font-['Pretendard'] leading-[14px]">
                김땡땡
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "px-3 py-2 rounded-lg justify-center items-center gap-2 flex cursor-pointer border border-[#e8e8e8]"
          )}
        >
          <div className="text-neutral-950 text-xs font-medium font-['Pretendard'] leading-[14px]">
            선택
          </div>
        </div>
      </div>
      <FixedBottomButton
        label="선택 완료"
        disabled={!selectedFriends?.length}
        onClick={() => {
          router.push("/gatherMake");
        }}
      />
    </div>
  );
}

const maxWidth = `max-w-[350px]`;
const height = `h-[50px]`;

const inputWrapperStyle = `w-full ${maxWidth} ${height} flex items-center gap-[12px] px-[20px] py-2 bg-grayscale-10 border rounded-full transition-all duration-300 mb-[20px]`;
const inputStyle =
  "flex-grow bg-grayscale-10 outline-none text-B4 text-grayscale-700";
