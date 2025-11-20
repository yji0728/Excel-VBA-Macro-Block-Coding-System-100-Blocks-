/**
 * Sample block definitions for VBA Block Coding System
 * 13 blocks from 3 categories (Category 1: 5 blocks, Category 2: 5 blocks, Category 8: 3 blocks)
 */

import { BlockDefinition, ParameterType } from '../types/block';

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  // Category 1: Basic Operations (기본 작업) - 5 blocks
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
    examples: ["Workbooks.Add"]
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
          pattern: /^[A-Za-z]:\\.*\.(xlsx?|xlsm)$/,
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
    examples: ["ActiveWorkbook.Save"]
  },
  {
    id: "1-4",
    category: "기본 작업",
    categoryNumber: 1,
    blockNumber: 4,
    name: "워크북 다른 이름으로 저장",
    color: "#2196F3",
    parameters: [
      {
        name: "파일경로",
        type: ParameterType.FILE_PATH,
        required: true,
        placeholder: "C:\\saved.xlsx"
      }
    ],
    codeTemplate: 'ActiveWorkbook.SaveAs Filename:="{파일경로}"',
    description: "현재 워크북을 다른 이름으로 저장합니다.",
    examples: ['ActiveWorkbook.SaveAs Filename:="C:\\NewReport.xlsx"']
  },
  {
    id: "1-5",
    category: "기본 작업",
    categoryNumber: 1,
    blockNumber: 5,
    name: "시트 선택하기",
    color: "#2196F3",
    parameters: [
      {
        name: "시트이름",
        type: ParameterType.STRING,
        required: true,
        placeholder: "Sheet1"
      }
    ],
    codeTemplate: 'Sheets("{시트이름}").Select',
    description: "지정한 시트를 선택합니다.",
    examples: ['Sheets("Sheet1").Select', 'Sheets("Data").Select']
  },

  // Category 2: Cell/Range Operations (셀/범위 조작) - 5 blocks
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
          pattern: /^[A-Z]+\d+(:[A-Z]+\d+)?$/,
          errorMessage: "올바른 셀 주소를 입력하세요 (예: A1, A1:C10)"
        }
      }
    ],
    codeTemplate: 'Range("{범위}").Select',
    description: "지정한 셀 또는 범위를 선택합니다.",
    examples: ['Range("A1").Select', 'Range("A1:C10").Select']
  },
  {
    id: "2-2",
    category: "셀/범위 조작",
    categoryNumber: 2,
    blockNumber: 2,
    name: "셀 값 쓰기",
    color: "#4CAF50",
    parameters: [
      {
        name: "셀",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "A1"
      },
      {
        name: "값",
        type: ParameterType.STRING,
        required: true,
        placeholder: "Hello"
      }
    ],
    codeTemplate: 'Range("{셀}").Value = "{값}"',
    description: "지정한 셀에 값을 씁니다.",
    examples: ['Range("A1").Value = "Hello"', 'Range("B5").Value = "100"']
  },
  {
    id: "2-3",
    category: "셀/범위 조작",
    categoryNumber: 2,
    blockNumber: 3,
    name: "셀 값 읽기",
    color: "#4CAF50",
    parameters: [
      {
        name: "셀",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "A1"
      },
      {
        name: "변수명",
        type: ParameterType.STRING,
        required: true,
        placeholder: "myValue"
      }
    ],
    codeTemplate: 'Dim {변수명} As Variant\n{변수명} = Range("{셀}").Value',
    description: "지정한 셀의 값을 읽어 변수에 저장합니다.",
    examples: ['Dim myValue As Variant\nmyValue = Range("A1").Value']
  },
  {
    id: "2-4",
    category: "셀/범위 조작",
    categoryNumber: 2,
    blockNumber: 4,
    name: "범위 복사하기",
    color: "#4CAF50",
    parameters: [
      {
        name: "원본범위",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "A1:C10"
      },
      {
        name: "대상셀",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "E1"
      }
    ],
    codeTemplate: 'Range("{원본범위}").Copy Destination:=Range("{대상셀}")',
    description: "지정한 범위를 다른 위치로 복사합니다.",
    examples: ['Range("A1:C10").Copy Destination:=Range("E1")']
  },
  {
    id: "2-5",
    category: "셀/범위 조작",
    categoryNumber: 2,
    blockNumber: 5,
    name: "셀 색상 변경",
    color: "#4CAF50",
    parameters: [
      {
        name: "범위",
        type: ParameterType.RANGE,
        required: true,
        placeholder: "A1:C10"
      },
      {
        name: "색상코드",
        type: ParameterType.NUMBER,
        required: true,
        placeholder: "255",
        validation: {
          min: 0,
          max: 16777215,
          errorMessage: "색상 코드는 0~16777215 사이의 값이어야 합니다."
        }
      }
    ],
    codeTemplate: 'Range("{범위}").Interior.Color = {색상코드}',
    description: "지정한 범위의 배경색을 변경합니다.",
    examples: ['Range("A1:C10").Interior.Color = 255']
  },

  // Category 8: Loop/Repeat (루프/반복) - 3 blocks
  {
    id: "8-1",
    category: "루프/반복",
    categoryNumber: 8,
    blockNumber: 1,
    name: "For 반복문 시작",
    color: "#FFC107",
    parameters: [
      {
        name: "변수명",
        type: ParameterType.STRING,
        required: true,
        placeholder: "i"
      },
      {
        name: "시작값",
        type: ParameterType.NUMBER,
        required: true,
        placeholder: "1"
      },
      {
        name: "끝값",
        type: ParameterType.NUMBER,
        required: true,
        placeholder: "10"
      }
    ],
    codeTemplate: 'For {변수명} = {시작값} To {끝값}',
    description: "지정한 횟수만큼 반복하는 For 루프를 시작합니다.",
    examples: ['For i = 1 To 10', 'For row = 2 To 100']
  },
  {
    id: "8-2",
    category: "루프/반복",
    categoryNumber: 8,
    blockNumber: 2,
    name: "Next (반복문 종료)",
    color: "#FFC107",
    parameters: [
      {
        name: "변수명",
        type: ParameterType.STRING,
        required: false,
        placeholder: "i"
      }
    ],
    codeTemplate: 'Next {변수명}',
    description: "For 반복문을 종료합니다.",
    examples: ['Next i', 'Next']
  },
  {
    id: "8-3",
    category: "루프/반복",
    categoryNumber: 8,
    blockNumber: 3,
    name: "마지막 행 번호 찾기",
    color: "#FFC107",
    parameters: [
      {
        name: "열",
        type: ParameterType.STRING,
        required: true,
        placeholder: "A"
      },
      {
        name: "변수명",
        type: ParameterType.STRING,
        required: true,
        placeholder: "lastRow"
      }
    ],
    codeTemplate: 'Dim {변수명} As Long\n{변수명} = Cells(Rows.Count, "{열}").End(xlUp).Row',
    description: "지정한 열의 마지막 데이터가 있는 행 번호를 찾습니다.",
    examples: ['Dim lastRow As Long\nlastRow = Cells(Rows.Count, "A").End(xlUp).Row']
  }
];

