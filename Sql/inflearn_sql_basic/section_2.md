## 1. 필터링과 WHERE 절(데이터가 너무 많네요...?)
* 필터링 - 데이터를 걸러내는 것.
* 필터링 쿼리
  ```sql
  -- 문법
  SELECT
    *
  FROM
    table_name
  WHERE
    filtering_condition;

  -- 단일 조건 필터링
  SELECT
    *
  FROM
    burgers
  WHERE
    price >= 5000;
  ```
  
## 2. 비교 및 논리 연산자(필요 데이터만 가져오는, 조건 작성법!)
* 비교 연산자(Comparison Operators)
  * `>, >=, =, <=, <, !=`

* 논리 연산자(Boolean Operators)
  * AND, OR, NOT, ...

* 다중 조건 필터링
  ```sql
  SELECT
    *
  FROM
    burgers
  WHERE
    protein > 25
      AND
    kcal < 550;
  
  SELECT
    *
  FROM
    burgers
  WHERE
    protein > 30
    OR
    kcal <= 500;
  ```

## 3. 필터링 실습 준비(학생 성적 DB)
* 테이블
  ```sql
  -- 학생 테이블 생성
  CREATE TABLE students (
    id INTEGER,                -- 학생 id
    nickname VARCHAR(50),      -- 닉네임
    math_score INTEGER,        -- 수학 성적
    english_score INTEGER,     -- 영어 성적
    programming_score INTEGER  -- 프로그래밍 성적
  );

  -- 학생 레코드 추가
  INSERT INTO
    students(id, nickname, math_score, english_score, programming_score)
  VALUES
    (1, 'Sparkles', 98, 96, 93),
    (2, 'Soldier', 82, 66, 98),
    (3, 'Lapooheart', 84, 70, 82),
    (4, 'Slick', 87, 99, 98),
    (5, 'Smile', 75, 73, 70),
    (6, 'Jellyboo', 84, 82, 70),
    (7, 'Bagel', 97, 91, 87),
    (8, 'Queen', 99, 100, 88)
  ;
  ```

* 미션
  * 모든 과목 성적이 다 90점 이상인 학생 정보
    ```sql
    SELECT
      *
    FROM
      students
    WHERE
      math_score >= 90
        AND
      english_score >= 90
        AND
      programming_score >= 90;
    ```

  * 75점 미만 과목이 하나라도 있는 학생 정보
    ```sql
    SELECT
      *
    FROM
      students
    WHERE
      math_score < 75
        OR
      english_score < 75
        OR
      programming_score < 75;
    ```

  * 모든 학생별 정보와 성적 총점
    ```sql
    SELECT
      *,
      math_score + english_score + programming_score AS total
    FROM
      students;
    ```
  * 모든 학생별 정보와 성적 평균
    ```sql
    SELECT
      *,
      (math_score + english_score + programming_score) / 3 AS average
    FROM
      students;
    ```

  * 총점이 270 이상인 학생의 이름, 성적 총점, 성적 평균
    ```sql
    SELECT
      nickname,
      math_score + english_score + programming_score AS total,
      (math_score + english_score + programming_score) / 3 AS average
    FROM
      students
    WHERE
      math_score + english_score + programming_score >= 270;
    ```
