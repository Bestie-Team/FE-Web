import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import { Feed } from "@/models/feed";
import { OptionsSelectIconXSmall } from "../shared/Icon/OptionsSelectIcon";
import CommentDropdownMenu from "../shared/DropDownMenu/CommentDropDownMenu";
import { MENU_TYPES } from "@/models/dropdown";
import { MENU_CONFIGS } from "@/constants/menu-configs";

interface OptionsProps {
  feed?: Feed;
  isMine?: boolean;
  commentId?: string;
}

export default function CommentOption({ commentId }: OptionsProps) {
  const { openedDropdownId, dropDownRef, btnRef, toggleDropdown } =
    useDropdown();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={() => toggleDropdown(commentId || "")}
      style={{ width: 16, height: 16 }}
      className="relative cursor-pointer flex justify-center items-center"
    >
      <OptionsSelectIconXSmall />
      {openedDropdownId && (
        <CommentDropdownMenu
          ref={dropDownRef}
          commentId={commentId}
          items={MENU_CONFIGS[MENU_TYPES.COMMENT].items}
        />
      )}
    </div>
  );
}
