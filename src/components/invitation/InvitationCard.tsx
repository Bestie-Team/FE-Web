import Image from "next/image";
import Button from "../shared/buttons";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function InvitationCard({
  onClickOpen,
}: {
  onClickOpen: (value: boolean) => void;
}) {
  return (
    <Flex
      style={{
        width: "full",
        height: "full",
      }}
      justify="center"
    >
      <div className="relative">
        <Image
          src="https://d20j4cey9ep9gv.cloudfront.net/invitation.png"
          className="w-full flex-grow"
          width={350}
          height={169}
          alt="invitationImage"
        />
        <Flex
          direction="column"
          style={{
            height: "173px",
            width: "full",
            minWidth: "188px",
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
              width: "full",
            }}
          >
            <span className="text-T3">Christmas Party ♡✧。</span>
            <Spacing size={8} />
            <span className="text-C2 text-grayscale-500">
              welcome to pig party
            </span>
          </Flex>
        </Flex>
        <Flex
          align="center"
          style={{
            width: "full",
            minWidth: "188px",
            position: "absolute",
            padding: "24px 20px",
            left: 0,
            bottom: 0,
          }}
        >
          <span className="text-B4 text-grayscale-300">from</span>
          <Spacing size={4} direction="horizontal" />
          <span className="text-B4 flex-grow">Maybin_</span>
          <Spacing size={4} direction="horizontal" />
          <span className="text-C2 text-grayscale-300">0일 전</span>
        </Flex>
        <Button
          onClick={() => {
            onClickOpen(true);
          }}
          color="#0A0A0A"
          className={buttonStyle}
        >
          열기
        </Button>
      </div>
    </Flex>
  );
}

const buttonStyle =
  "absolute right-[20px] bottom-[24px] h-fit text-C1 flex-none px-[24px] py-[12px] rounded-[36px] text-base-white";
