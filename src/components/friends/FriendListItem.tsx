import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import Options from "../shared/Options";
import Button from "../shared/buttons/Button";
import * as lighty from "lighty-type";
import useAcceptFriendRequest from "./hooks/useAcceptFriendRequest";
import { useQueryClient } from "@tanstack/react-query";
import DotSpinner from "../shared/spinners/DotSpinner";
import useRejectFriendRequest from "./hooks/useRejectFriendRequest";

export default function FriendListItem({
  requestId,
  friendInfo,
  type,
  idx,
  onClick,
  clicked,
}: {
  requestId?: string;
  friendInfo: lighty.User;
  type: "friend" | "receivedRequest" | "sentRequest";
  idx: number;
  onClick?: () => void;
  clicked?: boolean;
}) {
  const queryClient = useQueryClient();

  const { mutate: accept, isPending } = useAcceptFriendRequest({
    friendId: requestId ? requestId : "",
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      queryClient.invalidateQueries({
        queryKey: [
          "received",
          "friendsRequests",
          { accountId: "a", limit: 30 },
        ],
      });
    },
  });

  const { mutate: reject } = useRejectFriendRequest({
    friendId: requestId ? requestId : "",
    onSuccess: () => {
      console.log("reject success");
      queryClient.invalidateQueries({
        queryKey: ["reject/friend", requestId],
      });
    },
  });

  return (
    <li
      key={`friend${idx}`}
      className={clsx(
        styles.li,
        clicked ? "border-grayscale-900" : "border-base-white"
      )}
      onMouseDown={onClick}
    >
      <Image
        alt="friendProfile"
        src={
          friendInfo?.profileImageUrl ||
          "https://cdn.lighty.today/grass_cat.avif"
        }
        width={36}
        height={36}
        className={styles.img}
      />
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow" direction="column">
        <span className="text-T6">{friendInfo?.accountId || "lighty"}</span>
        <Spacing size={2} />
        <span className={styles.name}>{friendInfo?.name || "김땡땡"}</span>
      </Flex>
      {type === "friend" ? (
        <div className={clsx(styles.iconContainer)}>
          <Options width="2.5" height="14.17" type="friend" />
        </div>
      ) : null}
      {type === "receivedRequest" ? (
        <Flex>
          <Button className={styles.acceptBtn} onClick={accept}>
            {isPending ? <DotSpinner /> : "수락"}
          </Button>
          <Spacing size={12} direction="horizontal" />
          <Button className={styles.rejectBtn} onClick={reject}>
            거절
          </Button>
        </Flex>
      ) : null}
    </li>
  );
}

const styles = {
  iconContainer: "flex justify-center items-center w-[20px] h-[20px]",

  li: "bg-base-white flex py-[14px] px-[16px] rounded-[20px] items-center cursor-pointer border",

  img: "rounded-full object-cover h-[36px] w-[36px] aspect-square",
  name: "text-C2 text-grayscale-400",
  inviteBtn:
    "text-C2 py-[8px] px-[12px] rounded-[8px] border border-grayscale-100 hover:!bg-grayscale-10",

  acceptBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]",
};
