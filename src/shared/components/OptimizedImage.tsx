"use client";

import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
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
  className = "",
  loading = "lazy",
  style,
  onLoad,
}: OptimizedImageProps) {
  const resolvedSrc = src || "/placeholder.png";
  // blob:/data: URL은 서버에서 접근할 수 없어 next/image 최적화 파이프라인을 탈 수 없음
  const isLocalObjectUrl =
    resolvedSrc.startsWith("blob:") || resolvedSrc.startsWith("data:");

  return (
    <Image
      style={style}
      priority={loading === "eager"}
      width={width}
      height={height}
      quality={quality}
      unoptimized={isLocalObjectUrl}
      src={resolvedSrc}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.png";
      }}
    />
  );
}
