## 1. Webpack
* 웹팩이란?
  * 파일을 묶는(bundle)것 을 도와주는 도구

* 필요한 이유
  * 코드를 묶음으롸써 HTTP 요청의 양을 줄이는데 도와주며, 코드를 최적화하고, 빌드 툴을 지원

* 설치
  ```
  yarn add -D webpack webpack-cli webpack-dev-server typescript ts-loader
  ```

* ts-loader
  * 웹팩에게 어떻게 타입스크립트 코드를 자바스크립트로 변환할 것인지 전달
