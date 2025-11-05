import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트로 빌드 (GitHub Pages용)
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화를 지원하지 않음
  },
  // GitHub Pages basePath 설정
  basePath: "/Presently", // Repository 이름: Presently
};

export default nextConfig;
