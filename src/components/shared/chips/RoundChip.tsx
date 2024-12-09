import React from "react";
import Button from "../buttons";
import clsx from "clsx";

type Props = {
  color: "white" | "black";
  label: string;
  onClick?: () => void;
};
export default function RoundChip({ color, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[40px] px-[18px] py-[10px] ",
        color === "black"
          ? "bg-grayscale-900 text-base-white"
          : "bg-base-white text-grayscale-600 border-[1px] border-grayscale-100"
      )}
    >
      {label}
    </button>
  );
}
