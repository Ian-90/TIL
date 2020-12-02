# 1. 노드 CLI 프로그램 만들기
* #!/usr/bin/env node - linux나 mac에 node가 설치되어있는 경로
* package.json
```json
"bin": {
  "명령어": "실행 참조 파일"
}
```
* global 설치 후 명령어 실행
```
npm i -g [만든 cli package name]
[명령어]
```

# 2. CLI 프로그램 구현하기 1
* process.stdin - 터미널에서 적는 명령어
* process.stdout - 터미널에 표시된 결과값
```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.clear()
const answerCallback = (answer) => {
  if (answer === 'y') {
    console.log('감사합니다')
    rl.close()
  } else if (answer === 'n') {
    console.log('죄송합니다')
    rl.close()
  } else {
  console.clear()
    console.log('y 또는 n만 입력하세요')
    rl.question('예제 재미있습니까? (y/n)', answerCallback)
  }
}

rl.question('예제 재미있습니까? (y/n)', answerCallback)
```

# 3. CLI 프로그램 구현하기 2 & 실행
* mkdirp, exist 함수 작성
* package.json의 cli 변경 시, 재설치 해주어야 함

# 4. CLI 상호작용 추가하기
* 대화형으로 입력하도록 작성

# 5. commander 사용하기
* commander - 대화형으로 만들기 쉽게해주는 프레임워크
  * --옵션 <필수>
  * --단축옵션 [선택]

# 6. inquirer, chalk 사용하기
* inquirer - rl보다 더 편한 대화형 패키지
  * type - 프롬프트 종류
  * name - 질문명
  * message - 메세지
  * choices - 선택지
  * default - 기본값

# 7. 파일 복사 명령어 만들기
* fs.copyFileSync 이용

# 8. 파일 지우기 만들기
* 폴더제거 - fs.rmdirSync 이용
* 파일제거 - fs.unlinkSync 이용
