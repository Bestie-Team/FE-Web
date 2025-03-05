import ToastSuccess from "@/components/shared/Icon/ToastSuccess";
import ToastError from "@/components/shared/Icon/ToastError";
import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

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

const defaultToastOption: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: true,
  pauseOnHover: false,
  closeButton: false,
  transition: undefined,
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
