import Image from "next/image";
import Button from "../shared/Button/Button";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";
import { selectedInvitationAtom } from "@/atoms/invitation";
import { differenceInCalendarDays } from "date-fns";
import { ReceivedGatheringInvitation } from "@/models/gathering";
import { useState } from "react";
import { INVITATION } from "@/constants/images";

export default function InvitationCard({
  invitation,
  onClickOpen,
}: {
  invitation: Omit<ReceivedGatheringInvitation, "id">;
  onClickOpen: (value: boolean) => void;
}) {
  const setSelectedInvitation = useSetRecoilState(selectedInvitationAtom);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { name, description, sender, createdAt } = invitation;
  const date = new Date(createdAt);
  const diff = differenceInCalendarDays(new Date(), new Date(date));

  if (!invitation) return null;
  return (
    <Flex className={styles.container} justify="center">
      <div className="relative">
        <Image
          priority
          src={INVITATION}
          className="!h-[169px] w-[350px] flex-grow"
          width={350}
          height={169}
          alt="invitationImage"
          onLoad={() => setImageLoaded(true)}
        />

        {imageLoaded && (
          <>
            <Flex direction="column" className={styles.mainContentWrapper}>
              <Flex
                direction="column"
                justify="space-between"
                className="w-full"
              >
                <span className="text-T3">{name} ♡✧。</span>
                <Spacing size={8} />
                <span className="text-C2 text-grayscale-500">
                  {description}
                </span>
              </Flex>
            </Flex>
            <Flex align="center" className={styles.subContentWrapper}>
              <span className="text-B4 text-grayscale-300">from</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-B4 flex-grow">{sender}</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-C2 text-grayscale-300">
                {diff <= 0 ? `${Math.abs(diff)}일 전` : `${diff}일 지남`}
              </span>
            </Flex>
            <Button
              onClick={() => {
                setSelectedInvitation(
                  invitation as ReceivedGatheringInvitation
                );
                onClickOpen(true);
              }}
              color="#0A0A0A"
              className={styles.button}
            >
              열기
            </Button>
          </>
        )}
      </div>
    </Flex>
  );
}

const styles = {
  container: "w-full h-fit px-5",
  mainContentWrapper:
    "h-[173px] w-full max-w-[196px] gap-[54px] absolute py-6 pl-5 left-0 top-0",
  subContentWrapper: "w-full max-w-[188px] absolute pl-5 py-6 left-0 bottom-0",

  button:
    "absolute right-[20px] bottom-[24px] h-fit text-C1 flex-none px-6 py-3 rounded-[36px] text-base-white hover:animate-shrink-grow-less",
};
