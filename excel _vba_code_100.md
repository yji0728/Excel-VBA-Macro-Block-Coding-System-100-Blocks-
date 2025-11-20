# 엑셀 VBA 매크로 블록 코딩 시스템 (100개 블록)

## 📋 시스템 구조 설명

3개 웹UI 창 구성:

1. 블록 라이브러리 창: 카테고리별 블록 목록 + 코드 미리보기
2. 작업 공간: 드래그앤드롭으로 블록 조립 영역
3. 코드 생성 창: 실시간 VBA 코드 변환 및 복사 기능

***

## 🎨 블록 카테고리별 100개 기능

### 1. 기본 작업 (15개)

| 번호   | 블록 이름          | 매개변수                      | 생성 VBA 코드                                                     |
| ---- | -------------- | ------------------------- | ------------------------------------------------------------- |
| 1-1  | 새 워크북 만들기      | (없음)                      | ​Workbooks.Add​                                               |
| 1-2  | 워크북 열기         | 파일경로(C:\test.xlsx)        | ​Workbooks.Open Filename:="\[파일경로]"​                          |
| 1-3  | 워크북 저장하기       | (없음)                      | ​ActiveWorkbook.Save​                                         |
| 1-4  | 다른 이름으로 저장     | 파일경로(C:\new.xlsx)         | ​ActiveWorkbook.SaveAs Filename:="\[파일경로]"​                   |
| 1-5  | 워크북 닫기         | 저장여부(예/아니오)               | ​ActiveWorkbook.Close SaveChanges:=True/False​                |
| 1-6  | 현재 워크북 이름 가져오기 | 변수명(wbName)               | ​\[변수명] = ActiveWorkbook.Name​                                |
| 1-7  | 새 시트 추가        | 시트이름(Sheet1), 위치(앞/뒤)     | ​Sheets.Add(Before/After:=...).Name="\[시트이름]"​                |
| 1-8  | 시트 선택하기        | 시트이름(Sheet1)              | ​Sheets("\[시트이름]").Select​                                    |
| 1-9  | 시트 이름 바꾸기      | 새이름(Data)                 | ​ActiveSheet.Name = "\[새이름]"​                                 |
| 1-10 | 시트 삭제하기        | 시트이름(Sheet1), 확인(예/아니오)   | ​Application.DisplayAlerts=False: Sheets("\[시트이름]").Delete​   |
| 1-11 | 시트 복사하기        | 대상시트(Sheet2), 위치(앞/뒤)     | ​ActiveSheet.Copy Before/After:=Sheets("\[대상시트]")​            |
| 1-12 | 시트 이동하기        | 대상시트(Sheet2), 위치(앞/뒤)     | ​ActiveSheet.Move Before/After:=Sheets("\[대상시트]")​            |
| 1-13 | 시트 숨기기         | 시트이름(Sheet1), 숨김형식(일반/매우) | ​Sheets("\[시트이름]").Visible = xlSheetHidden/xlSheetVeryHidden​ |
| 1-14 | 숨긴 시트 보이기      | 시트이름(Sheet1)              | ​Sheets("\[시트이름]").Visible = xlSheetVisible​                  |
| 1-15 | 마지막 행 번호 찾기    | 열(A), 변수명(lastRow)        | ​\[변수명] = Cells(Rows.Count, "\[열]").End(xlUp).Row​            |

***

### 2. 셀/범위 조작 (20개)

