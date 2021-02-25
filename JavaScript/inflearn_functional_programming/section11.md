## 1. async:await
* js에서 비동기상황을 동기적인 상황으로 다루는 코드
* async 함수는 항상 Promise를 return하는 함수
```js
function delayIdentity(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a), 500))
}

// 기본 사용법
async function f1() {
  const a = await delayIdentity(10)
  const b = await delayIdentity(5)
  console.log(a + b)
}
f1()

function delay(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time))
}

async function delayIdentity(a) {
  await delay(1000)
  return a
}

// 결과값을 사용하려면?
async function f1() {
  const a = await delayIdentity(10)
  const b = await delayIdentity(5)
  return a + b
}

f1().then(console.log) // 1. then을 이용
go(f1(), console.log) // 2. go 함수를 이용
```

## 2. [QnA] Array.prototype.map이 있는데 왜 FxJS의 map 함수가 필요한지?
```js
// Promise를 해결하기 위해서.. map의 callback이 async await이어도 비동기상황을 제어 불가능 하다
function f2() {
  const list = [1, 2, 3, 4]
  const res = list.map((a) => delayIdentity(a * a))
  console.log(res)
}

// FxJS
async function f3() {
  const list = [1, 2, 3, 4]
  const res = await map((a) => delayIdentity(a * a), list)
  console.log(res)
}
```

## 3. [QnA] 이제 비동기는 async:await로 제어할 수 있는데 왜 파이프라인이 필요한지?
* async:await의 목적
  * Promise.then.then...으로 로직을 작성하는 것이 어렵다 보니 async와 await을 통하여 문장형으로 다루기 위해서 이다.
  * 합성이 아닌 함수를 풀어놓는것이 목적
* 파이프라인의 목적
  * 파이프라인은 비동기프로그래밍이 아닌 명령형 프로그래밍을 하지않고, 더 안전하게 함수를 합성하기 위한 것이 목적
  * 안전하게 동기상황이던 비동기상황이던 연결하거나 함수를 합성
```js
// 파이프라인
function f5(list) {
  return go(list,
    L.map((a) => delayIdentity(a * a)),
    L.filter((a) => delayIdentity(a % 2)),
    L.map((a) => delayIdentity(a + 1)),
    take(3),
    reduce((a, b) => delayIdentity(a + b))
  )
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8]), console.log)

// async:await
async function f6() {
  let temp = []
  for (const a of list) {
    const b = await delayIdentity(a * a)
    if (await delayIdentity(b % 2)) {
      const c = await delayIdentity(b + 1)
      temp.push(c)
      if (temp.length === 3) break
    }
  }
  let res = temp[0]
  let i = 0
  while(++i < temp.length) {
    res = await delayIdentity(res + temp[i])
  }
  return res
}

go(f6([1, 2, 3, 4, 5, 6, 7, 8]), console.log)
```

## 4. [QnA] async:await와 파이프라인을 같이 사용하기도 하는지?
```js
// 결론은 됩니다!
async function f52(list) {
  const r1 = await go(list,
    L.map((a) => delayIdentity(a * a)),
    L.filter((a) => delayIdentity(a % 2)),
    L.map((a) => delayIdentity(a + 1)),
    take(3),
    reduce((a, b) => delayIdentity(a + b))
  )

  const r2 = await go(list,
    L.map((a) => delayIdentity(a * a)),
    L.filter((a) => delayIdentity(a % 2)),
    reduce((a, b) => delayIdentity(a + b))
  )

  const r3 = await delayIdentity(r1 + r2)

  return r3 + 10
}
```

## 5. [QnA] 동기 상황에서 에러 핸들링은 어떻게 해야 하는지?
* 기본 매개변수 사용(함수 인자의 기본값 적용)
* || 연산자를 이용한 기본값
* try..catch 사용
```js
function f7(list = []) {
  return list
    .map((a) => a + 10)
    .filter((a) => a % 2)
    .slice(-, 2)
}

function f7(list) {
  try {
    return list
      .map((a) => a + 10)
      .filter((a) => a % 2)
      .slice(0, 2)
  } catch (e) {
    return []
  }
}

console.log(f7(null))
```

## 6. [QnA] 비동기 상황에서 에러 핸들링은 어떻게 해야 하는지?
* 비동기에서 에러핸들링은 어렵다
```js
function f8(list) {
  try {
    return list
      .map((a) => new Promise((resolve) => resolve(JSON.pares(a))))
      .filter((a) => a % 2)
      .slice(0, 2)
  } catch (e) {
    console.log(e)
    return []
  }
}
```

## 7. [QnA] 동기/비동기 에러 핸들링에서의 파이프라인의 이점은?
```js
async function f9(list) {
  try {
    return await go(list,
      .map((a) => new Promise((resolve) => resolve(JSON.pares(a))))
      .filter((a) => a % 2)
      .take(2)
    ) // go 내부의 함수들이 합성이 잘 되어야 에러트래킹이 쉽다. 
  } catch (e) {
    console.log(e)
    return []
  }
}

f9(['0', '1', '2', '}']).then((a) => console.log(a, 'f9')).catch((e) => console.log('에러핸들링 성공', e))
```
