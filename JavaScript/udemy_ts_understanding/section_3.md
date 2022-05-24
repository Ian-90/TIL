## 1. let 및 const
* let은 변할 수 있는 값이며, const는 상수
* 블록 유효 범위를 갖는다
  ```ts
  const userName = 'Max'
  userName = "a"
  let age = 30
  age = 20

  if (age > 20) {
    let isOld = true
  }

  console.log(isOld)
  ```

## 2. 화살표 함수
* 코드양이 적으며, 하나의 매개변수 일 떄 괄호를 생략 가능하며, 중괄호 없이 return을 생략 가능하다.
  ```ts
  const add = (a: number, b: number) => {
    return a + b
  }
  ```

## 3. 기본값 함수 매개변수
* 기본값은 인수의 마지막부터 설정해야 한다.
```ts
const add = (a: number, b: number = 1) => a + b
add(5) => 6
```

## 4. 스프레드 연산자(...)
```ts
const hobbies = ['Sports', 'Cooking']

const activeHobbies = ['Hiking']
activeHobbies.push(...hobbies)

const person = {
  name: 'hi',
  age: 30
}

const copiedPersion = {
  ...person
}
```

## 5. 나머지 매개변수
```ts
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue
  }, 0)
}

const addedNumbers = add(5, 10, 2, 4)
```

## 6. 배열 및 객체 비구조화 할당
```ts
const hobbies = ['Sports', 'Cooking', 'test']
const [hobby1, hobby2, ...remainingHobbies] = hobbies

const person = {
  name: 'hi',
  age: 30
}

const { name, age } = person
```

## 7. 코드 컴파일
* compilerOption의 target을 es6로 설정해야 한다.
