import Button from "../shared/buttons";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function InvitationCard() {
  return (
    <Flex
      style={{
        width: "full",
        height: "full",
      }}
      justify="center"
    >
      <div className="relative">
        <InvitationVector />
        <Flex
          style={{
            height: "173px",
            width: "354px",
            gap: "54px",
            position: "absolute",
            padding: "24px 20px",
            left: 0,
            top: 0,
          }}
        >
          <Flex
            direction="column"
            justify="space-between"
            style={{
              width: "188px",
            }}
          >
            <Flex direction="column">
              <span className="text-T3">초대장 제목</span>
              <Spacing size={8} />
              <span className="text-C2 text-grayscale-500">내용</span>
            </Flex>
            <Flex
              align="center"
              style={{
                width: "full",
              }}
            >
              <span className="text-B4 text-grayscale-300">from</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-B4 flex-grow">초대하는 사람</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-C2 text-grayscale-300">0일 전</span>
            </Flex>
          </Flex>
          <Button
            onClick={() => {
              "초대장 열기";
            }}
            color="#0A0A0A"
            className="h-fit text-C1 flex-none px-[24px] py-[12px] rounded-[36px] text-base-white self-end"
          >
            열기
          </Button>
        </Flex>
      </div>
    </Flex>
  );
}

function InvitationVector() {
  return (
    <svg
      width="354"
      height="173"
      viewBox="0 0 354 173"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M240.873 7.18168L238 11.6962L235.127 7.18169C232.796 3.51839 228.755 1.3 224.413 1.3H18C8.77684 1.3 1.3 8.77684 1.3 18V154.535C1.3 163.744 8.75464 171.215 17.9635 171.235L224.394 171.686C228.746 171.695 232.8 169.476 235.136 165.804L238 161.304L240.873 165.818C243.204 169.482 247.245 171.7 251.587 171.7H336C345.223 171.7 352.7 164.223 352.7 155V18C352.7 8.77684 345.223 1.3 336 1.3H251.587C247.245 1.3 243.204 3.51839 240.873 7.18168Z"
        fill="white"
        stroke="#E9E9E9"
        style={{
          fill: "white",
          fillOpacity: 1,
          stroke: "#E9E9E9",
          strokeOpacity: 1,
        }}
        strokeWidth="1.4"
      />
      <line
        x1="238.5"
        y1="22"
        x2="238.5"
        y2="150"
        stroke="#E9E9E9"
        style={{
          stroke: "#E9E9E9",
          strokeOpacity: 1,
        }}
        strokeDasharray="2 2"
      />
    </svg>
  );
}