| 번호   | 블록 이름            | 매개변수                            | 생성 VBA 코드                                                    |
| ---- | ---------------- | ------------------------------- | ------------------------------------------------------------ |
| 2-1  | 셀 선택하기           | 범위(A1)                          | ​Range("\[범위]").Select​                                      |
| 2-2  | 범위 지정하기          | 시작(A1), 끝(C10), 변수명(rng)        | ​Set \[변수명] = Range("\[시작]:\[끝]")​                           |
| 2-3  | 행 선택하기           | 행번호(5)                          | ​Rows(\[행번호]).Select​                                        |
| 2-4  | 열 선택하기           | 열번호/문자(3/C)                     | ​Columns(\[열번호]).Select​                                     |
| 2-5  | 현재 셀 주소 가져오기     | 변수명(cellAddr)                   | ​\[변수명] = ActiveCell.Address​                                |
| 2-6  | 셀 값 읽기           | 셀(A1), 변수명(value)               | ​\[변수명] = Range("\[셀]").Value​                               |
| 2-7  | 셀 값 쓰기           | 셀(A1), 값(Hello)                 | ​Range("\[셀]").Value = "\[값]"​                               |
| 2-8  | 범위 값 한꺼번에 쓰기     | 범위(A1:C3), 값(1,2,3;4,5,6;7,8,9) | ​Range("\[범위]").Value = Array(Array(...))​                   |
| 2-9  | 셀 복사하기           | 원본(A1), 대상(B1)                  | ​Range("\[원본]").Copy Destination:=Range("\[대상]")​            |
| 2-10 | 셀 잘라내기           | 범위(A1:A10)                      | ​Range("\[범위]").Cut​                                         |
| 2-11 | 셀 붙여넣기           | (없음)                            | ​ActiveSheet.Paste​                                          |
| 2-12 | 특수붙여넣기-값만        | (없음)                            | ​Selection.PasteSpecial Paste:=xlPasteValues​                |
| 2-13 | 셀 지우기-내용만        | 범위(A1:A10)                      | ​Range("\[범위]").ClearContents​                               |
| 2-14 | 셀 지우기-서식만        | 범위(A1:A10)                      | ​Range("\[범위]").ClearFormats​                                |
| 2-15 | 셀 지우기-전체         | 범위(A1:A10)                      | ​Range("\[범위]").Clear​                                       |
| 2-16 | 빈 셀 찾기           | 범위(A1:C10), 변수명(blankCell)      | ​Set \[변수명] = Range("\[범위]").SpecialCells(xlCellTypeBlanks)​ |
| 2-17 | 데이터가 있는 마지막 셀 찾기 | (없음), 변수명(lastCell)             | ​Set \[변수명] = Cells.Find("\*",,,,,xlPrevious)​               |
| 2-18 | 범위 합치기           | 범위(A1:C3)                       | ​Range("\[범위]").Merge​                                       |
| 2-19 | 셀 합치기 해제         | 범위(A1:C3)                       | ​Range("\[범위]").UnMerge​                                     |
| 2-20 | 현재 선택 영역 확장      | 방향(위/아래/좌/우)                    | ​Selection.End(xl\[방향]).Select​                              |

***

### 3. 데이터 입력/수정 (10개)

| 번호   | 블록 이름     | 매개변수                               | 생성 VBA 코드                                                                  |
| ---- | --------- | ---------------------------------- | -------------------------------------------------------------------------- |
| 3-1  | 현재 날짜 입력  | 셀(A1)                              | ​Range("\[셀]").Value = Date​                                               |
| 3-2  | 현재 시간 입력  | 셀(A1)                              | ​Range("\[셀]").Value = Time​                                               |
| 3-3  | 시퀀스 번호 생성 | 범위(A1:A10), 시작값(1), 간격(1)          | ​Range("\[범위]").DataSeries Rowcol:=xlColumns, Type:=xlLinear, Step:=\[간격]​ |
| 3-4  | 무작위 숫자 생성 | 범위(A1:A10), 최소(1), 최대(100)         | ​Range("\[셀]").Value = WorksheetFunction.RandBetween(\[최소],\[최대])​         |
| 3-5  | 대문자로 변환   | 범위(A1:A10)                         | ​Range("\[범위]").Value = UCase(Range("\[범위]").Value)​                       |
| 3-6  | 소문자로 변환   | 범위(A1:A10)                         | ​Range("\[범위]").Value = LCase(Range("\[범위]").Value)​                       |
| 3-7  | 앞뒤 공백 제거  | 범위(A1:A10)                         | ​Range("\[범위]").Value = Trim(Range("\[범위]").Value)​                        |
| 3-8  | 텍스트 자르기   | 범위(A1), 시작위치(1), 길이(5), 대상(B1)     | ​Range("\[대상]").Value = Mid(Range("\[범위]").Value, \[시작], \[길이])​           |
| 3-9  | 텍스트 바꾸기   | 범위(A1:A10), 찾을텍스트(Old), 바꿀텍스트(New) | ​Range("\[범위]").Replace What:="\[찾을]", Replacement:="\[바꿀]"​               |
| 3-10 | 셀 값 더하기   | 대상(A1), 값(10)                      | ​Range("\[대상]").Value = Range("\[대상]").Value + \[값]​                       |

