import Image from "next/image";
import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import MinusIcon from "../shared/icons/MinusIcon";
import CloseIcon from "../shared/icons/CloseIcon";
import clsx from "clsx";

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
      <div
        className={clsx(
          iconContainerStyle,
          type !== "basic" ? "bg-[#e9e9e9]" : "border-[0.8px] border-[#e9e9e9]"
        )}
      >
        {type === "basic" ? (
          <MinusIcon />
        ) : (
          <CloseIcon color={"#0A0A0A"} onClick={() => {}} />
        )}
      </div>
    </li>
  );
}

const iconContainerStyle =
  "flex justify-center items-center w-[32px] h-[32px] p-[8px] rounded-[9.6px]";
<CloseIcon color={"#0A0A0A"} onClick={() => {}} />;

const liStyle = "bg-base-white flex py-[14px] px-[16px] rounded-[20px]";

const imgStyle = "rounded-full object-cover h-[36px] w-[36px]";
