import Flex from "../shared/Flex";
import { SetterOrUpdater } from "recoil";
import SelectableGroupItem from "./SelectableGroupItem";
import * as lighty from "lighty-type";
import { useEffect, useState } from "react";
import useGroup from "./hooks/useGroups";

export default function AddGroupSlider({
  gatheringInfo,
  setGatheringInfo,
}: {
  gatheringInfo: lighty.CreateGatheringRequest;
  setGatheringInfo: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const dateCursor = new Date().toISOString();
  const [groupCursor, setGroupCursor] = useState<string | null>(dateCursor);
  const [groups, setGroups] = useState<lighty.Group[]>([]);
  const { data: group_data } = useGroup({ cursor: groupCursor, limit: 100 });

  useEffect(() => {
    if (group_data) {
      console.log(group_data);
    }
    if (!group_data?.groups) return;
    setGroups((prevGroups) => [
      ...prevGroups,
      ...group_data.groups.filter(
        (newGroup) => !prevGroups.some((group) => group.id === newGroup.id)
      ),
    ]);
    if (group_data.nextCursor != null) {
      setGroupCursor(group_data?.nextCursor);
    }
  }, [group_data?.groups]);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        {groups
          ? groups.map((group, i) => (
              <SelectableGroupItem
                key={`groupItem${i}`}
                groupInfo={group}
                onClickGroup={() => {
                  if (gatheringInfo.groupId === group.id) {
                    setGatheringInfo((prev) => ({ ...prev, groupId: null }));
                    return;
                  }
                  setGatheringInfo((prev) => ({ ...prev, groupId: group.id }));
                }}
                clicked={gatheringInfo.groupId === group.id}
              />
            ))
          : null}
      </Flex>
    </div>
  );
}
