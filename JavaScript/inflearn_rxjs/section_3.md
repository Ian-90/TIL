## 1. 기본적인 배열 연산자들
### 1.1 산수 관련 Operator
```js
const { of } = rxjs
const { count, max, min, reduce } = rxjs.operators

const obs$ = of(4, 2, 6, 10, 8)
obs$.pipe(count()).subscribe(x => console.log('count: ' + x))
obs$.pipe(max()).subscribe(x => console.log('max: ' + x))
obs$.pipe(min()).subscribe(x => console.log('min: ' + x))
obs$.pipe(
    reduce((acc, x) => { return acc + x }, 0)
).subscribe(x => console.log('reduce: ' + x))
```

### 1.2 선택 관련 Operaotr
```js
const { from } = rxjs
const { first, last, elementAt, filter, distinct, max } = rxjs.operators

const obs$ = from([
    9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2
])
obs$.pipe(first()).subscribe(x => console.log('first: ' + x))
obs$.pipe(last()).subscribe(x => console.log('last: ' + x))
obs$.pipe(elementAt(5)).subscribe(x => console.log('elementAt: ' + x))
obs$.pipe(distinct()).subscribe(x => console.log('distinct: ' + x)) // 중복된 값을 제거
obs$.pipe(
    filter(x => x % 2 === 1)
).subscribe(x => console.log('filter: ' + x))

// 짝수중 최대 값
obs$.pipe(
    filter(x => x % 2 === 0),
    max()
).subscribe(x => console.log(x))

// 5보다 큰 3번째 짝수
obs$.pipe(
    filter(x => x > 5),
    elementAt(3)
).subscribe(x => console.log(x))

// 한 번 이상 나온 홀수들의 갯수, 합
obs$.pipe(
    distinct(),
    filter(x => x % 2 === 1),
    count(),
    reduce((acc, x) => acc + x, 0)
).subscribe(x => console.log(x))
```

### 1.3 tab Operator
* 파이프안에서 데이터가 흐르고 있을 때, 그 값들을 가지고 다른일을 하는 것. 최종 발행물 나오는 것에는 영향을 주지 않는다.
* 복잡한 연산을 할 때 디버깅용도로 하기도 한다.
```js
const { from } = rxjs
const { tap, filter, distinct } = rxjs.operators

from([
    9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2
]).pipe(
    tap(x => console.log('-------------- 처음 탭: ' + x)),
    filter(x => x % 2 === 0),
    tap(x => console.log('--------- 필터 후: ' + x)),
    distinct(),
    tap(x => console.log('중복 제거 후: ' + x)),
).subscribe(x => console.log('발행물: ' + x))
```

## 2. Transformation 연산자들
* 파이프라인을 통과하는 각 값들을 내가 원하는 일정방식으로 변경해서 내보내는 연산자

### 2.1 map
* js의 array의 기본기능이며, 주어진 인자를 내가 원하는 형태로 반환
```js
const { of } = rxjs
const { map } = rxjs.operators
// 단순한 형태
of(1, 2, 3, 4, 5).pipe(
    map(x => x * x)
).subscribe(console.log)

const { from } = rxjs
const { map } = rxjs.operators
// 복잡한 형태
from([
    { name: 'apple', price: 1200 },
    { name: 'carrot', price: 800 },
    { name: 'meat', price: 5000 },
    { name: 'milk', price: 2400 }
]).pipe(
    map(item => item.price)
).subscribe(console.log)
```

### 2.2 pluck
* 특정객체에서 특정항목만 뽑아내는 연산자
```js
const { from } = rxjs
const { pluck } = rxjs.operators

const obs$ = from([
    { name: 'apple', price: 1200, info: { category: 'fruit' } },
    { name: 'carrot', price: 800, info: { category: 'vegetable' } },
    { name: 'pork', price: 5000, info: { category: 'meet' } },
    { name: 'milk', price: 2400, info: { category: 'drink' } }
])

obs$.pipe(
    pluck('price')
).subscribe(console.log)

obs$.pipe(
    pluck('info'),
    pluck('category'),
).subscribe(console.log)
// 순서대로 적어주면 위와 같이 동작
obs$.pipe(
    pluck('info', 'category')
).subscribe(console.log)

// ajax 요청에서 많이 사용
const { ajax } = rxjs.ajax
const { pluck } = rxjs.operators

const obs$ = ajax(`http://api.github.com/search/users?q=user:mojombo`).pipe(
    pluck('response', 'items', 0, 'html_url')
)
obs$.subscribe(console.log)
```

### 2.3 toArray
* 연속되는 일련의 값들을 한 배열로 묶어서 내보내는 연산자
```js
const { range } = rxjs
const { toArray, filter } = rxjs.operators

