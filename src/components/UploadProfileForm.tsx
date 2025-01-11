"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import AddPhoto from "./shared/AddPhoto";
import Input from "./shared/inputs/Input";
import FixedBottomButton from "./shared/buttons/FixedBottomButton";
import Spacing from "./shared/Spacing";
import Flex from "./shared/Flex";
import { FormValues } from "@/models/new";
import validator from "validator";
import { useRouter } from "next/navigation";

export default function UploadProfileForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    lightyId: "",
    image: null,
  });

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "lightyId" && e.target.value.length > 40) {
      return;
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const isValidate = Object.keys(errors).length === 0;

  return (
    <Flex direction="column">
      <div className="mx-auto w-[84px] py-[12px]">
        <AddPhoto imageUrl={formValues.image} setImageUrl={setFormValues} />
      </div>
      <Spacing size={16} />
      <Input
        name={"name"}
        label="이름"
        placeholder="이름을 입력해주세요."
        onChange={handleFormValues}
        value={formValues.name}
        helpMessage={errors.name}
      />
      <Spacing size={30} />
      <Input
        name={"lightyId"}
        label="계정 아이디"
        placeholder="영문 소문자, 숫자, 특수기호 (_)만 입력 가능"
        onChange={handleFormValues}
        displayLength={15}
        value={formValues.lightyId}
        helpMessage={errors.lightyId}
      />
      <Spacing size={6} />
      <span className="text-C2 text-grayscale-500">
        *계정 아이디는 프로필에 노출되며, 친구 추가 시 활용돼요!
      </span>
      <FixedBottomButton
        label="라이티 시작하기"
        disabled={
          isValidate === false ||
          formValues.image == null ||
          formValues.lightyId.length < 5 ||
          formValues.name == null
        }
        onClick={() => {
          router.push("/");
        }}
      />
    </Flex>
  );
}

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {};

  if (
    !validator.isEmpty(formValues.lightyId) &&
    !validator.isLowercase(formValues.lightyId)
  ) {
    errors.lightyId = "소문자만 입력 가능합니다.";
    if (
      !validator.isAlpha(formValues.lightyId) &&
      /[^\w\s_]/.test(formValues.lightyId)
    ) {
      errors.lightyId = "영문을 필수로 입력해주세요";
    }
  }
  if (
    (!validator.isEmpty(formValues.lightyId) &&
      /[^\w\s_]/.test(formValues.lightyId)) ||
    formValues.lightyId.includes(" ")
  ) {
    errors.lightyId = "올바르지 않은 형식입니다.";
  }

  return errors;
}
