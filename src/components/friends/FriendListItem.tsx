import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
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
import LightyIcon from "../shared/Icon/LightyIcon";
import FriendOption from "../shared/FriendOption";
import OptimizedImage from "../shared/OptimizedImage";

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
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["sentAndReceived", "friendsRequests", { accountId: "a" }],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["friends", userInfo?.accountId],
      }),
    ]);
  };

  const rejectSuccessHandler = async () => {
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["sentAndReceived", "friendsRequests", { accountId: "a" }],
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
        clicked ? "border-grayscale-900" : "border-grayscale-100"
      )}
      onClick={onClick}
    >
      <Flex>
        {!!friendInfo?.profileImageUrl ? (
          <OptimizedImage
            loading="eager"
            alt="friendProfile"
            src={
              (friendInfo?.profileImageUrl && friendInfo?.profileImageUrl) || ""
            }
            width={36}
            height={36}
            className={styles.img}
          />
        ) : (
          <div className="rounded-full w-9 h-9 flex justify-center items-center bg-grayscale-100">
            <LightyIcon width="11" height="11" />
          </div>
        )}
        <Spacing direction="horizontal" size={8} />
        <Flex direction="column">
          <span className="text-T6">{friendInfo?.accountId || "lighty"}</span>
          <Spacing size={2} />
          <span className={styles.name}>{friendInfo?.name || "김땡땡"}</span>
        </Flex>
      </Flex>
      {type === "friend" ? (
        <FriendOption onClick={() => setSelectedFriend(friendInfo.id)} />
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
        <Button
          className={styles.selectBtn}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          선택
        </Button>
      ) : null}
    </li>
  );
}

const styles = {
  li: `bg-base-white flex py-[14px] !px-4 rounded-[20px] items-center justify-between border`,
  img: "rounded-full object-cover h-9 w-9",
  name: "text-C2 text-grayscale-400",
  selectBtn:
    "w-fit flex-none items-center px-3 py-2 rounded-lg bg-base-white text-grayscale-900 border-[1px] border-grayscale-100 text-C2 h-fit cursor-pointer",
  acceptBtn:
    "flex items-center px-3 py-2 rounded-lg bg-grayscale-900 text-base-white text-C2 h-fit flex-none",

  rejectBtn:
    "flex items-center px-3 py-2 rounded-lg bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px] active:bg-grayscale-10 flex-none",
};
