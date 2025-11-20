# 🚀 시작하기 - Phase 1 MVP 개발

## 환영합니다!

Excel VBA 매크로 블록 코딩 시스템 Phase 1 MVP 개발에 오신 것을 환영합니다.
이 문서는 개발을 시작하는 데 필요한 모든 정보를 제공합니다.

---

## 📚 필독 문서

개발을 시작하기 전에 다음 문서들을 순서대로 읽어주세요:

### 1. 프로젝트 이해하기
- **[README.md](./README.md)** - 프로젝트 전체 개요
- **[webapp_specification.md](./webapp_specification.md)** - 웹앱 기술 스펙 (전체)
- **[excel _vba_code_100.md](./excel%20_vba_code_100.md)** - 100개 VBA 블록 정의

### 2. Phase 1 MVP 개발 가이드
- **[PHASE1_MVP_CHECKLIST.md](./PHASE1_MVP_CHECKLIST.md)** ⭐ - 4주 상세 체크리스트
- **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)** ⭐ - 개발 환경 설정 가이드

---

## 🎯 Phase 1 MVP 목표

Phase 1의 목표는 **최소 기능 제품(MVP)** 을 4주 안에 완성하는 것입니다:

### 핵심 기능
✅ 3개 패널 UI (블록 라이브러리, 작업 공간, 코드 뷰어)  
✅ 드래그 앤 드롭으로 블록 조립  
✅ 실시간 VBA 코드 생성  
✅ 블록 편집 (매개변수 입력)  
✅ 프로젝트 저장/불러오기 (로컬)  

### 제외 기능 (Phase 2 이후)
❌ 블록 검색  
❌ 실행 취소/다시 실행  
❌ 예제 갤러리  
❌ 클라우드 동기화  

---

## ⚡ 빠른 시작 (Quick Start)

### 1단계: 개발 환경 설정
```bash
# 1. 저장소 클론
git clone https://github.com/yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-.git
cd Excel-VBA-Macro-Block-Coding-System-100-Blocks-

# 2. 프로젝트 생성 (새 디렉토리)
mkdir vba-block-coding
cd vba-block-coding
npx create-react-app . --template typescript

# 3. 필수 라이브러리 설치
npm install @mui/material @emotion/react @emotion/styled
npm install react-beautiful-dnd @types/react-beautiful-dnd
npm install @monaco-editor/react
npm install @reduxjs/toolkit react-redux
npm install uuid @types/uuid
```

상세한 설치 가이드는 **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)** 참조

### 2단계: 프로젝트 구조 생성
```bash
mkdir -p src/components/{BlockLibrary,Workspace,CodeViewer,BlockEditor,Layout,common}
mkdir -p src/{data,hooks,services,store/slices,types,utils,styles}
```

### 3단계: 개발 서버 실행
```bash
npm start
# http://localhost:3000 에서 실행됨
```

---

## 📅 4주 개발 일정

### Week 1: 프로젝트 기반 구축 (Foundation)
**기간**: 1-7일차  
**목표**: 프로젝트 설정 및 기본 UI 레이아웃

**주요 작업**:
- React + TypeScript 프로젝트 생성
- 3개 패널 레이아웃 구현
- 블록 정의 데이터 구조 설계
- 블록 라이브러리 패널 UI

**완료 조건**:
- ✅ 개발 서버가 정상 실행됨
- ✅ 3개 패널이 화면에 표시됨
- ✅ 샘플 블록(13개)이 정의됨

---

### Week 2: 드래그 앤 드롭 및 작업 공간
**기간**: 8-14일차  
**목표**: 블록 조립 기능 구현

**주요 작업**:
- 드래그 앤 드롭 기능 (react-beautiful-dnd)
- 작업 공간 패널 구현
- 블록 추가/삭제/순서변경
- Redux 상태 관리 설정

**완료 조건**:
- ✅ 블록을 작업 공간에 드래그할 수 있음
- ✅ 블록 추가/삭제가 정상 작동함
- ✅ Redux DevTools에서 상태 확인 가능

---

### Week 3: 코드 생성 및 코드 뷰어
**기간**: 15-21일차  
**목표**: VBA 코드 자동 생성

**주요 작업**:
- 코드 생성 엔진 구현
- Monaco Editor 통합
- VBA 구문 강조
- 실시간 코드 업데이트

**완료 조건**:
- ✅ 블록에서 VBA 코드가 생성됨
- ✅ 코드 뷰어에 코드가 표시됨
- ✅ 코드 복사/다운로드 가능

---

### Week 4: 블록 편집 및 저장
**기간**: 22-28일차  
**목표**: 블록 편집 및 프로젝트 관리

**주요 작업**:
- 블록 편집 모달 구현
- 매개변수 유효성 검증
- 로컬 스토리지 저장/불러오기
- 통합 테스트 및 버그 수정

**완료 조건**:
- ✅ 블록 편집 모달이 작동함
- ✅ 프로젝트 저장/불러오기가 작동함
- ✅ 모든 핵심 기능이 정상 작동함

---

## 🔑 핵심 컴포넌트

### 1. MainLayout (메인 레이아웃)
```
┌────────────────────────────────────────────┐
│ NavigationBar (상단 메뉴)                   │
├─────────┬──────────────────┬───────────────┤
│ Block   │ Workspace        │ CodeViewer    │
│ Library │ (작업 공간)       │ (코드 뷰어)    │
└─────────┴──────────────────┴───────────────┘
```

