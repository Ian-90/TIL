# 1. 노드란 무엇인가 & 설치 방법
* 노드 - 크롬 V8 자바스트립트 엔진으로 빌드된 자바스크립트 런타임
  * 런타임 - 컴퓨터 프로그램이 실행되고 있는 동안 프로세스나 프로그램을 위한 소프트웨어 서비스를 제공하는 가상 머신의 상태
  * 자바스크립트를 브라우저외의 환경에서 돌릴 수 있게 해주는 프로그램

* 설치방법
  1. [공홈 다운로드](https://nodejs.org/ko/download/)
  2. [nvm](https://github.com/nvm-sh/nvm) - node 버전 매니저

* 설치확인
```bash
node -v
```

# 2. REPL과 헬로 노드
* REPL - Read, Evaluate, Print, Loop
* 실행법 - 터미널에 node를 입력하면, 터미널이 변경됨.
```bash
node
```
* 종료방법
  1. ctrl + c 2번
  2. .exit

* js파일로 실행하기
```bash
node [js file]
```

# 3. 호출 스택과 이벤트 루프
* 호출 스택(콜 스택)
```js
function first() {
  second()
  console.log('첫 번째')
}
function second() {
  third()
  console.log('두 번째')
}
function first() {
  console.log('세 번째')
}

first()
```
* 실행순서 - third -> second -> first

* [이벤트 루프](https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/) - 여러개의 큐에서 함수들의 실행 순서를 결정하고, 큐에서 호출스택으로 함수를 꺼내온다.
```js
function run() {
  console.log('3초 후 실행')
}

console.log('시작')
setTimeout(run, 3000)
console.log('끝')
```
* 실행순서 - 시작 -> 끝 -> 3초후 실행

* 언제 태스크 큐에 들어가나요?
  * setTimeout
  * setInterval
  * setImmediate
  * Promise resolve, reject
  * async, await
  * EventListener callback

# 4. 이벤트기반, 싱글쓰레드, 논블러킹IO
* 이벤트기반(event-driven) - 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식(click, 네트워크 요청 등등..) 
* 논블러킹IO
  * 논블러킹 - 함수를 태스크큐로 보내서 실행순서를 바뀌게 하는 것. 이전 작업이 완료될 때까지 멈추지 않고 다음 작업을 수행.
  * I/O - filesystem, network가 I(Input)/O(Output)의 일종
* 싱글스레드 - 컴퓨터 작업을 처리할 수 있는 일손. 한 번에 한 가지 일을 처리 할 수 있음.