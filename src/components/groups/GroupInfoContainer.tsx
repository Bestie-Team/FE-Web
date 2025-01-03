import { GroupInfoResponse } from "@/models/group";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

interface Props {
  group: GroupInfoResponse;
}

export default function GroupInfoContainer({ group }: Props) {
  const { groupName, description } = group;

  return (
    <Flex className={styles.container}>
      <Flex align="center">
        <span className="text-T1">{groupName}</span>
        <Spacing size={6} direction="horizontal" />
        <span className={styles.descWrapper}>{description}</span>
      </Flex>
    </Flex>
  );
}

const styles = {
  container: "w-full py-[20px] px-[24px] bg-base-white",

  descWrapper: "text-T4 text-grayscale-300",
};
