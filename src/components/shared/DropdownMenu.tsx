import React, { forwardRef } from "react";
import Flex from "./Flex";
import clsx from "clsx";

const DropdownMenu = forwardRef<
  HTMLElement,
  { items: string[]; className?: string }
>(({ items, className }, ref) => {
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className={clsx("z-10", className)}
    >
      <Flex
        direction="column"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "4px 16px",
          gap: "6px",
          boxShadow: "0px 0px 16px 0px #0000001F",
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={`${item}${index}`}>
            <button
              className={`text-B4 w-[99px] py-[12px] text-left border-b-[1px] ${
                index === items.length - 1
                  ? "border-b-base-white"
                  : "border-b-grayscale-50"
              }`}
              onClick={() => alert(`${item} 선택됨`)}
            >
              {item}
            </button>
          </React.Fragment>
        ))}
      </Flex>
    </div>
  );
});

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
