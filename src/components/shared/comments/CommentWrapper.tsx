import Flex from "../Flex";

export default function CommentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      direction="column"
      style={{
        padding: "20px",
        paddingTop: "16px",
        height: "272px",
        overflow: "scroll",
      }}
    >
      {children}
    </Flex>
  );
}
