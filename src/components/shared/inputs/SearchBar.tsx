import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import clsx from "clsx";

export default function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const placeholderText = "아이디를 검색해보세요.";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return (
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
  );
}

const maxWidth = `max-w-[350px]`;
const height = `h-[50px]`;

const inputWrapperStyle = `w-full ${maxWidth} ${height} flex items-center gap-[12px] px-[20px] py-2 bg-grayscale-10 border rounded-full transition-all duration-300 `;
const inputStyle =
  "flex-grow bg-grayscale-10 outline-none text-B4 text-grayscale-700";
