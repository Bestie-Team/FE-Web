export default function CloseIcon({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      className={className}
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M15 5L5 15"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5 5L15 15"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
