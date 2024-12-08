import Flex from "../Flex";
import Options from "../icons/Options";
import Spacing from "../Spacing";

export default function CommentItem() {
  const 댓글슨이가나인가 = false;
  return (
    <Flex
      align="center"
      style={{
        padding: "12px",
        border: "1px solid #E9E9E9",
        borderRadius: "16px",
        width: "fit-content",
      }}
    >
      <span className="text-T6 flex-none">최은재</span>
      <Spacing direction="horizontal" size={8} />
      <span className="text-B4">
        우리는 간맥을 좋아하지? 내일 잠실역의 카페에서 팀플을 할거니까 1시까지
        가야하구 그전에 점심을 먹고 운동두하구
        이겆서저넘닝라ㅓㅁㄴㅇ리ㅏㅁ너이란얼ㅇ널ㄹㅇㄹ어ㅓㅇ
      </span>
      <Spacing direction="horizontal" size={8} />
      <span className="text-C5 text-grayscale-300 flex-none">00분전</span>
      {댓글슨이가나인가 && (
        <>
          <Spacing direction="horizontal" size={8} />
          <Options width="12" height="12" />
        </>
      )}
    </Flex>
  );
}
