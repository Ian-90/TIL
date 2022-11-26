## 1. 그룹화
### 1.1 무엇?(데이터를 분류해서, 그 특징별로 분석할 수 있나요?)
* 데이터를 특징별로 분류 후, 이를 기준으로 분석(집계)하는 기법. group by 절 이용

### 1.2 GROUP BY와 COUNT(어느 카드가 가장 많이 결제됩니까?)
* 결제(payments) 테이블을 결제 방법에 따라 분류하고, 각각의 결제횟수를 조회하시오.
  ```sql
  SELECT
    ptype AS "결제 방법",
    COUNT(ptype) AS "결제 횟수"
  FROM
    payments
  GROUP BY
    ptype;
  ```

### 1.3 GROUP BY와 AVG(상온 식품과 냉장 식품, 각각의 개수와 평균 가격!?)
* 상품(products) 테이블을 보관 타입에 따라 분류하고, 각각의 상품 개수와 평균 가격을 조회하시오.
  ```sql
  SELECT
    ptype AS "상품보관 타입",
    COUNT(ptype) AS "상품 개수",
    ROUND(AVG(price), 2) AS "평균 가격"
  FROM
    products
  GROUP BY
    ptype;
  ```

### 1.4 테이블 조인과 그룹화(사용자별 배송 완료 주문 건수, 얼마나 나와요?)
* 사용자(users)와 주문(orders) 테이블을 조인하고, 사용자 닉네임별 배송 완료 주문수를 조회하시오.
  ```sql
  SELECT
    users.nickname AS "사용자 닉네임",
    COUNT(*) AS "배송 완료 주문 수"
  FROM
    users
  JOIN orders ON
    orders.user_id = users.id
      AND
    orders.status = "DELIVERED"
  GROUP BY
    users.nickname;
  ```

### 1.5 Quiz
* 상품별 총 주문 횟수와 주문 금액을 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    SUM(order_details.count) AS "주문 횟수",
    SUM(products.price * order_details.count) AS "주문 금액"
  FROM
    products
  JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY products.name
  ```
* 사용자 닉네임별 배송 완료 주문 수와 총 결제 금액을 조회하시오.
  ```sql
  SELECT
    users.nickname AS "사용자 닉네임",
    COUNT(*) AS "배송 완료 주문 수",
    SUM(payments.amount) AS "결제 금액"
  FROM
    users
  JOIN orders ON
    orders.user_id = users.id
      AND
    orders.status = 'DELIVERED'
  JOIN
    payments ON payments.order_id = orders.id
  GROUP BY
    users.nickname
  ```

## 2. HAVING, ORDER BY, LIMIT 절
### 2.1 개요
* HAVING - 분류된 그룹들 중 특정 그룹만 가져오기(for group filtering). where절과 다른점은 그룹화된 것만 필터링
* ORDER BY - 결과를 정렬(for record sorting)
* LIMIT - 가져올 레코드의 개수를 제한하는 구문(for getting N results)
* cloudstudying.kr/lectures/513

### 2.2 결제 목록 중, 평균 금액이 특정 값 이상인 것만 뽑아주십쇼!
* 결제(payments) 테이블에서 수단별 평균 결제 금액이 다음과 같을 때, 평균 결제 금액이 36000원 이상인 것만 조회하시오.
  ```sql
  SELECT
    ptype AS "결제 수단",
    ROUND(AVG(amount), 2) AS "평균 결제 금액"
  FROM
    payments
  GROUP BY
    ptype
  HAVING
    AVG(amount) >= 36000;
  ```

### 2.3 상품 중, 매출과이 특정 값 이상인 것만 부탁해요!
* 다음 쿼리는 상품명과 가격을 기준으로, 누적 판매정보를 조죄한다. 이를 참고하여 주어진 문제 풀기
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  ```

* 누적 매출이 35000원 이상인 상품을 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
    SUM(products.price * order_details.count) >= 35000
  ```

### 2.4 상품 중, 매출과 판매량이 모두 특정 값 이상인것!?
* 누적 매출이 2만원 이상이면서, 누적 판매량도 10개 이상인 상품을 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
    SUM(products.price * order_details.count) >= 20000
      AND
    SUM(order_details.count) >= 10
  ```

### 2.5 하나도 안 팔린 상품 중, 싼 것부터 차례로 알 수 있나요?
* 누적 매출이 없는 제품을 가격 기준으로 오름차순 정렬하여 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
    SUM(products.price * order_details.count) IS NULL -- NULL 값은 IS로 비교
  ORDER BY
    products.price ASC -- 오름차순이 기본정렬이기 때문에 생략가능
  ```

### 2.6 매출 TOP 5 상품이 어떻게 됩니까?
* 누적 매출 상위 5개 상품을 조회하시오
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격"
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
    SUM(products.price * order_details.count) IS NOT NULL
  ORDER BY
    SUM(products.price * order_details.count) DESC
    -- 별칭으로 사용 가능("누적 매출" DESC)
  LIMIT
    5
  ```

### 2.7 Quiz
* 누적 판매량 상위 5개 상품을 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
    SUM(order_details.count) IS NOT NULL
  ORDER BY
    "누적 판매량" DESC
  LIMIT
    5
  ```

* 가격 하위 5개 상품의 누적 매출을 조회하시오.
  ```sql
  SELECT
    products.name AS "상품명",
    products.price AS "가격",
    SUM(order_details.count) AS "누적 판매량",
    SUM(products.price * order_details.count) AS "누적 매출"
  FROM
    products
  LEFT JOIN order_details ON
    order_details.product_id = products.id
  GROUP BY
    products.name,
    products.price
  HAVING
  	SUM(products.price * order_details.count) IS NOT NULL
  ORDER BY
    "가격" ASC
  LIMIT
    5
  ```
