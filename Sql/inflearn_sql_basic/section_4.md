## 1. 시간값 필터링과 타임스탬프 개요(특정 기간 데이터만 가져오기!)
* 타임스탬프
  ```
  2022-02-25 16:28:30+09
  --DATE----|--TIME--|TZ
  ```
  * 타임존(TZ)
    * London - `+00`
    * Seoul - `+09`
    * New York - `-05`

## 2. 날짜 형식으로 필터링(22년 1월 거래금액 총합 좀 알려주세요)
* 2022년 1월 순수익(이체 총합)
  ```sql
  SELECT
    SUM(amount)
  FROM
    transactions
  WHERE
    created_at >= '2022-01-01'
      AND
    created_at < '2022-02-01';
  ```

## 3. EXTRACT 함수(21년 12월 거래액은요?)
* 2021년 12월 순수익
  ```sql
  SELECT
    SUM(amount)
  FROM
    transactions
  WHERE
    -- EXTRACT(): 시간값에서 특정 속성을 숫자로 추출
    EXTRACT(YEAR FROM created_at) = 2021
      AND
    EXTRACT(MONTH FROM created_at) = 12;
  ```

## 4. TO_CHAR 함수(21년 11월 거래액도 알려주세요)
* 2021년 11월 순수익
  ```sql
  SELECT
    SUM(amount)
  FROM
    transactions
  WHERE
    -- TO_CHAR(): 특정값을 다양한 형식 문자로 바꿔줌
    TO_CHAR(created_at, 'YYYY-MM') = '2021-11';
  ```

## 5. TO_CHAR 함수#2(21년 11월과 22년 1월의 거래액 총합이 어떻게 되죠?)
* 2021년 11월과 2022년 1월의 총 순수익
  ```sql
  SELECT
    SUM(amount)
  FROM
    transactions
  WHERE
    TO_CHAR(created_at, 'YYYY-MM') = '2021-11'
      OR
    TO_CHAT(created_at, 'YYYY-MM') = '2022-01';
  ```

* 2021년 11월부터 2022년 1월까지의 총 지출
  ```sql
  SELECT
    SUM(amount)
  FROM
    transactions
  WHERE
    created_at >= '2021-11-01'
      AND
    created_at < '2022-02-01'
      AND
    amount < 0;
  ```