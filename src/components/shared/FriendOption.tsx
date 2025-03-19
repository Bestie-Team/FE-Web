import React from "react";
import { useDropdownWithNoId } from "@/hooks/useDropdown";
import OptionsSelectIcon from "./Icon/OptionsSelectIcon";
import FriendDropdownMenu from "./DropDownMenu/FriendDropDownMenu";
import { MENU_TYPES } from "@/models/dropdown";

const MENU_CONFIGS = {
  [MENU_TYPES.FRIEND]: {
    items: ["친구 삭제", "유저 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
};

export default function FriendOption() {
  const { opened, ref, btnRef, toggleDropdown } = useDropdownWithNoId();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      className="relative cursor-pointer mx-auto"
    >
      <OptionsSelectIcon width="2.5" height="14.17" />
      {opened && (
        <FriendDropdownMenu
          ref={ref}
          menuItems={MENU_CONFIGS[MENU_TYPES.FRIEND].items}
          className={MENU_CONFIGS[MENU_TYPES.FRIEND].className}
        />
      )}
    </div>
  );
}