range(1, 50).pipe(
    filter(x => x % 3 === 0),
    filter(x => x % 2 === 1),
    toArray()
).subscribe(console.log)
```

### 2.4 scan
* 과정 하나하나를 다 출력할 때 사용되며, 값들을 어떤 배열에 붙여나가거나 한 오브젝트를 따로 둬서 그 항목에 하나씩 카운트를 늘게 만들기도 하며, 다양하게 사용된다
```js
const { of } = rxjs
const { reduce, scan } = rxjs.operators

const obs$ = of(1, 2, 3, 4, 5)

// reduce - 결과만 발행
obs$.pipe(
    reduce((acc, x) => { return acc + x }, 0)
).subscribe(x => console.log('reduce: ' + x))

// scan - 과정을 모두 발행
obs$.pipe(
    scan((acc, x) => { return acc + x }, 0)
).subscribe(x => console.log('scan: ' + x))
```

### 2.5 zip
* 스트림의 데이터들을 엮어서 배열로 내보내는 연산자. 스트림중 개수가 가장 적은 것에 맞춰서 배열로 내보낸다.
```js
const { from, interval, fromEvent, zip } = rxjs
const { pluck } = rxjs.operators

const obs1$ = from([1, 2, 3, 4, 5])
const obs2$ = from(['a', 'b', 'c', 'd', 'e'])
const obs3$ = from([true, false, 'F', [6, 7, 8], { name: 'zip' }])

zip(obs1$, obs2$).subscribe(console.log) // [1, 'a'], [2, 'b'], ..., [5, 'e']

const obs1$ = from([1, 2, 3, 4, 5, 6, 7])

const obs4$ = interval(1000)
const obs5$ = fromEvent(document, 'click').pipe(pluck('x'))

zip(obs4$, obs5$).subscribe(console.log)
```

## 3. take와 skip 관련 연산자들
### 3.1 take관련 Operator
* take - 앞에서부터 N개 선택
```js
const { range, interval, fromEvent } = rxjs
const { take, filter, pluck } = rxjs.operators

range(1, 20).pipe(
    take(5)
).subscribe(console.log) // 1 2 3 4 5

range(1, 20).pipe(
    filter(x => x % 2 === 0),
    take(5)
).subscribe(console.log) // 2 4 6 8 10

range(1, 20).pipe(
    take(5),
    filter(x => x % 2 === 0) // 2 4
).subscribe(console.log)

