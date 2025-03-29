"use client";

import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  effort?: number;
  className?: string;
  style?: object;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  quality = 80,
  effort = 4,
  className = "",
  loading,
  style,
  onLoad,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    // 이미 최적화 API URL인 경우 그대로 사용
    if (src.startsWith("/api/resize") || src.startsWith("/api/optimize")) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }

    // 외부 URL인 경우 최적화 API를 통해 처리
    const optimizedSrc = `/api/resize?url=${encodeURIComponent(
      src
    )}&width=${width}&height=${height}&quality=${quality}&effort=${effort}`;
    setImageSrc(optimizedSrc);
    setIsLoading(false);
  }, [src, width, height, quality, effort]);

  if (error) {
    return (
      <div className="text-red-500">이미지를 불러올 수 없습니다: {error}</div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className="flex items-center justify-center bg-gray-100 rounded-md"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: "100%",
          }}
        >
          <div className="animate-spin h-8 w-8 border-4 border-primary border-r-transparent rounded-full"></div>
        </div>
      )}
      {imageSrc && (
        <img
          style={{ ...style, display: isLoading ? "none" : "block" }}
          loading={loading}
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          className={className}
          onError={() => setError("이미지 로딩 실패")}
          onLoad={onLoad}
        />
      )}
    </>
  );
}
