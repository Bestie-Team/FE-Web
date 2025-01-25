import { registerUser } from "@/remote/auth";
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
    mutationKey: ["register", email, provider],
    mutationFn: () =>
      registerUser({ email, name, accountId, profileImageUrl, provider }),
    onSuccess: (data: { message: string } | undefined) => {
      if (data) {
        onSuccess(data);
      }
    },
  });
}