***

### 4. 포맷팅 (12개)

| 번호   | 블록 이름     | 매개변수                       | 생성 VBA 코드                                                     |
| ---- | --------- | -------------------------- | ------------------------------------------------------------- |
| 4-1  | 글꼴 변경     | 범위(A1:A10), 글꼴(맑은 고딕)      | ​Range("\[범위]").Font.Name = "\[글꼴]"​                          |
| 4-2  | 글자 크기 변경  | 범위(A1:A10), 크기(11)         | ​Range("\[범위]").Font.Size = \[크기]​                            |
| 4-3  | 글자 굵게     | 범위(A1:A10), 적용(예/아니오)      | ​Range("\[범위]").Font.Bold = True/False​                       |
| 4-4  | 글자 기울임    | 범위(A1:A10), 적용(예/아니오)      | ​Range("\[범위]").Font.Italic = True/False​                     |
| 4-5  | 밑줄 긋기     | 범위(A1:A10), 적용(예/아니오)      | ​Range("\[범위]").Font.Underline = xlUnderlineStyleSingle/None​ |
| 4-6  | 글자 색상 변경  | 범위(A1:A10), 색상(빨강/FF0000)  | ​Range("\[범위]").Font.Color = RGB(255,0,0)​                    |
| 4-7  | 배경 색상 변경  | 범위(A1:A10), 색상(노랑)         | ​Range("\[범위]").Interior.Color = RGB(255,255,0)​              |
| 4-8  | 테두리 그리기   | 범위(A1:C3), 스타일(실선), 두께(보통) | ​Range("\[범위]").Borders.LineStyle = xlContinuous​             |
| 4-9  | 테두리 지우기   | 범위(A1:C3)                  | ​Range("\[범위]").Borders.LineStyle = xlLineStyleNone​          |
| 4-10 | 셀 너비 조정   | 열(A), 너비(15)               | ​Columns("\[열]").ColumnWidth = \[너비]​                         |
| 4-11 | 셀 높이 조정   | 행(5), 높이(20)               | ​Rows(\[행]).RowHeight = \[높이]​                                |
| 4-12 | 자동 너비 맞추기 | 범위(A:C)                    | ​Columns("\[범위]").AutoFit​                                    |

***

### 5. 검색/찾기 (8개)

