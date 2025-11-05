# Presently - AI-Powered Gift Recommendation Service

This is the frontend application for Presently, built with Next.js. This is a demo version using mock data instead of a backend.

## Project Structure

```
app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/Landing page
│   ├── onboarding/        # Onboarding flow (HCI-First)
│   ├── chat/              # Chat page with recommendations
│   ├── friends/           # Friends page with social graph
│   ├── products/          # Products discovery page
│   └── mypage/            # User profile and settings
├── components/            # Reusable React components
│   ├── BottomNavigation.tsx
│   └── MainLayout.tsx
└── lib/                   # Utilities and mock data
    └── mockData.ts        # Mock data for development
```

## Features Implemented

### Epic 1: Authentication & Onboarding
- ✅ Multi-screen onboarding flow (HCI-First principle - one question per screen)
- ✅ Basic Profile collection
- ✅ Giver Profile questionnaire
- ✅ Receiver Profile questionnaire

### Epic 2: Core UX - Bottom Navigation
- ✅ Persistent bottom-fixed navigation bar
- ✅ Four main sections: Chat, Friends, Products, MyPage

### Epic 3: Chat Page
- ✅ Friend selection interface
- ✅ AI recommendation flow (mock)
- ✅ Chat-based refinement
- ✅ Product recommendation cards

### Epic 4: Friends Page
- ✅ User profile display
- ✅ Friend list with sorting
- ✅ Friend profile view
- ✅ See Recommendations, Nudge, Chat actions

### Epic 5: Products Page
- ✅ Curated product lists
- ✅ Gift Bundles creation (mock AI)
- ✅ Group Gifting ("Gift Party")

### Epic 6: MyPage
- ✅ Gift History (Sent & Received)
- ✅ Private Feedback ("Show to Me")
- ✅ Wishlist management
- ✅ Profile & Preference management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
cd app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Routes

- `/` - Home/Landing page
- `/onboarding` - Onboarding flow
- `/chat` - Chat page with recommendations
- `/friends` - Friends page
- `/products` - Products discovery
- `/mypage` - User profile and settings

## Design System

- **Base Background:** Very light yellow (`#FEFCE8`)
- **Primary CTA:** Vibrant Pink (`#EC4899`)

## Mock Data

All backend operations are replaced with mock data in `lib/mockData.ts`. This includes:
- User profiles
- Friends list
- Products
- Gift history
- Recommendation simulation

## Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState)

## Notes

- This is a frontend-only demo with mock data
- Backend integration (FastAPI) is planned but not implemented
- All AI recommendations are simulated with simple filtering logic
- Social login buttons are UI-only (not functional)

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment.

### Prerequisites
- GitHub repository
- GitHub Pages enabled in repository settings

### Setup Steps

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (또는 GitHub Actions 사용)
   - 또는 Source: GitHub Actions 선택

3. **Configure basePath (if needed):**
   - If your repository name is NOT `username.github.io`, you need to set basePath
   - Edit `next.config.ts` and uncomment/update the basePath:
   ```typescript
   basePath: '/YOUR_REPO_NAME',  // repository 이름으로 변경
   ```

4. **Automatic Deployment:**
   - GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured
   - Every push to `main` branch will automatically build and deploy
   - Deployment will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Manual Build (Optional)

If you want to build locally and test:

```bash
npm run build
```

The static files will be in the `out/` directory, which you can deploy to any static hosting service.

### Important Notes

- GitHub Pages는 정적 사이트만 지원하므로 `output: 'export'` 설정이 필요합니다
- 이미지 최적화는 비활성화되어 있습니다 (`images.unoptimized: true`)
- 모든 라우팅은 클라이언트 사이드에서 처리됩니다
- API 라우트는 사용할 수 없습니다 (정적 사이트이므로)

## Next Steps

To integrate with backend:
1. Replace mock data calls with actual API calls
2. Set up FastAPI microservice for AI recommendations
3. Implement authentication flow
4. Connect to MongoDB database via Prisma
