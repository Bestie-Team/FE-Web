import React from "react";

export default function BottomButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
const styles = {
  button: `bg-grayscale-900 w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`,
  buttonWrapper: `w-full px-5 pb-5 pt-3 animate-slide-up will-change-transform`,
};
