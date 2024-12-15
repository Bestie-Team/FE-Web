import clsx from "clsx";
import PlusIcon from "../icons/PlusIcon";

export default function PlusCircleButton({
  style,
  className,
  onClick,
}: {
  className?: string;
  style?: { bottom: string; right: string };
  onClick?: () => void;
}) {
  return (
    <div
      style={style}
      className={clsx(PlusButtonStyle, className)}
      onClick={onClick}
    >
      <PlusIcon />
    </div>
  );
}

const PlusButtonStyle =
  "bg-grayscale-900 rounded-full w-[48px] h-[48px] flex items-center justify-center";

export function PlusCircleButtonSmall({
  className,
  style,
  width,
  height,
}: {
  className?: string;
  style?: { bottom: string; right: string };
  width?: string;
  height?: string;
}) {
  return (
    <div style={style} className={clsx(PlusButtonStyleSmall, className)}>
      <PlusIcon width={width ?? "13.71"} height={height ?? "13.71"} />
    </div>
  );
}

const PlusButtonStyleSmall =
  "bg-grayscale-900 rounded-full w-[24px] h-[24px] flex items-center justify-center";
