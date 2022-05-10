## 1. 데이터베이스와 SQL, 무엇?
* SQL이란?
  * Structured Query Language
  * 데이터 관리를 위한 언어. DB에서 사용되는 언어

* 데이터베이스
  * DB(Database)
  * 데이터 창고

## 2. 테이블은 뭐고, CRUD는 뭐죠?
* 테이블
  * 일종의 엑셀 표
  * 행(rows, record) - 정보
  * 열(columns, attribute) - 속성

* DB는 테이블의 데이터를 관리하며, SQL을 통해 테이블을 CRUD 할 수 있음
  * Create
  * Read
  * Update
  * Delete

## 3. PostgreSQL 설치(DBMS와 DB는 다른건가?)
* 설치
  * [postgreql](https://www.postgresql.org/download/) 홈페이지에서 OS에 맞는 파일을 다운로드하여 설치
    * 컴포넌트에서 Stack Builder는 체크해제
    * password 설정은 중요
    * port는 5432
    * locale은 ko

  * macos는 homebrew로 설치 가능
    ```
    brew install postgresql pgadmin4
    ```

* DBMS
  * 데이터베이스 서버

## 4. 맥도날드 DB와 버거 테이블 만들기(실습 준비)
* create database를 통하 mcdonalds 생성
  * SQL을 이용하여 데이터베이스 안에 테이블 생성. excute(재생 모양) 버튼을 통해 호출
    ```sql
    CREATE TABLE burgers (
      id INT, -- id(숫자)
      name VARCHAR(50), -- 이름 (최대 50글자)
      price INT,
      gram INT,
      kcal INT,
      protein INT
    )
    ```
  * Schemas에서 생성된 테이블 확인

## 5. 데이터 CRUD 실습(INSERT, SELECT, UPDATE, DELETE)
* 생성 - 콤마(,)로 구분하며 마지막에는 콤마가 없어야 하고 세미콜론(;)으로 끝낸다.
  ```sql
  INSERT INTO
    burgers(id, name, price, gram, kcal, protein)
  VALUES
    (1, '행운버거 골드 스페셜', 6000, 227, 699, 26);
  
  INSERT INTO
    burgers(id, name, price, gram, kcal, protein)
  VALUES
    (2, '행운버거 골드', 5300, 222, 540, 25),     
    (3, '트리플 치즈버거', 6300, 219, 619, 36),    
    (4, '빅맥', 5300, 223, 583, 27) -- 나머지 버거들도 추가
  ;
  ```

* 조회
  ```sql
  SELECT
    * -- 모든 속성을 보여줘
  FROM
    burgers; -- 해당 테이블의
  ```

* 수정
  ```sql
  -- 모두다 수정
  UPDATE
    burgers
  SET
    price = 1000;
  -- 특정 아이템만 수정
  UPDATE
    burgers
  SET
    price = 1000
  WHERE
    id = 4;
  ```