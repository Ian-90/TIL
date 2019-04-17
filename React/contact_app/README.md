# 누구든지 하는 리액트 : 초심자를 위한 React 핵심 강의
  * [벨로퍼트 리액트 강좌](https://www.inflearn.com/course/react-velopert/)

## 1. 리액트는 무엇인가 ?
  * 프론트엔드 라이브러리란 무엇인가?
    * 프로젝트 규모가 커져서 다양한 유저인터페이스와 인터랙션을 제공하기 위해 기능개발에 집중 할 수 있도록 도와주는 도구
    * 프론트엔드 프레임워크 or 라이브러리 삼대장 - Angular, React, Vue
      * Angular - 프레임워크, 타입스크리트 기본
      * React - 컴포넌트에 집중되어있는 라이브러리, 프레임워크가 아님. 뷰만 신경쓰는 라이브러리고 나머진 써드파티       라이브러리 의존
      * Vue - 입문자가 사용하기 쉬움. 리액트와는 달리 공식적으로 라이브러리들이 포함되어 있음.

  * 리액트의 Virtual DOM
    * 리액트개발 - 변화가 없이 데이터가 바뀌면 뷰를 날리고 새로운 뷰를 만들어버리기. 성능적으로 문제가 있어서 Virtual DOM 제작
    * 변화가 일어나면 Virtual DOM에 렌더링 하여 기존의 DOM과 비교해서 바뀐부분만 찾아서 뷰를 바꾸어줌
    * [React and the Virtual DOM](https://youtube.be/muc2ZF0QIO4)

  * 리액트를 특별하게 만드는 점
    * 어마어마한 생태계
    * FACEBOOK, Airbnb, BBC, eBay, ... 등등 사용하는곳이 많다.

## 2. 리액트 프로젝트 시작하기
  * 본격적인 리액트 코드 작성하기
    * Webpack - 의존하는 파일들을 합쳐서 하나 또는 여러개의 파일로 만들어줌
    ![Webpack](./assets/lecture_2-1_webpack.png)
    * Babel - 브라우저에서 최신문법을 다 지원하지 않기 때문에, 브라우저가 이해 할 수 있도록 코드를 기존 문법으로 번역해줌. 
    ![Bable](./assets/lecture_2-1_babel.png)

## 3. JSX
  * JSX 기본문법 알아보기
    * JSX란 ? React에서 사용하는 HTML과 비슷한 자바스크립트 문법
    * 문법
      * 꼭 닫혀야 하는 태그 - 태그를 닫지 않으면 에러가 난다.
      ```javascript
      import React, { Component } from 'react'

      class App extends Component {
        render() {
          return (
            <div>
              <input type='text' >
            </div>
          )
        }
      }
      ```
      ![JSX error-1](./assets/lecture_3-1_JSX_error-1.png)

      * 두개 이상의 엘리먼트는 무조건 하나의 엘리먼트로 감싸져 있어야 한다. 감싸져있지 않으면 에러가 난다.
      ```javascript
      import React, { Component } from 'react'
      
      class App extends Component {
        render() {
          return (
            <div>1</div>
            <div>2</div>
          )
        }
      }
      ```
      ![JSX error-2](./assets/lecture_3-1_JSX_error-2.png)

      * JSX 안에 자바스크립트 값 사용하기 - 중괄호 안에 자바스크립트 값(변수, 메소드 등)을 써준다.
      ```javascript
      import React, { Component } from 'react'
      
      class App extends Component {
        render() {
          const name = 'IAN-90'
          return (
            <div>Hi {name}</div>
          )
        }
      }
      ```

      * 조건부 렌더링 - 중괄호 안에 if문은 쓰지 못하므로 삼항연산자를 쓴다. if문을 선언하고 싶다면, 함수를 선언 후 즉시실행함수(IIFE)를 사용해주면 된다.
      ```javascript
      import React, { Component } from 'react'
      
      class App extends Component {
        render() {
          return (
            <div>
              {
                1 + 1 === 3 ?
                '틀리다'
                :
                '맞다'
              }
            </div>
          )
        }
      }
      ```