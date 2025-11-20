# 엑셀 VBA 매크로 블록 코딩 시스템 웹앱 스펙

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [시스템 아키텍처](#시스템-아키텍처)
3. [사용자 인터페이스 설계](#사용자-인터페이스-설계)
4. [기능 명세](#기능-명세)
5. [데이터 구조](#데이터-구조)
6. [기술 스택](#기술-스택)
7. [API 설계](#api-설계)
8. [개발 로드맵](#개발-로드맵)

---

## 프로젝트 개요

### 목적
Excel VBA 매크로 작성을 위한 비주얼 블록 코딩 시스템을 제공하여, 프로그래밍 경험이 부족한 사용자도 직관적인 드래그 앤 드롭 방식으로 VBA 매크로를 구성할 수 있도록 한다.

### 핵심 가치
- **직관성**: 100개의 VBA 스크립트를 카테고리별로 구조화된 블록으로 제공
- **효율성**: 드래그 앤 드롭으로 빠르게 매크로 조립
- **학습성**: 블록과 실제 코드를 실시간으로 비교하며 VBA 학습 가능
- **재사용성**: 사용자가 만든 매크로 조합을 저장하고 재사용 가능

### 타겟 사용자
- Excel 업무 자동화가 필요한 일반 사용자
- VBA를 처음 배우는 초급 개발자
- 반복 작업 자동화를 원하는 업무 담당자

---

## 시스템 아키텍처

### 전체 구조
```
┌─────────────────────────────────────────────────────────────────┐
│                         웹 애플리케이션                            │
├──────────────────┬──────────────────────┬──────────────────────┤
│  블록 라이브러리    │   작업 공간 (캔버스)   │   코드 뷰어           │
│  (Block Library)  │   (Workspace)        │   (Code Viewer)      │
│                  │                      │                      │
│  - 카테고리 탐색   │   - 블록 배치         │   - 실시간 VBA 코드   │
│  - 블록 검색      │   - 드래그앤드롭       │   - 구문 강조        │
│  - 미리보기       │   - 블록 편집         │   - 복사 기능        │
│                  │   - 순서 조정         │                      │
└──────────────────┴──────────────────────┴──────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   상태 관리 레이어   │
                    │  (State Manager)   │
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    │   데이터 레이어      │
                    │  (Data Layer)      │
                    └───────────────────┘
```

### 기술 아키텍처 레이어

#### 1. 프레젠테이션 레이어 (Presentation Layer)
- 3개의 주요 UI 패널
- 반응형 레이아웃 (데스크톱 중심)
- 드래그 앤 드롭 인터랙션

#### 2. 비즈니스 로직 레이어 (Business Logic Layer)
- 블록-코드 변환 엔진
- 블록 조립 로직
- 매개변수 유효성 검증

#### 3. 데이터 레이어 (Data Layer)
- 블록 정의 데이터
- 사용자 프로젝트 데이터
- 로컬 스토리지/클라우드 저장

---

## 사용자 인터페이스 설계

### 1. 전체 레이아웃

```
┌─────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  🎯 VBA 블록 코딩 시스템    [매뉴얼] [예제] [저장] [불러오기]     ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
├───────────────┬─────────────────────────────┬──────────────────────┤
│               │                             │                      │
│  블록 라이브러리 │       작업 공간               │     코드 뷰어         │
│  (250px)      │       (flex-grow)           │     (400px)          │
│               │                             │                      │
│  🔍 검색...    │  ┌────────────────────┐    │  ┌────────────────┐ │
│               │  │  📦 블록1: 워크북열기 │    │  │ VBA Code:      │ │
│  📁 기본작업   │  │  path: C:\test.xlsx│    │  │                │ │
│    └ 워크북열기 │  └────────────────────┘    │  │ Workbooks.Open │ │
│    └ 워크북저장 │                             │  │ ...            │ │
│               │  ┌────────────────────┐    │  │                │ │
│  📁 셀/범위조작 │  │  📦 블록2: 셀값쓰기  │    │  │                │ │
│    └ 셀선택    │  │  cell: A1          │    │  │                │ │
│    └ 셀값쓰기   │  │  value: Hello      │    │  │                │ │
│               │  └────────────────────┘    │  └────────────────┘ │
│  📁 루프/반복   │                             │                      │
│  ...          │  [빈 작업공간 - 여기에        │  [복사] 버튼          │
│               │   블록을 드래그하세요]          │                      │
│               │                             │                      │
└───────────────┴─────────────────────────────┴──────────────────────┘
```

### 2. 패널별 상세 설계

#### 2.1 블록 라이브러리 패널 (왼쪽)

**구성 요소:**
- 검색 입력창
- 카테고리 트리 뷰
- 블록 목록
- 블록 미리보기

**카테고리 구조 (15개):**
```
📁 1. 기본 작업 (15개)
📁 2. 셀/범위 조작 (20개)
📁 3. 데이터 입력/수정 (10개)
📁 4. 포맷팅 (12개)
📁 5. 검색/찾기 (8개)
📁 6. 정렬/필터 (6개)
📁 7. 수식/계산 (8개)
📁 8. 루프/반복 (8개)
📁 9. 조건문 (6개)
📁 10. 변수/데이터 (7개)
📁 11. 메시지/입력 (6개)
📁 12. 그래프/차트 (6개)
📁 13. 프린트/내보내기 (4개)
📁 14. 고급 기능 (8개)
📁 15. 오류 처리/기타 (2개)
```

**블록 항목 디자인:**
```
┌────────────────────────────┐
│ 🟦 1-1. 새 워크북 만들기      │
│                            │
│ 매개변수: 없음               │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│ 코드: Workbooks.Add        │
└────────────────────────────┘
```

**색상 코딩 시스템:**
- 🟦 파랑: 기본 작업 (카테고리 1)
- 🟩 초록: 셀/범위 조작 (카테고리 2)
- 🟨 노랑: 루프/반복 (카테고리 8)
- 🟧 주황: 조건문 (카테고리 9)
- 🟥 빨강: 오류 처리 (카테고리 15)
- 🟪 보라: 고급 기능 (카테고리 14)
- ⬜ 회색: 변수/데이터 (카테고리 10)
- 🟫 갈색: 포맷팅 (카테고리 4)

#### 2.2 작업 공간 패널 (중앙)

**기능:**
- 드래그 앤 드롭 영역
- 블록 순서 관리
- 블록 편집
- 블록 연결 시각화

**블록 표시 형태:**
```
┌────────────────────────────────────┐
│ 🟦 1-2. 워크북 열기                  │
│                                    │
│ 📝 파일경로: [C:\test.xlsx      ]  │
│                                    │
│ ⋮  [드래그 핸들]                    │
└────────────────────────────────────┘
```

**우클릭 컨텍스트 메뉴:**
```
┌──────────────────┐
│ 📋 블록 복사       │
│ ✏️ 블록 편집       │
│ 🗑️ 블록 삭제       │
│ ──────────────── │
│ ⬆️ 위로 이동       │
│ ⬇️ 아래로 이동     │
│ ──────────────── │
│ ℹ️ 블록 정보       │
└──────────────────┘
```

**블록 편집 모달:**
```
┌─────────────────────────────────────┐
│ 블록 편집: 워크북 열기                  │
├─────────────────────────────────────┤
│                                     │
│ 파일경로:                            │
│ ┌─────────────────────────────┐    │
│ │ C:\test.xlsx                │    │
│ └─────────────────────────────┘    │
│                                     │
│ 💡 팁: 파일 경로는 절대 경로를         │
│       사용하세요.                    │
│                                     │
│        [취소]        [적용]          │
└─────────────────────────────────────┘
```

**드롭 영역 표시:**
```
┌────────────────────────────────────┐
│                                    │
│  ╔══════════════════════════════╗  │
│  ║  여기에 블록을 드래그하세요      ║  │
│  ║                              ║  │
│  ║       📦 → 🎯                 ║  │
│  ║                              ║  │
│  ╚══════════════════════════════╝  │
│                                    │
└────────────────────────────────────┘
```

#### 2.3 코드 뷰어 패널 (오른쪽)

**기능:**
- 실시간 VBA 코드 생성
- 구문 강조 (Syntax Highlighting)
- 코드 복사
- 코드 다운로드

**디자인:**
```
┌──────────────────────────────────┐
│ 📄 생성된 VBA 코드        [📋 복사] │
├──────────────────────────────────┤
│ 1  Sub GeneratedMacro()          │
│ 2    ' 워크북 열기                │
│ 3    Workbooks.Open _            │
│ 4      Filename:="C:\test.xlsx"  │
│ 5                                │
│ 6    ' 셀 값 쓰기                 │
│ 7    Range("A1").Value = "Hello" │
│ 8                                │
│ 9  End Sub                       │
│                                  │
│                                  │
│ [💾 .bas 파일로 다운로드]         │
└──────────────────────────────────┘
```

**구문 강조 색상:**
- 키워드 (Sub, End, If): 파랑 (#0000FF)
- 문자열 ("..."): 빨강 (#A31515)
- 주석 ('...): 초록 (#008000)
- 함수/메서드: 검정 (#000000)
- 숫자: 주황 (#09885A)

### 3. 상단 네비게이션 바

**구성:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🎯 VBA 블록 코딩 시스템    v1.0                              │
│                                                             │
│  [📖 매뉴얼]  [📝 예제]  [💾 저장]  [📂 불러오기]  [🗑️ 초기화]│
└─────────────────────────────────────────────────────────────┘
```

**버튼별 기능:**

1. **📖 매뉴얼 버튼**
   - VBA 기본 사용법
   - 파워쿼리 단축키
   - 블록 사용 가이드
   - FAQ

2. **📝 예제 버튼**
   - 미리 만들어진 예제 매크로
   - 예제 1: 데이터 자동 처리
   - 예제 2: 차트 생성 및 PDF 출력
   - 예제 3: 조건부 서식 적용
   - 사용자가 예제 선택 시 작업 공간에 자동 로드

3. **💾 저장 버튼**
   - 현재 블록 조합 저장
   - 프로젝트명 입력
   - 로컬 스토리지 또는 클라우드 저장

4. **📂 불러오기 버튼**
   - 저장된 프로젝트 목록 표시
   - 선택한 프로젝트 로드

5. **🗑️ 초기화 버튼**
   - 작업 공간 전체 초기화
   - 확인 대화상자 표시

---

## 기능 명세

### 1. 블록 관리 기능

#### 1.1 블록 드래그 앤 드롭
**사용자 시나리오:**
1. 사용자가 블록 라이브러리에서 블록을 선택
2. 마우스로 블록을 클릭하고 드래그
3. 작업 공간으로 이동
4. 마우스를 놓으면 블록이 배치됨
5. 코드 뷰어에 즉시 VBA 코드가 표시됨

**기술 요구사항:**
- HTML5 Drag and Drop API 또는 라이브러리 사용
- 드래그 중 시각적 피드백 제공
- 드롭 가능 영역 하이라이트
- 블록 위치 자동 정렬

#### 1.2 블록 복사
**기능:**
- 우클릭 → "블록 복사" 선택
- 또는 Ctrl+C 단축키
- 복사된 블록은 원본 바로 아래에 생성
- 모든 매개변수 값 복사됨

#### 1.3 블록 삭제
**기능:**
- 우클릭 → "블록 삭제" 선택
- 또는 블록 선택 후 Delete 키
- 삭제 확인 없이 즉시 삭제
- Ctrl+Z로 실행 취소 가능

#### 1.4 블록 순서 변경
**사용자 시나리오:**
1. 작업 공간의 블록을 위/아래로 드래그
2. 원하는 위치에 드롭
3. 코드 뷰어의 코드 순서도 자동으로 변경

**기술 요구사항:**
- 블록 사이에 드롭 존 표시
- 드래그 중 다른 블록들은 자동으로 위치 조정
- 애니메이션 효과로 부드러운 전환

#### 1.5 블록 편집
**기능:**
- 블록 더블클릭 또는 우클릭 → "블록 편집"
- 모달 창에서 매개변수 편집
- 입력 필드 유효성 검증
- 실시간 코드 미리보기

**매개변수 타입별 입력 방식:**
```
타입               | 입력 방식
─────────────────┼─────────────────
문자열(파일경로)   | 텍스트 입력 + 파일 선택 버튼
셀 범위(A1:C10)   | 텍스트 입력 + 범위 선택 도구
숫자(크기, 개수)   | 숫자 입력 (스피너)
선택(예/아니오)    | 라디오 버튼 또는 토글
열거형(오름차순)   | 드롭다운 선택
색상              | 컬러 피커
```

### 2. 코드 생성 기능

#### 2.1 실시간 코드 변환
**동작:**
- 블록이 추가/수정/삭제될 때마다 즉시 VBA 코드 갱신
- 각 블록의 VBA 코드 템플릿을 조합
- 주석으로 블록 구분 표시
- 올바른 들여쓰기 적용

**코드 생성 예시:**
```vba
Sub GeneratedMacro()
    ' ───────────────────────────────────
    ' 블록 1: 워크북 열기
    ' ───────────────────────────────────
    Workbooks.Open Filename:="C:\test.xlsx"
    
    ' ───────────────────────────────────
    ' 블록 2: 시트 선택하기
    ' ───────────────────────────────────
    Sheets("Sheet1").Select
    
    ' ───────────────────────────────────
    ' 블록 3: 셀 값 쓰기
    ' ───────────────────────────────────
    Range("A1").Value = "Hello"
    
End Sub
```

#### 2.2 코드 복사
**기능:**
- "복사" 버튼 클릭 시 클립보드에 복사
- 복사 완료 알림 표시
- Ctrl+A로 전체 선택 가능

#### 2.3 코드 다운로드
**기능:**
- .bas 파일로 다운로드
- .txt 파일로 다운로드
- 파일명: "GeneratedMacro_YYYYMMDD_HHMMSS.bas"

### 3. 프로젝트 관리 기능

#### 3.1 프로젝트 저장
**저장 데이터:**
```json
{
  "projectName": "데이터 처리 매크로",
  "createdAt": "2024-11-20T10:30:00Z",
  "updatedAt": "2024-11-20T11:45:00Z",
  "blocks": [
    {
      "id": "block-1",
      "blockType": "1-2",
      "blockName": "워크북 열기",
      "parameters": {
        "파일경로": "C:\\test.xlsx"
      },
      "position": 0
    },
    {
      "id": "block-2",
      "blockType": "2-7",
      "blockName": "셀 값 쓰기",
      "parameters": {
        "셀": "A1",
        "값": "Hello"
      },
      "position": 1
    }
  ],
  "metadata": {
    "description": "테스트 파일 열고 값 쓰기",
    "tags": ["기본", "테스트"]
  }
}
```

**저장 옵션:**
- 로컬 스토리지 (브라우저)
- JSON 파일 다운로드
- 클라우드 저장 (향후 확장)

#### 3.2 프로젝트 불러오기
**기능:**
- 저장된 프로젝트 목록 표시
- 프로젝트 검색 및 필터링
- 미리보기 (블록 개수, 마지막 수정일)
- 선택한 프로젝트 로드

**프로젝트 목록 UI:**
```
┌──────────────────────────────────────┐
│ 저장된 프로젝트                        │
├──────────────────────────────────────┤
│ 🔍 [검색...]                          │
│                                      │
│ ┌──────────────────────────────────┐│
│ │ 📦 데이터 처리 매크로               ││
│ │ 5개 블록 · 2024-11-20 11:45       ││
│ │ [불러오기] [삭제]                  ││
│ └──────────────────────────────────┘│
│                                      │
│ ┌──────────────────────────────────┐│
│ │ 📦 월별 리포트 생성                ││
│ │ 12개 블록 · 2024-11-19 15:20      ││
│ │ [불러오기] [삭제]                  ││
│ └──────────────────────────────────┘│
│                                      │
└──────────────────────────────────────┘
```

### 4. 매뉴얼 및 도움말 기능

#### 4.1 사용 설명서
**내용:**
1. **시작하기**
   - 블록 코딩이란?
   - 첫 매크로 만들기
   
2. **블록 사용법**
   - 블록 카테고리별 설명
   - 매개변수 입력 가이드
   - 자주 사용하는 블록 조합

3. **VBA 기초**
   - VBA 개념 소개
   - Sub 프로시저란?
   - 변수와 데이터 타입

4. **단축키**
   ```
   Ctrl+C      : 블록 복사
   Ctrl+V      : 블록 붙여넣기
   Delete      : 블록 삭제
   Ctrl+Z      : 실행 취소
   Ctrl+Y      : 다시 실행
   Ctrl+S      : 프로젝트 저장
   Ctrl+F      : 블록 검색
   ```

#### 4.2 예제 갤러리
**포함 예제:**

1. **데이터 자동 처리**
   - 사용 블록: 8개
   - 기능: 조건에 따른 데이터 분류
   - 난이도: 초급

2. **차트 생성 및 PDF 출력**
   - 사용 블록: 6개
   - 기능: 데이터로 차트 생성 후 PDF 저장
   - 난이도: 중급

3. **조건부 서식 일괄 적용**
   - 사용 블록: 10개
   - 기능: 여러 시트에 조건부 서식 적용
   - 난이도: 중급

4. **데이터 유효성 검사 설정**
   - 사용 블록: 7개
   - 기능: 범위별 유효성 검사 규칙 적용
   - 난이도: 초급

5. **피벗 테이블 자동 생성**
   - 사용 블록: 5개
   - 기능: 데이터로 피벗 테이블 자동 생성
   - 난이도: 고급

**예제 로드 프로세스:**
1. 예제 선택
2. 예제 설명 표시
3. "불러오기" 버튼 클릭
4. 작업 공간에 블록 자동 배치
5. 코드 뷰어에 VBA 코드 표시

### 5. 추가 기능

#### 5.1 블록 검색
**기능:**
- 블록 이름으로 검색
- 매개변수 이름으로 검색
- 카테고리 필터링
- 검색 결과 하이라이트

#### 5.2 실행 취소/다시 실행
**기능:**
- Ctrl+Z: 마지막 작업 취소
- Ctrl+Y: 취소한 작업 다시 실행
- 최대 50단계까지 기록

#### 5.3 키보드 단축키
**지원 단축키:**
```
Ctrl+C      : 선택한 블록 복사
Ctrl+V      : 블록 붙여넣기
Delete      : 선택한 블록 삭제
Ctrl+Z      : 실행 취소
Ctrl+Y      : 다시 실행
Ctrl+S      : 프로젝트 저장
Ctrl+O      : 프로젝트 열기
Ctrl+N      : 새 프로젝트
Ctrl+F      : 블록 검색
Esc         : 모달 닫기
↑/↓         : 블록 선택 이동
```

#### 5.4 블록 유효성 검증
**검증 항목:**
- 필수 매개변수 입력 확인
- 데이터 타입 검증
- 범위 형식 검증 (예: "A1:C10")
- 파일 경로 형식 검증

**오류 표시:**
```
┌────────────────────────────────────┐
│ ⚠️ 워크북 열기                      │
│                                    │
│ ❌ 파일경로: [비어있음          ]  │
│    필수 항목입니다.                 │
└────────────────────────────────────┘
```

---

## 데이터 구조

### 1. 블록 정의 (Block Definition)

```typescript
interface BlockDefinition {
  id: string;                    // "1-1", "2-5" 등
  category: string;              // "기본 작업", "셀/범위 조작" 등
  categoryNumber: number;        // 1~15
  blockNumber: number;           // 카테고리 내 순번
  name: string;                  // "새 워크북 만들기"
  color: string;                 // 블록 색상 (hex)
  parameters: Parameter[];       // 매개변수 정의
  codeTemplate: string;          // VBA 코드 템플릿
  description: string;           // 블록 설명
  examples: string[];            // 사용 예시
}

interface Parameter {
  name: string;                  // "파일경로", "시트이름" 등
  type: ParameterType;           // 매개변수 타입
  required: boolean;             // 필수 여부
  defaultValue?: any;            // 기본값
  validation?: ValidationRule;   // 유효성 검증 규칙
  placeholder?: string;          // 입력 힌트
  options?: string[];            // 선택 옵션 (드롭다운용)
}

enum ParameterType {
  STRING = "string",
  NUMBER = "number",
  RANGE = "range",
  BOOLEAN = "boolean",
  ENUM = "enum",
  COLOR = "color",
  FILE_PATH = "file_path"
}

interface ValidationRule {
  pattern?: RegExp;              // 정규식 패턴
  min?: number;                  // 최소값
  max?: number;                  // 최대값
  custom?: (value: any) => boolean;  // 커스텀 검증
  errorMessage: string;          // 오류 메시지
}
```

### 2. 블록 인스턴스 (Block Instance)

```typescript
interface BlockInstance {
  id: string;                    // 고유 ID (UUID)
  blockType: string;             // 블록 정의 ID ("1-2")
  position: number;              // 작업 공간 내 위치 (0부터 시작)
  parameters: { [key: string]: any };  // 매개변수 값
  createdAt: Date;               // 생성 시각
  updatedAt: Date;               // 수정 시각
}
```

### 3. 프로젝트 (Project)

```typescript
interface Project {
  id: string;                    // 프로젝트 ID (UUID)
  name: string;                  // 프로젝트명
  description?: string;          // 설명
  blocks: BlockInstance[];       // 블록 목록
  metadata: ProjectMetadata;     // 메타데이터
  createdAt: Date;               // 생성 시각
  updatedAt: Date;               // 수정 시각
  version: string;               // 버전 (예: "1.0")
}

interface ProjectMetadata {
  tags: string[];                // 태그
  author?: string;               // 작성자
  thumbnail?: string;            // 썸네일 이미지 (base64)
  blockCount: number;            // 블록 개수
  codeLength: number;            // 생성된 코드 라인 수
}
```

### 4. 앱 상태 (Application State)

```typescript
interface AppState {
  currentProject: Project | null;        // 현재 프로젝트
  selectedBlockId: string | null;        // 선택된 블록 ID
  draggedBlock: BlockDefinition | null;  // 드래그 중인 블록
  searchQuery: string;                   // 검색어
  activeCategory: string | null;         // 활성 카테고리
  history: HistoryEntry[];               // 실행 취소/다시 실행용
  historyIndex: number;                  // 현재 히스토리 인덱스
  isDirty: boolean;                      // 저장되지 않은 변경사항 여부
}

interface HistoryEntry {
  type: string;                  // "ADD_BLOCK", "DELETE_BLOCK" 등
  timestamp: Date;               // 시간
  previousState: any;            // 이전 상태
  currentState: any;             // 현재 상태
}
```

---

## 기술 스택

### 1. 프론트엔드

#### 1.1 핵심 기술
```
프레임워크: React 18+ (또는 Vue 3+)
  - 이유: 컴포넌트 기반 개발, 풍부한 생태계
  
언어: TypeScript
  - 이유: 타입 안정성, 개발 생산성

상태 관리: Redux Toolkit (또는 Zustand)
  - 이유: 복잡한 상태 관리 필요

UI 라이브러리: Material-UI 또는 Ant Design
  - 이유: 완성도 높은 컴포넌트 제공

드래그앤드롭: react-beautiful-dnd 또는 dnd-kit
  - 이유: 접근성 및 성능 최적화

코드 에디터: Monaco Editor (VS Code 엔진)
  - 이유: VBA 구문 강조 지원
```

#### 1.2 개발 도구
```
빌드 도구: Vite
번들러: esbuild (Vite 내장)
린터: ESLint
포매터: Prettier
테스트: Jest + React Testing Library
```

### 2. 백엔드 (선택사항)

```
언어: Node.js + Express (또는 Python + FastAPI)
  - 프로젝트 클라우드 저장 시 필요
  
데이터베이스: PostgreSQL (또는 MongoDB)
  - 사용자 프로젝트 저장

인증: JWT 또는 OAuth 2.0
  - 사용자 인증 및 권한 관리
```

### 3. 배포

```
호스팅: Vercel, Netlify, AWS S3 + CloudFront
CDN: Cloudflare
도메인: 사용자 정의 도메인
SSL: Let's Encrypt (자동)
```

### 4. 데이터 저장소

```
로컬 스토리지: IndexedDB (Dexie.js)
  - 큰 프로젝트 데이터 저장
  
세션 스토리지: localStorage
  - 사용자 설정, 최근 프로젝트 목록

클라우드 스토리지: AWS S3 또는 Firebase Storage
  - 백업 및 공유 기능
```

---

## API 설계

### 1. 블록 관리 API (프론트엔드 함수)

```typescript
// 블록 추가
function addBlock(
  blockType: string,
  position: number,
  parameters?: { [key: string]: any }
): BlockInstance;

// 블록 삭제
function deleteBlock(blockId: string): boolean;

// 블록 업데이트
function updateBlock(
  blockId: string,
  updates: Partial<BlockInstance>
): BlockInstance;

// 블록 이동
function moveBlock(blockId: string, newPosition: number): boolean;

// 블록 복사
function duplicateBlock(blockId: string): BlockInstance;

// 블록 가져오기
function getBlock(blockId: string): BlockInstance | null;

// 모든 블록 가져오기
function getAllBlocks(): BlockInstance[];
```

### 2. 코드 생성 API

```typescript
// VBA 코드 생성
function generateVBACode(blocks: BlockInstance[]): string;

// 개별 블록 코드 생성
function generateBlockCode(block: BlockInstance): string;

// 코드 유효성 검사
function validateCode(code: string): ValidationResult;

// 코드 포맷팅
function formatCode(code: string): string;
```

### 3. 프로젝트 관리 API

```typescript
// 프로젝트 생성
function createProject(name: string): Project;

// 프로젝트 저장
function saveProject(project: Project): Promise<boolean>;

// 프로젝트 불러오기
function loadProject(projectId: string): Promise<Project>;

// 프로젝트 목록 가져오기
function getProjects(): Promise<Project[]>;

// 프로젝트 삭제
function deleteProject(projectId: string): Promise<boolean>;

// 프로젝트 내보내기 (JSON)
function exportProject(project: Project): string;

// 프로젝트 가져오기 (JSON)
function importProject(json: string): Project;
```

### 4. 검색 및 필터링 API

```typescript
// 블록 검색
function searchBlocks(query: string): BlockDefinition[];

// 카테고리별 필터링
function filterByCategory(category: string): BlockDefinition[];

// 블록 정의 가져오기
function getBlockDefinition(blockType: string): BlockDefinition | null;

// 모든 블록 정의 가져오기
function getAllBlockDefinitions(): BlockDefinition[];
```

### 5. 유틸리티 API

```typescript
// ID 생성
function generateId(): string;

// 날짜 포맷팅
function formatDate(date: Date): string;

// 파일 다운로드
function downloadFile(content: string, filename: string): void;

// 클립보드 복사
function copyToClipboard(text: string): Promise<boolean>;
```

---

## 블록 데이터 샘플

### 전체 블록 정의 (100개)

블록은 `excel _vba_code_100.md` 파일의 15개 카테고리를 기반으로 구성됩니다.

```typescript
const BLOCK_DEFINITIONS: BlockDefinition[] = [
  // 카테고리 1: 기본 작업 (15개)
  {
    id: "1-1",
    category: "기본 작업",
    categoryNumber: 1,
    blockNumber: 1,
    name: "새 워크북 만들기",
    color: "#2196F3",
    parameters: [],
    codeTemplate: "Workbooks.Add",
    description: "새로운 Excel 워크북을 생성합니다.",
    examples: []
  },
  {
    id: "1-2",
    category: "기본 작업",
    categoryNumber: 1,
    blockNumber: 2,
    name: "워크북 열기",
    color: "#2196F3",
    parameters: [
      {
        name: "파일경로",
        type: ParameterType.FILE_PATH,
        required: true,
        placeholder: "C:\\test.xlsx",
        validation: {
          pattern: /^[A-Za-z]:\\.*\.xlsx?$/,
          errorMessage: "올바른 Excel 파일 경로를 입력하세요."
        }
      }
    ],
    codeTemplate: 'Workbooks.Open Filename:="{파일경로}"',
    description: "지정한 경로의 Excel 워크북을 엽니다.",
    examples: ['Workbooks.Open Filename:="C:\\Data\\Report.xlsx"']
  },
  {
    id: "1-3",
    category: "기본 작업",
    categoryNumber: 1,
    blockNumber: 3,
    name: "워크북 저장하기",
    color: "#2196F3",
    parameters: [],
    codeTemplate: "ActiveWorkbook.Save",
    description: "현재 활성화된 워크북을 저장합니다.",
    examples: []
  },
  
  // 카테고리 2: 셀/범위 조작 (20개)
  {
    id: "2-1",
    category: "셀/범위 조작",
    categoryNumber: 2,
    blockNumber: 1,
    name: "셀 선택하기",
    color: "#4CAF50",
    parameters: [
      {
        name: "범위",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "A1",
        validation: {
          pattern: /^[A-Z]+\d+$/,
          errorMessage: "올바른 셀 주소를 입력하세요 (예: A1, B10)"
        }
      }
    ],
    codeTemplate: 'Range("{범위}").Select',
    description: "지정한 셀을 선택합니다.",
    examples: ['Range("A1").Select', 'Range("C5").Select']
  },
  
  // ... (나머지 98개 블록)
];
```

---

## 개발 로드맵

### Phase 1: MVP (4주)

**목표:** 핵심 기능 구현

**Week 1:**
- [x] 프로젝트 초기 설정
- [ ] UI 레이아웃 구현 (3개 패널)
- [ ] 블록 정의 데이터 구조 설계
- [ ] 블록 라이브러리 패널 UI

**Week 2:**
- [ ] 드래그 앤 드롭 기능 구현
- [ ] 작업 공간 패널 구현
- [ ] 블록 추가/삭제 기능
- [ ] 기본 상태 관리 설정

**Week 3:**
- [ ] 코드 생성 엔진 구현
- [ ] 코드 뷰어 패널 구현
- [ ] 구문 강조 적용
- [ ] 실시간 코드 업데이트

**Week 4:**
- [ ] 블록 편집 모달 구현
- [ ] 매개변수 입력 및 유효성 검증
- [ ] 로컬 스토리지 저장/불러오기
- [ ] 기본 테스트 및 버그 수정

### Phase 2: 고급 기능 (3주)

**Week 5:**
- [ ] 블록 검색 기능
- [ ] 카테고리 필터링
- [ ] 블록 복사/붙여넣기
- [ ] 키보드 단축키 지원

**Week 6:**
- [ ] 실행 취소/다시 실행
- [ ] 예제 갤러리 구현
- [ ] 매뉴얼 페이지 작성
- [ ] 블록 순서 변경 개선

**Week 7:**
- [ ] 프로젝트 관리 UI
- [ ] 프로젝트 메타데이터
- [ ] JSON 내보내기/가져오기
- [ ] 코드 다운로드 기능

### Phase 3: 완성도 향상 (2주)

**Week 8:**
- [ ] 반응형 디자인 최적화
- [ ] 애니메이션 및 전환 효과
- [ ] 접근성 개선 (ARIA)
- [ ] 성능 최적화

**Week 9:**
- [ ] 종합 테스트
- [ ] 사용자 피드백 수집
- [ ] 버그 수정
- [ ] 문서화 완성

### Phase 4: 배포 및 유지보수 (1주)

**Week 10:**
- [ ] 프로덕션 빌드
- [ ] 배포 (Vercel/Netlify)
- [ ] 모니터링 설정
- [ ] 사용자 가이드 발행

### 향후 확장 계획

**Phase 5: 추가 기능 (미래)**
- [ ] 클라우드 동기화
- [ ] 사용자 인증
- [ ] 협업 기능 (공유, 댓글)
- [ ] 블록 마켓플레이스 (커뮤니티 블록)
- [ ] AI 기반 블록 추천
- [ ] 모바일 반응형 지원
- [ ] 다크 모드
- [ ] 다국어 지원 (영어, 일본어)
- [ ] Excel 애드인 버전 개발
- [ ] 매크로 실행 환경 (샌드박스)

---

## 개발 가이드라인

### 1. 코드 스타일

**파일 구조:**
```
src/
├── components/           # React 컴포넌트
│   ├── BlockLibrary/     # 블록 라이브러리 패널
│   ├── Workspace/        # 작업 공간 패널
│   ├── CodeViewer/       # 코드 뷰어 패널
│   ├── BlockEditor/      # 블록 편집 모달
│   └── common/           # 공통 컴포넌트
├── data/                 # 블록 정의 데이터
│   └── blockDefinitions.ts
├── hooks/                # 커스텀 훅
├── services/             # 비즈니스 로직
│   ├── blockService.ts
│   ├── codeGenerator.ts
│   └── projectService.ts
├── store/                # 상태 관리
│   ├── slices/
│   └── store.ts
├── types/                # TypeScript 타입 정의
├── utils/                # 유틸리티 함수
└── styles/               # 전역 스타일
```

**네이밍 컨벤션:**
- 컴포넌트: PascalCase (예: BlockLibrary.tsx)
- 함수/변수: camelCase (예: generateCode)
- 상수: UPPER_SNAKE_CASE (예: MAX_BLOCKS)
- 타입/인터페이스: PascalCase (예: BlockInstance)

### 2. 성능 최적화

**고려사항:**
- 가상 스크롤 (블록 목록이 많을 때)
- 메모이제이션 (React.memo, useMemo)
- 코드 분할 (lazy loading)
- 디바운싱 (검색, 실시간 코드 생성)
- Web Worker (복잡한 코드 생성)

### 3. 접근성

**요구사항:**
- 키보드 네비게이션 지원
- ARIA 레이블 적용
- 포커스 관리
- 스크린 리더 지원
- 충분한 색상 대비

### 4. 테스트

**테스트 전략:**
- 단위 테스트: 비즈니스 로직, 유틸리티 함수
- 컴포넌트 테스트: UI 컴포넌트
- 통합 테스트: 드래그앤드롭, 코드 생성
- E2E 테스트: 주요 사용자 플로우

---

## 보안 고려사항

### 1. 입력 검증
- 모든 사용자 입력은 클라이언트 측에서 검증
- XSS 공격 방지 (입력 이스케이프)
- 파일 경로 검증 (경로 탐색 공격 방지)

### 2. 데이터 보호
- 로컬 스토리지 데이터 암호화 (선택)
- 민감한 정보 저장 금지
- HTTPS 강제 (프로덕션)

### 3. 코드 실행
- 생성된 VBA 코드는 웹앱에서 직접 실행하지 않음
- 사용자가 Excel에서 수동으로 실행
- 위험한 코드 패턴 경고

---

## 사용자 경험 (UX) 개선사항

### 1. 온보딩
- 첫 방문 시 간단한 튜토리얼
- 예제 프로젝트 자동 로드 옵션
- 도움말 툴팁

### 2. 피드백
- 드래그 중 시각적 피드백
- 작업 완료 알림 (토스트)
- 오류 메시지 명확화

### 3. 편의성
- 자주 사용하는 블록 즐겨찾기
- 최근 사용한 블록 표시
- 블록 그룹화 (폴더)

### 4. 반응성
- 로딩 인디케이터
- 낙관적 업데이트 (Optimistic UI)
- 부드러운 애니메이션

---

## 문서화

### 1. 사용자 문서
- 시작 가이드
- 기능별 튜토리얼
- FAQ
- 문제 해결 가이드

### 2. 개발자 문서
- 아키텍처 문서
- API 레퍼런스
- 기여 가이드
- 변경 로그

### 3. 블록 문서
- 각 블록별 상세 설명
- 매개변수 설명
- 사용 예제
- 주의사항

---

## 마무리

이 스펙 문서는 Excel VBA 매크로 블록 코딩 시스템 웹앱의 전체적인 설계와 구현 방향을 제시합니다. 

### 핵심 특징 요약:
1. ✅ 100개의 VBA 매크로를 15개 카테고리로 구조화
2. ✅ 직관적인 3개 패널 UI (블록 라이브러리, 작업 공간, 코드 뷰어)
3. ✅ 드래그 앤 드롭 기반 블록 조립
4. ✅ 실시간 VBA 코드 생성 및 미리보기
5. ✅ 블록 편집, 복사, 삭제, 순서 변경 기능
6. ✅ 프로젝트 저장/불러오기
7. ✅ 매뉴얼 및 예제 제공
8. ✅ 키보드 단축키 지원

### 다음 단계:
1. 개발팀 구성 및 역할 분담
2. 디자인 목업 작성 (Figma 등)
3. Phase 1 MVP 개발 시작
4. 사용자 테스트 및 피드백 수집
5. 반복적 개선 및 기능 추가

이 웹앱은 Excel 자동화를 민주화하고, VBA 학습 장벽을 낮추며, 업무 생산성을 크게 향상시킬 것입니다.
