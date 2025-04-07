"use client";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import { User } from "lighty-type";
import Flex from "@/components/shared/Flex";
import dynamic from "next/dynamic";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import MODAL_CONFIGS from "@/constants/modal-configs";
import FeedCard from "@/components/feeds/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/components/feeds/InfoBar";
import OptionsSelectIcon from "@/components/shared/Icon/OptionsSelectIcon";
import FeedDropdownMenu from "@/components/shared/DropDownMenu/FeedDropDownMenu";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import { MENU_CONFIGS } from "@/constants/menu-configs";
import { useDropdown, useFriendsBox } from "@/hooks/useDropdown";
import { selectedFeedIdAtom } from "@/atoms/feed";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(() => import("@/components/shared/Modal/Report/Report"));

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function FeedDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
  const [report, setReport] = useRecoilState(reportInfoAtom);
  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  return (
    <Flex direction="column" className="w-full min-h-dvh">
      <HeaderWithBtn headerLabel="피드 상세" fontColor="black" />
      <div className={styles.feedWrapper}>
        {/**바로 아래의 pb를 높일수록 스크롤에 빨리 반응 */}
        <div className="pt-safe-top pb-14">
          <div
            className="mb-8"
            onClick={(e) => {
              closeDropdown(e);
              closeBox();
            }}
            onMouseDown={(e) => {
              closeDropdown(e);
              closeBox();
            }}
          >
            <div key={feed.id} className="relative">
              <FeedCard feed={feed} onClick={() => onFeedSelect(feed.id)}>
                <InfoBar
                  ref={fBtnRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBox(feed.id);
                  }}
                  withMembers={feed.withMembers}
                  feed={feed}
                />
                <div className="absolute top-11 right-14" ref={friendsRef}>
                  {openedBoxId === feed.id && (
                    <FriendsInfoContainer
                      withMembers={feed.withMembers}
                      isOpen={openedBoxId === feed.id}
                    />
                  )}
                </div>
              </FeedCard>
              <div
                style={{ width: 24, height: 24 }}
                className="absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1"
              >
                <div
                  ref={btnRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(feed.id);
                    setSelectedFeedId(feed.id);
                  }}
                >
                  <OptionsSelectIcon />
                </div>
                {openedDropdownId === feed.id && (
                  <FeedDropdownMenu
                    feed={feed}
                    ref={dropDownRef}
                    menuItems={
                      MENU_CONFIGS[
                        userInfo === false
                          ? "hidden"
                          : feed.writer.accountId === userInfo?.accountId ||
                            isMine
                          ? "feed_mine"
                          : "feed"
                      ].menuItems
                    }
                    className={
                      MENU_CONFIGS[
                        userInfo === false
                          ? "hidden"
                          : feed.writer.accountId === userInfo?.accountId ||
                            isMine
                          ? "feed_mine"
                          : "feed"
                      ].className
                    }
                  />
                )}
              </div>
            </div>
            {isFetching && <DotSpinnerSmall />}
          </div>
        </div>
      </div>
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          //   action={modalAction}
          onClose={closeModal}
        />
      )}
      {reportModal.isOpen && (
        <Report
          type={reportModal.type}
          report={report}
          setReport={setReport}
          handleReport={() => {
            setReportModal((prev) => ({ ...prev, isOpen: false }));
          }}
          onClose={() => setReportModal((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </Flex>
  );
}

const styles = {
  feedWrapper: "h-full overflow-y-scroll no-scrollbar pt-[90px] pb-14",
};
