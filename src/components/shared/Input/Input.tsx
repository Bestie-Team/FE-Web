import clsx from "clsx";
import React, { useState } from "react";
import Text from "../Text";
import Spacing from "../Spacing";
import Flex from "../Flex";
import ToastError from "../Icon/ToastError";
import ToastSuccess from "../Icon/ToastSuccess";

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  helpMessage?: React.ReactNode;
  placeholder?: string;
  name?: string;
  displayLength?: number;
  minLength?: number;
  idNotAvailable?: boolean;
}

export default function Input({
  name,
  value,
  label,
  helpMessage,
  displayLength,
  minLength,
  idNotAvailable,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = displayLength;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const idCheck = () => {
    if (idNotAvailable) {
      return <ToastError />;
    }
    if (name == "accountId" && value) {
      return !helpMessage && value?.length >= 4 ? (
        <ToastSuccess />
      ) : (
        <ToastError />
      );
    }
  };
  return (
    <Flex direction="column">
      {label && (
        <>
          <Flex align="center" className="text-T5">
            {label}
          </Flex>
          <Spacing size={8} />
        </>
      )}
      <div
        className={clsx(
          styles.inputWrapper,
          isFocused ? "border-grayscale-700" : "border-grayscale-10",
          idNotAvailable
            ? "border-point-red50 border-[1.4px]"
            : "border-grayscale-10"
        )}
      >
        <input
          name={name}
          type="text"
          inputMode="text"
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          {...props}
        />
        {displayLength && (
          <span>
            <span className="text-grayscale-900 text-B4">{`${
              value?.length || 0
            }`}</span>
            <span className="text-grayscale-300 text-B4">{`/${displayLength}`}</span>
          </span>
        )}
        {idCheck()}
      </div>
      {helpMessage ? (
        <Text className={styles.helpMessage}>{helpMessage}</Text>
      ) : null}
    </Flex>
  );
}

const height = `h-[50px]`;
const styles = {
  inputWrapper: `w-full ${height} px-5 rounded-[40px] flex items-center gap-2 justify-between bg-grayscale-10 border transition-all duration-300`,
  input:
    "flex-grow bg-transparent outline-none text-base font-[500] leading-[22.86px] tracking-[-0.48px] bg-grayscale-10 transform origin-left scale-[0.875]",
  helpMessage: "pl-2 text-C2 text-[#FA6767] inline-block mt-[6px]",
};
