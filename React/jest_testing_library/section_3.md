## 1. Linter
* Linter
  * 린터 - 정적(static) 텍스트를 분석하고 린터(linter) 규칙을 위반하는 구문을 마킹하는 도구
  * 정적(static) - 코드가 작성된 대로 분석을 하고 코드가 어떻게 실행되는지에 대해서는 분석이 이루어지지 않음

* ESLint
  * js에서 흔히 사용되는 린터(linter)
  * 코드의 오류를 잡아낼 수 있음

* ESLint Plugin
  * ESLint의 규칙을 확장하는 데에 사용
  * 사용자 정의가 가능하기 때문에 원하는 규칙에 관하여 직접 결정 가능
  * [Testing Library](https://github.com/testing-library/eslint-plugin-testing-library)와 [jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)에는 ESLint plugin들이 포함되어 있음
    * 플러그인을 통해 최적의 코드를 작성할 수 있음

## 2. Formatting
* Prettier
  * 코드를 자동으로 포맷팅해주는 도구
  * 들여쓰기 및 빈칸에만 제한이 되어 있음

## 3. ESLint Plugin - Testing Library, jest-dom
* 설치
  ```
  yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom
  ```

* `.eslintrc.json`
  ```json
  {
    "plugins": [
      "testing-library",
      "jest-dom"
    ],
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:testing-library/react",
      "plugin:jest-dom/recommended"
    ]
  }
  ```

## 4. VSCode에 ESLint 구성
* `.vsocde/settings.json`
  ```json
  {
    ...,
    "editor.codeActionsOnSave": {
      "source.fixAll": true
    }
  }
  ```

* [ESLint extension 설치](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

* `.gitignore`에 추가
  ```
  .vscode
  .eslintcache
  ```

## 5. VSCode에 Prettier 구성
* [Prettier extension 설치](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* `.vsocde/settings.json`
  ```json
  {
    ...,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
  ```