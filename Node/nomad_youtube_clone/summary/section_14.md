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
