"use client";
import clsx from "clsx";
import React, { ChangeEvent, useState } from "react";
import EmptySquareIcon from "../icons/EmptySquareIcon";
import Text from "../Text";
import Spacing from "../Spacing";
import Flex from "../Flex";

interface InputProps {
  square?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  helpMessage?: React.ReactNode;
  displayLength?: boolean;
}

export default function Input({
  value,
  square,
  label,
  helpMessage,
  displayLength = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 40;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Flex direction="column">
      {label && (
        <>
          <span className="text-T5">{label}</span>
          <Spacing size={8} />
        </>
      )}
      <div
        className={clsx(
          inputWrapperStyle,
          isFocused ? "border-grayscale-700" : "border-grayscale-10"
        )}
      >
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputStyle}
          value={value}
          {...props}
        />
        {displayLength && (
          <span>
            <span className="text-grayscale-900 text-B4">{`${value?.length}`}</span>
            <span className="text-grayscale-300 text-B4">{`/${maxLength}`}</span>
          </span>
        )}
        {square && <EmptySquareIcon width="20" height="20" />}
      </div>
      {helpMessage ? (
        <Text className={helpMessageStyle}>{helpMessage}</Text>
      ) : null}
    </Flex>
  );
}

const height = `h-[50px]`;

const inputWrapperStyle = `w-full ${height} px-[20px] rounded-[40px] flex items-center gap-[16px] justify-between bg-grayscale-10 border transition-all duration-300`;
const inputStyle = `flex-grow bg-transparent outline-none text-B4 bg-grayscale-10`;
const helpMessageStyle =
  "pl-[8px] text-C2 text-[#FA6767] inline-block mt-[6px]";
