import AddPhoto from "../shared/AddPhoto";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function UserProfile() {
  const name = "이찬영";
  const userId = "antinitony";
  return (
    <Flex
      align="center"
      direction="column"
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "12px",
      }}
    >
      <AddPhoto />
      <Spacing size={8} />
      <Flex direction="column" align="center">
        <span className="text-T3 leading-[23px]">{userId}</span>
        <Spacing size={4} />
        <span className="text-B4 text-grayscale-400">{name}</span>
      </Flex>
    </Flex>
  );
}
