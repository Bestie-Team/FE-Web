import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import * as lighty from "lighty-type";
import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
import GatheringDropdownMenu from "../shared/DropDownMenu/GatheringDropDownMenu";

export const MENU_TYPES = {
  GATHERING: "gathering",
  ENDEDGATHERING: "endedGathering",
} as const;

type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

const MENU_CONFIGS = {
  [MENU_TYPES.GATHERING]: {
    items: ["약속 삭제하기", "약속 수정하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.ENDEDGATHERING]: {
    items: ["약속 삭제하기"],
    className: "absolute -bottom-[44px] -right-[4px]",
  },
};

interface GatheringOptionProps {
  gathering?: Partial<lighty.CreateGatheringRequest> & { id: string };
  width?: string;
  height?: string;
  color?: string;
  type: MenuType;
}

export default function Options({
  gathering,
  width = "24px",
  height = "24px",
  color,
  type,
}: GatheringOptionProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();

  const containerClassName = `
    relative
    cursor-pointer  
    flex 
    justify-center
    items-center}
   `.trim();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      style={{ width, height }}
      className={containerClassName}
    >
      <OptionsSelectIcon color={color} />
      {opened && type === MENU_TYPES.GATHERING && gathering && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          items={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.ENDEDGATHERING && gathering && (
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
