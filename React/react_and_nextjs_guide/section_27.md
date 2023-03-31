## 리액트 + TypeScript

### 1. What & Why?
* 타입스크립트란?
  * 자바스크립트의 superset. 자바스크립트 문법에 몇가지 기능을 추가한 것
  * 자바스크립트에 정척 타이핑(static typing) 기능 추가

* 왜 사용하는가?
  * 런타임에 오류의 원인을 찾을 필요 없이 코드를 작성할 때 바로 오류가 표시되기 때문에 더 나은 코드를 작성 가능

### 2. TypeScript Basics
* 설치
  ```
  npm install typescript
  ```

* 컴파일 - 컴파일단계에 오류가 있으면 오류를 알려주며, 컴파일도 실행해서 js 파일도 제공한다
  ```
  npx tsc
  ```

* 타입
  * 기본타입은 any지만 사용하지 않는 것이 좋다
  * Primitives
    * number, string, boolean, null, undefined

  * Complex Type
    * Array
      ```ts
      let hobbies: string[];
      ```
    * Object
      ```ts
      let person: {
        name: string;
        age: number;
      }
      ```

* 타입추론(type inference)
  * 명시적으로 타입을 지정해도 되지만, 타입 추론을 활용하는 것이 권장되는 방법

* union type
  * 한 개 이상의 타입을 사용할 수 있음

* type alias
  * 동일한 타입을 반복해서 사용할 떄 타입 별칭을 사용

* functions & types
  * 매개변수 타입뿐만 아니라 반환값의 타입도 생각해야 한다
  * 반환값이 없을 때, `void` 타입을 사용

* generic
  * 타입의 유연성과 안정성 측면에서 도움이 된다
  * 특정 타입을 사용해 해당 타입으로 고정 시키는 것

### 3. Combining React & TypeScript
* react + typescript 프로젝트 생성
  ```
  npx create-react-app [project name] --template typescript
  ```

* props 타입
  ```ts
  type Props = {
    propsName: any
  }

  const Component: React.FC<Props> = () => {
    return ( ... )
  }
  ```

* event 타입
  ```ts
  // submit
  const submitHandler = (e:React.FormEvent) => { ... }

  <form onSubmit={submitHandler}>
    ...
  </form>
  ```

* ref 타입
  ```ts
  const ref = useRef<HTMLElement>(null)
  ```

* state 타입
  ```ts
  type StateType = {
    ...
  }

  const [state, setState] = useState<StateType>()
  ```

* context 타입
  ```ts
  type ContextType = { ... }
  const ctx = React.createContext<ContextType>(...)
  ```
