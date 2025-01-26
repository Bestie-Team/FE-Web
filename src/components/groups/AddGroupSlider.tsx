import Flex from "../shared/Flex";
import { SetterOrUpdater } from "recoil";
import SelectableGroupItem from "./SelectableGroupItem";
import * as lighty from "lighty-type";
import useGroup from "./hooks/useGroups";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function AddGroupSlider({
  gatheringInfo,
  setGatheringInfo,
}: {
  gatheringInfo: lighty.CreateGatheringRequest;
  setGatheringInfo: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const { data: group_data, isFetching } = useGroup();
  if (!group_data) return;
  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        {isFetching ? (
          <DotSpinnerSmall />
        ) : (
          group_data.map((group, i) => (
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
        )}
      </Flex>
    </div>
  );
}
