export default function ArrowRightIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M7.5 16.6667L13.7745 9.99893L7.5 3.33335"
          stroke="#D8D8D8"
          style={{
            stroke: "#D8D8D8",
            strokeOpacity: 1,
          }}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
