import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import Button from "../shared/Button/Button";
import * as lighty from "lighty-type";
import useRequestFriend from "../friends/hooks/useRequestFriend";
import { useQueryClient } from "@tanstack/react-query";
import { userSearchAtom } from "@/atoms/friends";
import { useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import { lightyToast } from "@/utils/toast";
const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

export default function UserListItem({
  userInfo,
  idx,
  onClick,
  clicked,
}: {
  userInfo: lighty.User & { status: string };
  idx: number;
  onClick?: () => void;
  clicked?: boolean;
}) {
  const queryClient = useQueryClient();
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);

  const { mutate, isPending } = useRequestFriend({
    userId: userInfo?.id,
    onSuccess: async (data: { message: string }) => {
      await queryClient.invalidateQueries({
        queryKey: ["users", debouncedSearch],
      });
      lightyToast.success(data.message);
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
        src={userInfo?.profileImageUrl || DEFAULT_IMAGE}
        width={36}
        height={36}
        className={styles.img}
      />
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow gap-[2px]" direction="column">
        <span className="text-T6">{userInfo?.accountId || "회원아이디"}</span>
        <span className={styles.name}>{userInfo?.name || "이름"}</span>
      </Flex>
      <Button
        className={clsx(
          styles.inviteBtn,
          userInfo.status === "SENT"
            ? "!bg-grayscale-50 text-grayscale-400 cursor-none border-none"
            : ""
        )}
        disabled={userInfo.status === "SENT"}
        onClick={mutate}
      >
        {isPending ? <DotSpinnerSmall /> : "친구 신청"}
      </Button>
    </li>
  );
}

const styles = {
  iconContainer: "flex justify-center items-center w-5 h-5",

  li: "bg-base-white flex py-[14px] px-4 rounded-[20px] items-center cursor-pointer border",

  img: "rounded-full object-cover h-[36px] w-[36px]",
  name: "text-C2 text-grayscale-400",
  inviteBtn:
    "text-C2 py-2 px-3 rounded-[8px] border border-grayscale-100 hover:!bg-grayscale-10",

  acceptBtn:
    "flex items-center px-3 py-2 rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-3 py-2 rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]",
};
