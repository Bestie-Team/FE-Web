"use client";

import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import OptionsSelectIcon from "./Icon/OptionsSelectIcon";
import FeedDropdownMenu from "./DropDownMenu/FeedDropDownMenu";
import CommentDropdownMenu from "./DropDownMenu/CommentDropDownMenu";
import FriendDropdownMenu from "./DropDownMenu/FriendDropDownMenu";
import { Feed } from "@/models/feed";
import GatheringDropdownMenu from "./DropDownMenu/GatheringDropDownMenu";
import { GatheringDetailResponse } from "@/models/gathering";

export const MENU_TYPES = {
  COMMENT: "comment",
  DEFAULT: "default",
  FRIEND: "friend",
  GROUP: "group",
  FEED: "feed",
  GATHERING: "gathering",
} as const;

type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

const MENU_CONFIGS = {
  [MENU_TYPES.COMMENT]: {
    items: ["삭제하기"],
    className: "absolute -bottom-[42px] -right-[24px]",
  },
  [MENU_TYPES.DEFAULT]: {
    items: ["숨기기", "수정하기", "삭제하기"],
    className: "z-100 absolute -bottom-[142px] right-[4px]",
  },
  [MENU_TYPES.FEED]: {
    items: ["숨기기", "신고하기"],
    className: "z-100 absolute -bottom-[94px] right-[4px]",
  },

  [MENU_TYPES.FRIEND]: {
    items: ["친구 삭제", "유저 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.GROUP]: {
    items: ["그룹 나가기", "그룹 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.GATHERING]: {
    items: ["약속 삭제하기", "약속 수정하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
};

interface OptionsProps {
  feed?: Feed;
  gathering?: GatheringDetailResponse;
  isMine?: boolean;
  selectedCommentId?: string;
  width?: string;
  height?: string;
  color?: string;
  type: MenuType;
}

export default function Options({
  feed,
  gathering,
  isMine,
  selectedCommentId,
  width = "24px",
  height = "24px",
  color,
  type = MENU_TYPES.DEFAULT,
}: OptionsProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();

  const isDefaultOrComment =
    type === MENU_TYPES.DEFAULT ||
    type === MENU_TYPES.COMMENT ||
    type === MENU_TYPES.FEED;
  const containerClassName = `
    relative
    cursor-pointer  
    flex 
    justify-center  
    items-center
    ${isDefaultOrComment ? "pt-[5.5px] pb-1" : ""}
    ${type === MENU_TYPES.COMMENT ? "pr-1" : ""}
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
        width={type === "comment" ? "2px" : undefined}
        height={type === "comment" ? "11.3px" : undefined}
        color={color}
      />
      {opened && type === MENU_TYPES.FRIEND && (
        <FriendDropdownMenu
          selectedId={feed?.id}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.COMMENT && (
        <CommentDropdownMenu
          ref={ref}
          selectedCommentId={selectedCommentId}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.DEFAULT && feed && isMine && (
        <FeedDropdownMenu
          feed={feed}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.FEED && feed && !isMine && (
        <FeedDropdownMenu
          feed={feed}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.GATHERING && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </div>
  );
}