interval(1000).pipe(
    take(5) // 특정 스트림의 COMPLETE 시점
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    take(5),
    pluck('x')
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    pluck('x'),
    filter(x => x < 200),
    take(5),
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* takeLast - 뒤에서부터 N개 선택
```js
const { range, interval, fromEvent } = rxjs
const { takeLast, take, pluck } = rxjs.operators

range(1, 20).pipe(
    takeLast(5)
).subscribe(console.log)

interval(1000).pipe(
    takeLast(5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE') // 영원히 값을 출력하지 않음 
)

interval(1000).pipe(
    take(10),
    takeLast(5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    takeLast(5),
    pluck('x')
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE') // 값을 출력하지 않음
)

fromEvent(document, 'click').pipe(
    take(10),
    takeLast(5),
    pluck('x')
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* takeWhile - ~하는 동안 선택
```js
const { range, interval, fromEvent } = rxjs
const { takeWhile, takeLast, filter, pluck } = rxjs.operators

range(1, 20).pipe(
    takeWhile(x => x <= 10)
).subscribe(console.log)

interval(1000).pipe(
    takeWhile(x => x < 5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    pluck('x'),
    takeWhile(x => x < 200),
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* takeUntil 기준이 되는 스트림이 발행하기까지
```js
const { interval, timer, fromEvent } = rxjs
const { ajax } = rxjs.ajax
const { takeUntil, pluck, tap } = rxjs.operators

obs1$ = interval(1000)
obs2$ = fromEvent(document, 'click')

obs1$.pipe(
    takeUntil(obs2$)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

obs1$ = fromEvent(document, 'click')
obs2$ = timer(5000)

obs1$.pipe(
    pluck('x'),
    takeUntil(obs2$)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

interval(50).pipe(
    takeUntil(
        ajax('http://127.0.0.1:3000/people/name/random').pipe(
            pluck('response'),
            tap(console.log)
        )
    )
).subscribe(console.log)
```

### 3.2 skip 관련 Operator
* skip - 앞에서부터 N개 건너뛰기
```js
const { range, interval, fromEvent } = rxjs
const { skip, filter, pluck } = rxjs.operators

range(1, 20).pipe(
    skip(5)
).subscribe(console.log)

interval(1000).pipe(
    skip(5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    skip(5),
    pluck('x')
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* skipLast - 뒤에서부터 N개 건너뛰기. takeLast와는 조금 다름
```js
const { range, interval, fromEvent } = rxjs
const { skipLast, pluck } = rxjs.operators

range(1, 20).pipe(
    skipLast(5)
).subscribe(console.log)

interval(1000).pipe(
    skipLast(5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE') // 5초가 지나고 나서 발행
)

fromEvent(document, 'click').pipe(
    skipLast(5),
    pluck('x')
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* skipWhile - ~하는동안 건너뛰기
```js
const { range, interval, fromEvent } = rxjs
const { skipWhile, filter, pluck } = rxjs.operators

range(1, 20).pipe(
    skipWhile(x => x <= 10)
).subscribe(console.log)

interval(1000).pipe(
    skipWhile(x => x < 5)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

fromEvent(document, 'click').pipe(
    pluck('x'),
    skipWhile(x => x < 200),
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

* skipUntil - 기준이 되는 스트림이 발행하고부터
```js
const { interval, timer, fromEvent } = rxjs
const { skipUntil, pluck } = rxjs.operators

const obs1$ = interval(1000)
const obs2$ = fromEvent(document, 'click')

obs1$.pipe(
    skipUntil(obs2$)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)

const obs1$ = fromEvent(document, 'click')
const obs2$ = timer(5000)

obs1$.pipe(
    pluck('x'),
    skipUntil(obs2$)
).subscribe(
    console.log,
    err => console.error(err),
    _ => console.log('COMPLETE')
)
```

## 4. 시간을 다루는 연산자들 1
* delay - 주어진 시간만큼 지연 발생. 발행이 완료되는 시점을 지연
```js
const { interval, fromEvent } = rxjs
const { delay, tap, take } = rxjs.operators

interval(1000).pipe(
    take(5),
    tap(x => console.log(x + ' 발행시작')),
    delay(1500)
).subscribe(x => console.log(x + ' 발행완료'))

fromEvent(document, 'click').pipe(
    tap(e => console.log(e.x + ' 발행시작')),
    delay(1500)
).subscribe(e => console.log(e.x + ' 발행완료'))
```

* timestamp - 타임스탬프
```js
const { fromEvent } = rxjs
const { timestamp, pluck, map } = rxjs.operators

fromEvent(document, 'click').pipe(
    pluck('x'),
    timestamp() // 발행이 된 시점
).subscribe(console.log)

fromEvent(document, 'click').pipe(
    pluck('x'),
    timestamp(),
    map(x => {
        x.timestamp = new Date(x.timestamp).toString()
        return x
    })
).subscribe(console.log)
```

* timeInterval - 이전 발행물과의 시간차
```js
const { fromEvent, interval } = rxjs
const { timeInterval, pluck } = rxjs.operators

fromEvent(document, 'click').pipe(
    pluck('x'),
    timeInterval() // 이전 클릭으로 부터 얼마나 시간이 지났는지
).subscribe(console.log)

interval(1000).pipe(
    timeInterval()
).subscribe(console.log)
```

* timeout - 주어진 시간 내 다음 값 미발행 시 오류
```js
const { fromEvent } = rxjs
const { ajax } = rxjs.ajax
const { timeout, pluck } = rxjs.operators

fromEvent(document, 'click').pipe(
    timeout(3000)
).subscribe(
    _ => console.log('OK'),
    err => console.error(err)
)

ajax('http://127.0.0.1:3000/people/name/random').pipe(
    pluck('response'),
    timeout(500)
).subscribe(console.log, console.error)
```

* timeoutWith - 주어진 시간 내 다음 값 미발행 시 다른 Observable 개시
```js
const { fromEvent, interval, of } = rxjs
const { ajax } = rxjs.ajax
const { timeoutWith, pluck, scan } = rxjs.operators

fromEvent(document, 'click').pipe(
    timeoutWith(3000, interval(1000)),
    scan((acc, x) => { return acc + 1 }, 0)
).subscribe(console.log)

ajax('http://127.0.0.1:3000/people/name/random').pipe(
    pluck('response'),
    timeoutWith(500, of({
        id: 0,
        first_name: 'Hong',
        last_name: 'Gildong',
        role: 'substitute'
    }))
).subscribe(console.log, console.error)
```

## 5. 시간을 다루는 연산자들 2
### 5.1 time이 붙은 연산자들
* 준비코드 - 클릭할 때, 시간차를 누적해서 보여주는 것
```js
const { fromEvent } = rxjs
const { timeInterval, pluck, scan, tap } = rxjs.operators

const clicks$ = fromEvent(document, 'click').pipe(
    timeInterval(),
    pluck('interval'),
    scan((acc, i) => acc + i, 0),
    tap(x => console.log('CLICKED: ' + x))
)

clicks$.subscribe()
```

* debounceTime - 일정시간동안 다음값이 나오지 않아야 마지막값이 시간이 지난 후 출력. 검색창에서 무언가 검색을 할 때, 일련의 요청을 하는 것 같은 작업을 할 때 자주 사용 된다.
```js
const { debounceTime } = rxjs.operators

clicks$.pipe(
    debounceTime(1000)
).subscribe(x => console.log('OUTPUT: -------- ' + x))
```

* auditTime - 특정값이 발행되고나서 시간이 지나면 그값 또는 그이후에 생성된 마지막값이 출력.
```js
const { auditTime } = rxjs.operators

clicks$.pipe(
    auditTime(1000)
).subscribe(x => console.log('OUTPUT: -------- ' + x))
```

* sampleTime - 어떤 값을 출력하면, 그 다음에 바로 오는 값을 출력. 언제 값을 입력하던 특정시간 간격으로 출력이 되도록 하고 싶을 때 사용.
```js
const { sampleTime } = rxjs.operators

clicks$.pipe(
    sampleTime(1000),
    timeInterval()
).subscribe(x => console.log('OUTPUT: -------- ' + x.value + ' :' + x.interval))
```

* throttleTime
    * `leading: true` - 어떤 값이 입력될 때 마다 무조건 그 값을 출력. 그 이후 주어진 시간이 지나기 전까지는 값을 출력하지 않음.
        ```js
        const { throttleTime } = rxjs.operators

        clicks$.pipe(
            throttleTime(1000, undefined, { 
                leading: true, trailing: false 
            })
        ).subscribe(x => console.log('OUTPUT: -------- ' + x))
        ```
    * `trailing: true` - 어떤 값이 입력될 때 마다 무조건 뒤에 값을 출력. 
        ```js
        const { throttleTime } = rxjs.operators

        clicks$.pipe(
            throttleTime(1000, undefined, { 
                leading: false, trailing: true 
            })
        ).subscribe(x => console.log('OUTPUT: -------- ' + x))
        ```

### 5.2 time이 붙지 않은 연산자들
```js
const { fromEvent, interval } = rxjs
const { debounce, audit, pluck } = rxjs.operators

fromEvent(document, 'click').pipe(
	pluck('y'),
	debounce(y => interval(y * 10))
).subscribe(console.log);

fromEvent(document, 'click').pipe(
	pluck('y'),
	audit(y => interval(y * 10))
).subscribe(console.log);

const { BehaviorSubject, fromEvent, interval } = rxjs
const { debounce, tap } = rxjs.operators

const bs = new BehaviorSubject(1000)

fromEvent(document, 'click').pipe(
    tap(_ => console.log(bs.getValue())),
    debounce(e => interval(bs.getValue())),
    tap(_ => bs.next(bs.getValue() + 500))
).subscribe(_ => console.log('CLICK'));

const { fromEvent, interval } = rxjs
const { sample } = rxjs.operators

interval(1000).pipe(
	sample(fromEvent(document, 'click'))
).subscribe(console.log);


const { fromEvent, interval } = rxjs
const { throttle, timeInterval, pluck } = rxjs.operators

fromEvent(document, 'click').pipe(
	throttle(e => interval(1000)),
    timeInterval(),
    pluck('interval')
).subscribe(console.log);
```