"use client";
import clsx from "clsx";
import * as lighty from "lighty-type";
import React, { useState } from "react";
import Spacing from "../Spacing";
import Flex from "../Flex";
import DaumPostcodeEmbed from "react-daum-postcode";
import { SetterOrUpdater } from "recoil";
import SearchIcon from "../Icon/SearchIcon";
import PencilIcon from "../Icon/PencilIcon";
import Button from "../Button/Button";
import Input from "./Input";
import BottomSheetWrapper from "../BottomDrawer/shared/BottomSheetWrapper";
import ActionItem from "../BottomDrawer/ActionItem";

interface GatheringInputProps {
  type: "date" | "address";
  label?: React.ReactNode;
  name?: string;
  value: React.ReactNode;
  onClick?: () => void;
  setValue?: SetterOrUpdater<lighty.CreateGatheringRequest>;
}

export default function GatheringInput({
  type,
  value,
  label,
  onClick,
  setValue,
  ...props
}: GatheringInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const [writtenAddress, setWrittenAddress] = useState("");
  const [addressSearch, setAddressSearch] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (data: any) => {
    if (setValue == null) return;

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setValue((prev) => ({ ...prev, address: fullAddress }));
    setAddressSearch(0);
  };

  return (
    <Flex direction="column">
      {label && (
        <>
          <Flex align="center" className="text-T5">
            {label}
          </Flex>
          <Spacing size={8} />
        </>
      )}
      <div
        onMouseDown={() => {
          if (type === "address") {
            setAddressSearch(1);
          }
          if (onClick) {
            onClick();
          }
        }}
        onClick={onClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
        className={clsx(
          styles.inputWrapper,
          isFocused
            ? "border-grayscale-700"
            : "border-grayscale-10 whitespace-pre-wrap"
        )}
      >
        {value}
      </div>
      {addressSearch > 0 && (
        <BottomSheetWrapper
          onClose={() => {
            setAddressSearch(0);
          }}
        >
          {addressSearch === 1 ? (
            <Flex direction="column" className={styles.bottomSheetContainer}>
              <span className="text-T3">모임 장소</span>
              <ActionItem
                onClick={() => {
                  setAddressSearch(2);
                }}
                title="장소 검색하기"
                subTitle="모임 장소를 검색해서 선택할 수 있어요."
                icon={<SearchIcon width="20" height="20" color={"white"} />}
              />
              <ActionItem
                onClick={() => {
                  setAddressSearch(3);
                }}
                title="장소 직접 입력하기"
                subTitle="모임 장소를 직접 입력할 수 있어요."
                icon={<PencilIcon color={"white"} />}
              />
            </Flex>
          ) : addressSearch === 2 ? (
            <DaumPostcodeEmbed
              onComplete={handleComplete}
              className="px-[24px]"
            />
          ) : (
            <Flex direction="column" className={styles.bottomSheetContainer}>
              <Flex justify="space-between">
                <span className="text-T3">주소 입력하기</span>
                <Button
                  className={styles.button}
                  onClick={() => {
                    if (setValue)
                      setValue((prev) => ({
                        ...prev,
                        address: writtenAddress,
                      }));
                    setAddressSearch(0);
                  }}
                >
                  입력 완료
                </Button>
              </Flex>
              <Input
                placeholder="모임 장소를 입력해주세요."
                value={writtenAddress}
                onChange={(e) => setWrittenAddress(e.target.value)}
              />
            </Flex>
          )}
        </BottomSheetWrapper>
      )}
    </Flex>
  );
}

const styles = {
  inputWrapper: `w-full text-B3 text-center min-h-[103px] px-[20px] py-[20px] rounded-[20px] cursor-pointer flex flex-col items-center justify-center outline-none text-[14px] focus:outline-none bg-grayscale-10 border transition-all duration-300`,
  button:
    "py-[10px] px-[12px] bg-grayscale-900 rounded-[10px] text-base-white text-C2",
  bottomSheetContainer: "p-[24px] pt-[4px] gap-[20px]",
};
