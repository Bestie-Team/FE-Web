"use client";
import clsx from "clsx";
import React, { useState } from "react";
import Spacing from "../Spacing";
import Flex from "../Flex";

interface GatheringInputProps {
  label?: React.ReactNode;
  placeholder?: string;
  name?: string;
  value: string;
  onClick: () => void;
}

export default function GatheringInput({
  value,
  label,
  onClick,
  ...props
}: GatheringInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
        onClick={onClick}
        className={clsx(
          inputWrapperStyle,
          isFocused ? "border-grayscale-700" : "border-grayscale-10"
        )}
      >
        <input
          type="text"
          inputMode="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputStyle}
          value={value}
          {...props}
        />
      </div>
    </Flex>
  );
}

const height = `h-[50px]`;

const inputWrapperStyle = `w-full ${height} p-[45.7px] rounded-[20px] cursor-pointer flex items-center gap-[16px] justify-between bg-grayscale-10 border transition-all duration-300`;
const inputStyle = `ml-[21px] w-4/5 bg-transparent outline-none text-[16px] font-[500] leading-[22.86px] tracking-[-0.48px] bg-grayscale-10 transform origin-left scale-[0.875]`;
