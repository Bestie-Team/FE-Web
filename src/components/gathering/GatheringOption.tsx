import React from "react";
import { useDropdownWithNoId } from "@/hooks/useDropdown";
import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
import GatheringDropdownMenu from "../shared/DropDownMenu/GatheringDropDownMenu";
import { MENU_TYPES, MenuType } from "@/models/dropdown";
import { GatheringDetailResponse } from "@/models/gathering";

const MENU_CONFIGS = {
  [MENU_TYPES.GATHERING]: {
    items: ["약속 삭제하기", "약속 수정하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.GATHERING_ENDED]: {
    items: ["약속 삭제하기"],
    className: "absolute -bottom-[44px] -right-[4px]",
  },
};

interface GatheringOptionProps {
  gathering: GatheringDetailResponse;
  type: MenuType;
}

export default function GatheringOption({
  gathering,
  type,
}: GatheringOptionProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdownWithNoId();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      style={{ width: 24, height: 24 }}
      className="relative cursor-pointer flex justify-center items-center"
    >
      <OptionsSelectIcon color={"#FFF"} />
      {opened && type === MENU_TYPES.GATHERING && gathering && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          menuItems={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.GATHERING_ENDED && gathering && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          menuItems={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </div>
  );
}
