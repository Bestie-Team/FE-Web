import ArrowLeftIcon from "../shared/icons/ArrowLeftIcon";
import Spacing from "../shared/Spacing";
import AddFriendIcon from "../shared/icons/AddFriendIcon";
import { useRouter } from "next/navigation";

export default function FriendsPageHeader({
  label,
  addFriendIcon = false,
}: {
  label: string;
  addFriendIcon?: boolean;
}) {
  const router = useRouter();
  const arrowIconContainerStyle =
    "w-[40px] h-[40px] py-[10px] pl-[17px] pr-[3px] cursor-pointer";

  return (
    <div className="bg-grayscale-50 flex pr-[20px] w-full items-center h-[48px]">
      <div
        className={arrowIconContainerStyle}
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeftIcon />
      </div>
      <Spacing size={6} direction="horizontal" />
      <span className="flex-grow text-T3">{label}</span>
      <Spacing size={6} direction="horizontal" />
      {addFriendIcon ? (
        <div
          className="p-[4px] cursor-pointer"
          onClick={() => {
            router.push("/friends/add");
          }}
        >
          <AddFriendIcon />
        </div>
      ) : null}
    </div>
  );
}
