"use client";

import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import OptionsSelectIcon from "./Icon/OptionsSelectIcon";
import FeedDropdownMenu from "./DropDownMenu/FeedDropDownMenu";
import CommentDropdownMenu from "./DropDownMenu/CommentDropDownMenu";
import FriendDropdownMenu from "./DropDownMenu/FriendDropDownMenu";

export const MENU_TYPES = {
  COMMENT: "comment",
  DEFAULT: "default",
  FRIEND: "friend",
  GROUP: "group",
} as const;

type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

const MENU_CONFIGS = {
  [MENU_TYPES.COMMENT]: {
    items: ["삭제하기"],
    className: "absolute -bottom-[42px] -right-[24px]",
  },
  [MENU_TYPES.DEFAULT]: {
    items: ["숨기기", "수정하기", "삭제하기"],
    className: "z-100 absolute -bottom-[162px] right-[4px]",
  },
  [MENU_TYPES.FRIEND]: {
    items: ["친구 삭제", "유저 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.GROUP]: {
    items: ["그룹 나가기", "그룹 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
};

interface OptionsProps {
  selectedId?: string;
  width?: string;
  height?: string;
  color?: string;
  type: MenuType;
}

export default function Options({
  selectedId,
  width = "24px",
  height = "24px",
  color,
  type = MENU_TYPES.DEFAULT,
}: OptionsProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();

  const isDefaultOrComment =
    type === MENU_TYPES.DEFAULT || type === MENU_TYPES.COMMENT;
  const containerClassName = `
    relative
    cursor-pointer  
    flex 
    justify-center 
    ${isDefaultOrComment ? "pt-[5.5px] pb-[4px]" : ""}
  `.trim();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      style={{ width, height }}
      className={containerClassName}
    >
      <OptionsSelectIcon
        width={type === "comment" ? "2px" : ""}
        height={type === "comment" ? "11.3px" : ""}
        color={color}
      />
      {opened && type === MENU_TYPES.FRIEND && (
        <FriendDropdownMenu
          selectedId={selectedId}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.COMMENT && (
        <CommentDropdownMenu
          selectedId={selectedId}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.DEFAULT && (
        <FeedDropdownMenu
          selectedId={selectedId}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </div>
  );
}
