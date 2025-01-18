import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import Button from "../shared/buttons/Button";
import * as lighty from "lighty-type";
import useRequestFriend from "../friends/hooks/useRequestFriend";
import DotSpinner from "../shared/spinners/DotSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { userSearchAtom } from "@/atoms/friends";
import { useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import { toast } from "react-toastify";

export default function UserListItem({
  userInfo,
  idx,
  onClick,
  clicked,
}: {
  userInfo: lighty.User;
  idx: number;
  onClick?: () => void;
  clicked?: boolean;
}) {
  const queryClient = useQueryClient();
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);
  const { mutate, isPending } = useRequestFriend({
    userId: userInfo?.id,
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({
        queryKey: [
          "users",
          { nae: "가", accountId: "a", limit: 10, search: debouncedSearch },
        ],
      });
      toast.success(data.message);
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
          userInfo?.profileImageUrl || "https://cdn.lighty.today/grass_cat.avif"
        }
        width={36}
        height={36}
        className={styles.img}
      />
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow" direction="column">
        <span className="text-T6">{userInfo?.accountId || "lighty"}</span>
        <Spacing size={2} />
        <span className={styles.name}>{userInfo?.name || "김땡땡"}</span>
      </Flex>
      <Button className={styles.inviteBtn} onClick={mutate}>
        {isPending ? <DotSpinner /> : "친구 신청"}
      </Button>
    </li>
  );
}

const styles = {
  iconContainer: "flex justify-center items-center w-[20px] h-[20px]",

  li: "bg-base-white flex py-[14px] px-[16px] rounded-[20px] items-center cursor-pointer border",

  img: "rounded-full object-cover h-[36px] w-[36px]",
  name: "text-C2 text-grayscale-400",
  inviteBtn:
    "text-C2 py-[8px] px-[12px] rounded-[8px] border border-grayscale-100 hover:!bg-grayscale-10",

  acceptBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]",
};
