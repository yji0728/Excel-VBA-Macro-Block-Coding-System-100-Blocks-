# VBA Block Coding System - Phase 1 MVP

Excel VBA 매크로를 시각적인 블록으로 조립하는 웹 기반 코딩 시스템

## 🎯 프로젝트 개요

이 애플리케이션은 Excel VBA 매크로를 프로그래밍 경험이 없는 사용자도 쉽게 만들 수 있도록 비주얼 블록 코딩 시스템을 제공합니다.

## ✨ 구현된 기능 (Phase 1 MVP)

### Week 1: 프로젝트 기반 구축
✅ React + TypeScript 프로젝트 설정  
✅ Material-UI 디자인 시스템  
✅ 3개 패널 레이아웃 (블록 라이브러리, 작업 공간, 코드 뷰어)  
✅ 15개 카테고리 정의  
✅ 13개 샘플 블록 정의

### Week 2: 드래그 앤 드롭 및 작업 공간
✅ @dnd-kit 기반 드래그 앤 드롭  
✅ 블록 라이브러리에서 작업 공간으로 블록 추가  
✅ 작업 공간 내 블록 순서 변경  
✅ 블록 삭제 기능  
✅ Redux Toolkit 상태 관리

### Week 3: 코드 생성 및 코드 뷰어
✅ 실시간 VBA 코드 생성  
✅ 매개변수 치환 엔진  
✅ 코드 복사 기능  
✅ .bas 파일 다운로드  
✅ 코드 미리보기

### Week 4: 블록 편집 및 저장
✅ 블록 편집 모달  
✅ 매개변수 유효성 검증  
✅ localStorage 기반 프로젝트 저장/불러오기  
✅ 프로젝트 관리 (저장, 불러오기, 삭제)

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- npm 9.x 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── BlockLibrary/       # 블록 라이브러리 패널
│   │   ├── BlockLibrary.tsx
│   │   └── BlockCard.tsx
│   ├── Workspace/          # 작업 공간 패널
│   │   ├── Workspace.tsx
│   │   └── BlockInstance.tsx
│   ├── CodeViewer/         # 코드 뷰어 패널
│   │   └── CodeViewer.tsx
│   ├── BlockEditor/        # 블록 편집 모달
│   │   └── BlockEditor.tsx
│   ├── Layout/             # 메인 레이아웃
│   │   └── MainLayout.tsx
│   └── common/             # 공통 컴포넌트
│       ├── SaveProjectDialog.tsx
│       └── LoadProjectDialog.tsx
├── data/
│   └── blockDefinitions.ts # 블록 정의 데이터
├── hooks/
│   └── useBlocks.ts        # 커스텀 훅
├── services/
│   ├── codeGenerator.ts    # 코드 생성 서비스
│   └── storageService.ts   # 저장소 서비스
├── store/
│   ├── slices/
│   │   └── blockSlice.ts   # Redux 슬라이스
│   └── store.ts            # Redux 스토어
├── types/
│   └── block.ts            # TypeScript 타입 정의
└── utils/
    └── validation.ts       # 유효성 검증 유틸리티
```

## 🎨 사용법

### 1. 블록 추가
1. 왼쪽 블록 라이브러리에서 카테고리 선택
2. 원하는 블록을 클릭하고 드래그
3. 중앙 작업 공간에 드롭

### 2. 블록 편집
1. 작업 공간의 블록을 더블클릭
2. 모달에서 매개변수 입력
3. '적용' 버튼 클릭

### 3. 코드 생성
- 블록을 추가하면 자동으로 오른쪽 패널에 VBA 코드 생성
- '복사' 버튼으로 클립보드에 복사
- '.bas 파일로 다운로드' 버튼으로 파일 다운로드

### 4. 프로젝트 저장
1. 상단 '💾 저장' 버튼 클릭
2. 프로젝트 이름과 설명 입력
3. localStorage에 자동 저장

### 5. 프로젝트 불러오기
1. 상단 '📂 불러오기' 버튼 클릭
2. 저장된 프로젝트 목록에서 선택
3. '불러오기' 버튼 클릭

## 🧩 샘플 블록

### 카테고리 1: 기본 작업 (5개)
- 새 워크북 만들기
- 워크북 열기
- 워크북 저장하기
- 워크북 다른 이름으로 저장
- 시트 선택하기

### 카테고리 2: 셀/범위 조작 (5개)
- 셀 선택하기
- 셀 값 쓰기
- 셀 값 읽기
- 범위 복사하기
- 셀 색상 변경

### 카테고리 8: 루프/반복 (3개)
- For 반복문 시작
- Next (반복문 종료)
- 마지막 행 번호 찾기

## 📊 기술 스택

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Drag & Drop**: @dnd-kit
- **Storage**: localStorage
- **Build Tool**: Create React App

## 🔧 개발 가이드

### 새 블록 추가하기

1. `src/data/blockDefinitions.ts`에 블록 정의 추가:
```typescript
{
  id: "1-6",
  category: "기본 작업",
  categoryNumber: 1,
  blockNumber: 6,
  name: "새로운 블록",
  color: "#2196F3",
  parameters: [
    {
      name: "매개변수1",
      type: ParameterType.STRING,
      required: true,
      placeholder: "입력 힌트"
    }
  ],
  codeTemplate: 'VBA코드템플릿 {매개변수1}',
  description: "블록 설명",
  examples: ["예제 코드"]
}
```

### 코드 빌드 최적화

프로덕션 빌드 크기: ~166KB (gzipped)

최적화 기법:
- React.memo로 불필요한 리렌더링 방지
- useMemo로 코드 생성 메모이제이션
- Code splitting 준비 완료

## 🧪 테스트

### 수동 테스트 체크리스트
- [ ] 블록을 드래그하여 작업 공간에 추가
- [ ] 블록 더블클릭하여 매개변수 편집
- [ ] 블록 삭제 버튼 클릭
- [ ] 작업 공간 내에서 블록 순서 변경
- [ ] 코드 복사 기능
- [ ] 코드 다운로드 기능
- [ ] 프로젝트 저장
- [ ] 프로젝트 불러오기
- [ ] 프로젝트 삭제
- [ ] 작업 공간 초기화

## 🐛 알려진 제한사항

1. 블록 검색 기능 미구현 (Phase 2에서 구현 예정)
2. 실행 취소/다시 실행 미구현 (Phase 2)
3. Monaco Editor 통합 예정 (완전한 구문 강조)
4. 키보드 단축키 지원 예정

## 📝 다음 단계 (Phase 2)

- [ ] 블록 검색 및 필터링
- [ ] 실행 취소/다시 실행 (Undo/Redo)
- [ ] 키보드 단축키 지원
- [ ] 예제 갤러리
- [ ] Monaco Editor 통합
- [ ] 블록 복사/붙여넣기
- [ ] 프로젝트 내보내기/가져오기 (JSON)

## 📄 라이선스

MIT License

## 👥 개발자

- yji0728
- GitHub Copilot Workspace

## 🙏 감사의 말

이 프로젝트는 Excel 자동화를 민주화하고 VBA 학습 장벽을 낮추기 위해 만들어졌습니다.

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024-11-20  
**Phase 1 MVP Status**: ✅ Complete
