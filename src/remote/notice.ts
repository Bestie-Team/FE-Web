import { API_CONFIG, fetchWithAuth } from "./shared";
import { ReportRequestInterface } from "@/models/remote";

/** 신고 생성 */
export async function postReport({
  report,
}: {
  report: ReportRequestInterface;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/reports/${report.type}`;

  try {
    await fetchWithAuth(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(report),
    });
    return { message: "신고를 완료하였습니다." };
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("신고 실패");
    }
    throw new Error("신고 실패");
  }
}