| 번호  | 블록 이름          | 매개변수                                 | 생성 VBA 코드                                                                                       |
| --- | -------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| 5-1 | 특정 값 찾기        | 범위(A1:C10), 찾을값(Data), 변수명(found)    | ​Set \[변수명] = Range("\[범위]").Find("\[찾을값]")​                                                    |
| 5-2 | 모든 찾기 결과 가져오기  | 범위(A1:C10), 찾을값(Data), 변수명(allFound) | ​Set \[변수명] = Range("\[범위]").Find("\[찾을값]"): Do While...​                                       |
| 5-3 | 조건에 맞는 셀 찾기    | 범위(A1:C10), 조건(>100), 변수명(cells)     | ​Set \[변수명] = Range("\[범위]").Find(What:="\*", SearchFormat:=True)​                              |
| 5-4 | VLOOKUP 함수 실행  | 찾을값(A1), 범위(B1:D10), 열(3), 정확(True)  | ​Range("\[대상]").Value = WorksheetFunction.VLookup(\[찾을값], Range("\[범위]"), \[열], \[정확])​         |
| 5-5 | HLOOKUP 함수 실행  | 찾을값(A1), 범위(B1:D10), 행(2), 정확(True)  | ​Range("\[대상]").Value = WorksheetFunction.HLookup(...)​                                         |
| 5-6 | INDEX+MATCH 조합 | 찾을값(A1), 검색범위(B1:B10), 반환범위(C1:C10)  | ​Range("\[대상]").Value = WorksheetFunction.Index(...)​                                           |
| 5-7 | 중복값 찾기         | 범위(A1:A10), 변수명(dupes)               | ​Set \[변수명] = Range("\[범위]").SpecialCells(xlCellTypeConstants)​                                 |
| 5-8 | 고유값 추출         | 범위(A1:A10), 대상(B1)                   | ​Range("\[범위]").AdvancedFilter Action:=xlFilterCopy, CopyToRange:=Range("\[대상]"), Unique:=True​ |

***

### 6. 정렬/필터 (6개)

| 번호  | 블록 이름    | 매개변수                         | 생성 VBA 코드                                                                        |
| --- | -------- | ---------------------------- | -------------------------------------------------------------------------------- |
| 6-1 | 오름차순 정렬  | 범위(A1:C10), 키(A1), 헤더(예/아니오) | ​Range("\[범위]").Sort Key1:=Range("\[키]"), Order1:=xlAscending, Header:=xlYes/No​ |
| 6-2 | 내림차순 정렬  | 범위(A1:C10), 키(A1), 헤더(예/아니오) | ​Range("\[범위]").Sort Key1:=Range("\[키]"), Order1:=xlDescending​                  |
| 6-3 | 다중 조건 정렬 | 범위(A1:C10), 키1(A1), 키2(B1)   | ​Range("\[범위]").Sort Key1:=Range("\[키1]"), Key2:=Range("\[키2]")​                 |
| 6-4 | 자동 필터 켜기 | 범위(A1:C10)                   | ​Range("\[범위]").AutoFilter​                                                      |
| 6-5 | 자동 필터 끄기 | (없음)                         | ​ActiveSheet.AutoFilterMode = False​                                             |
| 6-6 | 필터 적용    | 범위(A1:C10), 필드(1), 조건(=100)  | ​Range("\[범위]").AutoFilter Field:=\[필드], Criteria1:="\[조건]"​                     |

***

### 7. 수식/계산 (8개)

| 번호  | 블록 이름      | 매개변수                                | 생성 VBA 코드                                                          |
| --- | ---------- | ----------------------------------- | ------------------------------------------------------------------ |
| 7-1 | SUM 함수     | 범위(A1:A10), 대상(B1)                  | ​Range("\[대상]").Value = WorksheetFunction.Sum(Range("\[범위]"))​     |
| 7-2 | AVERAGE 함수 | 범위(A1:A10), 대상(B1)                  | ​Range("\[대상]").Value = WorksheetFunction.Average(Range("\[범위]"))​ |
| 7-3 | COUNT 함수   | 범위(A1:A10), 대상(B1)                  | ​Range("\[대상]").Value = WorksheetFunction.Count(Range("\[범위]"))​   |
| 7-4 | MAX 함수     | 범위(A1:A10), 대상(B1)                  | ​Range("\[대상]").Value = WorksheetFunction.Max(Range("\[범위]"))​     |
| 7-5 | MIN 함수     | 범위(A1:A10), 대상(B1)                  | ​Range("\[대상]").Value = WorksheetFunction.Min(Range("\[범위]"))​     |
| 7-6 | IF 함수      | 조건(A1>10), 참값(Yes), 거짓값(No), 대상(B1) | ​Range("\[대상]").Value = IIf(\[조건], "\[참값]", "\[거짓값]")​             |
| 7-7 | 수식 입력      | 셀(B1), 수식(=SUM(A1:A10))             | ​Range("\[셀]").Formula = "\[수식]"​                                  |
| 7-8 | 수식 값만 붙여넣기 | 범위(B1:B10)                          | ​Range("\[범위]").Value = Range("\[범위]").Value​                      |

