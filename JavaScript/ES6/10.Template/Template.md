## 1. Template 처리
  * [Template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) - JSON으로 응답을 받고, javascript object로 변환한 후, 어떠한 데이터 처리 조작을 한 후에 DOM에 추가해야하는 작업이 필요하다. 즉, Data + HTML 문자열의 결합이 필요하기 때문에 ES6에서 처리하는 문법이 생겼다.
  
  * ``(백틱)으로 감싸서 사용하고, 사이에 ${}로 변수를 전달 할 수 있다.

  ```javascript
  const data = [
    {
      name: 'coffee-bean',
      order: true,
      items: ['americano', 'milk', 'green-tea']
    },
    {
      name: 'starbucks',
      order: false
    }
  ]

  const template = `<div>welcome ${data[0].name} !!</div>`
  console.log(template) // <div>welcome coffee-bean !!</div>
  ```