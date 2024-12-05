import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import AddPhoto from "./shared/AddPhoto";
import Input from "./shared/inputs/Input";
import FixedBottomButton from "./shared/buttons/FixedBottomButton";
import Spacing from "./shared/Spacing";
import Flex from "./shared/Flex";
import { FormValues } from "@/models/new";
import validator from "validator";

export default function UploadProfileForm() {
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
        <AddPhoto />
      </div>
      <Spacing size={16} />
      <Input
        name={"name"}
        label="이름"
        placeholder="이름을 입력해주세요"
        onChange={handleFormValues}
        value={formValues.name}
        helpMessage={errors.name}
      />
      <Spacing size={30} />
      <Input
        name={"lightyId"}
        label="프로필 계정 아이디"
        placeholder="프로필 계정 아이디를 입력해주세요"
        onChange={handleFormValues}
        value={formValues.lightyId}
        helpMessage={errors.lightyId}
      />
      <Spacing size={6} />
      <span className="text-C2 text-grayscale-500">
        *영문 소문자, 숫자, 특수기호 (_)만 입력 가능
      </span>
      <FixedBottomButton
        color="#D8D8D8"
        label="라이티 시작하기"
        className="bg-grayscale-200"
        disabled={isValidate === false}
        onClick={() => {}}
      />
    </Flex>
  );
}

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {};

  if (
    !validator.isEmpty(formValues.lightyId) &&
    validator.isUppercase(formValues.lightyId)
  ) {
    errors.lightyId = "소문자만 입력 가능합니다.";
    if (!validator.isAlpha(formValues.lightyId)) {
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
