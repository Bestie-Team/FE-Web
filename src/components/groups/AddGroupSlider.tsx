import Flex from "../shared/Flex";
import { useRecoilState } from "recoil";
import { selectedGroupAtom } from "@/atoms/gathering";
import SelectableGroupItem from "./SelectableGroupItem";
import { GROUPS } from "@/constants/groups";

export default function AddGroupSlider() {
  const [selectedGroupId, setSelectedGroupId] = useRecoilState<string | null>(
    selectedGroupAtom
  );

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        {GROUPS.map((group, i) => (
          <SelectableGroupItem
            key={`groupItem${i}`}
            groupInfo={group}
            onClickGroup={() => {
              if (selectedGroupId === group.id) {
                setSelectedGroupId(null);
                return;
              }
              setSelectedGroupId(group.id);
            }}
            clicked={selectedGroupId === group.id}
          />
        ))}
      </Flex>
    </div>
  );
}
