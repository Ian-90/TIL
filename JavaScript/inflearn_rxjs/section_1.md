## 1. 반응형 프로그래밍은 뭐고 Reactive X는 뭔가요?
### 1.1 함수형 프로그래밍
  * 정의 - 변수의 사용을 지양하고 순수함수들을 사용해서 프로그래밍 하는 것
  * 순수함수 - 외부의 데이터를 변경하지 않고 받아온 값들을 내부에서 처리해서 밖으로 반환하는 함수
  * 선언형 프로그래밍

### 1.2 ReactiveX의 세 요소
1. Observable - 관찰될 수 있는 일련의 값들을 발행
  *  Stream - 연속적으로 발행되어 나온 값들
2. Operator - 순수함수
3. Observer - 파이브만 쳐다보며 값을 기다리다가 값이 나오면 최종작업을 실행 

### 1.3 Reactive X를 왜 사용하는가
* 평면적인 배열, 시간의 흐름, 사용자의 동작, 네트워크 요청의 결과까지 전부 스트림으로 만들어서 파이프라인으로 흘려보내 처리하기 때문
```js
// 예제는 Rx Visualizer로 보면 편하다
const { interval, fromEvent } = Rx
const { filter, take, map, delay, timeInterval, pluck, debouceTime } = RxOperators
const { ajax } = rxjs.ajax

// 1. 배열
interval(500).pipe(
  filter(n => n % 2 === 0),
  take(5),
  map(n => Math.pow(n, 2))
)

// 2. 사용자의 동작
fromEvent(document, 'click').pipe(
  map(e => e.x),
  filter(x => x < 400),
  take(5)
)

// 3. 네트워크 요청
ajax('http://127.0.0.1:3000/people/1').pipe(
  map(result => result.response.first_name)
).subscribe(console.log)

// 4. 시간의 흐름
fromEvent(document, 'click').pipe(
  delay(1000)
)

fromEvent(document, 'click').pipe(
  timeInterval(),
  pluck('interval')
)

fromEvent(document, 'click').pipe(
  debouceTime(1000)
)
```

* 20번 요청을 동시에 요청을 4개씩 보내고, 이 요청중 실패시 같은요청을 최대 3번 보내기. 요청이 전부 성공하면 전부 배열로 반환한다면 ?
  * 그냥 짜면 너무 복잡
  * ReactiveX를 이용한다면?
  ```js
  const { range } = rxjs
  const { ajax } = rxjs.ajax
  const { mergeMap, toArray, pluck, retry } = rxjs.operators

  range(1, 20).pipe(
    mergeMap(index => ajax(
      `http://127.0.0.1:3000/people/quarter-error/${index}`
      ).pipe(
        pluck('response', 'first_name'),
        retry(3)
      )
    , 4),
    toArray()
  ).subscribe(console.log)
  ```

### 1.4 실제로 소프트웨어 어떻게 적용할 것인가?
* ex - 자막모양의 프롬프터를 만들기
```js
// 1. 방향키만 1 또는 -1로 치환한 스트림
const keypress$ = fromEvent(document, 'keydown').pipe(
  pluck('key'), // 키항목 뽑기
  filter(k => k.includes('Arrow')), // 방향키만 걸러내기
  map(k => {
    return {
      ArrowDown: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
      ArrowRight: 1
    }[k]
  }) // 방향키 1또는 -1로 매핑
)

// 2. 마우스 스크롤을 1초 간격으로 끊은 뒤 방향에 따라 1 또는 -1로 치환한 스트림
const scroll$ = merge(
  fromEvent(document, 'mousewheel'),
  fromEvent(document, 'wheel'),
).pipe(
  throttleTiem(1000),
  map(s => s.deltaY > 0 ? 1 : -1)
)

// 스트림 병합
const inputs$ = merge(
  keypress$, scroll$
).pipe(startWith(0))

// 츨력할 첫, 마지막 라인의 각각 앞위 공백으로 들어갈 스트림
const spaces$ = range(0, spaces).pipe(mapTo(''))

// 프롬프터에 표시할 행들을 앞위 공백과 이어붙인 뒤 spaces + 1개 라인, 1줄 간격으로 묶어 배열 형태로 반환하는 스트림
const lines$ = concat(
  spaces$, from(lines), spaces$
).pipe(
  bufferCount(spaces * 2 + 1, 1),
  skipLast(spaces * 2),
  toArrary()
)

// 인풋 스트림의 입력에 따라 라인 스트림의 1줄 간격으로 묶인 배열을 하나씩 발행하는 최종 스트림
const final$ = inputs$.pipe(
  scan((acc, cur) => {
    return Math.min(Math.max(acc += cur, 0), lines.length - 1)
  }),
  mergeMap(cursor => {
    return lines$.pipe(
      map(buffereds => buffereds[cursor])
    )
  })
)

// 구독 - 변숙를 사용하지 않고, 흐름들을 생성하고 조립해서 상수로 선언하는 것만으로 코드가 구성되어 있음
final$.subscribe(console.log)
```

## 2. 강의를 위한 준비물
![얄코 강의 페이지](https://www.yalco.kr/@rxjs/0-2/)
