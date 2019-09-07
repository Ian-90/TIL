## 특정 문자열이 포함된 배열 만들어 반환하기

* Question. li 리스트들을 모두 받아서 그중에서 문자열 'e'가 포함된 노드로 구성된 배열을 만들어서 반환하기 (filter, includes, from 사용)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
  <ul>
    <li>apple</li>
    <li>orange</li>
    <li>banana</li>
    <li>strawberry</li>
  </ul>
</body>
</html>
```

* Answer
```javascript
function print() {
  let nodeList = document.querySelectorAll('li')
  let nodeListArr = Array.from(nodeList)
  let result = nodeListArr.filter(function(element) {
    return element.innerText.includes('e')
  })
  return result
}
```