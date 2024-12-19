import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "../DropdownMenu";

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
  const [opened, setOpened] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (ref.current && !ref.current.contains(target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onButtonClick = () => {
    setOpened(true);
  };
  return (
    <div
      id="optionBtn"
      onClick={onButtonClick}
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
      <svg
        width={width ?? "3"}
        height={height ?? "17"}
        viewBox="0 0 3 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 427319931">
          <path
            id="Vector"
            d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
            fill={color ?? "#AEAEAE"}
            style={{
              fillOpacity: 1,
            }}
          />
          <path
            id="Vector_2"
            d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z"
            fill={color ?? "#AEAEAE"}
            style={{
              fillOpacity: 1,
            }}
          />
          <path
            id="Vector_3"
            d="M1.5 17C2.32843 17 3 16.3284 3 15.5C3 14.6716 2.32843 14 1.5 14C0.671573 14 0 14.6716 0 15.5C0 16.3284 0.671573 17 1.5 17Z"
            fill={color ?? "#AEAEAE"}
            style={{
              fillOpacity: 1,
            }}
          />
        </g>
      </svg>
      {opened && (
        <DropdownMenu
          type={type}
          ref={ref}
          items={
            type === "default"
              ? menuItems
              : type === "friend"
              ? menuItemsF
              : group
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
const menuItemsF = ["친구 삭제", "유저 신고하기"];
const group = ["그룹 나가기", "그룹 신고하기"];
