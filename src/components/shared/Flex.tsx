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
  children: React.ReactNode;
  className?: string;
}

const Flex: React.FC<FlexProps> = ({
  align,
  justify,
  direction,
  className,
  style,
  children,
  onClick,
}) => {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    ...style,
  };

  return (
    <div onClick={onClick} style={flexStyle} className={className}>
      {children}
    </div>
  );
};

export default Flex;
