# NOMAD CODERS

- [TypeScript with React](https://academy.nomadcoders.co/p/react-for-beginners)

## typescript 란?

```javascript
// 기존 js 코드
const plus = (a, b) => a + b;
let hello = "hello"
const lee = {
  name: 'Ian',
  age: 20,
  hungry: true
}

const helloToHuman = (human) => {
  console.log(`Hello ${human.name} you are ${human.age} old`)
}

// typescript를 사용한 코드
const plus = (a: number, b: number) => a + b;
let hello:string = "hello"
// return을 string type으로 하기.
const greet = (name: string, age: number): string => {
  return `Hello ${name} your are ${age} years old`
}

interface IHuman {
  name: string;
  age?: number; // option값이므로 있어도 되고, 없어도 된다.
  hungry: boolean;
}

const helloToHuman = (human: IHuman) => {
  console.log(`Hello ${human.name} you are ${human.age} old`)
}


```

* javascript의 superset이다. 다른 언어 위에서 동작하는 언어이다.
* javascript에서 더 좋은 코드를 짤 수 있도록 도와준다.

## react + typescript
* [install](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app)
```
// 강의
npx create-react-app [project folder name] --typescript

// create-react-app 공식문서
npx create-react-app [project folder name] --template typescript
```

## state에 type 주기

* 클래스 컴포넌트 - class [Name] extends Component<{}, State Interface>

```javascript
interface IState {
  counter: number;
}

class App extends Component<{}, IState > {
  state = {
    counter: 0
  }
  ...

  render() {
    const { counter } = this.state
    return (
      <div>
        {counter}
      </div>
    );

  }
}

export default App;
```

## props에 type 주기
* 클래스 컴포넌트 - class [Name] extends Component`<Props Interface, State Interface>`

* 함수형 컴포넌트 - 함수명:React.FunctionComponent`<Props Interface>`
```
interface IProps {
  count: number;
}

const Number:React.FunctionComponent<IProps> = ({ count }) => <Container>{count}</Container>

export default Number;
```

## styled-components
* [install](https://styled-components.com/docs/api#typescript)
```
yarn add @types/styled-components
```

* 타입 선언
```javascript
// inline 타입선언
const Container = styled.span<{ isBlue: boolean }>`
  color: ${props => props.isBlue ? "blue" : "black"}
`;
// interface 사용
interface IContainerProps {
  isBlue: boolean;
}
const Container = styled.span<IContainerProps>`
  color: ${props => props.isBlue ? "blue" : "black"}
`;
```

* [theme 사용](https://styled-components.com/docs/api#create-a-declarations-file)
