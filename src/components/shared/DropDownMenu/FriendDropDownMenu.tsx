import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { friendReportModalAtom, modalStateAtom } from "@/atoms/modal";

interface FriendDropdownMenuProps {
  menuItems: string[];
  className: string;
}

const FriendDropdownMenu = forwardRef<HTMLElement, FriendDropdownMenuProps>(
  ({ menuItems, className }, ref) => {
    const [isHovered, setIsHovered] = useState<number | boolean>(false);

    const setModalOpen = useSetRecoilState(modalStateAtom);
    const setReportModalOpen = useSetRecoilState(friendReportModalAtom);

    const handleItemClick = (item: string) => {
      if (item.includes("삭제")) {
        setModalOpen({ type: "deleteFriend", isOpen: true });
      } else if (item.includes("신고")) {
        setReportModalOpen(true);
      }
    };

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{
          animation: styles.animation,
          zIndex: 10,
        }}
        className={clsx("bg-base-white", className)}
      >
        <Flex
          direction="column"
          align="center"
          className={styles.wrapper}
          style={{
            boxShadow: styles.shadow,
            zIndex: 5,
            willChange: "opacity transform",
          }}
        >
          {menuItems.map((item, index) => {
            return (
              <React.Fragment key={`${item}${index}`}>
                <button
                  style={{
                    backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                  }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`text-B4 w-[131px] rounded-lg px-4 py-[10px] text-left ${
                    item.includes("삭제") && "text-point-red50"
                  }`}
                  onMouseDown={() => handleItemClick(item)}
                >
                  {item}
                </button>
                {index < menuItems.length - 1 ? (
                  <div className="w-[99px] h-[1px] bg-grayscale-50 mb-[6px]" />
                ) : null}
              </React.Fragment>
            );
          })}
        </Flex>
      </div>
    );
  }
);

FriendDropdownMenu.displayName = "FriendDropdownMenu";

export default FriendDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
