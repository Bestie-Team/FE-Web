import React, { useState } from "react";
import SearchIcon from "../Icon/SearchIcon";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { friendSearchAtom, userSearchAtom } from "@/atoms/friends";
import { friendToRecordAtom } from "@/atoms/record";

export default function SearchInput({
  className,
  placeholder,
  type = "default",
}: {
  className?: string;
  placeholder: string;
  type?: "users" | "friends" | "record" | "default";
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const setUserSearch = useSetRecoilState(userSearchAtom);
  const setFriendSearch = useSetRecoilState(friendSearchAtom);
  const setFriendToRecord = useSetRecoilState(friendToRecordAtom);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "users") {
      setUserSearch(event.target.value);
    } else if (type === "friends") {
      setFriendSearch(event.target.value);
    } else if (type === "record") {
      setFriendToRecord(event.target.value);
    }
    setInputValue(event.target.value);
  };

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
  inputWrapper: `w-full ${maxWidth} ${height} flex items-center gap-3 px-5 py-2 bg-grayscale-10 border rounded-full transition-all duration-300 `,

  input:
    "flex-grow bg-grayscale-10 outline-none text-[16px] leading-[22.86px] tracking-[-0.48px] text-grayscale-700 transform origin-left scale-[0.875]",
};
