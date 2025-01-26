import React from "react";
import Flex from "../shared/Flex";
import EmptyLogoIcon from "../shared/Icon/EmptyLogoIcon";
import UserIcon from "../shared/Icon/UserIcon";
import Spacing from "../shared/Spacing";
import { useRouter } from "next/navigation";
import FolderIcon from "../shared/Icon/FolderIcon";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";

export default function MyMainInfo({
  groupCount,
  feedCount,
  friendsCount,
}: {
  groupCount: number;
  feedCount: number;
  friendsCount: number;
}) {
  const router = useRouter();
  const { setActiveBtn } = useActiveNavigation();
  const boxes = [
    {
      label: "친구 그룹",
      icon: <FolderIcon width="16" height="16" color="#979797" />,
      value: groupCount,
      link: "/groups",
    },
    {
      label: "작성 피드",
      icon: <EmptyLogoIcon />,
      value: feedCount,
      link: "/feed",
    },
    {
      label: "친구",
      icon: <UserIcon width="16" height="16" color="#979797" />,
      link: "/friends",
      value: friendsCount,
    },
  ];

  return (
    <Flex className="py-0 px-[20px] gap-[14px]" justify="center">
      {boxes.map((box, idx) => {
        return (
          <div
            key={idx}
            className={boxStyle}
            onMouseDown={() => {
              if (box.label == "작성피드") {
                setActiveBtn(2);
                router.push(box.link);
              } else {
                router.push(box.link);
              }
            }}
          >
            <div>{box.icon}</div>
            <Spacing size={4} />
            <span className="text-C1 text-grayscale-400 flex-none">
              {box.label}
            </span>
            <Spacing size={8} />
            <span className="text-T4">{box.value}</span>
          </div>
        );
      })}
    </Flex>
  );
}

const boxStyle =
  "cursor-pointer items-center flex flex-col min-w-[100px] py-4 px-6 bg-grayscale-10 rounded-[20px] hover:bg-grayscale-50";
