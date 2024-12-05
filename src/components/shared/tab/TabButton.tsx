import clsx from "clsx";
type Props = {
  title: string;
  onClick: () => void;
  className?: string;
  current: boolean;
  fresh: boolean; // 빨간아이콘
};
export default function TabButton({
  title,
  className,
  current,
  onClick,
  fresh,
}: Props) {
  return (
    <div className={clsx("flex ", className)}>
      <div
        onClick={onClick}
        className={clsx(
          textStyle,
          current ? "text-grayscale-900" : "text-grayscale-300"
        )}
      >
        {title}
      </div>
      <DotIcon display={fresh} />
    </div>
  );
}

export function DotIcon({
  display,
  className,
}: {
  display: boolean;
  className?: string;
}) {
  return (
    <svg
      width="4"
      height="26"
      viewBox="0 0 4 26"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1321316008">
        <circle
          id="Ellipse 13"
          cx="2"
          cy="10"
          r="2"
          fill={display ? "#FA6767" : "white"}
        />
      </g>
    </svg>
  );
}

const textStyle = "h-[39px] pt-[10px] pb-[8px] flex items-center text-T4";
