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

## 5. NFT 발행: Solidity 기초 (1) ~ (2)
* NFT
  * 디지털 자산의 일종으로 대체 불가능한 특정 암호 디지털 자산. 디지털 자산에 대한 소유권을 블록체인에 저장함으로써 위조 및 변조가 불가능하도록 영구 보존하고, 그 소유권을 탈중앙화한 형태로 확인할 수 있도록 한다
  * 발행(일련번호, 글자, 소유자) - mint
  * 전송(누가, 누구에게, 무엇을) - transferFrom(form, to, tokenId)

* Practice.sol
```js
program solidity >=0.4.24 <=0.5.6;

contract Practice {
  ## 변수 선언
  uint256 private totalSupply = 10;
  string public name = "KlayLion";
  string public symbol = "KL";

  mapping(unint256 => string) public tokenURIs;
  mapping(unint256 => address) public tokenOwner;

  address public owner; // contract deployer

  constructor () public {
    owner = msg.sender;
  }
  // 함수 생성
  function getTotalSupply() public view returns (unint256) {
    return totalSupply + 1000000
  }

  // 값을 변경하기 때문에 가스비를 내야함
  function setTotalSupply(uint256 newSupply) public {
    // require는 조건문
    require(owner === msg.sender, 'Not owner');
    totalSupply = newSupply;
  }

  function setTokenUri(uint256 id, string memory uri) public {
    tokenURIs[id] = uri;
  }

  // mint(tokenId, uri, owner)
  function mintWithTokenURI(address, to, uint256, tokenId, string memory tokenURI) public returns (bool) {
    // to에게 tokenId(일련번호)를 발행. 적힐 글자는 tokenURI
    tokenOwner[tokenId] = to;
    tokenURIs[tokenId] = tokenURI;

    // add token to the list
    _ownedTokens[to].push(tokenId);

    return true;
  }

  // transferFrom(from, to, tokenId) -> owner가 바뀌는 것(from -> to)
  function safeTransferFrom(address from, address to, uint256 tokenId) public {
    require(from == msg.sender, "from != msg.sender");
    require(from == tokenOwner[tokenId], "you are not the owner of the token");

    _removeTokenFromList(from, tokenId)
    _ownedTokens[to].push(tokenId)
    tokenOwner[tokenId] = to;
  }

  // 소유한 토큰 리스트
  mapping(address => uint256[]) private _ownedTokens
  function ownedTokens(address owner) public view returns (uint256[] | memory) {
    return _ownedTokens[owner];
  }

  function _removeTokenFromList(address from, uint256 tokenId) private {
    // [10, 15, 19, 20] -> 19번 삭제
    uint256 lastTokenIdx = _ownedTokens[from].length - 1;
    for(uint256 i=0; i < ownedTokens[from].length; i++) {
      if (tokenId == _ownedTokens[from][i]) {
        // Swap last token with deleting token
        tokenId = _ownedTokens[from][i] = _ownedTokens[from][lastTokenIdx];
        _ownedTokens[from][lastTokenIdx] = tokenId
        break;
      }
    }
    _ownedTokens[from].length--;
  }
}
```
