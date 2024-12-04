interface SpacingProps {
  size: number;
  direction?: "horizontal" | "vertical";
}

const Spacing: React.FC<SpacingProps> = ({ size, direction = "vertical" }) => {
  const style =
    direction === "vertical" ? { height: `${size}px` } : { width: `${size}px` };

  return <div style={style} />;
};

export default Spacing;
