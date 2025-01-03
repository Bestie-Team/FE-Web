import React, { MouseEvent, useCallback, useState } from "react";
import BottomSheetWrapper from "./BottomSheetWrapper";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Button from "../buttons/Button";
import CheckInCircleIcon from "../icons/CheckInCircleIcon";
import NArrowRightIcon from "../icons/NArrowRightIcon";
import { 약관목록 } from "../../../constants/terms";

export default function TermsBottomSheet({
  onClose,
  open = true,
}: {
  onClose: () => void;
  open?: boolean;
}) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({ ...prev, [term.id]: false }),
      {}
    );
  });

  const isAllChecked = Object.values(termsAgreements).every(
    (isChecked) => isChecked
  );

  const handleAllCheck = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({ ...prev, [key]: checked }),
          {}
        );
      });
    },
    []
  );

  return (
    <BottomSheetWrapper onClose={onClose} open={open}>
      <Flex direction="column" className="p-[24px] pt-[8px] pb-[32px]">
        <Flex direction="column" className="text-T3">
          <span>서비스 이용을 위해</span>
          <Spacing size={7} />
          <span>약관 동의를 진행해 주세요</span>
          <Spacing size={24} />
          <div
            onClick={(e) => handleAllCheck(e, !isAllChecked)}
            className={
              "text-B3 p-[16px] rounded-full border flex items-center border-[#D8D8D8]"
            }
          >
            <CheckInCircleIcon width="20" height="20" checked={isAllChecked} />
            <Spacing direction="horizontal" size={12} />
            <span>전체 동의</span>
          </div>
          <Spacing size={24} />
          {약관목록.map(({ title, id }, idx) => {
            return (
              <>
                <li key={id} className={styles.list}>
                  <CheckInCircleIcon
                    width="20"
                    height="20"
                    checked={termsAgreements[id]}
                    onClick={() => {
                      setTermsAgreements((prevTerms) => ({
                        ...prevTerms,
                        [id]: !termsAgreements[id],
                      }));
                    }}
                  />
                  <Spacing direction="horizontal" size={12} />
                  <span className="flex-grow">{title}</span>
                  <NArrowRightIcon checked={termsAgreements[id]} />
                </li>
                {idx < 약관목록.length - 1 ? <Spacing size={20} /> : null}
              </>
            );
          })}
        </Flex>
      </Flex>
      <div className={styles.buttonWrapper}>
        <Button className={styles.button}>라이티 시작하기</Button>
      </div>
    </BottomSheetWrapper>
  );
}
const styles = {
  button:
    "rounded-full text-[14px] font-[600] py-[18px] bg-[#D8D8D8] w-full text-base-white",
  buttonWrapper: "pt-[12px] pb-[10px] px-[20px]",
  list: "text-B3 flex items-center px-[12px] cursor-pointer",
};
