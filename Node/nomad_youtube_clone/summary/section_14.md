## 1. Introduction
* FFmpeg를 가지고 webm을 mp4로 변환 작업할 예정 - 변환이유는 모든기기에서 webm을 이해하지 못하기 때문에 mp4로 변환
* FFmpeg를 가지고 비디오 썸네일 추출할 예정
* FFmpeg는 비디오파일을 다루는 최고의 소프트웨어
* WebAssembly를 이용하면 브라우저에서 빠르게 프론트엔드를 동작시킬 수 있다
* `ffmpeg.wasm`를 이용하여 사용자의 컴퓨터에서 비디오를 변환
  * 설치
  ```
  yarn add @ffmpeg/ffmpeg @ffmpeg/core
  ```

## 2. Transcode Video
* [ffmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm)를 이용하여 다운로드 파일을 webm에서 mp4로 변환기능 추가

## 3. Download Transcoded Video
* fs에서 생성된 output.mp4를 이용하여 다운로드 기능 추가
* ArrayBuffer - 비디오 파일을 나타내는 bytes의 배열
* raw data인 ArrayBuffer를 Blob으로 변환

## 4. Thumbnail
* 비디오 데이터를 ffmpeg 라이브러리를 이용하여 thumbnail 생성

## 5. Recap
* 1 ~ 4강 복습
* ffmpeg 파일의 링크 해제
* 브라우저 메모리에있는 url 제거
