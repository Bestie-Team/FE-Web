import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFriendAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../shared/Modal/Modal";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useReport from "../report/hooks/useReport";
import { useAuth } from "../shared/providers/AuthProvider";
import Report from "../shared/Modal/Report/Report";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFriends from "./hooks/useFriends";
import Flex from "../shared/Flex";
import Link from "next/link";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import useFriendsRequestTotalCount from "./hooks/useFriendsRequestCount";
import SocialPageSkeleton from "../shared/Skeleton/SocialPageSkeleton";
import MODAL_CONFIGS from "@/constants/modal-configs";

export default function UserFriendsListContainer() {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
  const [report, setReport] = useRecoilState(reportInfoAtom);
  const selectedFriendId = useRecoilValue(selectedFriendAtom);
  const { data: requestCount = { count: 0 }, isFetching: isFetching_c } =
    useFriendsRequestTotalCount();
  const {
    data: friends,
    loadMore,
    isFetching,
  } = useFriends({
    userId: userInfo?.accountId || "",
  });

  const deleteSuccessHandler = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await queryClient.invalidateQueries({
      queryKey: ["friends", userInfo?.accountId],
    });
  };

  const { mutate: deleteFriend } = useDeleteFriend({
    friendId: selectedFriendId,
    onSuccess: deleteSuccessHandler,
  });

  const { mutate: reportFriend } = useReport({
    onSuccess: deleteSuccessHandler,
    onError: (error) => lightyToast.error(error.message),
  });
  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  useInfiniteScroll({ isFetching, loadMore });

  if (!friends) {
    return <SocialPageSkeleton />;
  }

  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        className="px-5 gap-4 mt-3 pb-4"
      >
        <Flex justify="space-between" align="center" className="w-full">
          <span className="text-T4" id="friendList">
            {`친구 ${friends.length}`}
          </span>
          <Link className={styles.button} href="/friends/search">
            친구 추가
          </Link>
        </Flex>
        <Link href="/friends" className={styles.li}>
          <span>
            {`요청`}
            {isFetching_c ? (
              <span className="bg-grayscale-10 w-16 animate-pulse" />
            ) : (
              <span className="text-[#FA6767] ml-1">{`${requestCount.count}`}</span>
            )}
          </span>
          <ArrowRightIcon />
        </Link>
      </Flex>
      <FriendsListContainer friends={friends} isFetching={isFetching} />
      {reportModal.isOpen && (
        <Report
          setReport={setReport}
          report={report}
          onClose={() => setReportModal((prev) => ({ ...prev, isOpen: false }))}
          handleReport={() => {
            reportFriend(report);
            setReportModal((prev) => ({ ...prev, isOpen: false }));
          }}
        />
      )}
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={() => deleteFriend()}
          onClose={closeModal}
        />
      )}
    </>
  );
}
const styles = {
  button:
    "py-2 px-3 bg-grayscale-50 text-T6 rounded-lg cursor-pointer active:bg-grayscale-100 transition duration-75",
  li: "text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center active:bg-grayscale-50 transition duration-75",
};
