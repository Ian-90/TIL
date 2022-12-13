## 1. 샘플 DB
* cloudstudying.kr/lectures/517
* DB 구조 - 학생(students), 성적(grades), 과목(courses), 점수(grade_points)
  * DB 생성시 한글정렬을 위해 template0와 collation을 C로 선택
  ```sql
  /* 테이블 생성 */
  -- 학생
  CREATE TABLE students (
    id       SERIAL      PRIMARY KEY, -- PK
    nickname VARCHAR(30)              -- 닉네임
  );
  -- 과목
  CREATE TABLE courses (
    id    SERIAL      PRIMARY KEY, -- PK
    title VARCHAR(60)              -- 과목명
  );
  -- 등급 점수
  CREATE TABLE grade_points (
    grade VARCHAR(15)   PRIMARY KEY, -- PK
    point DECIMAL(3, 2)              -- 학점
  );
  -- 수강성적
  CREATE TABLE grades (
    id         SERIAL      PRIMARY KEY,                   -- PK
    student_id INTEGER     REFERENCES students(id),       -- FK
    course_id  INTEGER     REFERENCES courses(id),        -- FK
    exam_score INTEGER,                                   -- 시험점수
    grade      VARCHAR(15) REFERENCES grade_points(grade) -- 성적 등급
  );
  /* 레코드 등록 */
  -- 학생
  INSERT INTO
    students(nickname)
  VALUES
    ('홍팍'),
    ('쿠마'),
    ('호크'),
    ('젤리'),
    ('알파고'),
    ('베이글'),
    ('라이언')
  ;
  -- 과목
  INSERT INTO
    courses(title)
  VALUES
    ('프로그래밍'),
    ('대학 수학'),
    ('영작문'),
    ('글쓰기'),
    ('물리와 실험'),
    ('사고와 표현'),
    ('공학 윤리')
  ;
  -- 등급 점수
  INSERT INTO
    grade_points(grade, point)
  VALUES
    ('A+', 4.5),
    ('A0', 4.0),
    ('B+', 3.5),
    ('B0', 3.0),
    ('C+', 2.5),
    ('C0', 2.0),
    ('D0', 1.5),
    ('F',  0.0)
  ;
  -- 수강성적
  INSERT INTO
    grades(student_id, course_id, exam_score, grade)
  VALUES
    (1, 1, 90,  'A0'),
    (2, 1, 97,  'A+'),
    (3, 1, 100, 'A+'),
    (4, 1, 98,  'A+'),
    (5, 1, 64,  'D0'),
    (6, 1, 81,  'B+'),
    (7, 1, 79,  'B+'),
    (1, 2, 88,  'A0'),
    (2, 2, 99,  'A+'),
    (3, 2, 82,  'B+'),
    (4, 2, 68,  'C+'),
    (5, 2, 76,  'B0'),
    (6, 2, 63,  'C0'),
    (7, 2, 71,  'C+'),
    (1, 3, 76,  'B+'),
    (2, 3, 72,  'B+'),
    (3, 3, 79,  'B+'),
    (4, 3, 83,  'A0'),
    (5, 3, 91,  'A+'),
    (6, 3, 69,  'B0'),
    (7, 3, 84,  'A0'),
    (1, 4, 90,  'A0'),
    (2, 4, 82,  'B+'),
    (3, 4, 88,  'A0'),
    (4, 4, 99,  'A+'),
    (5, 4, 68,  'C+'),
    (6, 4, 94,  'A+'),
    (7, 4, 60,  'C0'),
    (1, 5, 66,  'B0'),
    (2, 5, 78,  'A0'),
    (3, 5, 73,  'B+'),
    (4, 5, 84,  'A+'),
    (5, 5, 76,  'A0'),
    (6, 5, 84,  'A+'),
    (7, 5, 71,  'B+'),
    (1, 6, 79,  'B+'),
    (2, 6, 89,  'A0'),
    (3, 6, 96,  'A+'),
    (4, 6, 82,  'B+'),
    (5, 6, 91,  'A0'),
    (6, 6, 100, 'A+'),
    (7, 6, 70,  'C+'),
    (1, 7, 99,  'A+'),
    (2, 7, 94,  'A0'),
    (3, 7, 60,  'C0'),
    (4, 7, 68,  'C+'),
    (5, 7, 75,  'B0'),
    (6, 7, 81,  'B0'),
    (7, 7, 89,  'B+')
  ;
  ```

