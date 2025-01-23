import AddPhoto from "../shared/AddPhoto";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function UserProfile({
  userProfileImage,
  userAccountId,
  userName,
}: {
  userProfileImage?: string;
  userAccountId?: string;
  userName?: string;
}) {
  const accountId = "antinitony";

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
      <AddPhoto imageUrl={userProfileImage} />
      <Spacing size={8} />
      <Flex direction="column" align="center">
        <span className="text-T3 leading-[23px]">
          {userAccountId ? userAccountId : accountId}
        </span>
        <Spacing size={4} />
        <span className="text-B4 text-grayscale-400">{userName}</span>
      </Flex>
    </Flex>
  );
}
