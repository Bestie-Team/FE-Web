import { RegisterRequestType } from "@/components/shared/AddPhoto";
import { Provider } from "@/components/SignupForm";
import validator from "validator";

const validateForm = (formValues: RegisterRequestType) => {
  const errors: Partial<{
    email: string;
    name: string;
    accountId: string;
    profileImageUrl: string | null;
    provider: Provider;
  }> = {};

  if (!validator.isEmpty(formValues.accountId)) {
    if (formValues.accountId.length <= 3) {
      errors.accountId = "아이디는 4글자 이상 입력해주세요.";
    }
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

export default validateForm;
