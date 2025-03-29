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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    // 이미 최적화 API URL인 경우 그대로 사용
    if (src.startsWith("/api/resize") || src.startsWith("/api/optimize")) {
      setImageSrc(src);
      return;
    }

    // 외부 URL인 경우 최적화 API를 통해 처리
    const optimizedSrc = `/api/resize?url=${encodeURIComponent(
      src
    )}&width=${width}&height=${height}&quality=${quality}&effort=${effort}`;
    setImageSrc(optimizedSrc);
  }, [src, width, height, quality, effort]);

  if (error) {
    return (
      <img
        style={style}
        loading={loading}
        width={width}
        height={height}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={className}
        onError={() => setError("이미지 로딩 실패")}
        onLoad={onLoad}
      />
    );
  }

  return (
    <>
      {imageSrc && (
        <img
          style={style}
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
