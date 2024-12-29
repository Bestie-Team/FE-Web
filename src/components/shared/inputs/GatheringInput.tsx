"use client";
import clsx from "clsx";
import React, { useState } from "react";
import Spacing from "../Spacing";
import Flex from "../Flex";
import BottomSheetWrapper from "../bottomSheet/BottomSheetWrapper";
import DaumPostcodeEmbed from "react-daum-postcode";
import { SetterOrUpdater } from "recoil";
import { GatheringInfo } from "@/models/gathering";

interface GatheringInputProps {
  type: "date" | "address";
  label?: React.ReactNode;
  name?: string;
  value: React.ReactNode;
  onClick?: () => void;
  setValue?: SetterOrUpdater<GatheringInfo>;
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
  const [addressSearchOpen, setAddressSearchOpen] = useState<boolean>(false);

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
    setAddressSearchOpen(false);
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
            setAddressSearchOpen(true);
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
          inputWrapperStyle,
          isFocused
            ? "border-grayscale-700"
            : "border-grayscale-10 whitespace-pre-wrap"
        )}
      >
        {value}
      </div>
      {addressSearchOpen && (
        <BottomSheetWrapper
          onClose={() => {
            setAddressSearchOpen(false);
          }}
        >
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            className="px-[24px]"
          />
        </BottomSheetWrapper>
      )}
    </Flex>
  );
}

const inputWrapperStyle = `w-full text-B3 text-center min-h-[103px] px-[20px] py-[20px] rounded-[20px] cursor-pointer flex flex-col items-center justify-center outline-none text-[14px] focus:outline-none bg-grayscale-10 border transition-all duration-300`;
