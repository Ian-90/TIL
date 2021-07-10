## 1. Introduction to Testing in Nest
* jest가 세팅 되어 있에서 *.spec.ts로 테스트 작성이 가능
* e2e - 사용자가 취할 액션에 대한 테스트

## 2. Your first Unit Test
```ts
describe('테스트 대상', () => {
  it('테스트할 항목', () => {
    expect(2 + 2).toEqual(4)
  })
});
```

## 3. Testing getAll and getOne
* getAll과 getOne 유닛테스트 작성

## 4. Testing delete and create
* deleteOne 유닛테스트 작성
