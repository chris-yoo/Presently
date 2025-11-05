import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트로 빌드 (GitHub Pages용)
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화를 지원하지 않음
  },
  // GitHub Pages의 경우 basePath를 설정해야 할 수 있습니다
  // 예: basePath: '/Presently' (repository 이름이 Presently인 경우)
  // 기본값은 빈 문자열 (루트 도메인용)
};

export default nextConfig;
