import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import clsx from "clsx";

export default function SearchInput({
  className,
  placeholder,
}: {
  className?: string;
  placeholder: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return (
    <div
      className={clsx(
        styles.inputWrapper,
        className,
        isFocused ? "border-grayscale-900" : "border-grayscale-300"
      )}
    >
      <SearchIcon />
      <input
        inputMode="search"
        enterKeyHint="search"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(styles.input, className)}
        placeholder={inputValue.length === 0 ? placeholder : ""}
      />
    </div>
  );
}

const maxWidth = `max-w-[400px]`;
const height = `h-[50px]`;

const styles = {
  inputWrapper: `w-full ${maxWidth} ${height} flex items-center gap-[12px] px-[20px] py-2 bg-grayscale-10 border rounded-full transition-all duration-300 `,

  input:
    "flex-grow bg-grayscale-10 outline-none text-[16px] leading-[22.86px] tracking-[-0.48px] text-grayscale-700 transform origin-left scale-[0.875]",
};
