export default function PlusIcon({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      width={width ?? "20.57"}
      height={height ?? "20.57"}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M11 5V17"
          stroke="white"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5 11H17"
          stroke="white"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
