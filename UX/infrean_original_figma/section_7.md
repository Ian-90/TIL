## 1. 컬러 팔레트 만들고 수정하기
* 컴포넌트처럼 제품의 컬러 팔레트를 만들자
  * 파일이 많아지거나 디자이너가 여러명이 되더라도 제품에 사용하는 컬러는 일관적
* 제품에는 브랜드 아이덴티디를 나타내는 컬러가 있다. (primary)
* 메인컬러 다음 레벨에 사용하는 컬러 (secondary)
* 텍스트와 아이콘에 사용하는 컬러 - 브랜드 컬러를 방해하지 않아야 하며, 가독성이 좋고 눈이 아프지 않은 Grayscale로 많이 사용
* 텍스트필드나 아이콘 등등에서 시스템의 상태를 알려주는 3가지 요소 - green(안전, 성공), yellow(경고), red(위험, 에러)로 많이 사용
* 컬러 팔레트 만들기
  1. 디자인 패널의 Fill 영역에서 4개의 점 아이콘 클릭
  2. + 버튼 클릭
  3. 이름 설정(/로 구분지어주면 좋다)
  4. Create style 클릭
* shadow 같은 경우에도 팔레트로 등록한다.

## 2. 타이포정의하고 텍스트 스타일 등록하기
* 프로덕트에서 약속된 텍스트만을 사용해서 일관적 화면을 만들기 위해서
* 플랫폼은 각각의 타이포그래피 가이드를 제공
  * Android(Material Design), iOS(Human Interface)의 타이포그래피 참고
* 폰트 선택
* 행간은
  * 곱해서 소수가 생기면 정수로 만들기. 홀수말고 되도록 짝수로 만들어준다
  * 폰트사이즈 * 1.25 (Headline, Title, Button)
  * 폰트사이즈 * (1.5 || 1.75) (Body)

* 타이포그래피
  * Headline
    * fontSize - 34, 24, 20
    * fontWeight - 볼드
    * lineHeight - 42, 30, 24

  * Title
    * fontSize - Material Design 참고하여 16, 14
    * fontWeight - 볼드
    * lineHeight - 20, 18

  * Body
    * fontSize - Material Design 참고하여 16, 14, 12
    * fontWeight - 레귤러
    * lineHeight - 28, 24, 20

  * Button
    * fontSize - 16
    * fontWeight - 볼드
    * lineHeight - 20

  * Caption
    * fontSize - 12
    * fontWeight - 레귤러
    * lineHeight - 20(Body 3과 사이즈가 같아서)

  * Overline
    * fontSize - 10
    * fontWeight - 레귤러
    * lineHeight - 16

* 타이포 등록하기
  1. 디자인 패널의 Text 영역에서 4개의 점 아이콘 클릭
  2. + 버튼 클릭
  3. 이름 설정
  4. Create style 클릭

## 3. 레이아웃 그리드 등록과 수정
* 화면에 들어가는 여백이나 UI 요소에 들어가는 요소들 간격을 일관적으로 적용하기 위해 
* 그리드 등록하기
  1. 디자인 패널의 Layout grid 영역에서 4개의 점 아이콘 클릭
  2. + 버튼 클릭
  3. 이름 설정
  4. Create style 클릭

## 4. 스타일가이드 적용하기
* 예전에 사용한 카드UI를 만든 스타일 가이드 적용
