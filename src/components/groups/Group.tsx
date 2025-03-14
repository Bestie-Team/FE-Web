import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRouter } from "next/navigation";
import { Group } from "lighty-type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import Link from "next/link";
import GroupSkeleton from "../shared/Skeleton/GroupSkeleton";

const GroupList = ({ groups }: { groups: Group[] }) => {
  const router = useRouter();
  return groups.map((group) => (
    <GroupContainer
      key={`${group.id}`}
      group={group}
      className="cursor-pointer"
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        router.push(`/groups/${group.id}`);
      }}
    />
  ));
};

export default function Groups() {
  const { data: detail } = useUserDetail();
  const { data: groups, isFetching, loadMore } = useGroup({ limit: 6 });

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <div className="h-[calc(100dvh-144px)] px-5 text-T4 mt-3">
      <Flex align="center">
        <span>전체 그룹</span>
        <Spacing size={4} direction="horizontal" />
        <span className="flex-grow">{detail?.groupCount}</span>
        <Spacing size={4} direction="horizontal" />
        <Link href={`/groups/new`} className={styles.button}>
          그룹 추가
        </Link>
      </Flex>
      <Spacing size={16} />
      <ul className="flex flex-col gap-4 pb-20">
        {groups && <GroupList groups={groups} />}
        {isFetching && <GroupSkeleton />}
      </ul>
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "bg-grayscale-50 py-2 px-3 bg-base-white text-T6 rounded-lg transition-transform cursor-pointer active:bg-grayscale-100",
};
