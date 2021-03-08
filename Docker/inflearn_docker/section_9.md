## 1. 섹션 설명
* 도커 환경의 mysql 부분 정리 - mysql이 aws에서 돌아가고 있기 때문에, mysql을 어플리케이션에 연결해주는 부분 빼고 다 제거
  * docker-compose.yml
  * mysql 폴더 삭제
  * host와 같은 정보들은 aws에서 db 생성후 내용을 다시 넣어주기

## 2. Github에 소스 코드 올리기 
* .gitignore 추가 후 github에 push

## 3. Travis CI Steps
* `git code push => Travis CI가 자동으로 코드를 가져옴 => 테스트 코드 실행 => 성공하면 운영환경 이미지들을 Build => 빌드된 이미지들을 Docker Hub로 보냄 => AWS EB에 Docker Hub에 이미지를 보냈다고 알림 => AWS EB에서 DockerHub에 있는 이미지를 가져온 후에 배포`

* travis ci에서 레포 활성화

## 4. .travis.yml 파일 작성하기
* `.travis.yml` => `travis ci에게 도커 환경으로 만들것이라고 선언` => `구성된 도커 환경에서 Dockerfile.dev를 이용해서 도커 이미지 생성` =>`생성된 이미지를 이용하여 테스트 수행` => `테스트가 성공했다면 운영버전 이미지를 빌드하는 설정 추가` => `도커 허브 로그인` => `빌드된 이미지를 도커허브에 보내주기` => `AWS EB에 업데이트된 빌드이미지를 가져와서 배포 할 수 있게 설정`

* .travis.yml
```yml
language: generic

sudo: required

services:
  - docker

before_install:
  - docker build -t ian90/react-test-app -f ./frontend/Dockerfile.dev ./frontend // 도커 이미지 생성

script:
  - docker run -e CI=true ian90/react-test-app npm run test // 생성된 이미지를 통해 테스트 수행

after_success:
  - docker build -t ian90/docker-frontend ./frontend
  - docker build -t ian90/docker-backend ./backend
  - docker build -t ian90/docker-nginx ./nginx // 운영버전 이미지 빌드

  - echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_ID" --password-stdin // 도커허브 로그인

  - docker push ian90/docker-frontend
  - docker push ian90/docker-backend
  - docker push ian90/docker-nginx // 빌드된 이미지 도커허브에 보내기
```

## 5. Dockerrun.aws.json에 대해서
* `Dockerfile => Elastic Beanstalk => Container` - 아무런 설정을 해주지 않아도 도커파일이 하나이기 때문에, EB가 알아서 빌드된 이미지를 돌려서 어플리케이션을 실행

* `Dockerfile, Dockerfile, ... => Elastic Beanstalk => Container` - 도커파일이 여러개이기 때문에, EB가 어떤파일을 먼저 실행하고 어떤 행동을 취해야하는지 자동으로 프로세스를 해나갈수 없기 때문에, 설정을 해주는파일이 Dockerrun.aws.json

* Dockerrun.aws.json - Docker 컨테이너 세트를 Elastic Beanstalk 애플리케이션으로 배포하는 방법을 설명하는 Elastic Beanstalk 고유의 JSON 파일. 어떻게 다중컨테이너를 작동 시킬지 알려준다. Task에다가 어떻게 컨테이너를 실행할지를 정의해준다. `Task Definition` 그리고 작업 정의를 등록할 때는 `Container Definition`을 명시해줘야한다. 이것을 Dockerrun.aws.json안에다가 넣어준다. 그러면 도커 데몬으로 전해진다.

* AWS에서 말하는 Task Definition에서 지정 할 수 있는 것들
  * 작업의 각 컨테이너에 사용할 도커 이미지
  * 각 작업 또는 작업 내 각 컨테이너에서 사용할 CPU 및 메모리의 양
  * 사용할 시작 유형으로서 해당 작업이 호스팅되는 인프라를 결정
  * 작업의 컨테이너에 사용할 도커 네트워킹 모드
  * 작업에 사용할 로킹 구성
  * 컨테이너가 종료 또는 실패하더라도 작업이 계속 실행될지 여부
  * 컨테이너 시작 시 컨테이너가 실행할 명령
  * 작업의 컨테이너에서 사용할 데이터 볼륨
  * 작업에서 사용해야 하는 IAM 역할

