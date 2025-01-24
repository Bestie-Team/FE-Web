import { postRegister } from "@/remote/auth";
import { useMutation } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export interface SignupType {
  email: string;
  name: string;
  accountId: string;
  profileImageUrl: File | string | null;
  provider: lighty.Provider;
}

export default function useSignup({
  email,
  name,
  accountId,
  profileImageUrl,
  provider,
  onSuccess,
}: {
  email: string;
  name: string;
  accountId: string;
  profileImageUrl: File | string | null;
  provider: lighty.Provider;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: () =>
      postRegister({ email, name, accountId, profileImageUrl, provider }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
