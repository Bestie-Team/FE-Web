"use client";
import clsx from "clsx";
import React, { ChangeEvent, useState } from "react";
import EmptySquareIcon from "../icons/EmptySquareIcon";
import Text from "../Text";
import Spacing from "../Spacing";
import Flex from "../Flex";

interface InputProps {
  square?: string;
  label?: React.ReactNode;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  helpMessage?: React.ReactNode;
  displayLength?: number;
  minLength?: number;
}

export default function Input({
  name,
  value,
  square,
  label,
  helpMessage,
  displayLength,
  minLength,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = displayLength;
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
        className={clsx(
          styles.inputWrapper,
          isFocused ? "border-grayscale-700" : "border-grayscale-10"
        )}
      >
        <input
          name={name}
          type="text"
          inputMode="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
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
        <Text className={styles.helpMessage}>{helpMessage}</Text>
      ) : null}
    </Flex>
  );
}

const height = `h-[50px]`;
const styles = {
  inputWrapper: `w-full ${height} px-[20px] rounded-[40px] flex items-center gap-[16px] justify-between bg-grayscale-10 border transition-all duration-300`,
  input:
    "flex-grow bg-transparent outline-none text-[16px] font-[500] leading-[22.86px] tracking-[-0.48px] bg-grayscale-10 transform origin-left scale-[0.875]",
  helpMessage: "pl-[8px] text-C2 text-[#FA6767] inline-block mt-[6px]",
};