## 6. Dockerrun.aws.json 파일 작성하기
* Dockerrun.aws.json
```json
{
  "AWSEBDockerrunVersion": "버전",
  "containerDefinitions": [ // 객채 안에 하나의 컨테이너를 정의
    {
      "name": "컨테이너의 이름",
      "image": "Docker 컨테이너를 구축할 온라인 Docker 레포지토리의 Docker 이미지 이름",
      "hostname": "도커 컴포즈를 이용해 생성된 다른 컨테이너에서 접근 가능한 호스트 이름",
      "essential": "컨테이너가 실패할 경우 작업을 중지해야하면 true, 필수적이지 않은 컨테이너는 인스턴스의 나머지 컨테이너의 영향을 미치지 않고 종료되거나 충돌가능",
      "memory": "컨테이너용으로 예약할 컨테이너 인스턴스테 있는 메모리 양",
      "portMappings": "컨테이너에 있는 네트워크 지점을 호스트에 있는 지점에 매핑",
      "links": "연결할 컨테이너의 목록"
    },
    ...,
  ]
}
```

## 7. 다중 컨테이너 앱을 위한 Elastic beanstalk 환경 생성
1. AWS 홈
2. Elastic beanstalk 접속
3. Create Application - 플랫폼 브랜치는 멀티컨테이너 선택

## 8. VPC(virtual private cloud)와 Security Group 설정하기
1. VPC
  * AWS의 RDS를 이용하여 MYSQL을 어플리케이션과 연결시켜야하는데 그것을 하기 위해서 VPC와 Security Group을 설정해주어야 한다.
    * `EB 인스턴스 => RDS(MYSQL)` - 이렇게 연결이 되어있지 않아서 통신을 할 수 없기 때문에 따로 설정을 해줘서 연결시켜줘야 한다.
  * VPC - AWS 클라우드에서 논리적으로 격리된 공간을 프로비저닝하여 고객이 정의하는 가상 네트워크에서 AWS 리소스를 시작 가능
  * AP-Hortheast-2에 할당된 기본 VPC - `EB 인스턴스, RDS(MYSQL)`
    * 보는법
      1. AWS 대시보드에서 VPC 검색

2. Security Group
  * `EC2 인스턴스 또는 EB 인스턴스 < = > Security Group(방화벽) < = > INBOUND, OUTBOUND`
    * INBOUND - 외부에서 EC2 인스턴스나 EB 인스턴스로 요청을 보내는 트래픽(HTTP, HTTPS, SSH)
    * OUTBOUND - EC2인스턴스나 EB인스턴스등에서 외부로 나가는 트래픽(파일을 다운로드하거나 INBOUND로 들어온 트래픽을 처리하여 응답하는 경우도 포함)
  * Security Group이 INBOUND와 OUTBOUND를 통제하여 트래픽을 열거나 닫는게 가능

## 9. MYSQL을 위한 AWS RDS 생성하기
1. docekr-compose.yml에 환경변수 추가
```yml
backend:
  ...
  environment: 
  MYSQL_HOST: MYSQL_HOST
  MYSQL_USER: root
  MYSQL_ROOT_PASSWORD: 111111
  MYSQL_DATABASE: myapp
  MYSQL_PORT: 3306
```

2. backed/db.js - 환경변수 적용
```js
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
})
```

3. AWS에서 RDS 검색 후 데이터베이스 생성
  * 표준 생성
  * 엔진 유형 - MYSQL 선택
  * 템플릿 - 프리티어
  * DB 인스턴스 식별자 - docker/fullstacke_mysql
  * 마스터 사용자 이름 - 환경변수 설정한 것
  * 마스터 암호 - 환경변수 설정한 것
  * 생성

