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
obs$.pipe(distinct()).subscribe(x => console.log('distinct: ' + x))
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
    distnc(),
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

of(1, 2, 3, 4, 5).pipe(
    map(x => x * x)
).subscribe(console.log)

const { from } = rxjs
const { map } = rxjs.operators

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