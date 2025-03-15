import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { modalStateAtom } from "@/atoms/modal";
import { useRouter } from "next/navigation";
import { originalGroupMembersAtom, selectedGroupAtom } from "@/atoms/group";
import { GroupEditProps } from "@/app/groups/detail/page";

interface GroupDropdownMenuProps {
  menuItems: string[];
  className?: string;
  group: GroupEditProps;
}

const GroupDropdownMenu = forwardRef<HTMLElement, GroupDropdownMenuProps>(
  ({ menuItems, className, group }, ref) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState<number | boolean>(false);
    const setOpenModal = useSetRecoilState(modalStateAtom);
    const setGroup = useSetRecoilState(selectedGroupAtom);
    const setOriginalGroupMembers = useSetRecoilState(originalGroupMembersAtom);

    const clickedMenuItemHandler = (menuItem: string) => {
      if (menuItem.includes("삭제")) {
        setOpenModal({ type: "deleteGroup", isOpen: true });
      } else if (menuItem.includes("나가기")) {
        setOpenModal({ type: "exitGroup", isOpen: true });
      } else if (menuItem.includes("수정")) {
        setGroup({
          groupId: group.id,
          name: group.name,
          description: group.description,
          groupImageUrl: group.groupImageUrl,
        });
        if (group.members) {
          setOriginalGroupMembers([...group.members]);
        }
        router.push(`/groups/edit`);
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

GroupDropdownMenu.displayName = "GroupDropdownMenu";

export default GroupDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