## 2. 다음 중 올바른 것,무엇?
* 다음 중 올바른 것을 모두 고르시오.
  1. 홍팍이의 프로그래밍 성적은 80점을 받아 A0(4.0)이다. (X)
  2. 라이언의 프로그래밍 성적은 79점을 받아 B+(3.5)이다. (O)
  3. 젤리의 대학 수학 성적은 68점을 받아 C+(2.5)이다. (O)
  4. 알파고의 영작문 성적은 91점을 받아 A+(5.0)이다. (X)

  ```sql
  SELECT
    students.nickname,
    courses.title,
    grades.exam_score,
    grade_points.grade,
    grade_points.point
  FROM                              -- 1: 학생
    students
  JOIN grades ON                    -- 2: 수강성적
    grades.student_id = students.id
  JOIN courses ON                   -- 3: 강의
    courses.id = grades.course_id
  JOIN grade_points ON              -- 4: 등급점수
    grade_points.grade - grades.grade
  WHERE
    (nicknamem, title, exam_score, grade_points.grade, point) IN (
      ('홍팍', '프로그래밍', 80, 'A0', 4.0), -- a
      ('라이언', '프로그래밍', 79, 'B+', 3.5), -- b
      ('젤리', '대학 수학', 68, 'C+', 2.5), -- c
      ('알파고', '영작문', 91, 'A+', 5.0), -- d
    )
  ```

## 3. 과목별 평균 시험점수, 얼마?
* 과목별 시험 점수 테이블
  |  과목명  | 평균 시험점수 |
  |:-------|----------:|
  | 프로그래밍 | 87.00 |
  | 대학 수학 | 78.14 |
  | 영작문 | 79.14 |
  | 글쓰기 | 83.00 |
  | 물리와 실험 | 76.00 |
  | 사고와 표현 | 86.71 |
  | 공학 윤리 | 80.86 |

  ```sql
  SELECT
    courses.title AS "과목명",
    avg_exam_score.round AS "평균 시험점수"
  FROM
    courses
  JOIN (
    SELECT
      course_id,
      ROUND(AVG(exam_score), 2)
    FROM
      grades
    GROUP BY
      course_id
  ) AS avg_exam_score ON
    avg_exam_score.course_id = courses.id
  ```

## 4. 평균 학점 3.5 미만, 누구?
* 학생별 평균 학점(등급점수)을 수강성적으로부터 구하고, 해당 점수가 3.5 미만인 학생을 같이 조회하시오.
  | 닉네임 | 평균 학점 |
  |:------|--------:|
  | 알파고 | 3.21 |
  | 라이언 | 3.07 |

  ```sql
  SELECT
    studuents.nickanme AS "닉네임",
    avg_grade_point.round AS "평균 학점"
  FROM
    students
  JOIN (
    SELECT
      student_id,
      ROUND(AVG(point), 2)
    FROM
      grades
    JOIN grade_points ON
      grade_points.grade = grades.grade
    GROUP BY
      student_id
    HAVING
      AVG(point) < 3.5 -- 조인할 레코드 수가 적을 수록 좋기 때문에 바깥에 WHERE 절보다 HAVING 절이 좋다.
  ) AS avg_grade_point ON
    avg_grade_point.student_id = students.id
  ```

## 5. 학점을 평균보다 잘주는 강의, TOP 3는?
* 모든 강의별 평균 학점(등급점수)을 구하고, 이보다 후하게 준 꿀 강의 TOP3를 조회하시오.
  | 강의명 | 평균 학점 |
  |:-------|-------:|
  | 영작문 | 3.71 |
  | 물리와 실험 | 3.86 |
  | 사고와 표현 | 3.79 |

  ```sql
  SELECT
    courses.title AS "강의명",
    ggul_courses.round AS "평균 학점"
  FROM
    courses
  JOIN (
    -- 강의별 평균학점
    SELECT
      course_id,
      ROUND(AVG(point), 2)
    FROM
      grades
    JOIN grade_pointsk ON
      grade_points.grade = grades.grade
    GROUP BY
      course_id
    HAVING
      AVG(point) > (
        -- 모든 강의의 평균 학점
        SELECT
          AVG(point)
        FROM
          grades
        JOIN grade_points ON
          grade_points.grade = grades.grade
      )
    ORDER BY
      AVG(point) DESC
    LIMIT
      3
  ) AS ggul_courses ON
    ggul_courses.course_id = courses.id
  ```

* [실습 쿼리](https://sehongpark.notion.site/SQL-315a2d73894a408984a0783cad52b1bf)
* [해커랭크 연습문제](https://sehongpark.notion.site/B-2d53f4ea6fb94052a6aa6aca7971b72e)
