## 1. BApp 개발 과정 소개
* 2주차 솔리디티를 가지고 스마트 컨트랙트를 만들고 배포
* 3주차 스마트 컨트랙트를 웹이나 앱에서 사용가능하도록 만들기
* 4주차에 실제 마켓 BApp 만듬

## 2. BApp Demo
* demo 앱 실행 설명

## 3. Hello, Klaytn
* [klaytn wallet](https://wallet.klaytn.com/) - Baobab testnet 선택 후, 계정 생성(개인키 생성)
  * private key는 절대로 공개하면 안됨
  * private key, wallket key, address는 개인 메모장에 저장
    * Account - 계좌
    * Address - 주소
    * Private key - 개인키
  * KLAY Faucet에서 테스트용 klay 생성 후, [Klaytnscope](https://scope.klaytn.com/)에서 Babobab 네트워크 선택 후, 주소를 검색하면 테스트용 klay가 들어온걸 확인할 수 있다

* [klaytn ide](https://ide.klaytn.com/#optimize=false&runs=200&evmVersion=constantinople&version=soljson-v0.8.7+commit.e28d00a7.js)
  * 왼쪽 사이드바
    * 두번째 메뉴에서 컴파일러 버전 선택
    * 세번째 메뉴에서 네트워크선택 및 계정을 추가한 후, deploy 버튼으로 배포

## 4. 스마트 컨트랙트 개념
* World Computer
  * 블록체인 데이터는 누구나 볼 수 있으며, 누구나 사용 가능
  * 블록체인 - 수많은 스마트컨트랙트들과 개인들과의 트랜잭션의 모음

* Account
  * Private Key
    * Address
    * Balance - 잔고
  * Smart Contract - 여러개가 있을 수 있음
    * Address
    * Balance
    * Code

* Transaction
  * 블록체인에서의 모든 거래
  * 코드에서 돈(KLAY)을 보낼 수 있음
  * 코드를 실행하는데 돈이 듬

* Fee(수수료)
  * Gas, Gas Price
  * 수수료 = GAS * GAS Price
  * 코드를 실행하는데 수수료를 내야 함