***

### 8. 루프/반복 (8개)

| 번호  | 블록 이름           | 매개변수                 | 생성 VBA 코드                          |
| --- | --------------- | -------------------- | ---------------------------------- |
| 8-1 | For 반복문 시작      | 변수(i), 시작(1), 끝(10)  | ​For \[변수] = \[시작] To \[끝]​        |
| 8-2 | For Each 반복문 시작 | 변수(cell), 범위(A1:A10) | ​For Each \[변수] In Range("\[범위]")​ |
| 8-3 | While 반복문 시작    | 조건(i < 10)           | ​Do While \[조건]​                   |
| 8-4 | 루프 건너뛰기         | (없음)                 | ​Continue For​                     |
| 8-5 | 루프 종료           | (없음)                 | ​Exit For / Exit Do​               |
| 8-6 | 반복문 끝           | (없음)                 | ​Next \[변수] / Loop​                |
| 8-7 | 1씩 증가           | 변수(i)                | ​\[변수] = \[변수] + 1​                |
| 8-8 | 1씩 감소           | 변수(i)                | ​\[변수] = \[변수] - 1​                |

***

### 9. 조건문 (6개)

| 번호  | 블록 이름          | 매개변수            | 생성 VBA 코드           |
| --- | -------------- | --------------- | ------------------- |
| 9-1 | If 조건 시작       | 조건(A1 > 10)     | ​If \[조건] Then​     |
| 9-2 | Else If 추가     | 조건(A1 < 5)      | ​ElseIf \[조건] Then​ |
| 9-3 | Else 추가        | (없음)            | ​Else​              |
| 9-4 | If 조건 끝        | (없음)            | ​End If​            |
| 9-5 | Select Case 시작 | 변수(i)           | ​Select Case \[변수]​ |
| 9-6 | Case 값 지정      | 값(1) / 값(2,3,4) | ​Case \[값]​         |

***

### 10. 변수/데이터 (7개)

| 번호   | 블록 이름    | 매개변수                        | 생성 VBA 코드                                 |
| ---- | -------- | --------------------------- | ----------------------------------------- |
| 10-1 | 변수 선언-숫자 | 변수명(num), 초기값(0)            | ​Dim \[변수명] As Long: \[변수명] = \[초기값]​     |
| 10-2 | 변수 선언-문자 | 변수명(txt), 초기값(Hello)        | ​Dim \[변수명] As String: \[변수명] = "\[초기값]"​ |
| 10-3 | 변수 선언-범위 | 변수명(rng)                    | ​Dim \[변수명] As Range​                     |
| 10-4 | 변수에 값 저장 | 변수명(num), 값(100)            | ​\[변수명] = \[값]​                           |
| 10-5 | 배열 선언    | 변수명(arr), 크기(10)            | ​Dim \[변수명]\(1 To \[크기]) As Variant​      |
| 10-6 | 배열 값 저장  | 배열(arr), 인덱스(1), 값(Data)    | ​\[배열]\(\[인덱스]) = "\[값]"​                 |
| 10-7 | 배열 값 읽기  | 배열(arr), 인덱스(1), 변수명(value) | ​\[변수명] = \[배열]\(\[인덱스])​                 |

***

### 11. 메시지/입력 (6개)

