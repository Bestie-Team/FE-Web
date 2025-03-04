"use client";
import GatheringBannerContainer from "@/components/gathering/GatheringBannerContainer";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import Flex from "@/components/shared/Flex";
import CalendarIcon from "@/components/shared/Icon/CalendarIcon";
import MapPinIcon from "@/components/shared/Icon/MapPinIcon";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Spacing from "@/components/shared/Spacing";
import Image from "next/image";
import getHeader from "@/utils/getHeader";
import { formatToKoreanTime } from "@/utils/makeUTC";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import { useEffect, useMemo, useState } from "react";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import { MAP } from "@/constants/images";
import Options, { MENU_TYPES } from "@/components/shared/Options";
import handleShare from "@/utils/handleShare";
import ShareIcon from "@/components/shared/Icon/ShareIcon";
import { useRecoilState } from "recoil";
import { gatheringDeleteModalAtom } from "@/atoms/modal";
import Modal from "@/components/shared/Modal/Modal";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import LeaderContainer from "@/components/shared/LeaderContainer";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import FeedIcon from "@/components/shared/Icon/FeedIcon";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const header = useMemo(() => getHeader("/gathering/1234"), []);
  const { userInfo } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    gatheringDeleteModalAtom
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const gatheringId = params.id;
  const {
    data: selectedGathering,
    isPending,
    isError,
  } = useGatheringDetail({
    gatheringId,
    enabled: !!gatheringId,
  });

  const { mutate: deleteGathering } = useDeleteGathering({
    gatheringId,
    onSuccess: (data) => {
      lightyToast.success(data.message);
      router.replace("/gathering");
    },
    onError: (error) => lightyToast.error(error.message),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isPending) return <DotSpinner />;

  if (isError || !selectedGathering) {
    return <div>약속을 찾을 수 없습니다.</div>;
  }
  const { gatheringDate, members, hostUser, address, description } =
    selectedGathering;

  const convertedDate = formatToKoreanTime(gatheringDate);
  const isEnded = new Date(gatheringDate).getTime() < new Date().getTime();

  return (
    <Flex direction="column" className="relative w-full h-full bg-grayscale-50">
      {header}
      <GatheringBannerContainer
        gathering={selectedGathering}
        setImageLoaded={setImageLoaded}
      />
      <div className="absolute top-4 right-5 flex gap-[14px] z-50">
        <div className="cursor-pointer" onMouseDown={handleShare}>
          <ShareIcon />
        </div>
        {userInfo?.accountId === hostUser.accountId && (
          <Options
            type={isEnded ? MENU_TYPES.ENDEDGATHERING : MENU_TYPES.GATHERING}
            gathering={selectedGathering}
            color="white"
          />
        )}
      </div>
      <LeaderContainer leader={hostUser} />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<FeedIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 설명</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>약속 장소</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{address}</span>
            <Spacing size={8} direction="horizontal" />
            <Image
              className="rounded-[10.8px] w-9 h-9 object-cover"
              alt="mapIcon"
              width={36}
              height={36}
              src={MAP}
            />
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 시간</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{convertedDate.slice(0, 10)}</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">
              {convertedDate.slice(10)}
            </span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`약속 멤버 ${members.length}`}</span>
        }
        content={<GatheringMembersSlider members={members} />}
      />
      {imageLoaded === false ? <DotSpinner /> : null}
      {deleteModalOpen && (
        <Modal
          title="약속을 삭제하시겠어요?"
          content="약속 관련 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteGathering()}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </Flex>
  );
}

const styles = {
  header: "max-w-[430px] z-10 fixed w-full",

  title: "font-[700] text-[16px] leading-[20.8px]",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-[12px] text-B3",
};
