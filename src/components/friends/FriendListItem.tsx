import Image from "next/image";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import Options, { MENU_TYPES } from "../shared/Options";
import Button from "../shared/Button/Button";
import * as lighty from "lighty-type";
import useAcceptFriendRequest from "./hooks/useAcceptFriendRequest";
import { useQueryClient } from "@tanstack/react-query";
import DotSpinner from "../shared/Spinner/DotSpinner";
import useRejectFriendRequest from "./hooks/useRejectFriendRequest";
import { useSetRecoilState } from "recoil";
import { selectedFriendAtom } from "@/atoms/friends";
import { lightyToast } from "@/utils/toast";
import { useAuth } from "../shared/providers/AuthProvider";

export default function FriendListItem({
  senderId,
  friendInfo,
  type,
  idx,
  onClick,
  clicked,
}: {
  senderId?: string;
  friendInfo: lighty.User;
  type: "friend" | "receivedRequest" | "sentRequest" | "select";
  idx?: number;
  onClick?: () => void;
  clicked?: boolean;
}) {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const setSelectedFriend = useSetRecoilState(selectedFriendAtom);

  const acceptSuccessHandler = async (data: { message: string }) => {
    lightyToast.success(data.message);
    Promise.all([
      await queryClient.invalidateQueries({
        queryKey: [
          "received",
          "friendsRequests",
          { accountId: "a", limit: 30 },
        ],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["friends", userInfo?.accountId],
      }),
    ]);
  };

  const rejectSuccessHandler = async (data: { message: string }) => {
    lightyToast.success(data.message);
    Promise.all([
      await queryClient.invalidateQueries({
        queryKey: [
          "received",
          "friendsRequests",
          { accountId: "a", limit: 30 },
        ],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["sent", "friendsRequests"],
      }),
    ]);
  };

  const { mutate: accept, isPending } = useAcceptFriendRequest({
    senderId: senderId ? senderId : "",
    onSuccess: acceptSuccessHandler,
  });

  const { mutate: reject } = useRejectFriendRequest({
    senderId: senderId ? senderId : "",
    onSuccess: rejectSuccessHandler,
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
          "https://cdn.lighty.today/lighty_square.png"
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
        <div
          className={clsx(styles.iconContainer)}
          onClick={() => setSelectedFriend(friendInfo.id)}
        >
          <Options width="2.5px" height="14.17px" type={MENU_TYPES.FRIEND} />
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
      {type === "sentRequest" && (
        <Button className={styles.rejectBtn} onClick={reject}>
          {isPending ? <DotSpinner /> : "취소"}
        </Button>
      )}
      {type === "select" ? (
        <Flex>
          <Button className={styles.selectBtn}>선택</Button>
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
  selectBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white text-grayscale-900 border-[1px] border-grayscale-100 text-C2 h-fit",
  acceptBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px] hover:bg-grayscale-10",
};
