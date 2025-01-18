"use client";
import React from "react";
import DropdownMenu from "./DropdownMenu";
import { useDropdown } from "@/hooks/useDropdown";
import OptionsSelectIcon from "./icons/OptionsSelectIcon";

export default function Options({
  width,
  height,
  type = "default",
  color,
}: {
  width?: string;
  height?: string;
  color?: string;
  type: "default" | "friend" | "group";
}) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();
  return (
    <div
      ref={btnRef}
      test-id="options-icon"
      onClick={toggleDropdown}
      style={{
        width: "24px",
        height: "24px",
      }}
      className={
        type === "default"
          ? "cursor-pointer relative flex justify-center pt-[3px] pb-[4px]"
          : "cursor-pointer relative flex justify-center pt-[4.5px]"
      }
    >
      <OptionsSelectIcon width={width} height={height} color={color} />
      {opened && (
        <DropdownMenu
          type={type}
          ref={ref}
          items={
            type === "default"
              ? menuItems
              : type === "friend"
              ? friend.menu
              : menuItems_group
          }
          className={
            type === "default"
              ? "absolute -bottom-[162px] right-[4px]"
              : "absolute -bottom-[104px] -right-[4px]"
          }
        />
      )}
    </div>
  );
}
const menuItems = ["숨기기", "수정하기", "삭제하기"];
const friend = { menu: ["친구 삭제", "유저 신고하기"], actions: [] };

const menuItems_group = ["그룹 나가기", "그룹 신고하기"];
