import React from "react";
import Flex from "../shared/Flex";
import EmptyLogoIcon from "../shared/icons/EmptyLogoIcon";
import MailIcon from "../shared/icons/MailIcon";
import UserIcon from "../shared/icons/UserIcon";
import Spacing from "../shared/Spacing";
import Button from "../shared/buttons";
import { useRouter } from "next/navigation";

export default function MyMainInfo() {
  const router = useRouter();
  const buttons = [
    {
      label: "보낸 초대장",
      icon: <MailIcon width="16" height="16" color="#979797" />,
      value: 10,
    },
    { label: "작성 피드", icon: <EmptyLogoIcon />, value: 20 },
    {
      label: "친구",
      icon: <UserIcon width="16" height="16" color="#979797" />,
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
              onClick={() => router.push("/friends")}
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
