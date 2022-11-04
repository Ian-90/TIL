## 1. 일대일 및 다대다 관계,무엇?(나라와 국가? 고객과 상품?)
### 1.1 One-to-One(1:1)
* 양방향에서 모두 일대일로 연결되는 것
  * country - capital
  * 범위가 작거나 사용빈도가 적은 쪽을 FK로 설정
  * ex. 인스타그램 users - settings(FK)

### 1.2 Many-to-Many(M:N)
* 두 데이터의 연결이 다수와 다수로 이어지는 것
  * customers - products(고객은 다양한 상품을 주문할 수 있고, 상품 또한 다양한 고객들에게 주문 될 수 있다.)
  * 실제 구현시 중간테이블을 두고, FK를 두어서 양측을 연결
    * orders - FK1, FK2
  * ex. 인스타그램 users - photos. 중간 테이블은 likes

## 2. 인스타그램 DB
### 2.1 개인설정(settings), 사용자(users)와 일대일 연결
* setting 테이블 - id, private, adding_photos, user_id
  * 일대일 연결 시 FK에 **UNIQUE를 넣어줘야 함**
  ```sql
  -- settings 테이블 생성
  CREATE TABLE settings (
    id            SERIAL       PRIMARY KEY,                -- PK
    private       BOOLEAN,                                 -- true/false
    adding_photos VARCHAR(15),                             -- AUTO, MANUAL
    user_id       INTEGER      UNIQUE REFERENCES users(id) -- FK: 개인설정 유저(1:1 연결),
  );

  -- settings 레코드 등록
  INSERT INTO
    settings(private, adding_photos, user_id)
  VALUES
    (FALSE, 'MANUAL', 1), -- 유저#1
    (FALSE, 'AUTO',   2), -- 유저#2
    (TRUE,  'AUTO',   3)  -- 유저#3
  ;

  -- settings 테이블 조회
  SELECT * FROM setting;

  -- settings 레코드 다시 등록 시도 - 1:1 연결이 되었기 때문에 duplicate key 에러 발생
  INSERT INTO
    settings(private, adding_photos, user_id)
  VALUES
    (TRUE,  'AUTO',   3)  -- 유저#3
  ;
  ```

### 2.2 좋아요, 누가? 어느 사진에? 다대다 연결
* likes 테이블 - id, user_id, photo_id
  ```sql
  -- likes 테이블 생성(사용자와 사진을 다대다 연결)
  CREATE TABLE likes (
    id       SERIAL  PRIMARY KEY,          -- PK
    user_id  INTEGER REFERENCES users(id), -- FK: 좋아요를 누른 사람(1:N 연결)
    photo_id INTEGER REFERENCES photos(id) -- FK: 좋아요된 사진(1:N 연결)
  );

  -- likes 레코드 등록
  INSERT INTO
    likes(user_id, photo_id)
  VALUES
    -- 사진#1에 달린 좋아요
    (1, 1), -- 유저#1
    (2, 1), -- 유저#2
    -- 사진#2에 달린 좋아요
    (1, 2), -- 유저#1
    (2, 2), -- 유저#2
    (3, 2), -- 유저#3
    -- 사진#3에 달린 좋아요
    (1, 3), -- 유저#1
    (3, 3)  -- 유저#3
  ;

  -- likes 테이블 조회
  SELECT * FROM likes;
  ```

* Quiz
  * 좋아요가 가장 많이 달린 사진은 무엇? - 2번
  * 좋아요가 가장 적은 사진은 무엇? - 1, 3번
  * 좋아요를 가장 많이 누른 사용자는, 공개 계정으로 설정돼있는가? - FALSE
  * 다음 쿼리의 수행을 막으려면, FK인 user_id 컬럼에 어떤 조건을 주어야 하는가? - UNIQUE
    ```sql
    INSERT INTO
      settings(private, adding_photos, user_id)
    VALUES
      (FALSE,  'AUTO',   3),
      (FALSE,  'AUTO',   3),
      (FALSE,  'AUTO',   3)
    ;
    ```
  * 다음 쿼리가 의미하는 바는 무엇? - 1번 유저가 1번 사진에 좋아요를 4번 함.
    ```sql
    INSERT INTO
      likes(user_id, photo_id)
    VALUES
      (1, 1),
      (1, 1),
      (1, 1),
      (1, 1)
    ;
    ```
