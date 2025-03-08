import Dimmed from "../shared/Dimmed";
import CloseIcon from "../shared/Icon/CloseIcon";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import Button from "../shared/Button/Button";
import { useRecoilValue } from "recoil";
import { selectedInvitationAtom } from "@/atoms/invitation";
import useAcceptInvitationToGathering from "../gathering/hooks/useAcceptInvitationToGathering";
import useRejectInvitationToGathering from "../gathering/hooks/useRejectInvitationToGathering";
import { SuccessResponse } from "@/models/response";
import { VerticalInvitationCard } from "./VerticalInvitationCard";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";

export default function InvitationModal({
  selectedTab,
  onClickClose,
}: {
  selectedTab: "1" | "2";
  onClickClose: (value: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const selectedInvitation = useRecoilValue(selectedInvitationAtom);

  const { mutate: accept } = useAcceptInvitationToGathering({
    gatheringId: selectedInvitation?.gatheringId || "",
    invitationId: selectedInvitation?.id || "",
    onSuccess: async (data: SuccessResponse) => {
      await queryClient.invalidateQueries({
        queryKey: ["received", "gathering/invitation"],
      });
      lightyToast.success(data.message);
      onClickClose(false);
    },
  });

  const { mutate: reject } = useRejectInvitationToGathering({
    invitationId: selectedInvitation?.id || "",
    onSuccess: async (data: SuccessResponse) => {
      await queryClient.invalidateQueries({
        queryKey: ["received", "gathering/invitation"],
      });
      lightyToast.success(data.message);
      onClickClose(false);
    },
  });

  if (!selectedInvitation) return;

  return (
    <Dimmed className={styles.dimmed}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ width: "330px" }}
      >
        <CloseIcon
          width="32"
          height="32"
          className="self-end cursor-pointer"
          onClick={() => {
            onClickClose(false);
          }}
        />
        <Spacing size={8} />
        <VerticalInvitationCard invitation={selectedInvitation} />
        {selectedTab === "1" ? (
          <>
            <Spacing size={16} />
            <Flex justify="center">
              <Button className={styles.rejectBtn} onClick={() => reject()}>
                거절
              </Button>
              <Spacing size={15} direction="horizontal" />
              <Button className={styles.acceptBtn} onClick={() => accept()}>
                수락
              </Button>
            </Flex>
          </>
        ) : null}
      </Flex>
    </Dimmed>
  );
}

const styles = {
  dimmed: "flex flex-col justify-center items-center",

  image: "h-[210px] object-cover rounded-xl",
  subContentWrapper: "absolute pl-1 left-[15px] top-[332px]",
  groupMemberImagesWrapper: "absolute bottom-[15px] left-[15px] pl-1",
  fromWrapper: "absolute pr-1 right-[15px] bottom-[22px]",
  rejectBtn:
    "bg-grayscale-100 px-6 py-[14px] rounded-[36px] text-T6 active:bg-grayscale-200",
  acceptBtn:
    "bg-grayscale-900 px-6 py-[14px] text-base-white rounded-[36px] text-T6",
};
