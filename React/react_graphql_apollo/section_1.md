## 1. REST API란?
* 소프트웨어간 정보를 주고받는 방식
* 데이터를 주고받을 약속된 형식
  * GET - 정보 받아오기
  * POST - 정보 입력하기
  * PUT/PATCH - 정보 수정하기
  * DELETE - 정보 삭제하기

* REST API의 한계
  * 원하지 않는 정보까지 전부 받아와야 한다.(overfetching)
  * 특정 정보를 받아오기 위해 여러번 요청해야 한다.(underfetching)

## 2. GraphQL로 정보 주고받아보기
* `1-3-graphql-exp` 실습
* 정보 받아오기 - 원하는 항목만 불러 올 수 있다
```graphql
query {
  teams {
    manager
    office
  }
}
```

* 특정 정보 받아오기
```graphql
query {
  teams(id: 2) {
    id
    manager
    office
    extension_number
    members {
      first_name
      last_name
    }
  }
}
```

* 팀목록과 역할정보 받아오기
```graphql
query {
  temas {
    id
    manager
  }
  roles {
    id
    requirement
  }
}
```

* 새 팀 추가 - mutaion을 이용
```graphql
mutation {
  postTeam (input: {
    manager: "John Smith"
    office: "104B"
    extension_number: "#9982"
    mascot: "Dragon"
    cleaning_duty: "Monday"
    project: "Lordaeron"
  }) {
    manager
    office
    extension_number
    mascot
    cleaning_duty
    project
  }
}
```

* graphql의 장점
  * 필요한 정보들만 선택적으로 받아 올 수 있다(Overfetching 문제 해결)
  * 여러 계층의 정보들을 한 번에 받아올 수 있음(Underfetching 문제 해결)

* 하나의 endpoint에서 모든 요청을 처리