## 10. Security Group 생성하기
* EB 인스턴스와 RDS가 서로 요청을 보낼 수 있게 하도록 Security Group을 생성
  1. AWS에서 VPC 검색
  2. 왼쪽 사이드바에서 `보안그룹` 클릭
  3. 보안그룹 `생성` 클릭
  4. `기본 세부정보 설정`
    * 보안그룹 이름 설정
    * 설명 추가
    * vpc 기본값 설정
  5. `인바운드 규칙 설정`
    * 포트범위 - mysql port번호
    * 소스에서 생성한 보안그룹 추가
  6. `규칙 저장`

## 11. Security Group 적용하기
* MYSQL 인스턴스에 새로 생성된 보안 그룹 적용
  1. AWS에서 RDS 검색
  2. 데이터베이스 클릭
  3. `MYSQL 인스턴스` 클릭
  4. `수정` 버튼 클릭
  5. 보안그룹 이동 후, 새로 생성된 `보안그룹 추가`
  6. `계`속 버튼 클릭
  7. 수정 사항 요약에서 `즉시 적용` 클릭
  8. DB 인스턴스 `수정` 클릭

* EB 인스턴스에 새로 생성된 보안 그룹 적용
  1. Elastic Beanstalk 이동
  2. `구성` 클릭
  3. 인스턴스 부분에서 `편집` 클릭
  4. 인스턴스 보안 그룹으로 이동 후, 새로 생성된 보안그룹 `체크`
  5. `적용` 클릭
  6. warning 확인 클릭

## 12. EB와 RDS 소통을 위한 환경 변수 설정하기
1. EB 검색
2. 해당 환경 클릭
3. 왼쪽 사이드바에 `구성` 클릭
4. 소프트웨어 `편집` 클릭
5. 환경 속성에서 환경변수 추가
  * MYSQL_HOST는 실제 RDS에서 주는 값을 넣어주어야 한다.(RDS이동 후, 엔드포인트) 엔드포인트 추가
  * MYSQL_USER: root
  * MYSQL_ROOT_PASSWORD: 비밀번호
  * MYSQL_DATABASE: 이름
  * MYSQL_PORT: 3306

## 13. travis.yml 파일 작성하기 (배포 부분)
* AWS에서 배포를 위한 필요한 설정들 추가
```yml
deploy:
  provider: 외부 서비스 표시(s3, elasticbeanstalk, firebase 등등)
  region: AWS의 서비스가 위치하고 있는 물리적 장소
  app: 생성된 어플리케이션의 이름
  env: EB에 생성된 환경이름
  bucket_name: 해당 elasticbeanstalk를 위한 s3 버켓 이름
  bucket_path: 어플리케이션 이름과 동일
  on:
    branch: 어떤 branch에 push를 할 때 AWS에서 배포 할지 브랜치 설정
```

## 14. Travis CI의 AWS 접근을 위한 API key 생성
* Travis CI와 AWS가 실질적으로 소통을 할 수 있는 인증부분 설정
* 소스 파일을 전달하기 위한 접근 요건 - `GITHUB => Travis CI => AWS`
  * `GITHUB => Travis CI` - travis와 연동시 github 연동으로 인증
  * `Travis CI => AWS` -  AWS에서 제공해주는 Secret Key를 travis.yml에 추가

* Secret, Access API Key를 받는 방법
  1. IAM USER 생성
    * 대시보드 이동
    * IAM 검색
    * 사용자 클릭
    * 사용자 추가 클릭
    * 사용자 이름 설정
    * AWS 액세스 유형 선택
    * 다음 권한 클릭
    * 기존 정책 직접 연결 클릭
    * ElasticBeanstalkFullAccess 선택 후 다음 클릭
    * 태그 추가(안해도 됨)
    * 사용자 만들기
  
  2. 생성을 하면 Access Key와 Secret Key를 받을 수 있음.
  3. API키를 travis.yml에 추가
  4. Access Key와 Secret Key는 Travis 사이트에서 환경변수로 추가