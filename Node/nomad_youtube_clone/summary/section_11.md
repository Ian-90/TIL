## 1. Player Setup
* 비디오 플레이어를 위한 웹팩 설정 추가 및 videoPlayer.js 추가, base.pug 수정

## 2. Play Pause
* play 버튼 이벤트 추가

## 3. Mute and Unmute
* mute와 unmute 기능 추가

## 4. Volume
* input[type="range"]의 이벤트
  1. change - 드래그가 끝나야 동작
  2. input - 실시간 동작
* 볼륨 input과 mute 버튼 연동

## 5. Duration and Current Time
* loadedmetadata - 비디오가 로드되었을 때 나타나는 메타 데이터
* timeupdate - 비디오의 현재시간을 받는 이벤트
* 비디오플레이어의 현재시간과 전체시간 표시 기능 추가

## 6. Time Formatting
* Date 객체와 toISOString 및 substr로 시간을 구하기

## 7. Timeline
* 비디오플레이어의 재생시간 input과 비디오 태그의 재생시간을 연동

## 8. Fullscreen
* 전체화면 버튼 및 기능 추가

## 9. Controls Events part One
* 비디오플레이어 마우스를 올렸을 때 컨트롤러를 보여주고, 마우스가 떠나면 컨트롤러를 감추는 기능 추가

## 10. Controls Events part Two
* 마우스가 멈추는걸 감지
  * `setTimeout`을 이용
  * 맨처음 마우스가 움직이면 setTimeout 호출
  * 다시 움직이면 timeout 취소
  * 또다시 움직이면 setTimeout 호출
  * 그상태에서 마우스 멈추면 setTimeout 완료
  * 3초이내로 마우스가 움직이면 setTimeout이 취소되지만, 3초 이상이라면 setTimeout 실행됨

## 11. Recap
* 1 ~ 10강 비디오플레이어 복습

## 12. Styles Recap
* 스타일 구현
* 코드챌린지 - 화면 클릭시 재생 및 정지, 스페이스 누를 때 재생 및 정지