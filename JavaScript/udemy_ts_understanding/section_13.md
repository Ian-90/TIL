## 1. 프로젝트 설정
* Create React App 이용하기
  ```
  npx create-react-app [project name] --template typescript
  ```

## 2. 리액트에서 타입스크립트 사용
* 컴포넌트 타입 선언
  ```tsx
  import React from 'react'
  const Component: React.FC = () => {
    ...
  }
  ```

* props 타입 선언
  ```tsx
  import React from 'react'
  interface CompProps {
    ...
  }

  const Component: React.FC<CompProps> = () => {
    ...
  }
  ```

* ref 타입 선언
  ```tsx
  import React, { useRef } from 'react'

  const Component: React.FC = () => {
    const ref = useRef<RefDataType>(null)
    ...
  }
  ```

* state 타입 선언
  ```tsx
  import React, { useState } from 'react'

  const Component: React.FC = () => {
    const [state, setState] = useState<StateDateType>()
    ...
  }
  ```
