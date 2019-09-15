## Destructuring과 Set을 활용한 로또 번호 생성기
* Question - 로또 번호 만들기.
  1. 유일한 값을 추출하는 과정에서 Set을 사용합니다.
  2. getRandomNumber 함수에 변수를 전달하는 과정에서 destructuring을 사용해봅니다.
  ```javascript
  const SETTING = {
    name: 'LUCKY LOTTO!',
    count: 6,
    maxNumber: 45
  }

  function getRandomNumber(maxNumber) {

  }
  ```

* Answer
```javascript
const SETTING = {
  name: 'LUCKY LOTTO!',
  count: 6,
  maxNumber: 45
}

function getRandomNumber({count, maxNumber}) {
  const lottoNumberSet = new Set();
  while (lottoNumberSet.size < count) {
    let randomNumber = Math.floor(Math.random() * maxNumber) + 1
    lottoNumberSet.has(randomNumber) ? null : lottoNumberSet.add(randomNumber)
  }
  return lottoNumberSet
}
```