| 번호   | 블록 이름        | 매개변수                   | 생성 VBA 코드                                                   |
| ---- | ------------ | ---------------------- | ----------------------------------------------------------- |
| 11-1 | 메시지 박스 보이기   | 메시지(완료!), 버튼(확인/예/아니오) | ​MsgBox "\[메시지]", vbOKOnly/vbYesNo​                         |
| 11-2 | 입력 박스 보이기    | 메시지(값 입력), 변수명(input)  | ​\[변수명] = InputBox("\[메시지]")​                               |
| 11-3 | 상태 표시줄 메시지   | 메시지(처리중...)            | ​Application.StatusBar = "\[메시지]"​                          |
| 11-4 | 상태 표시줄 초기화   | (없음)                   | ​Application.StatusBar = False​                             |
| 11-5 | 진행률 표시줄 시작   | 최대값(100)               | ​Application.ScreenUpdating = False​                        |
| 11-6 | 진행률 표시줄 업데이트 | 현재값(i)                 | ​Application.StatusBar = "진행률: " & (\[현재값]/100)\*100 & "%"​ |

***

### 12. 그래프/차트 (6개)

| 번호   | 블록 이름        | 매개변수                           | 생성 VBA 코드                                                               |
| ---- | ------------ | ------------------------------ | ----------------------------------------------------------------------- |
| 12-1 | 차트 생성        | 범위(A1:B10), 타입(막대/꺾은선), 위치(D1) | ​ActiveSheet.Shapes.AddChart2(201).Chart.SetSourceData Range("\[범위]")​  |
| 12-2 | 차트 제목 설정     | 차트(Chart1), 제목(매출)             | ​ActiveSheet.ChartObjects("\[차트]").Chart.ChartTitle.Text = "\[제목]"​     |
| 12-3 | 차트 축 설정      | 차트(Chart1), 축(X/Y), 제목(월)      | ​ActiveChart.Axes(xlCategory).AxisTitle.Text = "\[제목]"​                 |
| 12-4 | 차트 위치 이동     | 차트(Chart1), 시트(Sheet2), 위치(D1) | ​ActiveSheet.ChartObjects("\[차트]").Cut: Sheets("\[시트]").Paste​          |
| 12-5 | 차트 삭제        | 차트(Chart1)                     | ​ActiveSheet.ChartObjects("\[차트]").Delete​                              |
| 12-6 | 차트 데이터 범위 변경 | 차트(Chart1), 새범위(A1:C10)        | ​ActiveSheet.ChartObjects("\[차트]").Chart.SetSourceData Range("\[새범위]")​ |

***

### 13. 프린트/내보내기 (4개)

| 번호   | 블록 이름     | 매개변수                | 생성 VBA 코드                                                              |
| ---- | --------- | ------------------- | ---------------------------------------------------------------------- |
| 13-1 | 인쇄 영역 설정  | 범위(A1:C10)          | ​ActiveSheet.PageSetup.PrintArea = "\[범위]"​                            |
| 13-2 | PDF로 내보내기 | 파일경로(C:\report.pdf) | ​ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, Filename:="\[파일경로]"​ |
| 13-3 | 인쇄 미리보기   | (없음)                | ​ActiveSheet.PrintPreview​                                             |
| 13-4 | 인쇄 실행     | 부수(1)               | ​ActiveSheet.PrintOut Copies:=\[부수]​                                   |

***

### 14. 고급 기능 (8개)

