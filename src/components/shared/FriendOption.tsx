import React from "react";
import { useDropdownWithNoId } from "@/hooks/useDropdown";
import { OptionsSelectIconSmall } from "./Icon/OptionsSelectIcon";
import FriendDropdownMenu from "./DropDownMenu/FriendDropDownMenu";
import { MENU_TYPES } from "@/models/dropdown";
import { MENU_CONFIGS } from "@/constants/menu-configs";

export default function FriendOption({ onClick }: { onClick: () => void }) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdownWithNoId();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={() => {
        onClick();
        toggleDropdown();
      }}
      className="flex items-center justify-center relative cursor-pointer text-center w-5 h-5"
    >
      <OptionsSelectIconSmall />
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
