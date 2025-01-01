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
    <Flex className={styles.container} justify="center">
      <div className="relative">
        <Image
          src="https://cdn.lighty.today/invitation.png"
          className="w-full flex-grow"
          width={350}
          height={169}
          alt="invitationImage"
        />
        <Flex direction="column" className={styles.mainContentWrapper}>
          <Flex direction="column" justify="space-between" className="w-full">
            <span className="text-T3">christmas party ♡✧。</span>
            <Spacing size={8} />
            <span className="text-C2 text-grayscale-500">
              welcome to pig party
            </span>
          </Flex>
        </Flex>
        <Flex align="center" className={styles.subContentWrapper}>
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
          className={styles.button}
        >
          열기
        </Button>
      </div>
    </Flex>
  );
}

const styles = {
  container: "w-full h-full px-[20px]",
  mainContentWrapper:
    "h-[173px] w-full max-w-[196px] gap-[54px] absolute py-[24px] pl-[20px] left-0 top-0",
  subContentWrapper:
    "w-full max-w-[188px] absolute pl-[20px] py-[24px] left-0 bottom-0",

  button:
    "absolute right-[20px] bottom-[24px] h-fit text-C1 flex-none px-[24px] py-[12px] rounded-[36px] text-base-white",
};
