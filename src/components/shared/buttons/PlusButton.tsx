import clsx from "clsx";
import PlusIcon from "../icons/PlusIcon";
import Button from "./Button";

export default function PlusButton({
  width,
  height,
  className,
  onClick,
}: {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button className={clsx(PlusButtonStyle, className)} onClick={onClick}>
      <PlusIcon />
    </Button>
  );
}

const PlusButtonStyle =
  "bg-grayscale-900 rounded-full w-[48px] h-[48px] flex items-center justify-center";

export function PlusButtonSmall({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div className={clsx(PlusButtonStyleSmall, className)}>
      <PlusIcon width={width ?? "13.71"} height={height ?? "13.71"} />
    </div>
  );
}

const PlusButtonStyleSmall =
  "bg-grayscale-900 rounded-full w-[24px] h-[24px] flex items-center justify-center";
