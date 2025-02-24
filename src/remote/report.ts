import { API_CONFIG, fetchWithAuth } from "./shared";
import { ReportRequestInterface } from "@/models/remote";

/** 신고 생성 */
/**신고 타입에 맞는 데이터의 id. 회원 신고: userId, 그룹 신고: groupId, 피드 신고: feedId */
export async function postReport({
  report,
}: {
  report: ReportRequestInterface;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/reports`;

  try {
    await fetchWithAuth(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(report),
    });
    return { message: "신고를 완료하였습니다." };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
