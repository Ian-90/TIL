# NOMAD CODERS

* [REACTJS로 웹서비스 만들기](https://academy.nomadcoders.co/p/reactjs-fundamentals)

## 1. 시작하기

* 자바스크립트기반
```javascript
<ul>
  {restaurants.map((restaurant) => {
    return (
      <li>
        <span>{{restaurant.name}}</span>
        <span>{{restaurant.location}}</span>
      </li>
    )
  })}
</ul>
```

* Composition
  * 요소벌, 컴포넌트별 작업구조.

* 단방향 데이터플로우
  * 데이터가 변하면 UI도 업데이트됨.

* 설치
```bash
npx create-react-app 폴더명
```

## 2. Component 그리고 Props

* Component
  * JSX문법(React로 작성하는 HTML문법)을 사용 
  * 모든 Component는 render function을 가짐. (render - 출력)