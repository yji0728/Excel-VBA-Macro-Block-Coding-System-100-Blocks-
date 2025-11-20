# 개발 환경 설정 가이드

## 📋 목차
1. [시스템 요구사항](#시스템-요구사항)
2. [사전 설치 도구](#사전-설치-도구)
3. [프로젝트 설정](#프로젝트-설정)
4. [개발 서버 실행](#개발-서버-실행)
5. [프로젝트 구조](#프로젝트-구조)
6. [개발 워크플로우](#개발-워크플로우)
7. [테스트 실행](#테스트-실행)
8. [문제 해결](#문제-해결)

---

## 시스템 요구사항

### 최소 요구사항
- **OS**: Windows 10+, macOS 10.15+, 또는 Linux (Ubuntu 20.04+)
- **RAM**: 8GB 이상 권장
- **디스크 공간**: 2GB 이상
- **브라우저**: Chrome 90+, Firefox 88+, Edge 90+

### 권장 사항
- **RAM**: 16GB 이상
- **디스크 공간**: 5GB 이상 (node_modules 포함)
- **브라우저**: 최신 버전 Chrome

---

## 사전 설치 도구

### 1. Node.js 설치
**버전**: 18.x 이상 권장

#### Windows/macOS
```bash
# 공식 웹사이트에서 다운로드
https://nodejs.org/

# 또는 nvm 사용 (권장)
# Windows: https://github.com/coreybutler/nvm-windows
# macOS/Linux: https://github.com/nvm-sh/nvm

nvm install 18
nvm use 18
```

#### 설치 확인
```bash
node --version  # v18.x.x 이상
npm --version   # 9.x.x 이상
```

### 2. Git 설치
```bash
# 공식 웹사이트에서 다운로드
https://git-scm.com/

# 설치 확인
git --version
```

### 3. 코드 에디터 설치 (권장)
**Visual Studio Code**: https://code.visualstudio.com/

#### VS Code 추천 확장 프로그램
- ESLint
- Prettier - Code formatter
- ES7+ React/Redux/React-Native snippets
- TypeScript Vue Plugin (Volar)
- Auto Rename Tag
- Path Intellisense
- GitLens

---

## 프로젝트 설정

### Step 1: 저장소 클론
```bash
# HTTPS
git clone https://github.com/yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-.git

# 또는 SSH
git clone git@github.com:yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-.git

# 프로젝트 디렉토리로 이동
cd Excel-VBA-Macro-Block-Coding-System-100-Blocks-
```

### Step 2: Phase 1 개발 브랜치 생성 (새 프로젝트 시작)
```bash
# 프로젝트 디렉토리 생성
mkdir vba-block-coding
cd vba-block-coding

# React + TypeScript 프로젝트 생성
npx create-react-app . --template typescript

# Git 초기화 (이미 되어있다면 스킵)
git init
git add .
git commit -m "Initial commit: React + TypeScript setup"
```

### Step 3: 필수 라이브러리 설치
```bash
# UI 프레임워크
npm install @mui/material @emotion/react @emotion/styled

# 드래그 앤 드롭
npm install react-beautiful-dnd
npm install --save-dev @types/react-beautiful-dnd

# 또는 dnd-kit 사용 (대안)
# npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# 코드 에디터
npm install @monaco-editor/react

# 상태 관리
npm install @reduxjs/toolkit react-redux

# 유틸리티
npm install uuid
npm install --save-dev @types/uuid

# 아이콘
npm install @mui/icons-material

# 날짜 처리
npm install date-fns
```

### Step 4: 개발 도구 설정
```bash
# ESLint 및 Prettier 설정
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier

# TypeScript 타입 체크 강화
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### Step 5: 프로젝트 구조 생성
```bash
# src 디렉토리 구조 생성
mkdir -p src/components/BlockLibrary
mkdir -p src/components/Workspace
mkdir -p src/components/CodeViewer
mkdir -p src/components/BlockEditor
mkdir -p src/components/Layout
mkdir -p src/components/common
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/store/slices
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/styles
```

### Step 6: 설정 파일 생성

#### `.eslintrc.json`
```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

#### `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### `tsconfig.json` (수정)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@services/*": ["services/*"],
      "@store/*": ["store/*"],
      "@types/*": ["types/*"],
      "@utils/*": ["utils/*"],
      "@hooks/*": ["hooks/*"],
      "@data/*": ["data/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 개발 서버 실행

### 개발 모드 실행
```bash
# 개발 서버 시작 (기본 포트: 3000)
npm start

# 브라우저가 자동으로 열리고 http://localhost:3000 으로 접속됩니다
```

### 빌드 (프로덕션)
```bash
# 프로덕션 빌드 생성
npm run build

# build 폴더에 최적화된 파일이 생성됩니다
```

### 코드 품질 검사
```bash
# ESLint 실행
npm run lint
# 또는
npx eslint src/**/*.{ts,tsx}

# Prettier 포맷팅
npx prettier --write src/**/*.{ts,tsx,css}

# TypeScript 타입 체크
npx tsc --noEmit
```

---

## 프로젝트 구조

```
vba-block-coding/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── BlockLibrary/    # 블록 라이브러리 패널
│   │   │   ├── BlockLibrary.tsx
│   │   │   ├── BlockCard.tsx
│   │   │   └── CategoryTree.tsx
│   │   ├── Workspace/       # 작업 공간 패널
│   │   │   ├── Workspace.tsx
│   │   │   └── BlockInstance.tsx
│   │   ├── CodeViewer/      # 코드 뷰어 패널
│   │   │   └── CodeViewer.tsx
│   │   ├── BlockEditor/     # 블록 편집 모달
│   │   │   └── BlockEditor.tsx
│   │   ├── Layout/          # 레이아웃
│   │   │   ├── MainLayout.tsx
│   │   │   └── NavigationBar.tsx
│   │   └── common/          # 공통 컴포넌트
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── data/                # 정적 데이터
│   │   └── blockDefinitions.ts
│   ├── hooks/               # 커스텀 훅
│   │   ├── useBlocks.ts
│   │   ├── useCodeGenerator.ts
│   │   └── useLocalStorage.ts
│   ├── services/            # 비즈니스 로직
│   │   ├── blockService.ts
│   │   ├── codeGenerator.ts
│   │   ├── storageService.ts
│   │   └── validationService.ts
│   ├── store/               # Redux 상태 관리
│   │   ├── slices/
│   │   │   ├── blockSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── store.ts
│   ├── types/               # TypeScript 타입
│   │   ├── block.ts
│   │   ├── project.ts
│   │   └── app.ts
│   ├── utils/               # 유틸리티 함수
│   │   ├── validation.ts
│   │   ├── codeFormatter.ts
│   │   └── helpers.ts
│   ├── styles/              # 전역 스타일
│   │   └── theme.ts
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 개발 워크플로우

### 1. 새 기능 개발
```bash
# 1. 최신 코드 가져오기
git pull origin main

# 2. 기능 브랜치 생성
git checkout -b feature/블록-편집-모달

# 3. 코드 작성 및 테스트

# 4. 커밋
git add .
git commit -m "feat: 블록 편집 모달 구현"

# 5. 푸시
git push origin feature/블록-편집-모달

# 6. Pull Request 생성 (GitHub)
```

### 2. 코드 리뷰 체크리스트
- [ ] TypeScript 타입 안전성
- [ ] ESLint 경고 없음
- [ ] 불필요한 console.log 제거
- [ ] 주석이 명확하고 유용함
- [ ] 컴포넌트가 재사용 가능함
- [ ] 성능이 최적화됨
- [ ] 접근성 고려됨

### 3. 커밋 메시지 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 도구 변경

예시:
feat: 드래그 앤 드롭 기능 구현
fix: 블록 삭제 시 코드 업데이트 오류 수정
docs: 개발 환경 설정 가이드 추가
```

---

## 테스트 실행

### 단위 테스트 (Jest)
```bash
# 테스트 실행
npm test

# 커버리지 포함
npm test -- --coverage

# 특정 파일만 테스트
npm test -- blockService.test.ts

# watch 모드
npm test -- --watch
```

### E2E 테스트 (선택사항)
```bash
# Playwright 설치
npm install --save-dev @playwright/test

# 테스트 실행
npx playwright test

# 브라우저별 테스트
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 문제 해결

### 문제 1: npm install 실패
**증상**: 패키지 설치 중 오류 발생

**해결 방법**:
```bash
# 캐시 삭제
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 문제 2: 포트 3000 이미 사용 중
**증상**: "Port 3000 is already in use"

**해결 방법**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# 또는 다른 포트 사용
PORT=3001 npm start
```

### 문제 3: TypeScript 타입 오류
**증상**: 타입 관련 컴파일 오류

**해결 방법**:
```bash
# node_modules/@types 재설치
rm -rf node_modules/@types
npm install

# tsconfig.json 확인
# "skipLibCheck": true 추가 (임시 해결)
```

### 문제 4: React 컴포넌트 렌더링 오류
**증상**: "Element type is invalid" 오류

**해결 방법**:
- import 경로 확인
- default export vs named export 확인
- 컴포넌트 이름 대문자로 시작하는지 확인

### 문제 5: Redux DevTools 작동 안 함
**해결 방법**:
```bash
# Chrome 확장 프로그램 설치
https://chrome.google.com/webstore/detail/redux-devtools

# store.ts 설정 확인
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
```

---

## 유용한 명령어 요약

```bash
# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# ESLint 실행
npm run lint

# 패키지 업데이트 확인
npm outdated

# 의존성 보안 취약점 확인
npm audit

# 의존성 보안 취약점 수정
npm audit fix
```

---

## 추가 리소스

### 공식 문서
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Material-UI**: https://mui.com/material-ui/getting-started/
- **Monaco Editor**: https://microsoft.github.io/monaco-editor/
- **react-beautiful-dnd**: https://github.com/atlassian/react-beautiful-dnd

### 학습 자료
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/
- **TypeScript Deep Dive**: https://basarat.gitbook.io/typescript/
- **Redux Essentials**: https://redux.js.org/tutorials/essentials/part-1-overview-concepts

### 커뮤니티
- **React Discord**: https://discord.gg/react
- **TypeScript Discord**: https://discord.gg/typescript
- **Stack Overflow**: 태그 `reactjs`, `typescript`, `redux`

---

## 지원 및 문의

문제가 지속되거나 도움이 필요한 경우:
1. GitHub Issues에 문제 등록
2. 팀 Slack 채널에서 질문
3. 프로젝트 Wiki 참조

---

**문서 최종 업데이트**: 2024-11-20  
**버전**: 1.0