**파일**: `src/components/Layout/MainLayout.tsx`

### 2. BlockLibrary (블록 라이브러리)
- 15개 카테고리 트리 뷰
- 블록 카드 목록
- 드래그 가능한 블록

**파일**: `src/components/BlockLibrary/BlockLibrary.tsx`

### 3. Workspace (작업 공간)
- 드롭 가능한 영역
- 블록 인스턴스 목록
- 블록 순서 변경

**파일**: `src/components/Workspace/Workspace.tsx`

### 4. CodeViewer (코드 뷰어)
- Monaco Editor
- VBA 구문 강조
- 코드 복사/다운로드

**파일**: `src/components/CodeViewer/CodeViewer.tsx`

---

## 📦 주요 데이터 구조

### BlockDefinition (블록 정의)
```typescript
interface BlockDefinition {
  id: string;              // "1-1", "2-5"
  category: string;        // "기본 작업"
  name: string;            // "워크북 열기"
  color: string;           // "#2196F3"
  parameters: Parameter[]; // 매개변수 목록
  codeTemplate: string;    // VBA 코드 템플릿
}
```

### BlockInstance (블록 인스턴스)
```typescript
interface BlockInstance {
  id: string;              // UUID
  blockType: string;       // "1-2" (BlockDefinition ID)
  position: number;        // 작업 공간 내 위치
  parameters: {            // 매개변수 값
    [key: string]: any;
  };
}
```

### Project (프로젝트)
```typescript
interface Project {
  id: string;
  name: string;
  blocks: BlockInstance[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🧪 테스트 전략

### 단위 테스트 (Unit Tests)
- 코드 생성 함수
- 유효성 검증 함수
- 유틸리티 함수

### 컴포넌트 테스트
- 블록 카드 렌더링
- 모달 열기/닫기
- 버튼 클릭 동작

### 통합 테스트
- 드래그 앤 드롭 플로우
- 블록 추가 → 코드 생성
- 저장 → 불러오기

### E2E 테스트 (선택사항)
- 전체 사용자 플로우

---

## 🛠️ 개발 도구

### 필수 도구
- **Node.js** 18.x 이상
- **npm** 9.x 이상
- **Git**
- **VS Code** (권장)

### VS Code 확장 프로그램
- ESLint
- Prettier
- ES7+ React/Redux snippets
- TypeScript Vue Plugin (Volar)

### 브라우저 도구
- **Chrome DevTools**
- **Redux DevTools** (Chrome 확장)
- **React Developer Tools** (Chrome 확장)

---

## 📝 코딩 컨벤션

### 파일명
- 컴포넌트: `PascalCase.tsx` (예: `BlockLibrary.tsx`)
- 함수/서비스: `camelCase.ts` (예: `codeGenerator.ts`)
- 타입: `camelCase.ts` (예: `block.ts`)

### 코드 스타일
```typescript
// ✅ Good
const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
  return <div className="block-card">{block.name}</div>;
};

// ❌ Bad
function blockCard(props) {
  return <div>{props.block.name}</div>;
}
```

### 커밋 메시지
```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 리팩토링
test: 테스트 추가/수정

예시:
feat: 블록 편집 모달 구현
fix: 드래그 앤 드롭 시 블록 복사 버그 수정
```

---

## 🆘 도움말 및 지원

### 문제 해결
1. **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)** 의 문제 해결 섹션 참조
2. GitHub Issues 검색
3. 팀 Slack 채널에서 질문

### 학습 자료
- [React 공식 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Redux Toolkit 튜토리얼](https://redux-toolkit.js.org/tutorials/quick-start)
- [Material-UI 가이드](https://mui.com/material-ui/getting-started/)

### 커뮤니티
- GitHub Discussions
- 팀 Slack 채널
- Stack Overflow (`reactjs`, `typescript` 태그)

---

## ✅ 체크리스트 사용법

1. **[PHASE1_MVP_CHECKLIST.md](./PHASE1_MVP_CHECKLIST.md)** 파일 열기
2. 작업 시작 전 해당 섹션 읽기
3. 작업 완료 후 `[ ]`를 `[x]`로 변경
4. 테스트 요구사항 모두 통과 확인
5. 완료 조건 충족 확인
6. Git commit 후 다음 작업 진행

---

## 🎉 다음 단계

1. **개발 환경 설정** - [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) 따라하기
2. **Week 1 시작** - [PHASE1_MVP_CHECKLIST.md](./PHASE1_MVP_CHECKLIST.md) Week 1 섹션 참조
3. **첫 커밋** - 프로젝트 초기 설정 완료 후 커밋
4. **팀과 소통** - 진행 상황 공유 및 질문

---

## 📞 연락처

- **프로젝트 관리자**: yji0728
- **GitHub**: https://github.com/yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-
- **이슈 트래커**: [GitHub Issues](https://github.com/yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-/issues)

---

**행운을 빕니다! 🚀**

Phase 1 MVP 개발을 즐겁게 진행하시길 바랍니다.
질문이 있으면 언제든지 문의해 주세요!

---

**문서 최종 업데이트**: 2024-11-20  
**버전**: 1.0
