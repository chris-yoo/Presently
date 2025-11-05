# GitHub Pages 배포 가이드

이 문서는 Presently 앱을 GitHub Pages로 배포하는 방법을 안내합니다.

## ✅ 사전 준비

1. **Next.js 설정 확인**
   - `next.config.ts`에 `output: 'export'` 설정이 되어 있어야 합니다
   - 이미지 최적화는 비활성화되어 있습니다 (`images.unoptimized: true`)

2. **GitHub Repository 준비**
   - GitHub에 새 repository를 만들거나 기존 repository를 사용합니다
   - Repository 이름에 따라 `basePath` 설정이 필요할 수 있습니다

## 🚀 배포 단계

### 방법 1: GitHub Actions (권장)

1. **코드를 GitHub에 푸시:**
   ```bash
   cd app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **GitHub Pages 설정:**
   - GitHub repository 페이지로 이동
   - Settings → Pages 메뉴 클릭
   - Source에서 "GitHub Actions" 선택
   - 또는 "Deploy from a branch" 선택 후 `gh-pages` 브랜치 선택

3. **자동 배포:**
   - `.github/workflows/deploy.yml` 파일이 이미 설정되어 있습니다
   - `main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다
   - 배포 상태는 Actions 탭에서 확인할 수 있습니다

### 방법 2: 수동 빌드 및 배포

1. **로컬에서 빌드:**
   ```bash
   cd app
   npm install
   npm run build
   ```

2. **out 폴더를 GitHub Pages에 배포:**
   - `out/` 폴더의 내용을 `gh-pages` 브랜치에 푸시합니다
   - 또는 GitHub Pages 설정에서 `out/` 폴더를 배포 소스로 선택합니다

## ⚙️ basePath 설정

### Repository 이름이 `username.github.io`인 경우
- basePath 설정이 필요 없습니다 (기본값: 빈 문자열)
- 사이트는 `https://username.github.io`에서 접근 가능합니다

### Repository 이름이 다른 경우
- `next.config.ts`에서 basePath를 설정해야 합니다:
  ```typescript
  basePath: '/YOUR_REPO_NAME',
  ```
- 사이트는 `https://username.github.io/YOUR_REPO_NAME`에서 접근 가능합니다

## 🔍 문제 해결

### 이미지가 표시되지 않는 경우
- 이미지 경로가 올바른지 확인
- `next.config.ts`에서 `images.unoptimized: true` 설정 확인

### 라우팅이 작동하지 않는 경우
- Next.js는 정적 사이트로 빌드되므로 모든 라우팅이 클라이언트 사이드에서 처리됩니다
- 404 에러가 발생하면 GitHub Pages 설정에서 404 페이지를 `404.html`로 리다이렉트하도록 설정해야 할 수 있습니다

### 배포가 실패하는 경우
- GitHub Actions 로그 확인 (Actions 탭)
- Node.js 버전이 올바른지 확인 (workflow 파일에서 설정)
- 빌드 에러가 있는지 확인 (`npm run build`를 로컬에서 실행해보기)

## 📝 참고사항

- GitHub Pages는 무료로 제공됩니다
- 배포에는 몇 분 정도 소요될 수 있습니다
- 커밋 후 자동 배포가 시작되며, 완료되면 이메일 알림을 받을 수 있습니다
- 커스텀 도메인도 설정할 수 있습니다 (Settings → Pages → Custom domain)

## 🔗 유용한 링크

- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Next.js 정적 내보내기](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

