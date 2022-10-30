## 1. 일대다 관계,무엇?(사용자와 사진? 사진과 댓글)
### 1:N(One-to-Many, Many-to-One)
* 하나의 데이터가 여러 데이터를 포함
* ex
  * 하나의 인스타그램 계정에 여러개의 사진이 포함
    * user(id => 레코드의 대표값 PK)
      * photos_1(user_id => FK - PK를 가리키는 컬럼)
      * photos_2
      * photos_3
      ...
  * 장바구니(items in cart)
  * 기사에 적힌 댓글들(commnets on article)
  * 팀에 속한 선수들(players in team)

## 2. PK와 FK 개념(대표값을 가리켜 관계를 연결한다고?)
### PK(Primary Key)
* 레코드를 대표하는 값. 일종의 주민등록 번호
  * Representative(like SSN)
  * Unique
  * Named 'id'(usually)
    ```sql
    -- POSTGRES
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      ...
    )
    ```

### FK(Foreign Key)
* 관계 형성을 위한 컬럼
  ```sql
  CREATE TABLE photos (
    ...
    user_id INTEGER REFERENECES users(id),
  )
  ```

## 3. 인스타그램 DB
### 3.1 사용자, 어떤 식으로 만들죠?
* users 테이블 - id, nickname, email
  ```sql
  -- users 테이블 생성
  CREATE TABLE users (
    id       SERIAL       PRIMARY KEY,
    nickname VARCHAR(50),
    email    VARCHAR(100)
  );

  -- users 레코드 등록
  INSERT INTO
    users(nickname, email)
  VALUES
    ('cloudstudying_kr', 'mail@cloudstudying.kr'),
    ('hongpark_cs',      'sehongpark@cloudstudying.kr'),
    ('haesamq',          'haesamq@naver.com')
  ;

  -- users 테이블 조회
  SELECT * FROM users;
  ```

### 3.2 사진, 등록 사용자와 어떻게 연결합니까?
* photos 테이블 - id, filename, user_id
  ```sql
  -- photos 테이블 생성
  CREATE TABLE photos (
    id       SERIAL        PRIMARY KEY, -- PK
    filename VARCHAR(255),
    user_id  INTEGER       REFERENCES users(id) -- FK: 사진 게시자의 PK로 연결
  );

  -- photos 레코드 등록
  INSERT INTO
    photos(filename, user_id)
  VALUES
    -- 1번 유저의 사진 업로드
    ('cat-on-road.jpg',           1),
    ('sunset-over-the-ocean.jpg', 1),
    ('andromeda-galaxy.jpg',      1),
    -- 2번 유저의 사진 업로드 
    ('white-tiger.jpg',        2),
    ('nero-the-black-cat.jpg', 2)
  ;

  -- photos 테이블 조회
  SELECT * FROM photos;
  ```

### 3.3 댓글, 누가? 어느 사진에 단 건지?
* comments 테이블 - id, body, user_id, photo_id
  ```sql
  -- comments 테이블 생성
  CREATE TABLE comments (
    id       SERIAL         PRIMARY KEY, -- PK
    body     VARCHAR(1000),
    user_id  INTEGER        REFERENCES users(id), -- FK: 댓글 작성자
    photo_id INTEGER        REFERENCES photos(id) -- FK: 댓글이 달린 사진
  );

  -- comments 레코드 등록
  INSERT INTO
    comments(body, user_id, photo_id)
  VALUES
    -- 1번 사진의 댓글들
    ('meow',   1, 1), -- 유저#1
    ('nyaong', 2, 1), -- 유저#2
    ('냐옹',    3, 1), -- 유저#3
    -- 2번 사진의 댓글들
    ('sunset',         1, 2), -- 유저#1
    ('falling slowly', 2, 2), -- 유저#2
    -- 3번 사진의 댓글들
    ('Andromeda galaxy', 1, 3), -- 유저#1
    ('mysteriouse..!',   3, 3)  -- 유저#3
  ;

  -- comments 테이블 조회
  SELECT * FROM comments;
  ```

* Quiz
  * 댓글을 가장 많이 작성한 유저는? - 1번
  * 사진을 게시한 유저는 모두 몇명? - 2명
  * 3번 댓글이 달린 사진은? - cat-on-road.jpg
  * 5번 댓글이 달린 사진의 게시자는? - hongpark_cs
