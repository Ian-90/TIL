## 1. Introduction to Webpack
* 브라우저에서 동작할 js와 css를 작성하고, 브라우저가 이해할 수 있는 코드로 바꾸도록 웹팩을 이용
* 웹팩이 어려우면 조금 더 가벼운 걸프를 공부해보길 추천

## 2. Webpack Configuration part One
* 설치
```
yarn add webpack webpack-cli -D
```

* webpack.config.js - 아주 기본적인 config 이해
```js
module.exports = {
  entry: './src/client/main.js', // 우리가 처리하고자 하는 파일들
  output: {
    filename: 'main.js',
    path: './assets/js', // 결과물을 저장할 경로
  } // 결과물
}
```