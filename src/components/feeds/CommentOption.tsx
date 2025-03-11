import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import { Feed } from "@/models/feed";
import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
import CommentDropdownMenu from "../shared/DropDownMenu/CommentDropDownMenu";
import { MENU_TYPES } from "@/models/dropdown";

const MENU_CONFIGS = {
  [MENU_TYPES.COMMENT]: {
    items: ["삭제하기"],
  },
};

interface OptionsProps {
  feed?: Feed;
  isMine?: boolean;
  commentId?: string;
}

export default function CommentOption({ commentId }: OptionsProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      style={{ width: 16, height: 16 }}
      className="relative cursor-pointer flex justify-center items-center"
    >
      <OptionsSelectIcon width={"2px"} height={"11.3px"} color={"#0A0A0A"} />
      {opened && (
        <CommentDropdownMenu
          ref={ref}
          commentId={commentId}
          items={MENU_CONFIGS[MENU_TYPES.COMMENT].items}
        />
      )}
    </div>
  );
}
