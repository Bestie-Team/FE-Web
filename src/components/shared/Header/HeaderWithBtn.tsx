import clsx from "clsx";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import Spacing from "../Spacing";
import Flex from "../Flex";

export default function HeaderWithBtn({
  icon,
  fixed = true,
  bgColor,
  fontColor,
  headerLabel,
}: {
  icon?: React.ReactNode;
  fixed?: boolean;
  bgColor?: string;
  fontColor?: string;
  headerLabel: string;
}) {
  return (
    <Flex
      justify="space-between"
      align="center"
      className={clsx(
        "pt-safe-top max-w-[430px] w-full h-12 gap-[6px]",
        "pl-0 pr-5",
        headerFont
      )}
      style={{
        top: 0,
        zIndex: 30,
        position: fixed ? "fixed" : undefined,
        backgroundColor: bgColor ? bgColor : "transparent",
      }}
    >
      <button
        className={"w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer"}
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeftIcon color={fontColor} />
      </button>
      <div
        style={{
          color: fontColor ? fontColor : "",
        }}
        className="flex-1"
      >
        {headerLabel}
      </div>
      <Spacing size={6} />
      {icon && <div>{icon}</div>}
    </Flex>
  );
}

const headerFont = "text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px]";
