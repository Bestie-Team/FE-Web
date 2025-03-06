import React, { MouseEvent, TouchEvent } from "react";

interface FlexProps {
  id?: string;
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  className?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
}

const Flex: React.FC<FlexProps> = ({
  id,
  align,
  justify,
  direction,
  className,
  style,
  children,
  onClick,
  onMouseDown,
  onTouchStart,
  ref,
}) => {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    ...style,
  };

  return (
    <div
      id={id}
      ref={ref}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={flexStyle}
      className={className}
    >
      {children}
    </div>
  );
};

export default Flex;
