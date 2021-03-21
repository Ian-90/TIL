## 1. 좋은 아이콘을 만드는 원칙
* 아이콘은 사용자에게 직관적으로 의미를 전달해주는 역할(<- 뒤로 가기 vs 뒤로가기)
* 원칙
  1. 명확한 의미 전달
    * 사용자 테스트 - 사용자에게 사용 되기전까지 가설에 불가하기떄문에 사용자 테스트를 해본다.
    * 업계에서 활용되는 디자인 참고하기([Material Desing](https://material.io/resources/icons/?style=baseline), [iOS Guideline](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/system-icons/))
  
  2. 일관된 스타일
    * 아이콘의 두께, 라인, 사이즈 등등 일관적이어야 좋은 아이콘이다.

* 피그마의 아이콘 제작 기능들
  1. Shape
  2. Boolean
  3. pen

## 2. Boolean 기능 활용하기
* exercise/serction_9-2.fig - 실습 파일
* UnionSelection
  * 두 오브젝트를 통합 시켜준다.

* Subtract Selection
  * 위에있는 레이어가 아래에있는 레이어를 잘라준다.

* Intersect Selection
  * 둘의 공유된 영역만 남긴다.

* Exclude Selection
  * 공유된 영역을 제외한 나머지만 남긴다.

## 3. 펜 툴로 라인 그리기
* exercise/serction_9-3.fig - 실습 파일
1. 도형, 선그리기 - 기본 기능
  * 상단바의 펜툴을 이용하거나 P를 누르면 된다.
  * 다 그렸을 때 엔터를 누르면 된다.
  * 마지막 점과 점을 이을 때, 펜툴에 검은점이 생기면 맞닿은 것이다.

2. 도형 수정
  * 오브젝트를 클릭 후, 엔터를 누르면 오브젝트가 수정 가능한 상태로 변한다.
  * 수정 후 다시 엔터를 누르면, 수정상태가 끝난다.

## 4. Keyline 이해하기
* exercise/serction_9-4.fig - 실습 파일
* Keyline의 목적 - 일관된 느낌의 비율 적용(아이콘을 제작하기 위한 기초공사)
* 생성후, Lock 걸어주기

## 5. 아이콘 만들기
* exercise/serction_9-5.fig - 실습 파일
* 아이콘 만들기 실력을 늘리는법은 좋은 샘플들을 많이 따라해보는 것이다.
* material desing을 다운받아서 많이 따라해보기

## 6. 해상도를 고려한 아이콘 Export하기
1. export 할 프레임 선택
2. 해상도를 고려하기 - 아이콘 오른쪽 클릭 후, Outline Stroke 클릭(비율을 유지하며, 사이즈 키우기)
3. 우측 export
4. export할 파일 형식 선택(svg나 png로 많이 사용)
