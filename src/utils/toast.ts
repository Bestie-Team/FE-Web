import ToastSuccess from "@/components/shared/Icon/ToastSuccess";
import ToastError from "@/components/shared/Icon/ToastError";
import { ReactNode } from "react";
import { cssTransition, toast, ToastOptions } from "react-toastify";

export const lightyToast = {
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultToastOption,
      icon: ToastSuccess,
      ...options,
    });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...defaultToastOption,
      icon: ToastError,
      ...options,
    });
  },
};

const fadeOut = cssTransition({
  enter: "fadeIn",
  exit: "fadeOut",
  collapse: true,
});

const defaultToastOption: ToastOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  pauseOnHover: false,
  closeButton: false,
  transition: fadeOut,
};

export const InvitationToast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultToastOption,
      icon: ToastSuccess,
      ...options,
    });
  },
};
