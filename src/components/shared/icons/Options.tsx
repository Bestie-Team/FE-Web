import { useState } from "react";
import DropdownMenu from "../DropdownMenu";

export default function Options() {
  const [opened, setOpened] = useState<boolean>(false);

  const onButtonClick = () => {
    setOpened(!opened);
  };
  return (
    <div
      onClick={onButtonClick}
      className="cursor-pointer relative flex justify-center w-[24px] h-[24px] pt-[3px] pb-[4px]"
    >
      <svg
        width="3"
        height="17"
        viewBox="0 0 3 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 427319931">
          <path
            id="Vector"
            d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
            fill="#AEAEAE"
            style={{
              fill: "#AEAEAE",
              fillOpacity: 1,
            }}
          />
          <path
            id="Vector_2"
            d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z"
            fill="#AEAEAE"
            style={{
              fill: "#AEAEAE",
              fillOpacity: 1,
            }}
          />
          <path
            id="Vector_3"
            d="M1.5 17C2.32843 17 3 16.3284 3 15.5C3 14.6716 2.32843 14 1.5 14C0.671573 14 0 14.6716 0 15.5C0 16.3284 0.671573 17 1.5 17Z"
            fill="#AEAEAE"
            style={{
              fill: "#AEAEAE",
              fillOpacity: 1,
            }}
          />
        </g>
      </svg>
      {opened && (
        <DropdownMenu
          items={menuItems}
          className="absolute -bottom-[162px] right-[4px]"
        />
      )}
    </div>
  );
}
const menuItems = ["숨기기", "수정하기", "삭제하기"];
