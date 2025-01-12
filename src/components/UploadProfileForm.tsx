"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import * as lighty from "lighty-type";
import AddPhoto, { UploadType } from "./shared/AddPhoto";
import Input from "./shared/inputs/Input";
import FixedBottomButton from "./shared/buttons/FixedBottomButton";
import Spacing from "./shared/Spacing";
import Flex from "./shared/Flex";
import validator from "validator";
import { useRouter } from "next/navigation";
import { postRegister } from "@/remote/auth";

export type Provider = "GOOGLE" | "KAKAO" | "APPLE";

export default function UploadProfileForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<UploadType>({
    email: "",
    name: "",
    accountId: "",
    profileImageUrl: null,
    provider: "GOOGLE",
  });

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "accountId" && e.target.value.length > 40) {
      return;
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const isValidate = Object.keys(errors).length === 0;
  const user_info: lighty.LoginFailResponse = JSON.parse(
    sessionStorage.getItem("oauth_data") as string
  );
  console.log(user_info);
  return (
    <Flex direction="column">
      <div className="mx-auto w-[84px] py-[12px]">
        <AddPhoto
          imageUrl={formValues.profileImageUrl}
          setImageUrl={setFormValues}
        />
      </div>
      <Spacing size={16} />
      <Input
        name={"name"}
        label="이름"
        placeholder="이름을 입력해주세요."
        onChange={handleFormValues}
        value={user_info.name}
        helpMessage={errors.name}
      />
      <Spacing size={30} />
      <Input
        name={"accountId"}
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
        label="라이티 시작하기"
        disabled={
          isValidate === false ||
          formValues.profileImageUrl == null ||
          formValues.accountId.length < 5 ||
          formValues.name == null
        }
        onClick={() => {
          postRegister({
            ...formValues,
            name: user_info.name,
            email: user_info.email,
            provider: user_info.provider as Provider,
          });
        }}
      />
    </Flex>
  );
}

function validate(formValues: UploadType) {
  const errors: Partial<{
    email: string;
    name: string;
    accountId: string;
    profileImageUrl: string | null;
    provider: Provider;
  }> = {};

  if (
    !validator.isEmpty(formValues.accountId) &&
    !validator.isLowercase(formValues.accountId)
  ) {
    errors.accountId = "소문자만 입력 가능합니다.";
    if (
      !validator.isAlpha(formValues.accountId) &&
      /[^\w\s_]/.test(formValues.accountId)
    ) {
      errors.accountId = "영문을 필수로 입력해주세요";
    }
  }
  if (
    (!validator.isEmpty(formValues.accountId) &&
      /[^\w\s_]/.test(formValues.accountId)) ||
    formValues.accountId.includes(" ")
  ) {
    errors.accountId = "올바르지 않은 형식입니다.";
  }

  return errors;
}
