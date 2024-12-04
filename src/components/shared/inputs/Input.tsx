"use client";
import clsx from "clsx";
import React, { useState } from "react";
import EmptySquareIcon from "../icons/EmptySquareIcon";

interface InputProps {
  square?: string;
  label?: string;
  placeholder?: string;
}

export default function Input({ square, label, placeholder }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const maxLength = 40;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {label && <span className="text-T5">{label}</span>}
      <div
        className={clsx(
          inputWrapperStyle,
          isFocused ? "border-grayscale-700" : "border-grayscale-10"
        )}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputStyle}
          placeholder={placeholder}
        />
        <span>
          <span className="text-grayscale-900 text-B4">{`${inputValue.length}`}</span>
          <span className="text-grayscale-300 text-B4">{`/${maxLength}`}</span>
        </span>
        {square && <EmptySquareIcon width="20" height="20" />}
      </div>
    </div>
  );
}

// const maxWidth = `max-w-[350px]`;
const height = `h-[50px]`;

const inputWrapperStyle = `w-full ${height} px-[20px] rounded-[40px] flex items-center gap-[16px] justify-between bg-grayscale-10 border transition-all duration-300`;
const inputStyle = `flex-grow bg-transparent outline-none text-B4 bg-grayscale-10`;
