"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import * as lighty from "lighty-type";
import AddPhoto, { RegisterRequestType } from "./shared/AddPhoto";
import Input from "./shared/Input/Input";
import FixedBottomButton from "./shared/Button/FixedBottomButton";
import Spacing from "./shared/Spacing";
import Flex from "./shared/Flex";
import STORAGE_KEYS from "@/constants/storageKeys";
import TermsBottomSheet from "./shared/BottomDrawer/TermsBottomSheet";
import useSignup from "./users/hooks/useSignup";
import { lightyToast } from "@/utils/toast";
import { getIdAvailability } from "@/remote/users";
import validateForm from "@/utils/validateSignupForm";

export type Provider = "GOOGLE" | "KAKAO" | "APPLE";

const INITIAL_FORM_STATE: RegisterRequestType = {
  email: "",
  name: "",
  accountId: "",
  profileImageUrl: null,
  provider: "GOOGLE",
  termsOfServiceConsent: false,
  privacyPolicyConsent: false,
};

export default function SignupForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] =
    useState<RegisterRequestType>(INITIAL_FORM_STATE);
  const [oauthData, setOauthData] = useState<lighty.LoginFailResponse>();
  const [idNotAvailable, setIdNotAvailable] = useState(false);

  const handleAccountIdChange = useCallback(async (value: string) => {
    if (value.length <= 40) {
      setFormValues((prev) => ({ ...prev, accountId: value }));
      if (value.length > 3) {
        const response = await getIdAvailability({ accountId: value });
        setIdNotAvailable(!response.ok);
      }
    }
  }, []);

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "accountId") {
        handleAccountIdChange(value);
      } else {
        setFormValues((prev) => ({ ...prev, [name]: value }));
      }
    },
    [handleAccountIdChange]
  );

  const { mutate } = useSignup({
    ...formValues,
    name: oauthData?.name || "",
    email: oauthData?.email || "",
    provider: oauthData?.provider as Provider,
    termsOfServiceConsent: true,
    privacyPolicyConsent: true,
    onSuccess: useCallback((data) => {
      lightyToast.success(data.message);
    }, []),
  });

  const errors = useMemo(() => validateForm(formValues), [formValues]);
  const isValidate = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const isButtonDisabled = useMemo(() => {
    return (
      !isValidate ||
      formValues.profileImageUrl == null ||
      formValues.accountId.length < 5 ||
      formValues.name == null ||
      idNotAvailable
    );
  }, [
    isValidate,
    formValues.profileImageUrl,
    formValues.accountId,
    formValues.name,
    idNotAvailable,
  ]);

  useEffect(() => {
    const session = sessionStorage.getItem(STORAGE_KEYS.OAUTH_DATA);

    if (session) {
      try {
        const user_info: lighty.LoginFailResponse = JSON.parse(session);
        setOauthData(user_info);
        setFormValues((prev) => ({ ...prev, name: user_info.name }));
      } catch (error) {
        console.error("Failed to parse OAuth data:", error);
      }
    }
  }, []);

  const signupNextHandler = () => {
    if (isButtonDisabled) {
      if (formValues.profileImageUrl == null) {
        lightyToast.error("프로필 사진을 등록해주세요.");
      } else if (formValues.accountId == null) {
        lightyToast.error("계정 아이디를 입력해주세요.");
      } else if (idNotAvailable || errors.accountId) {
        lightyToast.error("올바른 형식의 아이디를 입력해주세요");
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <Flex direction="column">
      <div className="mx-auto w-21 py-3">
        <AddPhoto setImageUrl={setFormValues} uploadable />
      </div>
      <Spacing size={16} />

      <Input
        name="name"
        label="이름"
        placeholder="이름을 입력해주세요."
        onChange={handleFormValues}
        value={formValues.name}
        helpMessage={errors.name}
      />

      <Spacing size={30} />
      <Input
        idNotAvailable={idNotAvailable}
        name="accountId"
        label="계정 아이디"
        placeholder="영문 소문자, 숫자, 특수기호 (_)만 입력 가능"
        onChange={handleFormValues}
        displayLength={15}
        value={formValues.accountId}
        helpMessage={errors.accountId}
      />
      <Spacing size={6} />

      {idNotAvailable && (
        <span className="text-[#FA6767] text-C2 px-2">
          중복되는 계정 아이디에요
        </span>
      )}
      <span className="text-C2 text-grayscale-500 px-2">
        *계정 아이디는 프로필에 노출되며, 친구 추가 시 활용돼요!
      </span>
      <FixedBottomButton label="다음" onClick={signupNextHandler} />
      {modalOpen && (
        <TermsBottomSheet
          onClose={() => setModalOpen(false)}
          handleSignup={mutate}
        />
      )}
    </Flex>
  );
}
