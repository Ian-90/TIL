[리액트를 다루는 기술](https://book.naver.com/bookdb/book_detail.nhn?bid=13799583)

* [Immutable.js](https://github.com/immutable-js/immutable-js) - 불변성 데이터를 다룰 수 있도록 도와주는 라이브러리

  * [설치](https://github.com/immutable-js/immutable-js#getting-started)
  ```
  yarn add immutable
  ```

  * 사용법
    * [Map](https://immutable-js.github.io/immutable-js/docs/#/Map)
    ```javascript
    import { Map, fromJS } from 'immutable'

     // 1. Map을 사용한 불변 객체 만들기
    const data = Map({
      a: 1,
      b: 2,
      c: Map({
        d: 3,
        e: 4,
        f: 5
      })
    })

    // 2. 복잡한 객체인 경우 fromJS 사용
    const data = fromJS({
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
        f: 5
      }
    })

    // 3. 불변 객체를 JS 객체로 변환
    cons JSData = data.toJS()

    // 4. 특정 키값 불러오기
    data.get('a') // 1

    // 5. nested된 키값 불러오기
    data.getIn(['c', 'd']) // 3

    // 6. 값 설정
    const newData = data.set('a', 4)

    // 7. nested된 값 설정
        const newData = data.setIn(['c', 'd'], 10)
    ```

    * [List](https://immutable-js.github.io/immutable-js/docs/#/List)

    ```javascript
    import { List, Map, fromJS } from 'immutable'

     // 1. List를 사용한 불변 배열 만들기
    const data = List([0, 1, 2, 3, 4])

    // 2. 객체들의 배열의 경우 fromJS 사용
    const data = fromJS([{ value: 1 }, { value: 2 }])

    // 3. 불변 배열을 JS 배열로 변환
    cons JSData = data.toJS()

    // 4. n번째 값 불러오기
    data.get(0) // 0

    // 5. 오브젝트 원소 불러오기
    data.getIn([0, value]) // 1

    // 6. n번째 값 설정
    const newData = data.set(0, Map({ value: 10}))

    // 7. 오브젝트 원소 값 설정
    const newData = data.setIn([0, 'value'], 10)

    // 8. 아이템 추가
    const newData = data.push(Map({ value: 5}))

    // 9. n번째 아이템제거
    const newData = data.delete(2)

    // 10. 마지막 아이템 제거
    const newData = data.pop()
    ```

* [ducks 패턴](https://github.com/erikras/ducks-modular-redux#rules) - action type, action creator, reducer를 한 곳에서 관리
  * reducer는 export default로 내보내기
  * export로 action creator 내보내기
  * action type의 이름은 npm-module-or-app/reducer/ACTION_TYPE 형식으로 만들어야 한다.
  * 개발 흐름
    1. action type 정의
    2. action creator 생성
    3. initialState 정의
    4. reducer 정의

* [redux-actions](https://redux-actions.js.org/#getting-started) - redux의 action 관리
  * 설치
  ```
  yarn add redux-actions
  ```

  * createAction - 액션 생성 자동화
  * handleActions - switch문 대신 사용