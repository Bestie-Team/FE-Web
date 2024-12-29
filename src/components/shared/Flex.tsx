import React from "react";

interface FlexProps {
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
  onMouseDown?: () => void;
  children: React.ReactNode;
  className?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
}

const Flex: React.FC<FlexProps> = ({
  align,
  justify,
  direction,
  className,
  style,
  children,
  onClick,
  onMouseDown,
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
      ref={ref}
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={flexStyle}
      className={className}
    >
      {children}
    </div>
  );
};

export default Flex;
