import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import Options from "../shared/icons/Options";
import Button from "../shared/buttons";
import { FriendInfo } from "@/models/friend";

export default function FriendListItem({
  friendInfo,
  type,
  idx,
  onClick,
  clicked,
}: {
  friendInfo?: FriendInfo;
  type: "basic" | "receivedRequest" | "sendedRequest";
  idx: number;
  onClick?: () => void;
  clicked?: boolean;
}) {
  return (
    <li
      key={`friend${idx}`}
      className={clsx(
        styles.li,
        clicked ? "border-grayscale-900" : "border-base-white"
      )}
      onClick={onClick}
    >
      <Image
        alt="friendImg"
        src={friendInfo?.imageUrl || "/cat.jpeg"}
        width={36}
        height={36}
        className={styles.img}
      />
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow" direction="column">
        <span className="text-T6">{friendInfo?.userId || "lighty"}</span>
        <Spacing size={2} />
        <span className="text-C2 text-grayscale-400">
          {friendInfo?.userName || "김땡땡"}
        </span>
      </Flex>
      {type === "basic" ? (
        <div className={clsx(styles.iconContainer)}>
          <Options width="2.5" height="14.17" type="friend" />
        </div>
      ) : null}
      {type === "receivedRequest" ? (
        <Flex>
          <Button className={styles.acceptBtn}>수락</Button>
          <Spacing size={12} direction="horizontal" />
          <Button className={styles.rejectBtn}>거절</Button>
        </Flex>
      ) : null}
    </li>
  );
}

const styles = {
  iconContainer: "flex justify-center items-center w-[20px] h-[20px]",

  li: "bg-base-white flex py-[14px] px-[16px] rounded-[20px] items-center cursor-pointer border",

  img: "rounded-full object-cover h-[36px] w-[36px]",

  acceptBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]",
};
