import Flex from "../Flex";

export default function CommentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      direction="column"
      className="p-[20px] pt-[16px] h-[272px] overflow-scroll"
    >
      {children}
    </Flex>
  );
}
