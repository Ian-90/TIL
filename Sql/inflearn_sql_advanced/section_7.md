## 1. 서브쿼리
### 1.1 무엇?(쿼리 속 또 다른쿼리?)
* 쿼리속에 존재하는 또다른 쿼리. 먼저 수행된 쿼리의 결과를 가지고 다시 쿼리를 수행하는 문법
* select, from, in where, in join 절등 다양한 위치에서 서브쿼리가 쓰일 수 있다
* cloudstudying.kr/lectures/514

### 1.2 음료 정보에, 가장 비싼 음료와의 가격 차이를 함꼐 보여주세요!(SELECT 절)
* 음료(beverages)의 이름 및 가격과 함께, 가장 비싼 음료와의 가격 차이를 조사하려 한다. 주어진 두 쿼리를 조합하여 이를 구하시오. (SELECT 절 서브 쿼리를 사용할 것)
* SELECT 절 서브쿼리는 반드시 only single value(1x1)
  ```sql
  -- 음료명, 가격, 가격 차이 조회
  SELECT
    name AS "음료명",
    price AS "가격",
    price - (
      -- 가장 비싼 음료의 가격(단일값 결과 생성)
      SELECT
        MAX(price)
      FROM
        beverages -- 세미콜론을 포함시키면 안된다.
    ) AS "최대 가격과의 차이"
  FROM
    beverages;
  ```

### 1.3 한 주문에 보통 몇 잔의 음료가 포함될까?(FROM 절)
* 주문내역(order_details)로부터 주문 별 음료 개수의 평균을 조회하려 한다. 주어진 쿼리를 조합하여 이를 구하시오.(FROM 절 서브 쿼리를 사용할 것)
* FROM 절 서브쿼리는 반드시 별칭을 달아주어야 한다.(alias required). any size(MxN)
  ```sql
  SELECT
    AVG("주문 별 음료 개수")  AS "주문 별 음료 개수 평균"
  FROM
    (
      SELECT
        order_id,
        SUM(count)
      FROM
        order_details
      GROUP BY
        order_id
    ) AS "주문 별 음료 개수"
  ```

### 1.4 판매량 기준, 잘나가는 음료 목록좀..!(JOIN 절)
* 주문내역(order_details)로부터 음료 별 주문 개수를 조회하려 한다. 주어진 두 쿼리를 조합하여 이를 구하시오.(JOIN 절 서브 쿼리를 활용할 것)
* JOIN 절 서브쿼리는 반드시 별칭을 달아주어야 한다.(alias required). any size(MxN)
  ```sql
  SELECT
    name AS "음료명"
    COALESCE(total_count, 0) AS "주문 개수" -- COALESCE: null을 0으로 대체하기 위해 사용하는 함수
  FROM
    beverages
  LEFT JOIN
    (
      SELECT
        beverage_id,
        SUM(count) AS "total_count"
      FROM
        order_details
      GROUP BY
        beverage_id
    ) AS "b_counts" ON b_counts.beverage_id = beverages.id
  ```

### 1.5 평균 가격보다 비싼 음료, 뭐뭐 있나요?(WHERE 절)
* 평균 가격보다 비싼 음료(beverages)를 다음과 같이 조회하려 한다. 주어진 두 쿼리를 조합하여 이를 구하시오.(WHERE 절 서브 쿼리를 사용할 것)
* WHERE 절 서브쿼리는 반드시 only single value(1x1) or many rows, one column(Nx1)
  ```sql
  SELECT
    name AS "음료명",
    price AS "가격"
  FROM
    beverages
  WHERE
    price > (
      SELECT
        AVG(price)
      FROM
        beverages
    )
  ```

### 1.6 Quiz
* 다음 쿼리 A, B, C가 동작하지 않는 이유를 설명하시오.
  ```sql
  -- A: 단일 값이 아니기 때문
  SELECT
    name AS "음료명",
    price AS "가격",
    price - (
      SELECT
        MAX(price),
        123
      FROM
        beverages
    ) AS "최대 가격과의 차이"
  FROM
    beverages
  
  -- B: 중첩된 함수는 사용할 수 없다
  SELECT
    AVG(SUM(count))
  FROM
    order_details
  GROUP BY
    order_id
  
  -- C: FROM 절 서브쿼리에 별칭을 사용하지 않았다.
  SELECT
    *
  FROM
    (
      SELECT
        order_id,
        SUM(count)
      FROM
        order_details
      GROUP BY
        order_id
    )
  ```

## 2. IN, ALL, ANY 연산 개요
### 2.1 IN, ALL, ANY
* WHERE절 서브쿼리에서 단순 비교(>, >=, =, <=, <, !=)는 단일 값이어야 하며, IN, ALL, ANY 같은 연산시에는 one column(Nx1)이어야 한다.
* 필터링을 위한 서브쿼리
  * IN - 포함 여부
  * ALL - 모두를 만족하는 것
  * ANY - 적어도 하나라도 만족하는 것
* cloudstudying.kr/lectures/516

### 2.2 가장 잘 팔리는 음료, TOP 3는?(IN 연산)
* 판매량 상위 3개 음료를 다음과 같이 조회하려 한다. 주어진 두 쿼리를 조합하여 이를 구하시오.
  ```sql
  SELECT
    id AS "ID",
    name AS "음료명"
  FROM
    beverages
  WHERE
    id IN (
      SELECT
        beverage_id
      FROM
        order_details
      GROUP BY
        beverage_id
      ORDER BY
        SUM(count) DESC
      limit
        3
    )
  ```

### 2.3 아메리카노랑 라떼보다 싼음료?(ALL 연산)
* 아메리카노와 라떼보다 가격이 싼 음료는 레몬 에이드다. 주어진 쿼리를 조합하여 이를 조회하시오.
  ```sql
  SELECT
    id AS "ID",
    name AS "음료명"
  FROM
    beverages
  WHERE
    price < ALL (
      SELECT
        price
      FROM
        beverages
      name IN ('아메리카노', '라떼')
    )
  ```

### 2.4 커피류보다 비싼 다른 음료, 뭐뭐 있어요?(ANY 연산)
* 커피가 아닌 음료들 중, 적어도 한 커피 보다 가격이 비싼 것은 자몽 에이드와 바닐라 쉐이크다. 주어진 두 쿼리를 조합하여 이를 조회하시오.
  ```sql
  SELECT
    name AS "음료명",
    price AS "가격"
  FROM
    beverages
  WHERE
    btype != 'COFFEE'
      AND
    price > ANY (
      SELECT
        price
      FROM
        beverages
      WHERE
        btype = 'COFFEE'
    )
  ```

### 2.5 Quiz
* 다음 쿼리 A, B가 동작하지 않는 이유를 설명하시오.
  ```sql
  -- A: WHERE절 단일 컬럼이 아니기 때문
  -- 판매량 상위 3개의 음료 정보
  SELECT
    id AS "ID",
    name AS "음료명",
  FROM
    beverages
  WHERE
    id IN (
      -- 음료 id 별 판매량
      SELECT
        beverage_id,
        SUM(count)
      FROM
        order_details
      GROUP BY
        beverage_id
      ORDER BY
        SUM(count) DESC
      LIMIT
        3
    )
  
  -- B: WHERE절 서브쿼리 앞에 ANY 연산자가 없음
  -- 적어도 한 커피보다 비싼 음료
  SELECT
    name AS "음료명"
    price AS "가격"
  FROM
    beverages
  WHERE
    btype != 'COFFEE'
      AND
    price > (
      SELECT
        price
      FROM
        beverages
      WHERE
        btype = 'COFFEE'
    )
  ```
