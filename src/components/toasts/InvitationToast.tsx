import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "../shared/icons/CloseIcon";
import MailIcon from "../shared/icons/MailIcon";

export function InvitationToast() {
  const notify = (comment: string) => {
    toast(comment, {
      icon: <MailIcon />,
      position: "bottom-center",
      className: "invitation-toast",
      bodyClassName: "invitation-toast-body",
      closeOnClick: true,
    });
  };

  return (
    <>
      <button
        className="py-[10px] px-[18px] border-[1px] border-grayscale-500"
        onClick={() => {
          notify("새로운 초대장이 왔어요!");
        }}
      >
        {"초대장 토스트"}
      </button>
      <ToastContainer autoClose={false} closeButton={<CloseIcon />} />
    </>
  );
}
