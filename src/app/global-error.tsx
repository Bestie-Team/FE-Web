"use client";

import Flex from "@/components/shared/Flex";
import AlarmIcon from "@/components/shared/Icon/AlarmIcon";
import Spacing from "@/components/shared/Spacing";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <Flex className="h-dvh" justify="center" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            className="bg-grayscale-300"
            onClick={() => reset()}
          >
            <div className="p-2">
              <AlarmIcon color="#AEAEAE" />
            </div>
            <Spacing size={12} />
            <Flex
              direction="column"
              justify="center"
              align="center"
              className="p-2 gap-4 cursor-pointer"
            >
              <span className="text-T3">오류가 발생했어요.</span>
              <span className="text-grayscale-600 text-B2">
                잠시 후 다시 시도해주세요.
              </span>
            </Flex>
          </Flex>
        </Flex>
      </body>
    </html>
  );
}
