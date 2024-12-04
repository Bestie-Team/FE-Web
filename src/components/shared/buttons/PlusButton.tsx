import clsx from "clsx";
import PlusIcon from "../icons/PlusIcon";
import Button from "./Button";

export default function PlusButton({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Button className={clsx(PlusButtonStyle, className)}>
      <PlusIcon />
    </Button>
  );
}

const PlusButtonStyle =
  "bg-grayscale-900 rounded-full w-[48px] h-[48px] flex items-center justify-center";

export function PlusButtonSmall({ className }: { className?: string }) {
  return (
    <Button className={clsx(PlusButtonStyleSmall, className)}>
      <PlusIcon width="13.71" height="13.71" />
    </Button>
  );
}

const PlusButtonStyleSmall =
  "bg-grayscale-900 rounded-full w-[24px] h-[24px] flex items-center justify-center";
