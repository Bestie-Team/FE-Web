import { formatDistanceToNow, format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(date: Date) {
  console.log(date);
  const createdTime = date;
  const now = new Date().getTime();
  const koreaNow = now + 9 * 60 * 60 * 1000;
  const diff = (koreaNow - createdTime.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return `${formatDistanceToNow(createdTime, {
      addSuffix: false,
      locale: ko,
    })} 전`;
  }
  return format(createdTime, "PPP EEE p", { locale: ko }); // 날짜 포맷
}
