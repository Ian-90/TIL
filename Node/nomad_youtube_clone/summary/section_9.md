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
  entry: './src/client/js/main.js', // 우리가 처리하고자 하는 파일들
  output: {
    filename: 'main.js',
    path: './assets/js', // 결과물을 저장할 경로
  } // 결과물
}
```

## 3. Webpack Configuration part Two
* output의 path는 다 절대경로를 써야한다.
  * dirname - 파일까지의 경로 전체
  * path.resolve(args) - args에 입력하는 파트를 모아서 경로로 만들어 주는 것

* rules - 우리가 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정하는 것
* loader - rules의 파일을 전환할 때 사용하는 것

* webpack.config.js
```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/client/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'assets', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      }
    ]
  }
}
```

## 4. Webpack Configuration part Three
* express에 정적파일 접근할 수 있도록 assets 등록
```js
// server.js
app.use('/static', express.static('assets'))
```

## 5. SCSS Loader
* scss를 css로 변환하도록 웹펙 설정 추가
* loader의 순서는 역순이다
* webpack.config.js
```js
const path = require('path')

module.exports = {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```