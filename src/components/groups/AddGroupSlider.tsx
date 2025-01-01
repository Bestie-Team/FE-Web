import Flex from "../shared/Flex";
import { useRecoilState } from "recoil";
import { GroupInfoResponse } from "@/models/group";
import { selectedGroupAtom } from "@/atoms/gathering";
import SelectableGroupItem from "./SelectableGroupItem";
import { GROUPS } from "@/constants/groups";

export default function AddGroupSlider({}: {}) {
  const [selectedGroup, setSelectedGroup] =
    useRecoilState<GroupInfoResponse | null>(selectedGroupAtom);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        {GROUPS.map((group, i) => (
          <SelectableGroupItem
            key={`groupItem${i}`}
            groupInfo={group}
            onClickGroup={() => {
              if (selectedGroup?.id === group.id) {
                setSelectedGroup(null);
                return;
              }
              setSelectedGroup(group);
            }}
            clicked={selectedGroup?.id === group.id}
          />
        ))}
      </Flex>
    </div>
  );
}
