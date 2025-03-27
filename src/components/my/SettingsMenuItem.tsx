import React, { useState } from "react";
import Flex from "../shared/Flex";
import { SettingsItem } from "./SettingsMenu";
import Link from "next/link";
import Modal from "../shared/Modal/Modal";
import { deleteUser } from "@/remote/users";
import { lightyToast } from "@/utils/toast";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import { appleLoginMobile } from "@/webview/actions";
import { useAuth } from "../shared/providers/AuthProvider";

export default function SettingsMenuItem({
  list,
  link,
  user,
}: {
  list: SettingsItem;
  link: { href: string; target?: string };
  user: string[];
}) {
  const { data: userInfo } = useUserDetail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const handleClick = () => {
    if (list.title === "탈퇴하기") {
      setIsModalOpen(true);
    }
  };

  const accountDelete = async () => {
    if (userInfo?.provider === "APPLE") {
      appleLoginMobile();
      return;
    }

    try {
      const deleted = await deleteUser();
      if (deleted) {
        logout();
      }
    } catch (error) {
      console.log(error);
      lightyToast.error("accountdeletion error");
    }
  };

  return (
    <Link {...link}>
      <li className={liStyle} onClick={handleClick}>
        <span className="text-T5">{list.title}</span>
        <Flex direction="column" justify="center" style={{ gap: "2px" }}>
          {list.info?.map((info, i) => {
            return (
              <span key={i} className="text-C2 text-grayscale-300">
                {list.title === "계정 정보" ? user[i] : info}
              </span>
            );
          })}
        </Flex>
      </li>
      {isModalOpen ? (
        <Modal
          action={accountDelete}
          title="탈퇴하시겠어요?"
          content="30일 이내에 로그인 시 계정이 복구되며, 이후엔 불가해요."
          left="닫기"
          right="탈퇴"
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </Link>
  );
}

const liStyle =
  "px-5 flex justify-between items-center py-5 cursor-pointer active:bg-grayscale-10 h-[54px]";
