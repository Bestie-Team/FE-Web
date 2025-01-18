import React, { forwardRef } from "react";
import Flex from "./Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { groupDeleteAskModalAtom } from "@/atoms/group";

interface DropdownMenuProps {
  items: string[];
  className?: string;
  type: "default" | "friend" | "group";
}

const DropdownMenu = forwardRef<HTMLElement, DropdownMenuProps>(
  ({ items, className, type }, ref) => {
    const setModalOpen = useSetRecoilState(groupDeleteAskModalAtom);
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{
          animation: styles.animation,
        }}
        className={clsx("z-10", className)}
      >
        <Flex
          direction="column"
          className={styles.wrapper}
          style={{
            boxShadow: styles.shadow,
          }}
        >
          {items.map((item, index) => {
            return (
              <button
                key={`${item}${index}`}
                className={`text-B4 w-[99px] py-[12px] text-left border-b-[1px] ${
                  index === items.length - 1
                    ? "border-b-base-white"
                    : "border-b-grayscale-50"
                } ${
                  index === items.length - 1 &&
                  type === "friend" &&
                  "text-point-red50"
                }`}
                onClick={() => setModalOpen(true)}
              >
                {item}
              </button>
            );
          })}
        </Flex>
      </div>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;

const styles = {
  wrapper: "bg-base-white rounded-[12px] px-[16px] py-[4px] gap-[6px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
