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