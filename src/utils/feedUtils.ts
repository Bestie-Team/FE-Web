import { QueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";

// 여러 쿼리를 invalidate
export async function invalidateQueries(queryClient: QueryClient, keys: any[]) {
  await Promise.all(
    keys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
  );
}

export async function handleRefresh(queryClient: QueryClient, key: string) {
  try {
    await invalidateQueries(queryClient, [key]);
    return true;
  } catch (error) {
    console.error("Refresh failed:", error);
    lightyToast.error("새로고침에 실패했어요");
    return false;
  }
}

export function successToast(message: string) {
  lightyToast.success(message);
}

export function errorToast(message: string) {
  lightyToast.error(message);
}
