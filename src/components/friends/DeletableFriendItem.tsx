import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { GroupInfoResponse } from "@/models/group";
import { UserInfo } from "@/models/user";
import CloseIcon from "../shared/icons/CloseIcon";
import CheckIcon from "../shared/icons/CheckIcon";

interface Props {
  friendInfo?: UserInfo;
  groupInfo?: GroupInfoResponse;
  onClickDelete: () => void;
}

export default function DeletableFriendItem({
  friendInfo,
  groupInfo,
  onClickDelete,
}: Props) {
  return (
    <Flex direction="column" className={style.container}>
      <div className="relative p-[6px]">
        <div className={style.circleWrapper}>
          <Image
            alt="friendProfile"
            src={
              friendInfo?.profileImageUrl ||
              groupInfo?.imageUrl ||
              "https://cdn.lighty.today/bini.JPG"
            }
            className={style.image}
            width={56}
            height={56}
          />
          <div className={style.checkContainer}>
            <CheckIcon width="28" height="28" />
          </div>
        </div>
        <DeleteButton onClick={onClickDelete} />
      </div>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">
          {friendInfo?.name || groupInfo?.groupName || "이름"}
        </span>
        <span className={style.text}>
          {friendInfo?.accountId || groupInfo?.desc || "아이디"}
        </span>
      </Flex>
    </Flex>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={style.btnContainer} onClick={onClick}>
      <CloseIcon width="13.33" height="13.33" />
    </div>
  );
}

const style = {
  container: "w-fit shrink-0",

  circleWrapper: "relative rounded-full border-dashed border-[2px]",
  image: "rounded-full object-cover w-[56px] h-[56px]",
  checkContainer:
    "absolute inset-0 flex items-center justify-center rounded-full bg-[#00000066] p-[2px]",
  btnContainer:
    "absolute top-[2px] right-[2px] cursor-pointer p-[3.33px] rounded-full bg-grayscale-300 w-[20px] h-[20px]",

  text: "text-C5 text-grayscale-400 truncate",
};
