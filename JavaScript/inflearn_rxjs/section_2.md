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
