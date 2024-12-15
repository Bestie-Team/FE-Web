"use client";
import MonthCalendar from "@/components/gathering/calendar";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import ArrowLeftIcon from "@/components/shared/icons/ArrowLeftIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Input from "@/components/shared/inputs/Input";
import { useStore } from "@/store/date";
import { useDescriptionStore } from "@/store/description";
import { useFriendStore } from "@/store/friend";
import { useNameStore } from "@/store/name";
import { usePlaceStore } from "@/store/place";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const showClass = "bg-white rounded-full shadow text-neutral-950";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export default function GatheringPage() {
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const selectedDate = useStore((state) => state.selectedDate);
  const selectedPeriod = useStore((state) => state.period);
  const selectedTime = useStore((state) => state.time);
  const name = useNameStore((state) => state.name) || "";
  const description = useDescriptionStore((state) => state.description) || "";
  const selectedPlace = usePlaceStore((state) => state.selectedPlace);
  const selectedFriends = useFriendStore((state) => state.selectedFriends);

  const setName = useNameStore((state) => state.setName);
  const setDescription = useDescriptionStore((state) => state.setdescription);

  const [calendar, setCalendar] = useState<boolean>(false);

  const formattedText = selectedDate ? (
    <span style={{ whiteSpace: "pre-line" }}>
      {`${formatDate(selectedDate)}\n${
        selectedPeriod === "AM" ? "오전" : "오후"
      } ${selectedTime}`}
    </span>
  ) : (
    "선택하기"
  );

  useEffect(() => {
    if (
      selectedDate &&
      selectedFriends &&
      selectedPeriod &&
      selectedTime &&
      selectedPlace &&
      name?.length >= 3 &&
      description?.length >= 10
    ) {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [
    selectedPlace,
    selectedFriends,
    selectedDate,
    selectedPeriod,
    selectedTime,
    name,
    description,
  ]);

  return (
    <div className={`pt-[97px] min-h-screen mx-auto w-full flex flex-col`}>
      <div className="flex items-center gap-[10px] mb-[32px]">
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="text-neutral-950 text-lg font-semibold font-['Pretendard'] leading-normal">
          모임 생성
        </div>
      </div>
      <div className="w-[390px] h-[50px] px-5 py-1 justify-between items-center inline-flex mb-[40px]">
        <div className="justify-start items-center gap-1 flex">
          <div className="w-4 h-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g id="icon">
                <path
                  id="Icon"
                  d="M4.4 5.8667V5.25718C4.4 3.23124 6.00571 1.60004 8 1.60004C9.99428 1.60004 11.6 3.23124 11.6 5.25718V5.8667M4.4 5.8667C3.74 5.8667 3.2 6.41527 3.2 7.08575V13.181C3.2 13.8515 3.74 14.4 4.4 14.4H11.6C12.26 14.4 12.8 13.8515 12.8 13.181V7.08575C12.8 6.41527 12.26 5.8667 11.6 5.8667M4.4 5.8667H11.6M8 10.8V9.20004"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
          <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
            공개 여부
          </div>
        </div>
        <div className="p-1 bg-[#f8f8f8] rounded-full justify-start items-center flex">
          <div
            onClick={() => setShow(true)}
            className={clsx(
              "px-4 py-2.5  justify-center items-center gap-2.5 flex cursor-pointer",
              show ? showClass : "text-[#aeaeae] "
            )}
          >
            <div className="text-center text-xs font-semibold font-['Pretendard'] leading-[14px]">
              일반 모임
            </div>
          </div>
          <div
            onClick={() => setShow(false)}
            className={clsx(
              "px-4 py-2.5  justify-center items-center gap-2.5 flex cursor-pointer",
              !show ? showClass : "text-[#aeaeae]"
            )}
          >
            <div className="text-center  text-xs font-semibold font-['Pretendard'] leading-[14px]">
              그룹 모임
            </div>
          </div>
        </div>
      </div>
      <div className="w-[390px] h-[76px]  flex-col justify-start items-start gap-2 inline-flex mb-[36px]">
        <div className="px-5 justify-start items-center gap-1 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g id="edit-3">
                <path
                  id="Vector"
                  d="M8 13.3333H14"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M11 2.33334C11.2652 2.06813 11.6249 1.91913 12 1.91913C12.1857 1.91913 12.3696 1.95571 12.5412 2.02678C12.7128 2.09785 12.8687 2.20202 13 2.33334C13.1313 2.46466 13.2355 2.62057 13.3066 2.79215C13.3776 2.96373 13.4142 3.14762 13.4142 3.33334C13.4142 3.51906 13.3776 3.70296 13.3066 3.87454C13.2355 4.04612 13.1313 4.20202 13 4.33334L4.66667 12.6667L2 13.3333L2.66667 10.6667L11 2.33334Z"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px] mb-[8px]">
            모임 이름
          </div>
        </div>
        <div className="w-[350px] mx-[20px]">
          <Input
            placeholder="모임 이름을 입력해주세요."
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-[390px] h-[76px]  flex-col justify-start items-start gap-2 inline-flex">
        <div className="px-5 justify-start items-center gap-1 inline-flex">
          <div className="w-4 h-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g id="layout-04">
                <path
                  id="Icon"
                  d="M2.00002 5.19994H14M12 7.99994H4.00002M8.80002 11.1999H4.00002M4.00002 14.3999H12C13.3255 14.3999 14.4 13.3254 14.4 11.9999V3.99994C14.4 2.67446 13.3255 1.59995 12 1.59995H4.00002C2.67454 1.59995 1.60002 2.67446 1.60002 3.99994V11.9999C1.60002 13.3254 2.67454 14.3999 4.00002 14.3999Z"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px] mb-[8px]">
            모임 설명
          </div>
        </div>
        <div className="w-[350px] mx-[20px]">
          <Input
            placeholder="모임에 대해 설명해주세요."
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="h-[18px] px-[20px] justify-start items-center gap-1 inline-flex mt-[36px]  mb-[9px]">
        <div className="w-4 h-4 relative mr-[4px]">
          <UserIcon />
        </div>
        <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
          초대할 친구
        </div>
      </div>
      <div className="w-[390px] h-[87px] pl-5 justify-start items-center gap-1.5 inline-flex mb-[36px] ">
        <div
          className="flex-col justify-start items-start gap-0.5 inline-flex cursor-pointer"
          onClick={() => router.push("/friend")}
        >
          <div className="w-[68px] h-[68px] relative">
            <div className="w-14 h-14 left-[6px] top-[6px] absolute bg-white rounded-full border border-[#e8e8e8]" />
            <div className="w-5 h-5 left-[24px] top-[24px] absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g id="icon">
                  <path
                    id="Vector"
                    d="M10 4.16667V15.8333"
                    stroke="#0A0A0A"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M4.16667 10H15.8333"
                    stroke="#0A0A0A"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="self-stretch h-[17px] flex-col justify-start items-center flex">
            <div className="text-center text-neutral-950 text-[13px] font-semibold font-['Pretendard'] leading-[16.90px]">
              친구 추가
            </div>
          </div>
        </div>
        {selectedFriends?.map((el) => {
          return (
            <div key={el}>
              <div className="h-[101px] flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="w-[68px] h-[68px] relative">
                  <div className="w-14 h-14 left-[6px] top-[6px] absolute bg-black/40 rounded-full border-2 border-neutral-950"></div>
                  <div className="w-7 h-7 left-[20px] top-[20px] absolute"></div>
                  <div className="w-5 h-5 left-[46px] top-[2px] absolute">
                    <div className="w-[13.33px] h-[13.33px] left-[3.33px] top-[3.33px] absolute"></div>
                  </div>
                </div>
                <div className="self-stretch h-[31px] flex-col justify-start items-center gap-1 flex">
                  <div className="flex-col justify-start items-center flex">
                    <div className="text-center text-neutral-950 text-[13px] font-semibold font-['Pretendard'] leading-[16.90px]">
                      김하나
                    </div>
                    <div className="text-[#979797] text-[10px] font-medium font-['Pretendard'] leading-[14px]">
                      seah_23
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[390px] h-[129px] px-5 justify-between items-center inline-flex">
        <div className="w-[163px] flex-col justify-start items-start gap-2 inline-flex">
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="w-4 h-4 relative" />
            <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
              모임 일정
            </div>
          </div>
          <div
            className="w-[166px] h-[103px] px-10 py-[41px] bg-[#f8f8f8] rounded-[20px] flex-col justify-center items-center gap-2 flex cursor-pointer"
            onClick={() => setCalendar(true)}
          >
            <div className="text-[#979797] text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
              {formattedText}
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="w-4 h-4 relative" />
            <div className="text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
              모임 장소
            </div>
          </div>
          <div
            onClick={() => router.push("/gatherPlace")}
            className="w-[166px] h-[103px] px-10 py-[41px] bg-[#f8f8f8] rounded-[20px] justify-center items-center gap-2 inline-flex cursor-pointer"
          >
            <div className="text-[#979797] text-sm font-semibold font-['Pretendard'] leading-[18.20px]">
              {selectedPlace ? selectedPlace : "선택하기"}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mx-auto">
        {calendar && (
          <div
            className="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-transparent-black-50"
            onClick={(e) => {
              e.preventDefault();
              setCalendar(false);
            }}
          >
            <MonthCalendar />
          </div>
        )}
      </div>

      {calendar ? (
        <FixedBottomButton
          label="다음"
          disabled={calendar && (!selectedDate || !selectedTime)}
          onClick={() => {
            if (calendar && selectedDate) {
              setCalendar(false);
            }
          }}
          className="z-[150] relative bottom-0 max-x-[390px]"
        />
      ) : (
        <FixedBottomButton
          label="다음"
          disabled={!done}
          onClick={() => {
            router.push("/gatherMakeCard");
          }}
          className="z-[150] relative bottom-0 max-x-[390px]"
        />
      )}
    </div>
  );
}
