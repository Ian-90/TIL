# NOMAD CODERS

- [TypeScript로 블록체인 만들기](https://academy.nomadcoders.co/p/build-a-blockchain-with-typescript)

## 1. Setting
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

* 계속 컴파일 하려면 ? 
  * cli 옵션 이용 - 컴파일 명령어에 -w 또는 --watch 옵션을 붙인다.
  ```
  tsc [파일명] --watch
  ```

  * [tsc-watch](https://github.com/gilamran/tsc-watch) 이용
    * 설치
    ```
    yarn add tsc-watch
    ```

    * package.json 명령어 추가
    ```
    "scripts": {
      "start": "tsc-watch --onSuccess \" node dist/index.js\" "
    }
    ```
    

## 2. Types
1. function
```
const func(arguments: [type], ...): [함수의 return할 type] => {}
```

* example
```javascript
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are a ${gender}`
}

```

## 3. Interface
* object를 함수의 인자로 넘기려면 ? interface를 이용하기
  * interface는 js로 컴파일 되지 않는다.
```
interface [objectname] {
  key: type;
  ...
}
```

* example
```javascript
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "Ian",
  age: 22,
  gender: "male"
}

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`
}
```
## 4. Class
* interface js로 컴파일 되지 않는데, js로 컴파일되도록 넣으려면? class 사용
* example
```javascript
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const Ian = new Human("Ian", 22, "male")

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`
}
```