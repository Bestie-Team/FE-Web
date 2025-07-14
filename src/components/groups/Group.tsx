import GrouopItem from "@/components/groups/GroupItem";
import useGroup from "@/components/groups/hooks/useGroups";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRouter } from "next/navigation";
import { Group } from "lighty-type";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import Link from "next/link";
import GroupSkeleton from "../shared/Skeleton/GroupSkeleton";
import GroupListSkeleton from "../shared/Skeleton/GroupListSkeleton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollRestorationOfRef } from "@/hooks/useScrollRestorationOfRef";
import { useIntersectionLoadMore } from "../feeds/hooks/useIntersectionLoadMore";
import { useInView } from "react-intersection-observer";
import LoadMoreTrigger from "../shared/LoadMoreTrigger";

const GroupList = ({
  groups,
  onItemClick,
}: {
  groups: Group[];
  onItemClick: (groupId: string) => void;
}) => {
  return (
    <ul className="flex flex-col gap-4 pb-20">
      {groups.map((group) => (
        <GrouopItem
          key={`${group.id}`}
          group={group}
          className="cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLLIElement>) => {
            e.preventDefault();
            onItemClick(group.id);
          }}
        />
      ))}
    </ul>
  );
};

export default function Groups() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const { data: detail } = useUserDetail();
  const { data: groups, isFetching, loadMore } = useGroup({ limit: 6 });

  const { restoreScrollPosition } = useScrollRestorationOfRef(
    "social-scroll-tab",
    scrollContainerRef
  );

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    root: rootElement ?? undefined,
  });

  useIntersectionLoadMore({ inView, loadMore });

  useEffect(() => {
    if (scrollContainerRef.current) setRootElement(scrollContainerRef.current);
  }, []);

  useLayoutEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  const handleItemClick = (groupId: string) => {
    router.push(`/groups/detail?id=${groupId}`);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="h-[calc(100dvh-144px)] px-5 text-T4 mt-3 overflow-y-scroll no-scrollbar"
    >
      <Flex align="center">
        <span>전체 그룹</span>
        <Spacing size={4} direction="horizontal" />
        <span className="flex-grow">{detail?.groupCount}</span>
        <Spacing size={4} direction="horizontal" />
        <Link href="/groups/new" className={styles.button}>
          그룹 추가
        </Link>
      </Flex>
      <Spacing size={16} />

      {groups && <GroupList groups={groups} onItemClick={handleItemClick} />}

      {isFetching && <GroupListSkeleton />}
      {inView && <GroupSkeleton />}

      <LoadMoreTrigger loadMoreRef={loadMoreRef} />
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "bg-grayscale-50 py-2 px-3 bg-base-white text-T6 rounded-lg transition-transform cursor-pointer active:bg-grayscale-100",
};
