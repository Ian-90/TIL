## 1. 컴파일러 기능
* watch mode - 파일 변경사항이 있을 때 마다 파일을 저장하고 다시 컴파일 수행. 종료는 `ctrl + c`
  * 1개의 파일
    ```
    tsc [file name] -w
    ```

  * 여러 개의 파일
    1. 프로젝트 초기화로 `tsconfig.json` 생성
      ```
      tsc init
      ```
    2. 컴파일 실행
      ```
      tsc -w
      ```

* 타입스크립트가 컴파일 할 파일과 제외할 파일 관리 - `includes`, `exclude` 옵션 이용. `files` 옵션은 개별 파일만 지정 가능하지만 작은 프로젝트에서 사용하거나 잘 사용되지 않음.
  * `tsconfig.json` - node_modules는 기본적으로 컴파일 제외
    ```json
    {
      ...,
      "exclude": ["a.ts", "node_modules", "*.dev.ts", ...],
      "include": ["/**/*"],
      "files": [
        "app.ts",
      ]
    }
    ```

* 컴파일 대상 설정
  * compilerOptions - 타입스크립트 코드가 컴파일되는 방식을 관리
    ```json
    {
      ...,
      "compilerOptions": {
        ...,
        "target": "es6", /* 코드를 컴파일 할 자바스크립트 버전*/
        "lib": ["dom", "es6", "dom.interable", "scripthost"], /* dom으로 작업을 수행하는 항목들을 타입스크립트 노드를 지정하게 해주는 옵션*/
        "allowJs": true, /* 타입스크립트가 자바스크립트 파일을 컴파일 할 수 있도록 해줌*/
        "checkJs": true, /* 타입스크립트를 사용하지 않고 일부 기능의 장점을 취하고자 할 때 유용. 자바스크립트에서 효과적으로 사용할 수 있는 any타입만 허용 */
        "sourceMap": true, /* 디버깅 작업과 개발에 유용 */
        "outDir": "./dist", /* 컴파일된 파일을 저장하는 위치 */
        "rootDir": "./src", /* 컴파일할 파일의 위치 */
        "removeComments": true, /* 컴파일할 때 주석 제거 */
        "noEmit": true, /* 자바스크립트 파일 생성하지 않기 */
        "noEmitOnError": false, /* 타입스크립트 컴파일 에러가 있을 때, 컴파일된 파일을 생성하지 않는 옵션 */
        "strict": true, /* noImpliciAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict를 모두 설정하는 옵션. true로 설정하면 앞의 모든 항목을 true로 설정하는 것과 같다*/
        "noImplicitAny": true, /* any타입을 사용하지 않도록 설정. */
        "stricktNullCheck": true, /* null값을 잠재적으로 가질 수 있는 값에 접근하고 작업하는 방식을 타입스크립트에게 알려주는 것 */
        "strictBindCallApply": true, /* 호출하려는 함수를 제대로 설정했는지 확인 */
        "strictPropertyInitialization": true, /* 클래스를 사용할 때 좋음 */
        "alwaysStrict": true, /* strict모드에서 컴파일로 생성되는 자바스크립트 파일에, use strict 추가*/
        "noUnusedLocals": true, /* 사용하지 않는 지역 변수나 전역 변수 허용 여부 */
        "noUnusedParameters": true, /* 사용하지 않는 매개변수 허용 여부  */
        "noImplicitReturns": true, /* 함수가 반환값을 갖는지 허용 여부 */
      }
    }
    ```

## 2. 타입스크립트 tip
* `!` - 값이 반환 될거라고 타입스크립트에게 알려주는 것
  ```ts
  const button = document.queriySelector('button')!

  button.addEventListener('click', () => {
    console.log('Clicked')
  })
  ```
