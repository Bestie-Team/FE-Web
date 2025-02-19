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
  termsOfServiceConsent,
  privacyPolicyConsent,
  onSuccess,
}: {
  email: string;
  name: string;
  accountId: string;
  profileImageUrl: File | string | null;
  provider: lighty.Provider;
  termsOfServiceConsent: boolean;
  privacyPolicyConsent: boolean;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["register", email, provider],
    mutationFn: () =>
      registerUser({
        email,
        name,
        accountId,
        profileImageUrl,
        provider,
        termsOfServiceConsent,
        privacyPolicyConsent,
      }),
    onSuccess: (data: { message: string } | undefined) => {
      if (data) {
        onSuccess(data);
      }
    },
  });
}
