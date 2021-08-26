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
