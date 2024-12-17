import React from "react";
import Flex from "../shared/Flex";
import EmptyLogoIcon from "../shared/icons/EmptyLogoIcon";
import UserIcon from "../shared/icons/UserIcon";
import Spacing from "../shared/Spacing";
import Button from "../shared/buttons";
import { useRouter } from "next/navigation";
import FolderIcon from "../shared/icons/FolderIcon";

export default function MyMainInfo() {
  const router = useRouter();
  const buttons = [
    {
      label: "친구 그룹",
      icon: <FolderIcon width="16" height="16" color="#979797" />,
      value: 10,
      link: "/groups",
    },
    { label: "작성 피드", icon: <EmptyLogoIcon />, value: 20, link: "/feed" },
    {
      label: "친구",
      icon: <UserIcon width="16" height="16" color="#979797" />,
      link: "/friends",
      value: 30,
    },
  ];

  return (
    <Flex className="py-0 px-[20px]" justify="center">
      {buttons.map((btn, idx) => {
        return (
          <React.Fragment key={btn.label}>
            <Button
              className={buttonStyle}
              onClick={() => router.push(btn.link)}
            >
              <div>{btn.icon}</div>
              <Spacing size={4} />
              <span className="text-C1 text-grayscale-400 flex-none">
                {btn.label}
              </span>
              <Spacing size={8} />
              <span className="text-T4">{btn.value}</span>
            </Button>
            {idx !== buttons.length - 1 && (
              <Spacing direction="horizontal" size={14} />
            )}
          </React.Fragment>
        );
      })}
    </Flex>
  );
}

const buttonStyle =
  "items-center flex flex-col min-w-[100px] py-[16px] px-[24px] bg-grayscale-10 rounded-[20px] hover:bg-grayscale-50";
