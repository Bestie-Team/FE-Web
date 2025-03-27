import React, { useState } from "react";
import Flex from "../shared/Flex";
import { SettingsItem } from "./SettingsMenu";
import Link from "next/link";
import Modal from "../shared/Modal/Modal";
import { deleteUser } from "@/remote/users";
import { lightyToast } from "@/utils/toast";
// import { useRouter } from "next/navigation";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
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
  // const router = useRouter();
  const { data: userInfo } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUserDeleted } = useAuth();
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
    setLoading(true);

    try {
      await deleteUser();
      localStorage.clear();
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUserDeleted(true);
      // setTimeout(() => {
      //   // Next.js router를 우선 사용하고, 실패할 경우 window.location 사용
      //   try {
      //     if (router && typeof router.push === "function") {
      //       router.push("/");
      //     } else {
      //       window.location.href = "/";
      //     }
      //   } catch (redirectError) {
      //     console.log("리다이렉트 오류:", redirectError);
      //     window.location.href = "/";
      //   }
      // }, 300);
    } catch (error) {
      console.log(error);
      lightyToast.error("accountdeletion error");
    } finally {
      setLoading(false);
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
      {loading && <DotSpinnerSmall />}
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
