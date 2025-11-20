# 엑셀 VBA 매크로 블록 코딩 시스템

Excel VBA 매크로를 시각적인 블록으로 조립하는 웹 기반 코딩 시스템

## 📖 프로젝트 소개

이 프로젝트는 Excel VBA 매크로를 프로그래밍 경험이 없는 사용자도 쉽게 만들 수 있도록 **비주얼 블록 코딩 시스템**을 제공하는 웹 애플리케이션의 설계 문서입니다.

### 🎯 핵심 기능

- **100개의 VBA 매크로 블록**: 15개 카테고리로 구조화된 실무 필수 기능
- **드래그 앤 드롭 인터페이스**: 블록을 조립하듯이 매크로 작성
- **실시간 코드 생성**: 블록 조립과 동시에 VBA 코드 자동 생성
- **프로젝트 관리**: 만든 매크로 조합을 저장하고 재사용
- **학습 도구**: 블록과 실제 코드를 비교하며 VBA 학습 가능

## 📂 문서 구조

### 1. `excel _vba_code_100.md`
100개의 VBA 매크로 블록에 대한 상세한 정의와 예제를 포함합니다.

**내용:**
- 15개 카테고리별 블록 정의
- 각 블록의 매개변수 및 생성 코드
- 블록 조합 예제
- 웹앱 설계 팁

**카테고리:**
1. 기본 작업 (15개) - 워크북/시트 관리
2. 셀/범위 조작 (20개) - 셀 선택, 복사, 붙여넣기
3. 데이터 입력/수정 (10개) - 날짜, 텍스트 변환
4. 포맷팅 (12개) - 글꼴, 색상, 테두리
5. 검색/찾기 (8개) - VLOOKUP, 중복값 찾기
6. 정렬/필터 (6개) - 데이터 정렬 및 필터
7. 수식/계산 (8개) - SUM, AVERAGE, IF 등
8. 루프/반복 (8개) - For, While 반복문
9. 조건문 (6개) - If-Else, Select Case
10. 변수/데이터 (7개) - 변수 선언, 배열
11. 메시지/입력 (6개) - 메시지 박스, 입력 박스
12. 그래프/차트 (6개) - 차트 생성 및 편집
13. 프린트/내보내기 (4개) - PDF 출력, 인쇄
14. 고급 기능 (8개) - 피벗 테이블, 조건부 서식
15. 오류 처리/기타 (2개) - 오류 처리

### 2. `webapp_specification.md` ⭐
**웹 애플리케이션의 완전한 기술 스펙 문서**

**포함 내용:**
- 📋 프로젝트 개요 및 목적
- 🏗️ 시스템 아키텍처 (3개 패널 UI)
- 🎨 사용자 인터페이스 상세 설계
- ⚙️ 8가지 주요 기능 명세
  - 블록 관리 (드래그앤드롭, 복사, 삭제, 편집)
  - 코드 생성 (실시간 VBA 코드 변환)
  - 프로젝트 관리 (저장/불러오기)
  - 매뉴얼 및 도움말
  - 추가 편의 기능
- 💾 데이터 구조 정의 (TypeScript)
- 🛠️ 권장 기술 스택
  - Frontend: React/Vue + TypeScript
  - UI: Material-UI / Ant Design
  - Drag & Drop: react-beautiful-dnd / dnd-kit
  - Code Editor: Monaco Editor
- 🔌 API 설계 및 인터페이스
- 📅 10주 개발 로드맵 (MVP → 배포)
- 🔒 보안 고려사항
- 🎨 UX 개선사항

## 🚀 시작하기

### Phase 1 MVP 개발을 시작하려면

📖 **[GETTING_STARTED.md](./GETTING_STARTED.md)** - 개발 시작 가이드 (필독!)

1. **프로젝트 이해하기**
   - [README.md](./README.md) - 프로젝트 개요
   - [webapp_specification.md](./webapp_specification.md) - 웹앱 전체 스펙
   - [excel _vba_code_100.md](./excel%20_vba_code_100.md) - 100개 블록 정의

2. **개발 환경 설정**
   - [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) - 상세 설정 가이드

3. **개발 시작**
   - [PHASE1_MVP_CHECKLIST.md](./PHASE1_MVP_CHECKLIST.md) - 4주 체크리스트
   - Week 1부터 순서대로 진행

### 빠른 시작 (Quick Start)
```bash
# 1. 프로젝트 생성
npx create-react-app vba-block-coding --template typescript
cd vba-block-coding

# 2. 필수 라이브러리 설치
npm install @mui/material @emotion/react @emotion/styled
npm install react-beautiful-dnd @types/react-beautiful-dnd
npm install @monaco-editor/react
npm install @reduxjs/toolkit react-redux
npm install uuid @types/uuid

# 3. 개발 서버 실행
npm start
```

자세한 내용은 **[DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)** 참조

### 기획자/디자이너용

1. **UI/UX 디자인**
   - `webapp_specification.md`의 "사용자 인터페이스 설계" 섹션 참조
   - Figma/Sketch로 목업 작성
   - 3개 패널 레이아웃 구현

