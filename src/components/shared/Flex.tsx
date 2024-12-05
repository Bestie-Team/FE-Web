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
  children: React.ReactNode;
}

const Flex: React.FC<FlexProps> = ({
  align,
  justify,
  direction,
  style,
  children,
}) => {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    ...style,
  };

  return <div style={flexStyle}>{children}</div>;
};

export default Flex;
