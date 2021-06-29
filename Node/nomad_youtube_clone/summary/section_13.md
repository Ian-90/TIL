## 1. Recorder Setup
* fe에서 async await을 사용하기 위해 `regenerator-runtime` 설치
* 영상 기록을 위해 recorder.js를 웹팩과 upload.pug에 셋팅

## 2. Video Preview
* 비디오 녹화 미리보기 기능 추가

## 3. Recording Video
* stream(영어단어 의미 - 한줄기 강물과도 같은 것)을 녹화해보기 기능 추가
* 녹화기능을 위해 [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)를 사용

## 4. Recording Video part Two
* URL.createObjectURL - 브라우저 메모리에서만 가능한 URL 생성. 파일을 가리키고있는 URL이라고 생각하면 됨.
* 녹화한 비디오는 브라우저 메모리에 있다.

## 5. Downloading the File
* a tag의 download 속성을 이용하여 다운로드기능 추가