2. **사용자 플로우 정의**
   - 블록 드래그앤드롭 플로우
   - 블록 편집 플로우
   - 프로젝트 저장/불러오기 플로우

## 📊 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                        웹 애플리케이션                        │
├─────────────────┬──────────────────┬──────────────────────┤
│ 블록 라이브러리  │   작업 공간       │   코드 뷰어           │
│ (Block Library) │   (Workspace)    │   (Code Viewer)      │
│                 │                  │                      │
│ - 카테고리 탐색  │   - 블록 배치     │   - 실시간 VBA 코드   │
│ - 블록 검색     │   - 드래그앤드롭   │   - 구문 강조        │
│ - 미리보기      │   - 블록 편집     │   - 복사 기능        │
└─────────────────┴──────────────────┴──────────────────────┘
```

## 🎯 사용 시나리오

### 예시 1: 데이터 자동 처리 매크로
```
1. 블록 라이브러리에서 "시트 선택하기" 블록 드래그
2. "마지막 행 번호 찾기" 블록 추가
3. "For 반복문 시작" 블록 추가
4. "If 조건 시작" 블록으로 조건 설정
5. 조건에 따라 "셀 값 쓰기" 블록 추가
6. 반복문 종료 및 메시지 박스 추가
7. 오른쪽 코드 뷰어에서 생성된 VBA 코드 확인
8. "복사" 버튼으로 코드 복사 → Excel에 붙여넣기
```

### 예시 2: 차트 생성 및 PDF 출력
```
1. "시트 선택하기" 블록
2. "차트 생성" 블록 (데이터 범위 지정)
3. "차트 제목 설정" 블록
4. "PDF로 내보내기" 블록
5. "메시지 박스 보이기" 블록
6. 코드 복사 및 Excel에서 실행
```

## 🛠️ 개발 로드맵

### Phase 1: MVP (4주) - ✅ 완료
**상세 체크리스트**: [PHASE1_MVP_CHECKLIST.md](./PHASE1_MVP_CHECKLIST.md)  
**완료 보고서**: [PHASE1_COMPLETION_REPORT.md](./PHASE1_COMPLETION_REPORT.md)

- [x] Week 1: 프로젝트 기반 구축
- [x] Week 2: 드래그 앤 드롭 및 작업 공간
- [x] Week 3: 코드 생성 및 코드 뷰어
- [x] Week 4: 블록 편집 및 저장

### Phase 2: 고급 기능 (3주) - 🔄 진행 중
**상세 체크리스트**: [PHASE2_CHECKLIST.md](./PHASE2_CHECKLIST.md)

- [ ] Week 5: 블록 검색 및 필터링
  - [ ] 블록 검색 기능
  - [ ] 카테고리 필터링 개선
  - [ ] 최근 사용 블록
  - [ ] 즐겨찾기 기능
- [ ] Week 6: 실행 취소/다시 실행 및 예제 갤러리
  - [ ] 실행 취소/다시 실행 구현
  - [ ] 키보드 단축키 (Ctrl+Z, Ctrl+Y)
  - [ ] 예제 갤러리 (5개 예제)
  - [ ] 예제 설명 및 학습 자료
- [ ] Week 7: 키보드 단축키 확장 및 프로젝트 관리
  - [ ] 블록 관련 단축키
  - [ ] 프로젝트 관련 단축키
  - [ ] 단축키 도움말
  - [ ] 프로젝트 관리 UI 개선

### Phase 3: 완성도 향상 (2주)
- 반응형 디자인
- 애니메이션 효과
- 접근성 개선
- 성능 최적화

### Phase 4: 배포 (1주)
- 프로덕션 빌드
- Vercel/Netlify 배포
- 모니터링 설정

## 🤝 기여 가이드

### 개발 참여
1. 이 저장소를 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

### 버그 리포트
- GitHub Issues에 버그 리포트 작성
- 재현 가능한 예제 포함

### 기능 제안
- GitHub Issues에 새로운 기능 제안
- 사용 사례 및 예상 이점 설명

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 팀 및 연락처

- **프로젝트 관리자**: yji0728
- **저장소**: https://github.com/yji0728/Excel-VBA-Macro-Block-Coding-System-100-Blocks-

## 🔗 관련 링크

- [Excel VBA 공식 문서](https://docs.microsoft.com/ko-kr/office/vba/api/overview/excel)
- [블록 코딩 예시 - Scratch](https://scratch.mit.edu/)
- [블록 코딩 예시 - Blockly](https://developers.google.com/blockly)

## 📈 프로젝트 현황

- ✅ 블록 정의 완료 (100개)
- ✅ 웹앱 스펙 완료
- ✅ Phase 1 MVP 완료 (Week 1-4)
- ✅ Phase 2 상세 체크리스트 완료
- 🔄 Phase 2 고급 기능 개발 진행 중 (Week 5-7)
- 📅 Phase 3 완성도 향상 예정

---

**Made with ❤️ for Excel automation enthusiasts**
