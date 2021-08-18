## 1. Observable(스트림 생성기) 만들기
### 1.1 배열된 스트림 - 가장 단순한 형태. 시간을 구애받지 않음
```js
import * as rxjs from 'rxjs'
const { of, from, range, generate } = rxjs

const obs1$ = of(1, 2, 3, 4, 5)
const obs2$ = from([6, 7, 8, 9, 10])
const obs3$ = range(11, 5)
const obs4$ = generate(15, x => x < 30, x => x + 2)

obs1$.subscribe(item => console.log(`of: ${item}`)) // of 1, ..., of 5
obs2$.subscribe(item => console.log(`from: ${item}`)) // from 6, ..., from 10 
obs3$.subscribe(item => console.log(`range: ${item}`)) // 11, ..., 15
obs4$.subscribe(item => console.log(`of: ${item}`)) // js의 for문과 비슷
```

### 1.2 시간에 의한 스트림
```js
const { interval, timer } = rxjs

const obs1$ = interval(1000)
const obs2$ = timer(3000)

obs1$.subscribe(item => console.log(`interval: ${item}`)) // interval 1, interval 2,  ...
obs2$.subscribe(item => console.log(`timer: ${item}`)) // 3초 후 timer 0
```

### 1.3 이벤트에 의한 스트림
```js
const { fromEvent } = rxjs

const obs1$ = fromEvent(document, 'click')
const obs2$ = fromEvent(document.getElementById('myInput'), 'keypress')

obs1$.subscribe(item => console.log(item) // 클릭할 때 마다 출력
obs2$.subscribe(item => console.log(item)) // 키보드를 입력할 때마다 출력
```

### 1.4 Ajax를 통한 스트림
```js
const { ajax } = rxjs.ajax

const obs$ = ajax(`http://127.0.0.1:3000/people/1`)
obs$.subscribe(result => console.log(result.response))
```

### 1.5 직접 만드는 스트림
```js
const { Observable } = rxjs

const obs$ = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)

  // 값을 다 발행한 뒤에는 compelte를 실행하여 메모리 해제 
  subscriber.complete()
})

obs$.subscribe(item => console.log(item))
```

### 1.6 Observable은 게으르다(lazy)
* 누군가 구독을 해야 발행을 시작
* 각 구독자에게 따로 발행
```js
const { of, interval, fromEvent } = rxjs

const obs1$ = of('a', 'b', 'c')
const obs2$ = interval(1000)
const obs3$ = fromEvent(document, 'click')

setTimeout(_ => {
  console.log('of 구독 시작')
  obs1$.subscribe(item => console.log(item))
}, 5000)
setTimeout(_ => {
  console.log('interval 구독 시작')
  obs2$.subscribe(item => console.log(item))
}, 10000)
setTimeout(_ => {
  console.log('fromEvent 구독 시작')
  obs3$.subscribe(_ => console.log('click!'))
}, 15000)
setTimeout(_ => {
  console.log('interval 구독 시작 2')
  obs2$.subscribe(item => console.log(item))
}, 20000)
```

## 2. Observer(구독자)에게 발행물 구독시키기
### 2.1 구독자 만들기
```js
const { from } = rxjs
// 옵저버블을 표현할 때 끝에 $을 붙이는게 reactiveX 프로그래밍을 하는사람들 사이의 많이 쓰이는 컨벤션
const observable$ = from([1, 2, 3, 4, 5])

// 구독자 생성
const observer = {
  // 구독자가 하는 일 들
  next: console.log,
  error: err => console.error('발행중 오류', err),
  complete: () => console.log('발행물 완결'),
}

// 구독시키기
// 방법 1
observable.subscribe(observer)

// 방법 2 - 순서는 지켜야 한다.
observable$.subscribe(
  console.log,
  err => console.error('발행중 오류', err),
  _ => console.log('발행물 완결')
)
```

### 2.2 Error와 Complete 살펴보기
* Error - 발행중 오류가 나면 next, complete가 실행되지 않는다.
```js
const { Observable } = rxjs

const obs$ = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  (null)[0]
  subscriber.next(4)
})

obs$.subscribe(
  console.log,
  err => console.error('발행중 오류', err),
  _ => console.log('발행물 완결')
)
```

* Complete - 중간에 complete가 선언되면 더이상 실행되지 않는다. complete를 실행해줘야 메모리가 낭비 되지 않는다
```js
const { Observable } = rxjs

const obs$ = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  subscriber.complete()
  subscriber.next(4)
})

obs$.subscribe(
  console.log,
  err => console.error('발행중 오류', err),
  _ => console.log('발행물 완결')
)
```

* 구독 해제하기 - 여러 구독자가 있을 때, 특정 구독자를 해제할 떄 사용한다
```js
const { interval } = rxjs

const obs$ = interval(1000)
const subscription = obs$.subscribe(console.log)

setTimeout(_ => subscription.unsubscribe(), 5500)
```
