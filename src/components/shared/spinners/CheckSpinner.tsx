export default function CheckSpinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      style={{
        width: 36,
        height: 36,
      }}
    >
      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(0.2);
          }
          50%,
          100% {
            transform: scale(1);
          }
        }
        @keyframes check {
          0% {
            stroke-dashoffset: 48;
          }
          50%,
          100% {
            stroke-dashoffset: 0;
          }
        }
        .circle {
          fill: black;
          transform-origin: center;
          animation: scale 2s;
        }
        .checkmark {
          fill: none;
          stroke: white;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: check 2s forwards;
        }
      `}</style>

      <circle className="circle" cx="18" cy="18" r="18" />
      <path className="checkmark" d="M10 18l6 6 10-10" />
    </svg>
  );
}
