## 1. 주문과 음료와의 관계는?
* cloudstudying.kr/lectures/509
* M:N

## 2. 주문#2에 담긴 음료가 아닌 것은?
* 카푸치노, 카페모카, 콜드브루, 레몬 에이드, 자몽 에이드
* 쿼리로 찾기
  ```sql
  -- 주문 #2에 담긴 음료들
  -- JOIN 문법: 다른 테이블을 붙여옴
  SELECT
    beverages.name
  FROM
    order_details
  JOIN beverages ON
    beverages.id = order_details.beverage_id
  WHERE
    order_details.order_id = 2;
  ```

## 3. 취소된 주문이 아닌 것은?
* order_id - 1,3,4,5,6,7,8,9,10,12,13,14

## 4. 주문#14의 매출액, 얼마?
* 49800
* 쿼리로 찾기
  ```sql
  SELECT
    SUM(order_details.count * beverages.price)
  FROM
    order_details
  JOIN beverages ON
    beverages.id = order_details.beverage_id
  WHERE
    order_id = 14;
  ```
