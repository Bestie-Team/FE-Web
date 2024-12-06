import { toast, ToastContainer } from "react-toastify";
import SuccessIcon from "../icons/SuccessIcon";
import AlarmIcon from "../icons/AlarmIcon";

export default function Toast({
  comment,
  label,
}: {
  comment: string;
  label: string;
}) {
  const notify = (comment: string) => {
    toast.success(comment, {
      position: "top-center",
      icon: <SuccessIcon />,
      closeButton: false,
    });

    toast.error(comment, {
      position: "top-left",
      icon: <AlarmIcon />,
      closeButton: false,
    });
  };

  return (
    <>
      <button
        className="py-[10px] px-[18px] border-[1px] border-grayscale-500"
        onClick={() => {
          notify(comment);
        }}
      >
        {label}
      </button>
      <ToastContainer closeButton={false} />
    </>
  );
}
