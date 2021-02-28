## 1. 섹션 설명 & Github에 소스 코드 올리기
* 6강의 소스코드를 github에 push후 Travis CI에서 소스를 가져와서 테스트 후, 성공을 하면 aws에 코드를 보내서 배포
* 개발 => github push(feature branch pull => master branch) => travis ci에서 푸쉬된 코드 테스트 => Hosting(AWS, Azure, ...)

## 2. Travis CI 설명
* Travis CI - Github에서 진행되는 오픈소스 프로젝트를 위한 지속적인 통합(Continuous Integration) 서비스. 프로젝트를 자동으로 **테스트**, 빌드하거나 **배포**가능.

* 흐름 - `Local git => Github => Travis CI => AWS`
1. 로컬 소스를 Github 저장소에 push
2. Pushr가 되면, Travis CI에서 Push가 되었다고 전달
3. Travis CI는 업데이트된 소스를 Github에서 가져옴
4. Github에서 가져온 소스의 테스트 코드 실행
5. 테스트코드가 성공하면, AWS같은 호스팅 사이트에 배포

## 3. Travis CI 이용 순서
* 이용 순서
  1. Travis CI 사이트로 이동
  2. Github id로 로그인
  3. Settings 페이지로 이동
  4. Travis CI에서 사용할 레포 활성화
  5. .travis.yml 작성 - Travis CI로 소스를 어떻게 전달 시킬거며, 전달 받은 소스를 어떻게 Test하며, 테스트가 성공했을 때, 어떻게 AWS에 배포하는지 설정

## 4. .travis.yml 파일 작성하기(테스트까지)
* `Test를 수행하기 위한 준비 => Test를 수행하기 => AWS로 배포하기`
  * Test를 수행하기 위한 준비
    * Travis CI에서 도커환경 구성 및 Dockerfile.dev를 이용하여 도커이미지 생성
  
  * Test를 수행하기
    * 어떻게 Test를 수행할 것인지 설정해주기
  
  * AWS로 배포하기
    * 어떻게 AWS에 소스코드를 배포할 것인지 설정해주기

* .travis.yml
```yml
sudo: 관리자 권한갖기

language: 언어(플랫폼)을 선택

services: 도커 환경 구성

before_install: 스크립트를 실행할 수 있는 환경 구성

script: 실행할 스크립트(테스트 실행)

after_success: 테스트 성공 후 할 일
```

* 소스코드 push 후, travis-ci 홈페이지에서 job log 정상 동작하는지 확인

## 5. AWS 알아보기
* AWS로 배포하는 순서 - `AWS 회원가입 => AWS Dashboard 이동 => Elastic BeanStalk 검색`
* EC2란 무엇인가?(Elastic Compute Cloud)
  * Amazon Elastic Compute Cloud(Amazon EC2)는 AWS 클라우드에서 확장식 컴퓨팅을 제공. EC2를 이용하면, 애플리케이션을 빠르게 개발하고 배포 가능. 원하는 만큼의 가상 서버를 구축하고 보안 및 네트워크 구성과 스토리지 관리가 가능. 변동사항에 따라 신속하게 규모를 확장하거나 축소할 수 있어서 서버 트래픽 예측 필요성이 줄어듬.
  * 한대의 컴퓨터를 임대한다고 생각하면 됨. 그 컴퓨터에 OS를 설치하고 웹서비스를 위한 프로그램들(웹 서버, DB)를 설치해서 사용하면 됨. 1대의 컴퓨터를 하나의 EC2 인스턴스라고 부름

* EB란 무엇인가?(Elastic BeanStalk)
  * AWS Elastic Beanstalk는 Apache, Nginx같은 친숙한 서버에서 Java, Net, PHP, Node.js, Python, Ruby, Go 및 Docker와 함께 개발된 웹 응용 프로그램 및 서비스를 배포하고 확장하기 쉬운 서비스


## 6. Elastic Beanstalk 환경 구성하기
* `Create Appplication => 애플리케이션 이름 정하기 => 플랫폼 선택 => Create application => 생성중 => 생성완료`
  * 플랫폼 선택 - linux2말고 그냥 linux 선택

## 7. .travis.yml 파일 작성하기(배포 부분)
```yml
deploy:
  provider: 외부서비스 표시(s3, elastic beanstalk, firebase 등등)
  region: 현재 사용하고 있는 AWS의 서비스가 위치하고 있는 물리적 장소 # 한국이면 ap-northeast-2
  app: 생성된 애플리케이션 이름
  env: DocerReactApp-env # 환경의 이름. 직접 설정한 사람은 env 이름을 써주면 됨
  bucket_name: 해당 elastic beanstalk를 위한 s3 버켓 이름 # travis에서 가지고 있는 파일을 압축해서 s3에 보낸다. elastic beanstalk을 만들면, s3가 자동으로 생성된다.
  bucket_path: 애플리케이션 이름과 동일
  on
    branch: 어떤 브랜치에 Push를 할 때, AWS에 배포를 할 것인지
```

## 8. Travis CI의 AWS접근을 위한 API 생성
* Travis CI와 AWS가 실질적으로 소통을 할 수 있게 인증하는 부분을 설정
* 소스파일을 전달하기 위한 접근 요건 - `GITHUB => Travis CI => AWS`
  * `GITHUB => Travis CI` - github으로 travis ci를 로그인 했기 때문에 자동 인증
  *  `Travis CI => AWS` - AWS에서 제공해주는 Secret Key를 .travis.yml에 추가

* IAM(Identity and Access Management)
  * AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스
  * IAM을 사용하여 리소스를 사용하도록 인증(로그인)및 권한부여된 대상을 제어
  * Root 사용자 vs IAM 사용자
    * Root 사용자 - AWS에 가입한 계정. AWS 서비스 및 리소스에 대한 완전한 액세스 권한이 있음
    * IAM 사용자 - Root 사용자가 부여한 권한만 가지고 있음

* Secret Key 받는 순서
  1. IAM 검색
  2. 대시보드에서 사용자 클릭
  3. 사용자 추가 - 액세스 유형은 프로그래밍 방식 액세스 체크
  4. 다음: 권한 클릭 후, 기존 정책 직접 연결 - ElasticBeanstalk Full Access
  5. 사용자 만들기

* Secret Key에는 노출이 되면 안되기 때문에, Travis CI에서 setting에서 환경변수를 설정해준다.
* 환경변수 가져오기
```yml
access_key_id: $AWS_ACCESS_KEY
secret_access_key: $AWS_SECRET_ACCESS_KEY
```

* 배포 후, AWS elastickbeanstalk에서 확인해보면 에러가 남
  * 도커파일에 포트맵핑을 해주어야 함
  * Dockerfile
  ```
  FROM nginx
  EXPOSE 80
  ...
  ```

* 배포가 잘되었는지 확인 -> AWS 사이트 환경으로 이동 클릭
