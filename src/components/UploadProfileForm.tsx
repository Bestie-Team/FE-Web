"use client";
import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import * as lighty from "lighty-type";
import AddPhoto, { RegisterRequestType } from "./shared/AddPhoto";
import Input from "./shared/Input/Input";
import FixedBottomButton from "./shared/Button/FixedBottomButton";
import Spacing from "./shared/Spacing";
import Flex from "./shared/Flex";
import validator from "validator";
import STORAGE_KEYS from "@/constants/storageKeys";
import TermsBottomSheet from "./shared/BottomDrawer/TermsBottomSheet";
import useSignup from "./users/hooks/useSignup";
import { toast } from "react-toastify";

export type Provider = "GOOGLE" | "KAKAO" | "APPLE";

const validateForm = (formValues: RegisterRequestType) => {
  const errors: Partial<{
    email: string;
    name: string;
    accountId: string;
    profileImageUrl: string | null;
    provider: Provider;
  }> = {};

  if (!validator.isEmpty(formValues.accountId)) {
    if (!validator.isLowercase(formValues.accountId)) {
      errors.accountId = "소문자만 입력 가능합니다.";
    }
    if (
      !validator.isAlpha(formValues.accountId) &&
      /[^\w\s_]/.test(formValues.accountId)
    ) {
      errors.accountId = "영문을 필수로 입력해주세요";
    }
    if (
      /[^\w\s_]/.test(formValues.accountId) ||
      formValues.accountId.includes(" ")
    ) {
      errors.accountId = "올바르지 않은 형식입니다.";
    }
  }

  return errors;
};

const INITIAL_FORM_STATE: RegisterRequestType = {
  email: "",
  name: "",
  accountId: "",
  profileImageUrl: null,
  provider: "GOOGLE",
};

export default function UploadProfileForm() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formValues, setFormValues] =
    React.useState<RegisterRequestType>(INITIAL_FORM_STATE);
  const [isClient, setIsClient] = React.useState(false);
  const [oauthData, setOauthData] = React.useState<lighty.LoginFailResponse>();

  const handleAccountIdChange = useCallback((value: string) => {
    if (value.length <= 40) {
      setFormValues((prev) => ({ ...prev, accountId: value }));
    }
  }, []);

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "accountId") {
        handleAccountIdChange(value);
        return;
      }

      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    [handleAccountIdChange]
  );

  const { mutate } = useSignup({
    ...formValues,
    name: oauthData?.name || "",
    email: oauthData?.email || "",
    provider: oauthData?.provider as Provider,
    onSuccess: useCallback((data) => {
      toast.success(data.message);
    }, []),
  });

  const errors = useMemo(() => validateForm(formValues), [formValues]);
  const isValidate = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const isButtonDisabled = useMemo(() => {
    return (
      !isValidate ||
      formValues.profileImageUrl == null ||
      formValues.accountId.length < 5 ||
      formValues.name == null
    );
  }, [
    isValidate,
    formValues.profileImageUrl,
    formValues.accountId,
    formValues.name,
  ]);

  useEffect(() => {
    setIsClient(true);
    const session = sessionStorage.getItem(STORAGE_KEYS.OAUTH_DATA);

    if (session) {
      try {
        const user_info: lighty.LoginFailResponse = JSON.parse(session);
        setOauthData(user_info);
      } catch (error) {
        console.error("Failed to parse OAuth data:", error);
      }
    }
  }, []);

  if (!isClient) return null;

  return (
    <Flex direction="column">
      <div className="mx-auto w-21 py-3">
        <AddPhoto setImageUrl={setFormValues} uploadable />
      </div>
      <Spacing size={16} />
      {
        <Input
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          onChange={handleFormValues}
          value={oauthData?.name || "로에"}
          helpMessage={errors.name}
        />
      }
      <Spacing size={30} />
      <Input
        name="accountId"
        label="계정 아이디"
        placeholder="영문 소문자, 숫자, 특수기호 (_)만 입력 가능"
        onChange={handleFormValues}
        displayLength={15}
        value={formValues.accountId}
        helpMessage={errors.accountId}
      />
      <Spacing size={6} />
      <span className="text-C2 text-grayscale-500">
        *계정 아이디는 프로필에 노출되며, 친구 추가 시 활용돼요!
      </span>
      <FixedBottomButton
        label="다음"
        disabled={isButtonDisabled}
        onClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <TermsBottomSheet
          onClose={() => setModalOpen(false)}
          handleSignup={mutate}
        />
      )}
    </Flex>
  );
}
