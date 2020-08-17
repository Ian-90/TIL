# 1. 박스모델 알아보기
* boxmodel
  ![boxmodel](./boxmodel.png)
  * width(cotent)
  * height(cotent)
  * border
    * border-style
      * solid
      * dashed - 파선
      * dotted - 점선
      * double - 두줄
      * inset
      * outset
      * ridge
      * groove
    * border-color
    * border-width
    * 방향
      * top
      * right
      * bottom
      * left
  * padding
    * value의 개수
      * 1개면 모든 방향
      * 2개면 상하, 좌우
      * 3개면 첫번째는 상, 두번째는 좌우, 세번째는 하
      * 4개면 상, 우, 하, 좌 순서로 적용
    * top
    * right
    * bottom
    * left
  * margin
    * top
    * right
    * bottom
    * left
    * 마진 겹침 현상
      * 겹친부분에서 큰값이 출력된다.
* box-sizing
  * border-box - 내가 지정한 width 내부에 padding과 border가 들어간다.(IE9 이상)
* display
  * block
  * inline - margin은 좌우만 적용. padding은 다 적용되지만 겹쳐진다.
  * inline-block - inline과 block의 성질을 다 갖는다.