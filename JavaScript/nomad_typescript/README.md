# NOMAD CODERS

- [TypeScript로 블록체인 만들기](https://academy.nomadcoders.co/p/build-a-blockchain-with-typescript)

## Setting
* 설치
```
yarn global add typescript
```

* [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 추가 - TS가 어떻게 JS로 변환할지 알려주는 것

* 컴파일 방법
  * global 설치
  ```
  tsc [파일명]
  ```

  * local 설치
  ```
  npx tsc [파일명]
  ```

* 계속 컴파일 하려면 ? 컴파일 명령어에 -w 또는 --watch 옵션을 붙인다.
```
tsc [파일명] --watch
```

## Types
1. function
```
const func(arguments: type, ...): return type => {}
```

* example
```javascript
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are a ${gender}`
}

```