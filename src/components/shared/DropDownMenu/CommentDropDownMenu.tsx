import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { selectedCommentIdAtom } from "@/atoms/comment";
import { commentDeleteModalAtom } from "@/atoms/modal";

interface CommentDropdownMenuProps {
  selectedCommentId?: string;
  items: string[];
  className?: string;
}

const CommentDropdownMenu = forwardRef<HTMLElement, CommentDropdownMenuProps>(
  ({ items, className, selectedCommentId }, ref) => {
    const [isHovered, setIsHovered] = useState<number | boolean>(false);
    const setModalOpen = useSetRecoilState(commentDeleteModalAtom);
    const setSelectedCommentId = useSetRecoilState(selectedCommentIdAtom);

    const handleItemClick = (item: string) => {
      console.log("Item clicked:", item);
      console.log("selectedId:", selectedCommentId);
      if (item.includes("삭제")) {
        setSelectedCommentId(selectedCommentId || "");
        setModalOpen(true);
      }
    };
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
          align="center"
          className={styles.wrapper}
          style={{
            boxShadow: styles.shadow,
          }}
        >
          {items.map((item, index) => {
            return (
              <React.Fragment key={`${item}${index}`}>
                <button
                  style={{
                    backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                  }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`text-B4  w-[131px] rounded-[8px] px-4 py-[10px] text-left ${
                    item.includes("삭제") && "text-point-red50"
                  }`}
                  onMouseDown={() => handleItemClick(item)}
                >
                  {item}
                </button>
                {index < items.length - 1 ? (
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

CommentDropdownMenu.displayName = "CommentDropdownMenu";

export default CommentDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-[12px] px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
