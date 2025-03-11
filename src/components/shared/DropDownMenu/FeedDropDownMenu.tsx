import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { modalStateAtom, reportModalAtom } from "@/atoms/modal";
import { selectedFeedIdAtom, selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import { Feed } from "@/models/feed";
interface FeedDropdownMenuProps {
  feed: Feed;
  menuItems: string[];
  className: string;
}

const FeedDropdownMenu = forwardRef<HTMLElement, FeedDropdownMenuProps>(
  ({ menuItems, className, feed }, ref) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState<number | boolean>(false);

    const setModalOpen = useSetRecoilState(modalStateAtom);
    const setReportModalOpen = useSetRecoilState(reportModalAtom);
    const setFeedId = useSetRecoilState(selectedFeedIdAtom);
    const setFeedInfo = useSetRecoilState(selectedFeedInfoAtom);

    const clickedMenuItemHandler = (item: string) => {
      if (item.includes("삭제")) {
        setFeedId(feed.id);
        setModalOpen({ type: "deleteFeed", isOpen: true });
      } else if (item.includes("수정")) {
        setFeedInfo(feed);
        router.push("/feed/edit");
      } else if (item.includes("숨기기")) {
        setFeedInfo(feed);
        setModalOpen({ type: "hideFeed", isOpen: true });
      } else if (item.includes("신고")) {
        setFeedId(feed.id);
        setReportModalOpen(true);
      } else if (item.includes("숨김 해제")) {
        setFeedId(feed.id);
        setModalOpen({ type: "displayFeed", isOpen: true });
      }
    };

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{
          animation: styles.animation,
          willChange: "opacity transform",
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
          {menuItems.map((menuItem, index) => {
            return (
              <React.Fragment key={`${menuItem}${index}`}>
                <button
                  style={{
                    backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                  }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`text-B4 w-[131px] rounded-lg px-4 py-[10px] text-left ${
                    menuItem.includes("삭제") && "text-point-red50"
                  }`}
                  onMouseDown={() => clickedMenuItemHandler(menuItem)}
                >
                  {menuItem}
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

FeedDropdownMenu.displayName = "FeedDropdownMenu";

export default FeedDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
