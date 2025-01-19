import React, { useState } from "react";
import Flex from "../shared/Flex";
import { SettingsItem } from "./SettingsMenu";
import Link from "next/link";
import Modal from "../shared/Modal/Modal";

export default function SettingsMenuItem({
  list,
  link,
}: {
  list: SettingsItem;
  link: { href: string; target?: string };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    if (list.title === "탈퇴하기") {
      setIsModalOpen(true);
    }
  };

  return (
    <Link {...link}>
      <li className={liStyle} onClick={handleClick}>
        <span className="text-T5">{list.title}</span>
        <Flex direction="column" justify="center" style={{ gap: "2px" }}>
          {list.info?.map((infoCont, i) => {
            return (
              <span key={i} className="text-C2 text-grayscale-300">
                {infoCont}
              </span>
            );
          })}
        </Flex>
      </li>
      {isModalOpen ? (
        <Modal
          action={() => {}}
          title="탈퇴하시겠어요?"
          content="탈퇴 시 모든 활동 내용이 삭제 되며 해당 정보는 복구할 수 없어요."
          left="닫기"
          right="탈퇴"
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </Link>
  );
}

const liStyle =
  "px-[20px] flex justify-between items-center py-[20px] cursor-pointer hover:bg-grayscale-10 h-[54px]";
