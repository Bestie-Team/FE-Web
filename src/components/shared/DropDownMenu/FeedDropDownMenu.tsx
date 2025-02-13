import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import {
  feedDeleteModalAtom,
  feedHideModalAtom,
  reportModalAtom,
} from "@/atoms/modal";
import { selectedFeedIdAtom, selectedFeedInfoAtom } from "@/atoms/feed";
import { useRouter } from "next/navigation";
import { Feed } from "@/models/feed";
interface FeedDropdownMenuProps {
  feed: Feed;
  items: string[];
  className?: string;
}

const FeedDropdownMenu = forwardRef<HTMLElement, FeedDropdownMenuProps>(
  ({ items, className, feed }, ref) => {
    const [isHovered, setIsHovered] = useState<number | boolean>(false);
    const setModalOpen = useSetRecoilState(feedDeleteModalAtom);
    const setReportModalOpen = useSetRecoilState(reportModalAtom);
    const setHideModalOpen = useSetRecoilState(feedHideModalAtom);
    const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);
    const setSelectedFeedInfo = useSetRecoilState(selectedFeedInfoAtom);
    const router = useRouter();

    const handleItemClick = (item: string) => {
      if (item.includes("삭제")) {
        setSelectedFeedId(feed.id);
        setModalOpen(true);
      } else if (item.includes("수정")) {
        setSelectedFeedInfo(feed);
        router.push("/feed/edit");
      } else if (item.includes("숨기기")) {
        setSelectedFeedInfo(feed);
        setHideModalOpen(true);
      } else if (item.includes("신고")) {
        setSelectedFeedId(feed.id);
        setReportModalOpen(true);
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
          {items.map((item, index) => {
            return (
              <React.Fragment key={`${item}${index}`}>
                <button
                  style={{
                    backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                  }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`text-B4 w-[131px] rounded-[8px] px-4 py-[10px] text-left ${
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

FeedDropdownMenu.displayName = "FeedDropdownMenu";

export default FeedDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-[12px] px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
