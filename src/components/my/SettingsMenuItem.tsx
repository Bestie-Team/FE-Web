import React from "react";
import Flex from "../shared/Flex";
import { SettingsItem } from "./SettingsMenu";
import Link from "next/link";

export default function SettingsMenuItem({
  list,
  link,
}: {
  list: SettingsItem;
  link?: string;
}) {
  const handleClick = async () => {
    if (list.onClick) {
      await list.onClick();
    }
  };

  return (
    <Link href={link ? link : ""}>
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
    </Link>
  );
}

const liStyle =
  "px-[20px] flex justify-between items-center py-[20px] cursor-pointer hover:bg-grayscale-10 h-[54px]";
