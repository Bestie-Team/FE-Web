import React from "react";
import { useDropdown } from "@/hooks/useDropdown";
import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
import GroupDropdownMenu from "../shared/DropDownMenu/GroupDropDownMenu";
import { GroupEditProps } from "@/app/groups/[id]/page";

export default function GroupOptions({
  isOwner,
  group,
}: {
  isOwner: boolean;
  group: GroupEditProps;
}) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();
  const menuItems = isOwner
    ? ["그룹 삭제하기", "그룹 수정하기"]
    : ["그룹 나가기", "그룹 신고하기"];

  return (
    <div
      ref={btnRef}
      test-id="options-icon"
      onClick={toggleDropdown}
      style={{
        width: "24px",
        height: "24px",
      }}
      className={styles.container}
    >
      <OptionsSelectIcon color="white" />
      {opened && (
        <GroupDropdownMenu
          group={group}
          ref={ref}
          items={menuItems}
          className={styles.menu}
        />
      )}
    </div>
  );
}

const styles = {
  container: "cursor-pointer relative flex justify-center pt-[4.5px]",
  menu: "absolute -bottom-[104px] -right-[4px]",
};