| 번호   | 블록 이름       | 매개변수                            | 생성 VBA 코드                                                                                       |
| ---- | ----------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| 14-1 | 피벗 테이블 생성   | 데이터범위(A1:C100), 위치(E1)          | ​ActiveSheet.PivotTableWizard SourceData:=Range("\[데이터범위]")​                                    |
| 14-2 | 피벗 필드 추가    | 테이블(PivotTable1), 필드(제품), 영역(행) | ​ActiveSheet.PivotTables("\[테이블]").PivotFields("\[필드]").Orientation = xlRowField​               |
| 14-3 | 데이터 유효성 검사  | 범위(A1:A10), 유형(목록), 값(Yes,No)   | ​Range("\[범위]").Validation.Add Type:=xlValidateList, Formula1:="\[값]"​                          |
| 14-4 | 조건부 서식      | 범위(A1:A10), 조건(>100), 스타일(빨강)   | ​Range("\[범위]").FormatConditions.Add Type:=xlCellValue, Operator:=xlGreater, Formula1:="\[조건]"​ |
| 15-5 | 하이퍼링크 추가    | 셀(A1), 주소(C:\file.pdf), 텍스트(클릭) | ​ActiveSheet.Hyperlinks.Add Range("\[셀]"), "\[주소]", TextToDisplay:="\[텍스트]"​                    |
| 14-6 | 외부 데이터 가져오기 | 연결문자열, SQL, 대상(A1)              | ​ActiveSheet.QueryTables.Add Connection:="\[연결]", Destination:=Range("\[대상]")​                  |
| 14-7 | API 호출      | URL, 변수명(response)              | ​Set xml = CreateObject("MSXML2.XMLHTTP"): xml.Open "GET", "\[URL]"​                            |
| 14-8 | JSON 파싱     | JSON문자열, 변수명(data)              | ​Set json = CreateObject("ScriptControl"): json.Language = "JScript"​                           |

***

### 15. 오류 처리/기타 (2개)

| 번호   | 블록 이름    | 매개변수 | 생성 VBA 코드                                           |
| ---- | -------- | ---- | --------------------------------------------------- |
| 15-1 | 오류 처리 시작 | (없음) | ​On Error GoTo ErrorHandler​                        |
| 15-2 | 오류 처리 끝  | (없음) | ​ErrorHandler: MsgBox Err.Description: Resume Next​ |

***

## 🚀 고급 기능 구현 예시

### 예시 1: 데이터 자동 처리 매크로

```
[블록 1-8] 시트 선택하기("원본데이터")
[블록 2-15] 마지막 행 번호 찾기("A", "lastRow")
[블록 10-1] 변수 선언-숫자("i", "2")
[블록 8-1] For 반복문 시작("i", "2", "lastRow")
[블록 9-1] If 조건 시작("Cells(i, 3).Value > 100")
[블록 3-2] 셀 값 쓰기("Cells(i, 4)", "초과")
[블록 9-3] Else 추가
[블록 3-2] 셀 값 쓰기("Cells(i, 4)", "미만")
[블록 9-4] If 조건 끝
[블록 8-6] 반복문 끝("i")
[블록 11-1] 메시지 박스 보이기("처리 완료!", "확인")

```

### 예시 2: 자동 차트 생성 및 이메일 전송

```
[블록 1-8] 시트 선택하기("매출데이터")
[블록 12-1] 차트 생성("A1:B12", "꺾은선", "D1")
[블록 12-2] 차트 제목 설정("Chart 1", "월별 매출 추이")
[블록 4-1] 글꼴 변경("D1:H20", "맑은 고딕")
[블록 13-2] PDF로 내보내기("C:\Reports\매출.pdf")
[블록 11-1] 메시지 박스 보이기("PDF 생성 완료!", "확인")

```

***

## 💡 웹앱 설계 팁

1. 블록 색상 코딩: 카테고리별로 다른 색상 적용 (예: 기본작업-파랑, 루프-노랑)
2. 매개변수 유효성 검사: 필수값 누락 시 빨간 테두리 표시
3. 코드 미리보기: 블록 클릭 시 실제 VBA 코드 툴팁 표시
4. 블록 검색: 위쪽에 검색창으로 원하는 블록快速 검색
5. 템플릿 저장: 자주 쓰는 블록 조합을 템플릿으로 저장/불러오기
6. 실행 테스트: 생성된 VBA 코드를 웹에서 직접 테스트 (엑셀 Online 연동)

이 100개 블록을 조합하면 초급부터 고급까지 90% 이상의 실무 VBA 매크로를 구현할 수 있습니다!

