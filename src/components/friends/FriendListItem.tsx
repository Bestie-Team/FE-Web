import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import MinusIcon from "../shared/icons/MinusIcon";
import CloseIcon from "../shared/icons/CloseIcon";
import clsx from "clsx";
import Options from "../shared/icons/Options";
import Button from "../shared/buttons";

export default function FriendListItem({
  type,
  idx,
}: {
  type: "basic" | "receivedRequest" | "sendedRequest";
  idx: number;
}) {
  return (
    <li key={`friend${idx}`} className={liStyle}>
      <Image
        alt="friendImg"
        src="https://d20j4cey9ep9gv.cloudfront.net/bini.JPG"
        width={36}
        height={36}
        className={imgStyle}
      />
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow" direction="column">
        <span className="text-T6">maybin</span>
        <Spacing size={2} />
        <span className="text-C2 text-grayscale-400">김떙땡</span>
      </Flex>
      {type === "basic" ? (
        <div className={clsx(iconContainerStyle)}>
          <Options width="2.5" height="14.17" type="friend" />
        </div>
      ) : null}
      {type === "receivedRequest" ? (
        <Flex>
          <Button className={acceptBtnStyle}>수락</Button>
          <Spacing size={12} direction="horizontal" />
          <Button className={rejectBtnStyle}>거절</Button>
        </Flex>
      ) : null}
    </li>
  );
}

const iconContainerStyle = "flex justify-center items-center w-[20px] h-[20px]";

const liStyle =
  "bg-base-white flex py-[14px] px-[16px] rounded-[20px] items-center";

const imgStyle = "rounded-full object-cover h-[36px] w-[36px]";

const acceptBtnStyle =
  "flex items-center px-[12px] py-[8px] rounded-[8px] bg-grayscale-900 text-base-white text-C2 h-fit";

const rejectBtnStyle =
  "flex items-center px-[12px] py-[8px] rounded-[8px] bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]";
