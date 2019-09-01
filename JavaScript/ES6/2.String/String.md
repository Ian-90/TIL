## 1. String
  * hello로 시작되는 문자열인지 아닌지 판단?
    1. 정규표현식
    2.  ES2015 String에 새로운 메서드들
      * [String.startsWith()]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith')
      * [String.endsWith()]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith')      
      * [String.includes()]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes')
    ```javascript
    let str = 'hello world ! ^^ ~~';
    let matchstr = 'hello';
    let matchstr2 = '^~~';
    
    // 시작과 끝이 일치하는지 확인하는 메소드
    str.startsWith(matchstr) // true
    str.endswith(matchstr2) // false

    str.includes('world') // true
    ```