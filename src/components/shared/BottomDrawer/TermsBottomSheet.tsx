import React, {
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Button from "../Button/Button";
import CheckInCircleIcon from "../Icon/CheckInCircleIcon";
import NArrowRightIcon from "../Icon/NArrowRightIcon";
import { 약관목록 } from "../../../constants/terms";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import { contentsOfTerms } from "@/constants/termsContent";

export default function TermsBottomSheet({
  onClose,
  open = true,
  handleSignup,
  termsAgreements,
  setTermsAgreements,
}: {
  onClose: () => void;
  open?: boolean;
  handleSignup: () => void;
  termsAgreements: Record<string, boolean>;
  setTermsAgreements: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
  const [rotated, setRotated] = useState<Record<string, boolean>>({
    "01": false,
    "02": false,
    "03": false,
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

  const onClickTermsHandler = useCallback(() => {
    console.log("약관 클릭");
  }, []);

  return (
    <BottomSheetWrapper onClose={onClose} open={open}>
      <Flex direction="column" className="p-6 pt-2 pb-8">
        <Flex direction="column" className="text-T3">
          <span>서비스 이용을 위해</span>
          <Spacing size={7} />
          <span>약관 동의를 진행해 주세요</span>
          <Spacing size={24} />
          <div
            onClick={(e) => handleAllCheck(e, !isAllChecked)}
            className={
              "text-B3 p-4 rounded-full border flex items-center border-[#D8D8D8]"
            }
          >
            <CheckInCircleIcon width="20" height="20" checked={isAllChecked} />
            <Spacing direction="horizontal" size={12} />
            <span>전체 동의</span>
          </div>
          <Spacing size={24} />
          {약관목록.map(({ title, id }, idx) => {
            return (
              <Fragment key={id}>
                <li className={styles.list} onClick={onClickTermsHandler}>
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
                  <NArrowRightIcon
                    checked={termsAgreements[id]}
                    onClick={() =>
                      setRotated((prev) => ({
                        ...prev,
                        [id]: !prev[id],
                      }))
                    }
                    rotate={rotated[id]}
                  />
                </li>
                {id === "01" && rotated[id] && contentsOfTerms[idx].contents}
                {id === "02" && rotated[id] && contentsOfTerms[idx].contents}
                {id === "03" && rotated[id] && contentsOfTerms[idx].contents}
                {idx < 약관목록.length - 1 ? <Spacing size={20} /> : null}
              </Fragment>
            );
          })}
        </Flex>
      </Flex>
      <div className={styles.buttonWrapper}>
        <Button
          color="#0a0a0a"
          className={styles.button}
          onClick={handleSignup}
          disabled={
            termsAgreements["01"] === false || termsAgreements["02"] === false
          }
        >
          라이티 시작하기
        </Button>
      </div>
    </BottomSheetWrapper>
  );
}
const styles = {
  button:
    "rounded-full text-[14px] font-[600] py-[18px] w-full text-base-white",
  buttonWrapper: "pt-3 pb-[10px] px-5",
  list: "text-B3 flex items-center px-3 cursor-pointer",
};
