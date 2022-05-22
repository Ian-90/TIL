## 1. Using Types
#### Core Types
  * number
    ```ts
    const a: number = 5
    ```
  * string 
    ```ts
    const name: string = 'hello'
    ```

  * boolean
    ```ts
    const isTest: boolean = true
    ```

  * object
    ```ts
    const person: {
      name: string;
      age: number;
    } = {
      name: 'lee',
      age: 100,
    }
    ```

  * array
    ```ts
    const arr: string[] = ['a', 'b', 'c']
    ```

  * tuple - js에는 없다. 배열의 길이와 타입이 명시적으로 고정. `Arrary.push`에 대해서 에러는 잡지 못한다.
    ```ts
    const role: [number, string] = [2, 'author']
    ```

  * enum - 라벨을 숫자로 할당
    ```ts
    enum Role {
      ADMIN,
      READ_ONLY,
      AUTHOR
    }

    const person = {
      role: Role.ADMIN
    }
    ```

  * any - 가장 유연한 타입이며, 모든값을 할당 할 수 있다. 컴파일러가 타입 확인을 수행하지 않게 하기 때문에, 가능한 사용하지 않는 게 좋다. 어떤 값이나 종류의 데이터가 어디에 저장 될지 없는 경우에 사용하는 것이 좋다.
    ```ts
    let favoriteActivities: any
    favoriteActivities = 'a'
    favoriteActivities = 1
    favoriteActivities = ['1']
    ```

  * union type
    ```ts
    let value: string | number
    value = 'a'
    value = 5
    ```

  * literal type - 정확한 값을 가지는 타입
    ```ts
    function combine(resultConversion: 'as-number' | 'as-string') {
      ...
    }
    ```

  * type alias
    ```ts
    type Combinable = number | string

    function combile(a: Combinable, b: Combinable) {
      ...
    }
    ```

  * funtion
    ```ts
    let combineValues: Function;
    let combineValues: (a: number, b: number) => number
    ```

  * unknown - 사용자가 무엇을 입력할 지 모르는 타입. any보다 제한적이다.
    ```ts
    let userInput: unknown
    let userName

    userInput = 5
    userInput = 'Max'
  
    userName = userInput // error
    ```

  * never - 함수가 반환할 수 있는 타입이지만, 반환값은 없다.
    ```ts
    function generateError(message: string, code: number): never {
      throw { message, errorCode: code }
    }
  
    geneerateError('An error occurred!', 500)
    ```

* 타입스크립트의 타입 시스템은 코드를 컴파일 하기 전까지 개발하는 동안 타입검사를 해주기 때문에 유용하다.

## 2. TypeScript 타입 vs JavaScript 타입
* 타입스크립트
  * 정적 타입(static types)
  * 컴파일 전 개발중일 때 타입을 가져오기 떄문에 에러를 사전에 잡을 수 있다.

* 자바스크립트
  * 동적 타입(dynamic types)
  * 런타임중 타입을 가져오기 때문에 에러가 발생할 수 있음