// Category mapping for easy lookup
export const CATEGORIES = [
  { number: 1, name: "기본 작업", color: "#2196F3", icon: "📁" },
  { number: 2, name: "셀/범위 조작", color: "#4CAF50", icon: "📊" },
  { number: 3, name: "데이터 입력/수정", color: "#9C27B0", icon: "✏️" },
  { number: 4, name: "포맷팅", color: "#795548", icon: "🎨" },
  { number: 5, name: "검색/찾기", color: "#FF5722", icon: "🔍" },
  { number: 6, name: "정렬/필터", color: "#00BCD4", icon: "🔄" },
  { number: 7, name: "수식/계산", color: "#8BC34A", icon: "🔢" },
  { number: 8, name: "루프/반복", color: "#FFC107", icon: "🔁" },
  { number: 9, name: "조건문", color: "#FF9800", icon: "🔀" },
  { number: 10, name: "변수/데이터", color: "#9E9E9E", icon: "💾" },
  { number: 11, name: "메시지/입력", color: "#03A9F4", icon: "💬" },
  { number: 12, name: "그래프/차트", color: "#E91E63", icon: "📈" },
  { number: 13, name: "프린트/내보내기", color: "#607D8B", icon: "🖨️" },
  { number: 14, name: "고급 기능", color: "#673AB7", icon: "⚙️" },
  { number: 15, name: "오류 처리/기타", color: "#F44336", icon: "⚠️" }
];

// Helper function to get blocks by category
export const getBlocksByCategory = (categoryNumber: number): BlockDefinition[] => {
  return BLOCK_DEFINITIONS.filter(block => block.categoryNumber === categoryNumber);
};

// Helper function to get block by ID
export const getBlockById = (id: string): BlockDefinition | undefined => {
  return BLOCK_DEFINITIONS.find(block => block.id === id);
};
